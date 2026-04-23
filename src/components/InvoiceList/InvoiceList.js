import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import './InvoiceList.css';

const InvoiceList = ({ invoices, onInvoiceClick }) => {
  if (invoices.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">
          <img 
            src="/emptyIllustration.png" 
            alt="No invoices illustration" 
            className="empty-image"
          />
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
          <div className="invoice-client">{invoice.clientName || 'No client'}</div>
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