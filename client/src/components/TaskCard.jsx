import React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-card-header">
        <h3 className="task-title" title={task.title}>{task.title}</h3>
        <button 
          className="btn-icon" 
          onClick={() => onToggleStatus(task._id, isCompleted ? 'Pending' : 'Completed')}
          title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
        >
          {isCompleted ? <CheckCircle size={22} color="var(--status-completed)" /> : <Circle size={22} />}
        </button>
      </div>

      <p className="task-desc">{task.description || "No description provided."}</p>

      <div className="task-meta">
        <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        <span className="task-date">
          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </span>
      </div>

      <div className="task-actions">
        <span className={`badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}>
          {task.status}
        </span>
        <div className="task-action-group">
          <button className="btn-icon" onClick={() => onEdit(task)} title="Edit Task">
            <Pencil size={18} />
          </button>
          <button className="btn-icon" onClick={() => onDelete(task._id)} title="Delete Task">
            <Trash2 size={18} color="var(--danger)" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
