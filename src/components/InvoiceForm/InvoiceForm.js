import React, { useState } from 'react';
import './InvoiceForm.css';

const InvoiceForm = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState(initialData || {
    createdAt: new Date().toISOString().split('T')[0],
    paymentTerms: 30,
    description: '',
    clientName: '',
    clientEmail: '',
    status: 'pending',
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    items: [{ name: '', quantity: 1, price: 0, total: 0 }]
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName) newErrors.clientName = 'Client name is required';
    if (!formData.clientEmail) {
      newErrors.clientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Invalid email format';
    }
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.items.length === 0) newErrors.items = 'At least one item is required';
    
    formData.items.forEach((item, idx) => {
      if (item.quantity <= 0) newErrors[`item_${idx}_quantity`] = 'Quantity must be positive';
      if (item.price <= 0) newErrors[`item_${idx}_price`] = 'Price must be positive';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, asDraft = false) => {
    e.preventDefault();
    if (!asDraft && !validateForm()) return;
    
    const total = formData.items.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0
    );
    
    onSubmit({ ...formData, total, status: asDraft ? 'draft' : formData.status });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    setFormData({ ...formData, items: updatedItems });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  return (
    <form className="invoice-form" onSubmit={(e) => handleSubmit(e, false)}>
      <div className="form-section">
        <h3>Bill From</h3>
        <div className="form-group">
          <label>Street Address</label>
          <input
            value={formData.senderAddress.street}
            onChange={(e) => setFormData({
              ...formData,
              senderAddress: { ...formData.senderAddress, street: e.target.value }
            })}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              value={formData.senderAddress.city}
              onChange={(e) => setFormData({
                ...formData,
                senderAddress: { ...formData.senderAddress, city: e.target.value }
              })}
            />
          </div>
          <div className="form-group">
            <label>Post Code</label>
            <input
              value={formData.senderAddress.postCode}
              onChange={(e) => setFormData({
                ...formData,
                senderAddress: { ...formData.senderAddress, postCode: e.target.value }
              })}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              value={formData.senderAddress.country}
              onChange={(e) => setFormData({
                ...formData,
                senderAddress: { ...formData.senderAddress, country: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Bill To</h3>
        <div className="form-group">
          <label>Client's Name {errors.clientName && <span className="error">{errors.clientName}</span>}</label>
          <input
            className={errors.clientName ? 'error-input' : ''}
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Client's Email {errors.clientEmail && <span className="error">{errors.clientEmail}</span>}</label>
          <input
            type="email"
            className={errors.clientEmail ? 'error-input' : ''}
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input
            value={formData.clientAddress.street}
            onChange={(e) => setFormData({
              ...formData,
              clientAddress: { ...formData.clientAddress, street: e.target.value }
            })}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              value={formData.clientAddress.city}
              onChange={(e) => setFormData({
                ...formData,
                clientAddress: { ...formData.clientAddress, city: e.target.value }
              })}
            />
          </div>
          <div className="form-group">
            <label>Post Code</label>
            <input
              value={formData.clientAddress.postCode}
              onChange={(e) => setFormData({
                ...formData,
                clientAddress: { ...formData.clientAddress, postCode: e.target.value }
              })}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              value={formData.clientAddress.country}
              onChange={(e) => setFormData({
                ...formData,
                clientAddress: { ...formData.clientAddress, country: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>Invoice Date</label>
            <input
              type="date"
              value={formData.createdAt}
              onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: parseInt(e.target.value) })}
            >
              <option value={1}>Net 1 Day</option>
              <option value={7}>Net 7 Days</option>
              <option value={14}>Net 14 Days</option>
              <option value={30}>Net 30 Days</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Project Description {errors.description && <span className="error">{errors.description}</span>}</label>
          <input
            className={errors.description ? 'error-input' : ''}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Item List</h3>
        {formData.items.map((item, idx) => (
          <div key={idx} className="item-row">
            <div className="form-group">
              <label>Item Name</label>
              <input
                value={item.name}
                onChange={(e) => updateItem(idx, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Qty.</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 0)}
                className={errors[`item_${idx}_quantity`] ? 'error-input' : ''}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateItem(idx, 'price', parseInt(e.target.value) || 0)}
                className={errors[`item_${idx}_price`] ? 'error-input' : ''}
              />
            </div>
            <div className="form-group">
              <label>Total</label>
              <input value={item.total} disabled />
            </div>
            <button type="button" className="remove-item" onClick={() => removeItem(idx)}>
              🗑️
            </button>
          </div>
        ))}
        <button type="button" className="btn-secondary" onClick={addItem}>
          + Add New Item
        </button>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        {!isEditing && (
          <button type="button" className="btn-draft" onClick={(e) => handleSubmit(e, true)}>
            Save as Draft
          </button>
        )}
        <button type="submit" className="btn-primary">
          {isEditing ? 'Save Changes' : 'Save & Send'}
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;