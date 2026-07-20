import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--danger)' }}>
          <AlertTriangle size={48} />
        </div>
        
        <h2 className="modal-title" style={{ marginBottom: '1rem' }}>{title}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{message}</p>
        
        <div className="form-actions" style={{ justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
