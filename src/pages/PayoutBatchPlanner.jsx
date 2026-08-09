import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, RefreshCw, AlertCircle, ShieldAlert, Check, Play, Lock, Layers } from 'lucide-react';

export default function PayoutBatchPlanner({ 
  addAuditLog, 
  currentRole 
}) {
  const [bankDailyLimit, setBankDailyLimit] = useState(50000);
  const [plannerLocked, setPlannerLocked] = useState(true);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [minBatchAmount, setMinBatchAmount] = useState(1000);
  
  // Payout Settlements state
  const [settlements, setSettlements] = useState([
    { id: 'SET-901', doctor: 'Dr. Arun Kumar (Emergency)', priority: 'Emergency', amount: 18000, status: 'READY_FOR_PAYOUT', currency: 'INR' },
    { id: 'SET-902', doctor: 'Dr. Rajesh Kumar (HOD)', priority: 'Premium', amount: 22000, status: 'READY_FOR_PAYOUT', currency: 'INR' },
    { id: 'SET-903', doctor: 'Dr. Sarah Mathews', priority: 'Standard', amount: 15000, status: 'READY_FOR_PAYOUT', currency: 'INR' },
    { id: 'SET-904', doctor: 'Dr. Priya Sharma', priority: 'Standard', amount: 60000, status: 'MANUAL_REVIEW', currency: 'INR' }, // Exceeds single limit!
    { id: 'SET-905', doctor: 'Dr. Anitha Rao', priority: 'Standard', amount: 500, status: 'SKIP_SETTLEMENT', currency: 'INR' } // Below min batch
  ]);

  const [generatedBatches, setGeneratedBatches] = useState([
    { id: 'BATCH-001', count: 2, totalAmount: 40000, status: 'Persisted to DB', date: 'Today, 11:30 AM' }
  ]);

  const handleRunBatchPlanner = () => {
    setIsProcessingBatch(true);
    
    setTimeout(() => {
      // Priority Sort: Emergency -> Premium -> Standard
      const priorityWeights = { Emergency: 3, Premium: 2, Standard: 1 };
      const eligible = settlements
        .filter(s => s.status === 'READY_FOR_PAYOUT')
        .sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);

      let runningTotal = 0;
      const batchItems = [];

      for (let item of eligible) {
        if (item.amount > bankDailyLimit) {
          // Flag single settlement exceeding bank limit for manual review
          item.status = 'MANUAL_REVIEW';
          continue;
        }
        if (runningTotal + item.amount <= bankDailyLimit) {
          runningTotal += item.amount;
          batchItems.push(item);
        }
      }

      if (runningTotal > 0) {
        const newBatch = {
          id: `BATCH-00${generatedBatches.length + 1}`,
          count: batchItems.length,
          totalAmount: runningTotal,
          status: 'Persisted to DB',
          date: 'Just now'
        };
        setGeneratedBatches(prev => [newBatch, ...prev]);
        addAuditLog(currentRole, "Generated Payout Batch", "Payments & Payouts", `Created batch ${newBatch.id} totaling ₹${runningTotal.toLocaleString()}`);
        alert(`Payout Batch ${newBatch.id} successfully planned and locked! Total Amount: ₹${runningTotal.toLocaleString()} across ${batchItems.length} settlements.`);
      } else {
        alert("No eligible settlements fit within the daily transfer limit.");
      }

      setIsProcessingBatch(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Doctor Payouts & Batch Planner</h2>
          <p>Enterprise settlement engine with daily transfer limits, priority sorting, and planner lock protections.</p>
        </div>
      </div>

      {/* Main Doctor Earnings Top Card (Document 1 Screenshot 4) */}
      <div className="card" style={{ backgroundColor: '#0f4c5c', color: 'white', marginBottom: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85 }}>Total Doctor Earnings</span>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginTop: '4px' }}>₹ 14,280.50</div>
          </div>
          <button className="btn" style={{ backgroundColor: 'white', color: '#0f4c5c', fontWeight: 'bold' }} onClick={() => alert("Withdrawal request submitted to treasury desk.")}>
            Withdraw Funds <ArrowUpRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Pending Settlement</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₹ 840.00 <span style={{ fontSize: '0.75rem', fontWeight: 'normal', opacity: 0.8 }}>(4 transactions)</span></div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Today's Earnings</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₹ 1,120.25 <span style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>+12% from avg</span></div>
          </div>
        </div>
      </div>

      <div className="grid-main-side">
        {/* Left Side: Enterprise Batch Planner Control (Document 2 Specification PDF) */}
        <div className="card">
          <div className="card-header">
            <h3>Enterprise Settlement Engine</h3>
            <span className="badge badge-success" style={{ gap: '4px' }}>
              <Lock size={12} /> Distributed Planner Lock: Active
            </span>
          </div>

          {/* Configuration Controls */}
          <div className="form-input-row" style={{ marginBottom: '16px' }}>
            <div className="form-group">
              <label>Maximum Daily Bank Transfer Limit (₹)</label>
              <input 
                type="number" 
                className="form-input" 
                value={bankDailyLimit} 
                onChange={(e) => setBankDailyLimit(parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Minimum Batch Threshold (₹)</label>
              <input 
                type="number" 
                className="form-input" 
                value={minBatchAmount} 
                onChange={(e) => setMinBatchAmount(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Pending Doctor Settlements Queue */}
          <div className="table-container" style={{ marginBottom: '20px' }}>
            <table className="table-list">
              <thead>
                <tr>
                  <th>Settlement ID</th>
                  <th>Doctor & Priority</th>
                  <th>Amount</th>
                  <th>Status Rule</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((set, idx) => (
                  <tr key={idx}>
                    <td><strong>{set.id}</strong></td>
                    <td>
                      <div>{set.doctor}</div>
                      <span className={`badge ${
                        set.priority === 'Emergency' ? 'badge-danger' : 
                        set.priority === 'Premium' ? 'badge-info' : 'badge-secondary'
                      }`} style={{ fontSize: '0.7rem', padding: '2px 6px', marginTop: '2px' }}>
                        {set.priority} Priority
                      </span>
                    </td>
                    <td style={{ fontWeight: 'bold' }}>₹{set.amount.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${
                        set.status === 'READY_FOR_PAYOUT' ? 'badge-success' : 
                        set.status === 'MANUAL_REVIEW' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {set.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            onClick={handleRunBatchPlanner}
            disabled={isProcessingBatch}
          >
            <Play size={16} /> {isProcessingBatch ? 'Running Batch Calculations & Locking Limits...' : 'Execute Priority Batch Planner'}
          </button>
        </div>

        {/* Right Side: Generated Batches Log & Synchronization */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <div className="card-header">
              <h3>Planned Payout Batches</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {generatedBatches.map((batch, idx) => (
                <div key={idx} style={{ padding: '12px', border: '1px solid var(--border-light)', borderRadius: '12px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: 'var(--primary)' }}>{batch.id}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{batch.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>{batch.count} Doctors Included</span>
                    <strong style={{ color: 'var(--success)' }}>₹{batch.totalAmount.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.7rem' }}><Check size={10} /> {batch.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ backgroundColor: 'var(--bg-input)' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <RefreshCw size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold' }}>Real-time Synchronization</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  Payments made in the patient app reflect here automatically. Last synced 2m ago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
