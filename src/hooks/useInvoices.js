import { useState, useEffect } from 'react';

const STORAGE_KEY = 'invoices';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setInvoices(JSON.parse(stored));
    } else {
      // Start with empty array - no sample invoices
      setInvoices([]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
    setLoading(false);
  }, []);

  const saveToLocalStorage = (newInvoices) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newInvoices));
    setInvoices(newInvoices);
  };

  const addInvoice = (invoice) => {
    // Generate a unique ID (e.g., XM9141 format)
    const newId = `INV-${Math.floor(Math.random() * 10000)}`;
    const newInvoice = { ...invoice, id: newId };
    saveToLocalStorage([...invoices, newInvoice]);
    return newInvoice;
  };

  const updateInvoice = (id, updatedInvoice) => {
    const updated = invoices.map(inv => 
      inv.id === id ? { ...updatedInvoice, id } : inv
    );
    saveToLocalStorage(updated);
  };

  const deleteInvoice = (id) => {
    const filtered = invoices.filter(inv => inv.id !== id);
    saveToLocalStorage(filtered);
  };

  const markAsPaid = (id) => {
    const updated = invoices.map(inv =>
      inv.id === id ? { ...inv, status: 'paid' } : inv
    );
    saveToLocalStorage(updated);
  };

  return {
    invoices,
    loading,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid
  };
};