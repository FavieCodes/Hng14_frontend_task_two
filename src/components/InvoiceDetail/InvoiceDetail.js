import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import './InvoiceDetail.css';

const InvoiceDetail = ({ invoice, onEdit, onDelete, onMarkAsPaid, onGoBack }) => {
  const calculateTotal = () => {
    return invoice.items?.reduce((sum, item) => sum + (item.quantity * item.price), 0) || 0;
  };

  return (
    <div className="invoice-detail">
      <button className="btn-back" onClick={onGoBack}>
        ← Go Back
      </button>

      <div className="detail-header">
        <div className="status-section">
          <span className="status-label">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="action-buttons">
          <button className="btn-secondary" onClick={onEdit}>Edit</button>
          <button className="btn-danger" onClick={onDelete}>Delete</button>
          {invoice.status === 'pending' && (
            <button className="btn-primary" onClick={onMarkAsPaid}>Mark as Paid</button>
          )}
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-top">
          <div>
            <h2>#{invoice.id}</h2>
            <p className="description">{invoice.description}</p>
          </div>
          <div className="address">
            <p>{invoice.senderAddress?.street}</p>
            <p>{invoice.senderAddress?.city}</p>
            <p>{invoice.senderAddress?.postCode}</p>
            <p>{invoice.senderAddress?.country}</p>
          </div>
        </div>

        <div className="detail-middle">
          <div>
            <p className="label">Invoice Date</p>
            <p className="value">{invoice.createdAt}</p>
            <p className="label">Payment Due</p>
            <p className="value">{invoice.paymentDue}</p>
          </div>
          <div>
            <p className="label">Bill To</p>
            <p className="value">{invoice.clientName}</p>
            <p>{invoice.clientAddress?.street}</p>
            <p>{invoice.clientAddress?.city}</p>
            <p>{invoice.clientAddress?.postCode}</p>
            <p>{invoice.clientAddress?.country}</p>
          </div>
          <div>
            <p className="label">Sent To</p>
            <p className="value">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="detail-items">
          <div className="items-header">
            <span>Item Name</span>
            <span>QTY.</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          {invoice.items?.map((item, idx) => (
            <div key={idx} className="item-row">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>${item.price.toFixed(2)}</span>
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="grand-total">
            <span>Grand Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;