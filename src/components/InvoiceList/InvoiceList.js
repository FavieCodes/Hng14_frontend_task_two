import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import './InvoiceList.css';

const InvoiceList = ({ invoices, onInvoiceClick }) => {
  if (invoices.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">
          <svg width="193" height="160" viewBox="0 0 193 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M96.5 80C74.5 80 57 62.5 57 40.5C57 18.5 74.5 1 96.5 1C118.5 1 136 18.5 136 40.5C136 62.5 118.5 80 96.5 80Z" fill="#7C5DFA" fillOpacity="0.1"/>
            <circle cx="96.5" cy="40.5" r="39.5" stroke="#7C5DFA" strokeWidth="2" strokeDasharray="4 4"/>
            <path d="M96.5 60L96.5 70" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
            <path d="M86.5 65L96.5 70L106.5 65" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
            <rect x="40" y="85" width="113" height="62" rx="4" fill="#252945" fillOpacity="0.1"/>
            <rect x="40" y="85" width="113" height="62" rx="4" stroke="#7C5DFA" strokeWidth="2" strokeDasharray="4 4"/>
          </svg>
        </div>
        <h2 className="empty-title">There is nothing here</h2>
        <p className="empty-message">
          Create an invoice by clicking the <strong>New Invoice</strong> button and get started
        </p>
      </div>
    );
  }

  return (
    <div className="invoice-list">
      {invoices.map(invoice => (
        <div 
          key={invoice.id} 
          className="invoice-item"
          onClick={() => onInvoiceClick(invoice.id)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && onInvoiceClick(invoice.id)}
        >
          <div className="invoice-id">#{invoice.id}</div>
          <div className="invoice-date">
            Due {new Date(invoice.paymentDue || invoice.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div className="invoice-client">{invoice.clientName}</div>
          <div className="invoice-amount">£ {invoice.total.toFixed(2)}</div>
          <StatusBadge status={invoice.status} />
          <div className="invoice-arrow">
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;