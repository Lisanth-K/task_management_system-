import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'Pending',
        // Format date for datetime-local input YYYY-MM-DD
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{initialData ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="e.g., Update documentation"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
              placeholder="Detailed description of the task..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select name="priority" className="form-input" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date *</label>
              <input
                type="date"
                name="dueDate"
                className="form-input"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
