import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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

  const handleCreateInvoice = (invoice, asDraft = false) => {
    const newInvoice = { ...invoice, status: asDraft ? 'draft' : 'pending' };
    addInvoice(newInvoice);
    setShowForm(false);
  };

  const handleUpdateInvoice = (invoice, asDraft = false) => {
    let newStatus = editingInvoice.status;
    
    if (asDraft) {
      newStatus = 'draft';
    } else if (editingInvoice.status === 'draft') {
      newStatus = 'pending';
    } else {
      newStatus = editingInvoice.status;
    }
    
    const updatedInvoice = { ...invoice, status: newStatus };
    updateInvoice(editingInvoice.id, updatedInvoice);
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
    setSelectedInvoiceId(null);
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
          <InvoiceList
            invoices={filteredInvoices}
            onInvoiceClick={(id) => setSelectedInvoiceId(id)}
          />
        </main>

        {/* Invoice Detail Modal - Flush to sidebar */}
        {selectedInvoice && (
          <div className="modal-overlay-page" onClick={() => setSelectedInvoiceId(null)}>
            <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
              <button className="btn-close-modal" onClick={() => setSelectedInvoiceId(null)}>
                ×
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
                  setSelectedInvoiceId(null);
                }}
                onMarkAsPaid={handleMarkAsPaid}
                onGoBack={() => setSelectedInvoiceId(null)}
              />
            </div>
          </div>
        )}

        {/* Invoice Form Modal - Flush to sidebar */}
        {showForm && (
          <div className="modal-overlay-page" onClick={() => {
            setShowForm(false);
            setEditingInvoice(null);
          }}>
            <div className="form-modal" onClick={(e) => e.stopPropagation()}>
              <button className="btn-close-modal" onClick={() => {
                setShowForm(false);
                setEditingInvoice(null);
              }}>
                ×
              </button>
              <InvoiceForm
                initialData={editingInvoice}
                onSubmit={(invoice, asDraft) => {
                  if (editingInvoice) {
                    handleUpdateInvoice(invoice, asDraft);
                  } else {
                    handleCreateInvoice(invoice, asDraft);
                  }
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingInvoice(null);
                }}
                isEditing={!!editingInvoice}
              />
            </div>
          </div>
        )}

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Deletion"
          onConfirm={handleDeleteConfirm}
          invoiceId={invoiceToDelete}
        />
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