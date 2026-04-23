import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-container">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#7C5DFA"/>
            <path d="M20 12L24 20H16L20 12Z" fill="white" fillOpacity="0.8"/>
            <path d="M20 28L16 20H24L20 28Z" fill="white"/>
          </svg>
        </div>
      </div>
      <div className="sidebar-actions">
        <ThemeToggle />
        <div className="profile-icon" role="button" tabIndex={0}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2"/>
            <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 24C8 21 11 19 16 19C21 19 24 21 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;