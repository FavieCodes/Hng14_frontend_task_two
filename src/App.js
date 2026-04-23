import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useInvoices } from './hooks/useInvoices';
import InvoiceList from './components/InvoiceList/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm/InvoiceForm';
import Filter from './components/Filter/Filter';
import Modal from './components/Modal/Modal';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const AppContent = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, markAsPaid } = useInvoices();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

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
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="app-header">
          <div className="header-left">
            <h1>Invoices</h1>
            <p className="invoice-count">
              {filteredInvoices.length === 0 
                ? 'No invoices' 
                : `There ${filteredInvoices.length === 1 ? 'is' : 'are'} ${filteredInvoices.length} total ${filteredInvoices.length === 1 ? 'invoice' : 'invoices'}`}
            </p>
          </div>
          <div className="header-right">
            <Filter onFilterChange={setActiveFilters} activeFilters={activeFilters} />
            <button className="btn-new-invoice" onClick={() => {
              setEditingInvoice(null);
              setShowForm(true);
            }}>
              <span className="plus-icon">+</span>
              <span className="btn-text">New Invoice</span>
            </button>
          </div>
        </header>

        <main className="app-main">
          {showForm ? (
            <div className="form-container">
              <button className="btn-go-back" onClick={() => {
                setShowForm(false);
                setEditingInvoice(null);
              }}>
                <span className="arrow">←</span> Go back
              </button>
              <InvoiceForm
                initialData={editingInvoice}
                onSubmit={editingInvoice ? handleUpdateInvoice : handleCreateInvoice}
                onCancel={() => {
                  setShowForm(false);
                  setEditingInvoice(null);
                }}
                isEditing={!!editingInvoice}
              />
            </div>
          ) : selectedInvoice ? (
            <div className="detail-container">
              <button className="btn-go-back" onClick={() => setSelectedInvoiceId(null)}>
                <span className="arrow">←</span> Go back
              </button>
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
            </div>
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