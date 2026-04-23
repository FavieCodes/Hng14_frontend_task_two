import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch(status) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'draft': return 'status-draft';
      default: return '';
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className={`status-badge ${getStatusClass()}`}>
      <span className="status-dot"></span>
      <span>{getStatusText()}</span>
    </div>
  );
};

export default StatusBadge;