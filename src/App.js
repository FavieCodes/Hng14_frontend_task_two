import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useInvoices } from './hooks/useInvoices';
import InvoiceList from './components/InvoiceList/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm/InvoiceForm';
import Filter from './components/Filter/Filter';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Modal from './components/Modal/Modal';
import './App.css';

const AppContent = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, markAsPaid } = useInvoices();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const filteredInvoices = activeFilters.length === 0
    ? invoices
    : invoices.filter(inv => activeFilters.includes(inv.status));

  const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId);

  const handleCreateInvoice = (invoice) => {
    addInvoice(invoice);
    setShowForm(false);
  };

  const handleUpdateInvoice = (invoice) => {
    updateInvoice(editingInvoice.id, invoice);
    setEditingInvoice(null);
    setShowForm(false);
  };

  const handleDeleteConfirm = () => {
    deleteInvoice(invoiceToDelete);
    if (selectedInvoiceId === invoiceToDelete) {
      setSelectedInvoiceId(null);
    }
    setShowDeleteModal(false);
    setInvoiceToDelete(null);
  };

  const handleMarkAsPaid = () => {
    markAsPaid(selectedInvoiceId);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>Invoices</h1>
          <p>{filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}</p>
        </div>
        <div className="header-right">
          <Filter onFilterChange={setActiveFilters} activeFilters={activeFilters} />
          <ThemeToggle />
          <button className="btn-new-invoice" onClick={() => {
            setEditingInvoice(null);
            setShowForm(true);
          }}>
            <span>+</span> New Invoice
          </button>
        </div>
      </header>

      <main>
        {showForm ? (
          <InvoiceForm
            initialData={editingInvoice}
            onSubmit={editingInvoice ? handleUpdateInvoice : handleCreateInvoice}
            onCancel={() => {
              setShowForm(false);
              setEditingInvoice(null);
            }}
            isEditing={!!editingInvoice}
          />
        ) : selectedInvoice ? (
          <InvoiceDetail
            invoice={selectedInvoice}
            onEdit={() => {
              setEditingInvoice(selectedInvoice);
              setShowForm(true);
              setSelectedInvoiceId(null);
            }}
            onDelete={() => {
              setInvoiceToDelete(selectedInvoice.id);
              setShowDeleteModal(true);
            }}
            onMarkAsPaid={handleMarkAsPaid}
            onGoBack={() => setSelectedInvoiceId(null)}
          />
        ) : (
          <InvoiceList
            invoices={filteredInvoices}
            onInvoiceClick={(id) => setSelectedInvoiceId(id)}
          />
        )}
      </main>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        onConfirm={handleDeleteConfirm}
      >
        <p>Are you sure you want to delete this invoice?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;