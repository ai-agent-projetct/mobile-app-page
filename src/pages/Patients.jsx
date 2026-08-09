import React, { useState } from 'react';
import { Search, Plus, Edit, Lock, Eye, History, ShieldAlert, CreditCard } from 'lucide-react';

export default function Patients({ 
  patients, 
  setPatients, 
  appointments, 
  payments, 
  addAuditLog, 
  currentRole 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeHistoryTab, setActiveHistoryTab] = useState('appointments');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    id: '', name: '', phone: '', email: '', dob: '', gender: 'Male', emergencyContactName: '', emergencyContactPhone: '', status: 'Active'
  });

  // Verify access control for clinical records
  // "Billing Staff: Clinical records [Access Denied]"
  const hasClinicalAccess = currentRole !== 'Billing Staff';

  const handleOpenAddModal = () => {
    setNewPatient({
      id: `PAT-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      phone: '',
      email: '',
      dob: '1990-01-01',
      gender: 'Male',
      emergencyContactName: '',
      emergencyContactPhone: '',
      status: 'Active'
    });
    setShowAddModal(true);
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.phone) return;
    setPatients(prev => [...prev, newPatient]);
    addAuditLog(currentRole, "Added Patient", "Patient Management", `Registered patient ${newPatient.name} (ID: ${newPatient.id})`);
    setShowAddModal(false);
  };

  const togglePatientStatus = (id) => {
    setPatients(prev => prev.map(pat => {
      if (pat.id === id) {
        const nextStatus = pat.status === 'Active' ? 'Inactive' : 'Active';
        addAuditLog(currentRole, "Changed Patient Account Status", "Patient Management", `Changed account state of ${pat.name} to ${nextStatus}`);
        return { ...pat, status: nextStatus };
      }
      return pat;
    }));
  };

  const filteredPatients = patients.filter(pat => 
    pat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pat.phone.includes(searchTerm) || 
    pat.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper stats for selected patient
  const patientAppointments = selectedPatient 
    ? appointments.filter(apt => apt.patient.toLowerCase() === selectedPatient.name.toLowerCase())
    : [];

  const patientPayments = selectedPatient
    ? payments.filter(pay => pay.patient.toLowerCase() === selectedPatient.name.toLowerCase())
    : [];

  // Mock consultation record/SOAP note list for clinical view
  const mockClinicalConsultations = [
    {
      date: '2026-08-04 10:30 AM',
      doctor: 'Dr. Arun Kumar',
      department: 'Cardiology',
      soap: {
        s: "Patient reports mild palpitations and shortness of breath during light exercise.",
        o: "BP 138/85, HR 78 bpm. ECG shows normal sinus rhythm with occasional PVCs.",
        a: "Palpitations secondary to anxiety or mild mitral valve prolapse.",
        p: "Order echocardiogram. Advise reducing caffeine. Follow up in 2 weeks."
      }
    },
    {
      date: '2026-06-15 02:15 PM',
      doctor: 'Dr. Sarah Mathews',
      department: 'Dermatology',
      soap: {
        s: "Itchy red rash on the right forearm for 3 days. Used generic moisturizer with no relief.",
        o: "Erythematous plaques with minor scaling localized to forearm. No pustules.",
        a: "Contact dermatitis, likely due to garden weed exposure.",
        p: "Apply Hydrocortisone cream 1% twice daily. Avoid scratching. Keep clean."
      }
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Patient Management</h2>
          <p>Register patients, view medical profiles, and review clinical histories.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add Patient
        </button>
      </div>

      <div className="grid-main-side">
        {/* Left Side: Directory Table */}
        <div className="card">
          <div className="card-header">
            <h3>Patients Directory</h3>
          </div>
          
          <div className="header-search" style={{ width: '100%', marginBottom: '16px' }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, name, or phone number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table className="table-list">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Gender / DOB</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((pat, idx) => (
                  <tr key={idx} style={{ cursor: 'pointer', backgroundColor: selectedPatient?.id === pat.id ? 'var(--bg-input)' : 'transparent' }}>
                    <td onClick={() => { setSelectedPatient(pat); setActiveHistoryTab('appointments'); }}>
                      <strong>{pat.id}</strong>
                    </td>
                    <td onClick={() => { setSelectedPatient(pat); setActiveHistoryTab('appointments'); }}>
                      {pat.name}
                    </td>
                    <td>{pat.phone}</td>
                    <td>{pat.gender} / {pat.dob}</td>
                    <td>
                      <span className={`badge ${pat.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {pat.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn-icon" onClick={() => { setSelectedPatient(pat); setActiveHistoryTab('appointments'); }}>
                          <Eye size={14} />
                        </button>
                        <button 
                          className={`btn ${pat.status === 'Active' ? 'btn-danger' : 'btn-success'}`}
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => togglePatientStatus(pat.id)}
                        >
                          {pat.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Detailed Profile & History View */}
        <div className="card">
          {selectedPatient ? (
            <div>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="user-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                    {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedPatient.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {selectedPatient.id} | DOB: {selectedPatient.dob}</p>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Email</span>
                    <strong>{selectedPatient.email || 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Emergency Contact</span>
                    <strong>{selectedPatient.emergencyContactName} ({selectedPatient.emergencyContactPhone})</strong>
                  </div>
                </div>
              </div>

              {/* History Tabs */}
              <div className="tabs-navigation">
                <button 
                  className={`tab-btn ${activeHistoryTab === 'appointments' ? 'active' : ''}`}
                  onClick={() => setActiveHistoryTab('appointments')}
                >
                  Appointments ({patientAppointments.length})
                </button>
                <button 
                  className={`tab-btn ${activeHistoryTab === 'consultations' ? 'active' : ''}`}
                  onClick={() => setActiveHistoryTab('consultations')}
                >
                  Clinical SOAP Records
                </button>
                <button 
                  className={`tab-btn ${activeHistoryTab === 'payments' ? 'active' : ''}`}
                  onClick={() => setActiveHistoryTab('payments')}
                >
                  Payments ({patientPayments.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div style={{ position: 'relative', minHeight: '200px' }}>
                
                {/* 1. APPOINTMENTS TAB */}
                {activeHistoryTab === 'appointments' && (
                  <div>
                    {patientAppointments.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No appointment bookings found for this patient.</p>
                    ) : (
                      <div className="table-container">
                        <table className="table-list">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Doctor</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {patientAppointments.map((apt, index) => (
                              <tr key={index}>
                                <td>{apt.date} {apt.time}</td>
                                <td>{apt.doctor}</td>
                                <td>
                                  <span className={`badge ${apt.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                                    {apt.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CLINICAL SOAP TAB (WITH ACCESS CONTROL) */}
                {activeHistoryTab === 'consultations' && (
                  <div>
                    {!hasClinicalAccess ? (
                      <div className="lock-overlay">
                        <div className="lock-box">
                          <Lock size={36} />
                          <h3>Access Denied</h3>
                          <p>
                            Clinical Records (including SOAP notes, diagnoses, and scribe sessions) 
                            are restricted for the <strong>{currentRole}</strong> role. Only medical and admin staff have clinical clearance.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {mockClinicalConsultations.map((con, index) => (
                          <div key={index} className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-input)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                              <strong>{con.doctor} ({con.department})</strong>
                              <span style={{ color: 'var(--text-muted)' }}>{con.date}</span>
                            </div>
                            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div><strong style={{ color: 'var(--primary)' }}>S:</strong> {con.soap.s}</div>
                              <div><strong style={{ color: 'var(--primary)' }}>O:</strong> {con.soap.o}</div>
                              <div><strong style={{ color: 'var(--primary)' }}>A:</strong> {con.soap.a}</div>
                              <div><strong style={{ color: 'var(--primary)' }}>P:</strong> {con.soap.p}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. PAYMENTS TAB */}
                {activeHistoryTab === 'payments' && (
                  <div>
                    {patientPayments.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No payment transactions found for this patient.</p>
                    ) : (
                      <div className="table-container">
                        <table className="table-list">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {patientPayments.map((pay, index) => (
                              <tr key={index}>
                                <td>{pay.date}</td>
                                <td style={{ color: 'var(--success)', fontWeight: 'bold' }}>₹{pay.amount}</td>
                                <td>
                                  <span className={`badge ${pay.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                                    {pay.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-muted)', textAlign: 'center' }}>
              <History size={48} style={{ marginBottom: '12px' }} />
              <h3>Select a Patient</h3>
              <p>Click on any patient in the directory to inspect emergency details, clinical timeline, and billing logs.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleAddPatient}>
            <div className="modal-header">
              <h3>Register New Patient</h3>
              <button type="button" className="btn-icon" onClick={() => setShowAddModal(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Patient Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. John Doe"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Contact Phone Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. +91 99887 76655"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="e.g. john@example.com"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    required 
                    value={newPatient.dob}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, dob: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select 
                    className="form-input"
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, gender: e.target.value }))}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-input-row" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '16px' }}>
                <div className="form-group">
                  <label>Emergency Contact Person</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. Sarah Doe (Wife)"
                    value={newPatient.emergencyContactName}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Emergency Contact Phone</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. +91 99887 76600"
                    value={newPatient.emergencyContactPhone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Register Patient</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
