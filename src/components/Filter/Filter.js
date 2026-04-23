import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statuses = ['draft', 'pending', 'paid'];

  const handleCheckboxChange = (status) => {
    const newFilters = activeFilters.includes(status)
      ? activeFilters.filter(s => s !== status)
      : [...activeFilters, status];
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-container">
      <button 
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter by status"
      >
        Filter by status
        <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1l4.5 4.5L10 1" stroke="#7C5DFA" strokeWidth="2" fill="none"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="filter-dropdown">
          {statuses.map(status => (
            <label key={status} className="filter-option">
              <input
                type="checkbox"
                checked={activeFilters.includes(status)}
                onChange={() => handleCheckboxChange(status)}
              />
              <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;