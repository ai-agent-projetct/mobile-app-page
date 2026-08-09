import React, { useState } from 'react';
import { Plus, Users, Calendar, DollarSign, Activity, Edit, Play } from 'lucide-react';

export default function Departments({ 
  departments, 
  setDepartments, 
  doctors, 
  appointments, 
  payments, 
  addAuditLog, 
  currentRole 
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDept, setCurrentDept] = useState({
    id: '', name: '', description: '', head: '', workingHours: '09:00 AM - 05:00 PM', defaultFee: 500, status: 'Active'
  });

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentDept({
      id: `DEP-${departments.length + 1}`,
      name: '',
      description: '',
      head: doctors[0]?.name || '',
      workingHours: '09:00 AM - 05:00 PM',
      defaultFee: 500,
      status: 'Active'
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (dept) => {
    setIsEditing(true);
    setCurrentDept({ ...dept });
    setShowAddModal(true);
  };

  const handleSaveDept = (e) => {
    e.preventDefault();
    if (!currentDept.name) return;

    if (isEditing) {
      setDepartments(prev => prev.map(d => d.name === currentDept.name ? currentDept : d));
      addAuditLog(currentRole, "Updated Department", "Department Management", `Updated department ${currentDept.name}`);
    } else {
      setDepartments(prev => [...prev, currentDept]);
      addAuditLog(currentRole, "Created Department", "Department Management", `Created new department ${currentDept.name}`);
    }
    setShowAddModal(false);
  };

  const toggleDeptStatus = (name) => {
    setDepartments(prev => prev.map(d => {
      if (d.name === name) {
        const nextStatus = d.status === 'Active' ? 'Inactive' : 'Active';
        addAuditLog(currentRole, "Toggled Department Status", "Department Management", `Toggled department ${d.name} to ${nextStatus}`);
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  // Helper selectors to compute stats dynamically
  const getDeptStats = (deptName) => {
    const deptDoctors = doctors.filter(doc => doc.department === deptName);
    const docNames = deptDoctors.map(doc => doc.name);
    
    const deptAppointments = appointments.filter(apt => apt.department === deptName);
    const deptRevenue = payments
      .filter(pay => docNames.includes(pay.doctor) && pay.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      doctorsCount: deptDoctors.length,
      doctorsList: deptDoctors.map(d => d.name).join(', '),
      appointmentsCount: deptAppointments.length,
      revenue: deptRevenue,
      patientCount: [...new Set(deptAppointments.map(a => a.patient))].length
    };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Departments</h2>
          <p>Create and supervise medical departments, assign department heads, and monitor metrics.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Create Department
        </button>
      </div>

      <div className="grid-2">
        {departments.map((dept, idx) => {
          const stats = getDeptStats(dept.name);
          return (
            <div className="card" key={idx} style={{ opacity: dept.status === 'Inactive' ? 0.7 : 1 }}>
              <div className="card-header">
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>{dept.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>{dept.description}</p>
                </div>
                <span className={`badge ${dept.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                  {dept.status}
                </span>
              </div>

              {/* Department Head and Work Hours */}
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-input)', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Head of Dept:</span> <strong>{dept.head || 'Not Assigned'}</strong></div>
                <div style={{ marginTop: '4px' }}><span style={{ color: 'var(--text-muted)' }}>Hours:</span> <strong>{dept.workingHours}</strong></div>
                <div style={{ marginTop: '4px' }}><span style={{ color: 'var(--text-muted)' }}>Default Fee:</span> <strong>₹{dept.defaultFee}</strong></div>
              </div>

              {/* Dynamic Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.82rem', textAlign: 'center' }}>
                <div style={{ borderRight: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><Users size={12} /> Doctors</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{stats.doctorsCount}</strong>
                </div>
                <div style={{ borderRight: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><Calendar size={12} /> Appts</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--warning)' }}>{stats.appointmentsCount}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><DollarSign size={12} /> Revenue</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--success)' }}>₹{stats.revenue.toLocaleString()}</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <strong>Assigned:</strong> {stats.doctorsList || 'No doctors assigned'}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '6px' }} onClick={() => handleOpenEditModal(dept)}>
                  <Edit size={14} /> Manage Dept
                </button>
                <button 
                  className={`btn ${dept.status === 'Active' ? 'btn-danger' : 'btn-success'}`}
                  style={{ padding: '6px 12px' }}
                  onClick={() => toggleDeptStatus(dept.name)}
                >
                  {dept.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Department Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleSaveDept}>
            <div className="modal-header">
              <h3>{isEditing ? 'Edit Department Settings' : 'Create Medical Department'}</h3>
              <button type="button" className="btn-icon" onClick={() => setShowAddModal(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Department Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. Cardiology"
                  disabled={isEditing}
                  value={currentDept.name}
                  onChange={(e) => setCurrentDept(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-input" 
                  rows="3"
                  placeholder="Provide department description..."
                  value={currentDept.description}
                  onChange={(e) => setCurrentDept(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Department Head</label>
                  <select 
                    className="form-input"
                    value={currentDept.head}
                    onChange={(e) => setCurrentDept(prev => ({ ...prev, head: e.target.value }))}
                  >
                    <option value="">Select HOD</option>
                    {doctors.map((doc, idx) => (
                      <option key={idx} value={doc.name}>{doc.name} ({doc.specialization})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Default Fee (₹)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    required 
                    value={currentDept.defaultFee}
                    onChange={(e) => setCurrentDept(prev => ({ ...prev, defaultFee: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Working Hours</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. 09:00 AM - 05:00 PM"
                  value={currentDept.workingHours}
                  onChange={(e) => setCurrentDept(prev => ({ ...prev, workingHours: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Settings</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
