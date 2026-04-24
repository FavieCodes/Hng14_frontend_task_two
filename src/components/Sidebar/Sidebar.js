import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-container">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#7C5DFA"/>
            <path d="M20 12L24 20H16L20 12Z" fill="white" fillOpacity="0.8"/>
            <path d="M20 28L16 20H24L20 28Z" fill="white"/>
          </svg>
        </div>
      </div>
      <div className="sidebar-actions">
        <ThemeToggle />
        <div className="divider"></div>
        <div className="profile-container" role="button" tabIndex={0}>
          <img 
            src="/profile.jpg" 
            alt="Profile" 
            className="profile-image"
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?background=7C5DFA&color=fff&rounded=true&size=40&bold=true&name=U';
            }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;