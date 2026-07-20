import React from 'react';
import { ListTodo, CheckCircle2, Clock } from 'lucide-react';

const StatisticsCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-card-title">
          <ListTodo size={18} />
          Total Tasks
        </div>
        <div className="stat-card-value">{stats.totalTasks || 0}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-card-title" style={{ color: 'var(--status-pending)' }}>
          <Clock size={18} />
          Pending
        </div>
        <div className="stat-card-value">{stats.pendingTasks || 0}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-card-title" style={{ color: 'var(--status-completed)' }}>
          <CheckCircle2 size={18} />
          Completed
        </div>
        <div className="stat-card-value">{stats.completedTasks || 0}</div>
      </div>
    </div>
  );
};

export default StatisticsCards;
