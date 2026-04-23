import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch(status) {
      case 'paid':
        return { backgroundColor: 'rgba(51, 214, 159, 0.06)', color: '#33D69F' };
      case 'pending':
        return { backgroundColor: 'rgba(255, 143, 0, 0.06)', color: '#FF8F00' };
      case 'draft':
        return { backgroundColor: 'rgba(55, 59, 83, 0.06)', color: '#373B53' };
      default:
        return {};
    }
  };

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: '700',
      fontSize: '12px',
      textTransform: 'capitalize',
      ...getStatusStyle()
    }}>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: getStatusStyle().color
      }}></span>
      <span>{status}</span>
    </div>
  );
};

export default StatusBadge;