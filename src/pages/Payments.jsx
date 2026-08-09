import React, { useState } from 'react';
import { Search, CreditCard, RefreshCw, AlertCircle, Check, HelpCircle } from 'lucide-react';

export default function Payments({ 
  payments, 
  setPayments, 
  addAuditLog, 
  currentRole 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedPay, setSelectedPay] = useState(null);
  const [refundReason, setRefundReason] = useState('Patient request / Reschedule');
  const [isReconciling, setIsReconciling] = useState(false);

  const handleOpenRefund = (pay) => {
    setSelectedPay(pay);
    setShowRefundModal(true);
  };

  const handleProcessRefund = (e) => {
    e.preventDefault();
    if (!selectedPay) return;

    setPayments(prev => prev.map(p => {
      if (p.id === selectedPay.id) {
        addAuditLog(currentRole, "Processed Refund", "Payments", `Refunded payment ID ${p.id} (Amount: ₹${p.amount}) for ${p.patient}. Reason: ${refundReason}`);
        return { ...p, status: 'Refunded' };
      }
      return p;
    }));
    setShowRefundModal(false);
  };

  const handleReconcile = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      addAuditLog(currentRole, "Executed Payment Reconciliation", "Payments", "Ledger matched with gateway deposits. 0 mismatches.");
      alert("Payment Reconciliation Complete! All local logs match banking gateway records successfully.");
    }, 1500);
  };

  const filteredPayments = payments.filter(pay => 
    pay.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pay.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pay.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Payments Ledger</h2>
          <p>Track bills, manage invoice statuses, issue refunds, and reconcile gateway transactions.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={handleReconcile} disabled={isReconciling}>
            <RefreshCw size={16} className={isReconciling ? 'waveform-bar' : ''} /> {isReconciling ? 'Reconciling...' : 'Run Reconciliation'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-info">
            <p>Total Paid Transactions</p>
            <div className="stat-value">₹{payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
          </div>
          <div className="stat-icon success"><CreditCard size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Pending Invoices</p>
            <div className="stat-value">₹{payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
          </div>
          <div className="stat-icon warning"><AlertCircle size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Refunded Total</p>
            <div className="stat-value">₹{payments.filter(p => p.status === 'Refunded').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
          </div>
          <div className="stat-icon danger"><RefreshCw size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Failed Attempts</p>
            <div className="stat-value">₹{payments.filter(p => p.status === 'Failed').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
          </div>
          <div className="stat-icon secondary"><X size={24} style={{ color: 'var(--danger)' }} /></div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="card">
        <div className="card-header">
          <h3>Transaction Ledgers</h3>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div className="header-search" style={{ flex: 1 }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search by Payment ID, Patient, Doctor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="table-list">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay, idx) => (
                <tr key={idx}>
                  <td><strong>{pay.id}</strong></td>
                  <td>{pay.patient}</td>
                  <td>{pay.doctor}</td>
                  <td style={{ fontWeight: 'bold' }}>₹{pay.amount}</td>
                  <td>{pay.method}</td>
                  <td>
                    <span className={`badge ${pay.type === 'Online' ? 'badge-info' : 'badge-secondary'}`}>
                      {pay.type}
                    </span>
                  </td>
                  <td>{pay.date}</td>
                  <td>
                    <span className={`badge ${
                      pay.status === 'Paid' ? 'badge-success' : 
                      pay.status === 'Pending' ? 'badge-warning' : 
                      pay.status === 'Refunded' ? 'badge-danger' : 'badge-secondary'
                    }`}>
                      {pay.status}
                    </span>
                  </td>
                  <td>
                    {pay.status === 'Paid' ? (
                      <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '0.78rem' }} onClick={() => handleOpenRefund(pay)}>
                        Refund
                      </button>
                    ) : pay.status === 'Pending' ? (
                      <button 
                        className="btn btn-success" 
                        style={{ padding: '4px 8px', fontSize: '0.78rem' }} 
                        onClick={() => {
                          setPayments(prev => prev.map(p => p.id === pay.id ? { ...p, status: 'Paid' } : p));
                          addAuditLog(currentRole, "Confirmed Payment Receipt", "Payments", `Collected pending payment ID ${pay.id} of ₹${pay.amount}`);
                        }}
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Request Modal */}
      {showRefundModal && selectedPay && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleProcessRefund}>
            <div className="modal-header">
              <h3>Issue Refund for Invoice {selectedPay.id}</h3>
              <button type="button" className="btn-icon" onClick={() => setShowRefundModal(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.88rem', marginBottom: '16px' }}>
                You are initiating a refund of <strong style={{ color: 'var(--danger)' }}>₹{selectedPay.amount}</strong> to patient <strong>{selectedPay.patient}</strong>.
              </p>
              <div className="form-group">
                <label>Select Refund Reason</label>
                <select 
                  className="form-input"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                >
                  <option value="Patient request / Reschedule">Patient request / Reschedule</option>
                  <option value="Double payment error">Double payment error</option>
                  <option value="Doctor unavailable / Absent">Doctor unavailable / Absent</option>
                  <option value="Dissatisfactory service">Dissatisfactory service</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowRefundModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-danger">Confirm Refund</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
