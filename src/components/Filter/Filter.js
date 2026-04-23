import React, { useState, useRef, useEffect } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange, activeFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const statuses = ['draft', 'pending', 'paid'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (status) => {
    const newFilters = activeFilters.includes(status)
      ? activeFilters.filter(s => s !== status)
      : [...activeFilters, status];
    onFilterChange(newFilters);
  };

  const getStatusText = () => {
    if (activeFilters.length === 0) return 'Filter by status';
    if (activeFilters.length === 1) return `Filter: ${activeFilters[0]}`;
    return `Filter: ${activeFilters.length} selected`;
  };

  return (
    <div className="filter-container" ref={dropdownRef}>
      <button 
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter by status"
      >
        {getStatusText()}
        <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1l4.5 4.5L10 1" stroke="#7C5DFA" strokeWidth="2" fill="none"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-header">
            <span>Filter by status</span>
          </div>
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