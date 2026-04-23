import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import './InvoiceList.css';

const InvoiceList = ({ invoices, onInvoiceClick }) => {
  if (invoices.length === 0) {
    return (
      <div className="empty-state">
        <svg width="242" height="200" xmlns="http://www.w3.org/2000/svg">
          <path d="M121 100C93 100 71 78 71 50C71 22 93 0 121 0C149 0 171 22 171 50C171 78 149 100 121 100Z" fill="#7C5DFA" fillOpacity="0.1"/>
          <circle cx="121" cy="50" r="50" fill="#7C5DFA" fillOpacity="0.1"/>
          <path d="M121 70C110 70 101 61 101 50C101 39 110 30 121 30" stroke="#7C5DFA" strokeWidth="2"/>
          <path d="M121 100L121 120" stroke="#7C5DFA" strokeWidth="2"/>
          <path d="M106 115L121 120L136 115" stroke="#7C5DFA" strokeWidth="2"/>
        </svg>
        <h2>There is nothing here</h2>
        <p>Create an invoice by clicking the New Invoice button and get started</p>
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
          <div className="invoice-due">Due {invoice.paymentDue}</div>
          <div className="invoice-client">{invoice.clientName}</div>
          <div className="invoice-amount">${invoice.total.toFixed(2)}</div>
          <StatusBadge status={invoice.status} />
          <div className="invoice-arrow">→</div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;