import React, { useState } from 'react';
import './InvoiceForm.css';

const InvoiceForm = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState(initialData || {
    createdAt: new Date().toISOString().split('T')[0],
    paymentTerms: 30,
    description: '',
    clientName: '',
    clientEmail: '',
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    items: [{ name: '', quantity: 1, price: 0, total: 0 }]
  });

  const [errors, setErrors] = useState({});

  const calculatePaymentDue = (createdAt, terms) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + terms);
    return date.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName) newErrors.clientName = 'Required';
    if (!formData.clientEmail) {
      newErrors.clientEmail = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Invalid email';
    }
    if (!formData.description) newErrors.description = 'Required';
    if (formData.items.length === 0) newErrors.items = 'At least one item required';
    
    formData.items.forEach((item, idx) => {
      if (item.quantity <= 0) newErrors[`item_${idx}_quantity`] = 'Invalid';
      if (item.price <= 0) newErrors[`item_${idx}_price`] = 'Invalid';
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
    
    const paymentDue = calculatePaymentDue(formData.createdAt, formData.paymentTerms);
    
    onSubmit({ 
      ...formData, 
      total, 
      paymentDue
    }, asDraft);
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
    <div className="invoice-form-wrapper">
      <h1 className="form-title">{isEditing ? `Edit #${initialData?.id}` : 'New Invoice'}</h1>
      
      <form onSubmit={(e) => handleSubmit(e, false)}>
        {/* Bill From Section */}
        <div className="form-section">
          <h3 className="section-title">Bill From</h3>
          <div className="form-group">
            <label>Street Address</label>
            <input
              placeholder="Enter street address"
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
                placeholder="Enter city"
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
                placeholder="Enter post code"
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
                placeholder="Enter country"
                value={formData.senderAddress.country}
                onChange={(e) => setFormData({
                  ...formData,
                  senderAddress: { ...formData.senderAddress, country: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="form-section">
          <h3 className="section-title">Bill To</h3>
          <div className="form-group">
            <label>Client's Name</label>
            <div className="error-wrapper">
              <input
                placeholder="Enter client name"
                className={errors.clientName ? 'error' : ''}
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
              {errors.clientName && <span className="error-message">{errors.clientName}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>Client's Email</label>
            <div className="error-wrapper">
              <input
                type="email"
                placeholder="Enter client email"
                className={errors.clientEmail ? 'error' : ''}
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              />
              {errors.clientEmail && <span className="error-message">{errors.clientEmail}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input
              placeholder="Enter street address"
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
                placeholder="Enter city"
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
                placeholder="Enter post code"
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
                placeholder="Enter country"
                value={formData.clientAddress.country}
                onChange={(e) => setFormData({
                  ...formData,
                  clientAddress: { ...formData.clientAddress, country: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
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
            <label>Project Description</label>
            <div className="error-wrapper">
              <input
                placeholder="Enter project description"
                className={errors.description ? 'error' : ''}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>
        </div>

        {/* Item List */}
        <div className="form-section">
          <h3 className="section-title">Item List</h3>
          <div className="items-header">
            <span>Item Name</span>
            <span>Qty.</span>
            <span>Price</span>
            <span>Total</span>
            <span></span>
          </div>
          {formData.items.map((item, idx) => (
            <div key={idx} className="item-row">
              <div className="form-group">
                <input
                  placeholder="Enter item name"
                  value={item.name}
                  onChange={(e) => updateItem(idx, 'name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 0)}
                  className={errors[`item_${idx}_quantity`] ? 'error' : ''}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(idx, 'price', parseFloat(e.target.value) || 0)}
                  className={errors[`item_${idx}_price`] ? 'error' : ''}
                />
              </div>
              <div className="form-group">
                <input
                  value={(item.quantity * item.price).toFixed(2)}
                  disabled
                  className="total-input"
                  placeholder="0.00"
                />
              </div>
              <button type="button" className="remove-item" onClick={() => removeItem(idx)}>
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2h10M4 1h4M2 2v9a2 2 0 002 2h4a2 2 0 002-2V2" stroke="#888EB0" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
            </div>
          ))}
          <button type="button" className="btn-add-item" onClick={addItem}>
            + Add New Item
          </button>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-draft" onClick={(e) => handleSubmit(e, true)}>
            Save as Draft
          </button>
          <button type="submit" className="btn-save">
            {isEditing ? 'Save Changes' : 'Save & Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;