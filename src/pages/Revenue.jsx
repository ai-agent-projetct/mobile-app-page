import React, { useState } from 'react';
import { DollarSign, FileDown, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

export default function Revenue({ 
  payments, 
  doctors, 
  departments, 
  addAuditLog, 
  currentRole 
}) {
  const [reportFormat, setReportFormat] = useState('PDF');

  // Compute values dynamically
  const paidPayments = payments.filter(p => p.status === 'Paid');
  const refundedPayments = payments.filter(p => p.status === 'Refunded');
  const pendingPayments = payments.filter(p => p.status === 'Pending');

  const todayRevenue = paidPayments
    .filter(p => p.date === '2026-08-09')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalRevenue = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalRefunded = refundedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  // Compute department-wise revenue
  const deptRevenueMap = {};
  departments.forEach(dept => {
    deptRevenueMap[dept.name] = 0;
  });

  paidPayments.forEach(p => {
    // Map doctor to dept
    const doc = doctors.find(d => d.name === p.doctor);
    if (doc && deptRevenueMap[doc.department] !== undefined) {
      deptRevenueMap[doc.department] += p.amount;
    }
  });

  // Calculate doctor-wise revenue
  const doctorRevenueMap = {};
  paidPayments.forEach(p => {
    doctorRevenueMap[p.doctor] = (doctorRevenueMap[p.doctor] || 0) + p.amount;
  });

  const handleExportReport = () => {
    addAuditLog(currentRole, "Exported Financial Report", "Revenue & Analytics", `Exported monthly financial report in ${reportFormat} format`);
    
    // Generate CSV content
    let csvData = "Invoice ID,Patient,Doctor,Amount (INR),Payment Method,Status,Date\n";
    payments.forEach(p => {
      csvData += `"${p.id}","${p.patient}","${p.doctor}",${p.amount},"${p.method}","${p.status}","${p.date}"\n`;
    });

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ABC_Hospital_Revenue_Report_${new Date().toISOString().slice(0, 10)}.${reportFormat.toLowerCase() === 'excel' ? 'csv' : reportFormat.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Financial Report downloaded as ABC_Hospital_Revenue_Report_${new Date().toISOString().slice(0, 10)}.${reportFormat.toLowerCase()}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Revenue Analytics</h2>
          <p>Supervise clinic turnover, review invoice states, and audit departments' yields.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            className="role-dropdown"
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
          >
            <option value="PDF">PDF Document</option>
            <option value="Excel">Excel Spreadsheet</option>
            <option value="CSV">CSV Comma Separated</option>
          </select>
          <button className="btn btn-primary" onClick={handleExportReport}>
            <FileDown size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Main Financial Metrics */}
      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-info">
            <p>Today's Turnover</p>
            <div className="stat-value">₹{todayRevenue.toLocaleString()}</div>
            <div className="stat-trend up">↑ 4% vs last Sunday</div>
          </div>
          <div className="stat-icon success"><DollarSign size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Total Net Revenue</p>
            <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
            <div className="stat-trend up">↑ 14.8% Monthly target</div>
          </div>
          <div className="stat-icon primary"><TrendingUp size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Refunds Settled</p>
            <div className="stat-value">₹{totalRefunded.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>{refundedPayments.length} claims resolved</div>
          </div>
          <div className="stat-icon danger"><RefreshCw size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Uncollected Balance</p>
            <div className="stat-value">₹{totalPending.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--warning)', marginTop: '6px', fontWeight: 'bold' }}>{pendingPayments.length} pending claims</div>
          </div>
          <div className="stat-icon warning"><AlertCircle size={24} /></div>
        </div>
      </div>

      <div className="grid-2">
        {/* Department Revenue SVG Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Department-wise Revenue Share</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {/* Custom SVG Pie Chart */}
            <svg width="220" height="220" viewBox="0 0 42 42" className="chart-pie">
              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f3f4f6" strokeWidth="6" />
              {/* Cardiology: 55% */}
              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--primary)" strokeWidth="6.5" 
                strokeDasharray="55 45" strokeDashoffset="25" />
              {/* Orthopedics: 35% */}
              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--success)" strokeWidth="6.5" 
                strokeDasharray="35 65" strokeDashoffset="-30" />
              {/* Dermatology: 10% */}
              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--warning)" strokeWidth="6.5" 
                strokeDasharray="10 90" strokeDashoffset="-65" />
              
              <text x="21" y="23" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="var(--text-main)" fontFamily="var(--font-display)">
                ₹{(totalRevenue/1000).toFixed(1)}k
              </text>
            </svg>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.keys(deptRevenueMap).map((dept, idx) => {
                const colors = ['var(--primary)', 'var(--success)', 'var(--warning)'];
                const amount = deptRevenueMap[dept];
                const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: colors[idx % colors.length] }}></div>
                      <span>{dept}</span>
                    </div>
                    <div>
                      <strong>₹{amount.toLocaleString()}</strong> 
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: '6px' }}>({pct}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Doctor-wise Yields List */}
        <div className="card">
          <div className="card-header">
            <h3>Doctor Revenue Yields</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(doctorRevenueMap).map((docName, idx) => {
              const amount = doctorRevenueMap[docName];
              const pctOfTotal = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                  <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}>
                    {docName.split(' ').slice(1).map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{docName}</h4>
                    <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${pctOfTotal}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.92rem', color: 'var(--success)' }}>₹{amount.toLocaleString()}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pctOfTotal}% Share</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
