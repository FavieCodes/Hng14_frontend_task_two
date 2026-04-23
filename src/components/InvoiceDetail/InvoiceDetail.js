import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import './InvoiceDetail.css';

const InvoiceDetail = ({ invoice, onEdit, onDelete, onMarkAsPaid, onGoBack }) => {
  const calculateTotal = () => {
    return invoice.items?.reduce((sum, item) => sum + (item.quantity * item.price), 0) || 0;
  };

  return (
    <div className="invoice-detail-wrapper">
      <div className="invoice-status-bar">
        <div className="status-section">
          <span className="status-label">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="action-buttons">
          <button className="btn-edit" onClick={onEdit}>Edit</button>
          <button className="btn-delete" onClick={onDelete}>Delete</button>
          {invoice.status === 'pending' && (
            <button className="btn-mark-paid" onClick={onMarkAsPaid}>Mark as Paid</button>
          )}
        </div>
      </div>

      <div className="invoice-content">
        <div className="invoice-header">
          <div>
            <h2 className="invoice-id">#<span className="invoice-id-number">{invoice.id}</span></h2>
            <p className="invoice-description">{invoice.description}</p>
          </div>
          <div className="sender-address">
            <p>{invoice.senderAddress?.street}</p>
            <p>{invoice.senderAddress?.city}</p>
            <p>{invoice.senderAddress?.postCode}</p>
            <p>{invoice.senderAddress?.country}</p>
          </div>
        </div>

        <div className="invoice-details">
          <div className="dates">
            <div className="date-group">
              <p className="label">Invoice Date</p>
              <p className="value">{new Date(invoice.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="date-group">
              <p className="label">Payment Due</p>
              <p className="value">{new Date(invoice.paymentDue).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
          
          <div className="client-info">
            <p className="label">Bill To</p>
            <p className="client-name">{invoice.clientName}</p>
            <p>{invoice.clientAddress?.street}</p>
            <p>{invoice.clientAddress?.city}</p>
            <p>{invoice.clientAddress?.postCode}</p>
            <p>{invoice.clientAddress?.country}</p>
          </div>
          
          <div className="contact-info">
            <p className="label">Sent To</p>
            <p className="client-email">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="invoice-items">
          <div className="items-table">
            <div className="items-header">
              <span>Item Name</span>
              <span>QTY.</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            {invoice.items?.map((item, idx) => (
              <div key={idx} className="item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">{item.quantity}</span>
                <span className="item-price">£ {item.price.toFixed(2)}</span>
                <span className="item-total">£ {(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="grand-total">
            <span>Grand Total</span>
            <span>£ {calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;