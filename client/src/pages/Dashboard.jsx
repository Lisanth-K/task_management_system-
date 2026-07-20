import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import * as api from '../services/api';
import StatisticsCards from '../components/StatisticsCards';
import Toolbar from '../components/Toolbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ConfirmationDialog from '../components/ConfirmationDialog';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Sorting State
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('createdAt_desc');

  // Modals State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timerId);
  }, [search]);

  // Fetch Data
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [sortBy, order] = sort.split('_');
      
      const [tasksRes, statsRes] = await Promise.all([
        api.fetchTasks({ search: debouncedSearch, status: filter, sortBy, order }),
        api.fetchTaskStats()
      ]);
      
      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter, sort]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers
  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (currentTask) {
        await api.updateTask(currentTask._id, taskData);
      } else {
        await api.createTask(taskData);
      }
      setIsFormOpen(false);
      setCurrentTask(null);
      loadData();
    } catch (err) {
      alert('Error saving task');
      console.error(err);
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      await api.updateTask(id, { status: newStatus });
      loadData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteTask(taskToDelete);
      setIsDeleteOpen(false);
      setTaskToDelete(null);
      loadData();
    } catch (err) {
      alert('Error deleting task');
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  const openDeleteModal = (id) => {
    setTaskToDelete(id);
    setIsDeleteOpen(true);
  };

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Tasks</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your day efficiently.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { setCurrentTask(null); setIsFormOpen(true); }}
        >
          <Plus size={18} /> New Task
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: 'var(--danger-hover)', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <StatisticsCards stats={stats} />
      
      <Toolbar 
        search={search} setSearch={setSearch}
        filter={filter} setFilter={setFilter}
        sort={sort} setSort={setSort}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="loader"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <ListTodo size={48} className="empty-icon" />
          <h3>No tasks found</h3>
          <p>Get started by creating a new task.</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setCurrentTask(null); }}
        onSubmit={handleCreateOrUpdate}
        initialData={currentTask}
      />

      <ConfirmationDialog 
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setTaskToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

// Simple import fix for empty state icon
import { ListTodo } from 'lucide-react';

export default Dashboard;
