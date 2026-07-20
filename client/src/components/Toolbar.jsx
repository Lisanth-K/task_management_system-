import React from 'react';
import { Search } from 'lucide-react';

const Toolbar = ({ search, setSearch, filter, setFilter, sort, setSort }) => {
  return (
    <div className="toolbar">
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label className="form-label" style={{ marginBottom: 0 }}>Status:</label>
        <select 
          className="filter-select" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="form-label" style={{ marginBottom: 0 }}>Sort By:</label>
        <select 
          className="filter-select" 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="createdAt_desc">Newest First</option>
          <option value="dueDate_asc">Due Date (Earliest)</option>
          <option value="dueDate_desc">Due Date (Latest)</option>
          <option value="priority_desc">Priority (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
