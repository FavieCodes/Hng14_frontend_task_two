import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('Toggling theme', isDarkMode);
    toggleTheme();
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={handleToggle}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2V4M10 16V18M4 10H2M6.5 6.5L5 5M13.5 13.5L15 15M18 10H16M13.5 6.5L15 5M6.5 13.5L5 15" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5C16.5 14 13.5 17 10 17C6 17 3 13.5 3 10C3 6.5 6 3.5 9.5 3C9 4 9 5 9.5 6C10 7 11 7.5 12 7.5C13 7.5 14 7 14.5 6C15 6.5 16 7.5 17 10.5Z" 
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;