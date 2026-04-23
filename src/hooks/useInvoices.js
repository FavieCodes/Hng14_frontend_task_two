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
      // Sample data
      const sampleInvoices = [
        {
          id: 'INV-001',
          createdAt: '2024-01-15',
          paymentDue: '2024-02-15',
          description: 'Web Development',
          paymentTerms: 30,
          clientName: 'John Smith',
          clientEmail: 'john@example.com',
          status: 'paid',
          senderAddress: {
            street: '123 Main St',
            city: 'New York',
            postCode: '10001',
            country: 'USA'
          },
          clientAddress: {
            street: '456 Oak Ave',
            city: 'Los Angeles',
            postCode: '90001',
            country: 'USA'
          },
          items: [
            { name: 'Website Design', quantity: 1, price: 500, total: 500 },
            { name: 'SEO Optimization', quantity: 1, price: 300, total: 300 }
          ],
          total: 800
        },
        {
          id: 'INV-002',
          createdAt: '2024-01-20',
          paymentDue: '2024-02-19',
          description: 'Mobile App',
          paymentTerms: 30,
          clientName: 'Sarah Johnson',
          clientEmail: 'sarah@example.com',
          status: 'pending',
          senderAddress: {
            street: '123 Main St',
            city: 'New York',
            postCode: '10001',
            country: 'USA'
          },
          clientAddress: {
            street: '789 Pine Rd',
            city: 'Chicago',
            postCode: '60601',
            country: 'USA'
          },
          items: [
            { name: 'iOS Development', quantity: 1, price: 1200, total: 1200 },
            { name: 'Android Development', quantity: 1, price: 1200, total: 1200 }
          ],
          total: 2400
        }
      ];
      setInvoices(sampleInvoices);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleInvoices));
    }
    setLoading(false);
  }, []);

  const saveToLocalStorage = (newInvoices) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newInvoices));
    setInvoices(newInvoices);
  };

  const addInvoice = (invoice) => {
    const newInvoice = { ...invoice, id: `INV-${Date.now()}` };
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

  const saveAsDraft = (invoice) => {
    const draftInvoice = { ...invoice, status: 'draft', id: `INV-${Date.now()}` };
    saveToLocalStorage([...invoices, draftInvoice]);
    return draftInvoice;
  };

  return {
    invoices,
    loading,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid,
    saveAsDraft
  };
};