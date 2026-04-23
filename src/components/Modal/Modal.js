import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div 
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '8px',
          padding: '32px',
          maxWidth: '480px',
          width: '90%'
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{title}</h2>
        <div style={{ marginBottom: '24px' }}>{children}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button 
            onClick={onClose}
            style={{
              padding: '14px 24px',
              borderRadius: '24px',
              border: 'none',
              background: '#F9FAFE',
              cursor: 'pointer',
              fontWeight: '700'
            }}
          >
            Cancel
          </button>
          {onConfirm && (
            <button 
              onClick={onConfirm}
              style={{
                padding: '14px 24px',
                borderRadius: '24px',
                border: 'none',
                background: '#EC5757',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '700'
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;