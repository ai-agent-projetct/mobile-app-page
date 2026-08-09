import React, { useState } from 'react';
import { Plus, Search, UserCheck, UserMinus, Shield, Key, X } from 'lucide-react';

export default function StaffManagement({ 
  staff, 
  setStaff, 
  addAuditLog, 
  currentRole 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    empId: '', name: '', role: 'Receptionist', email: '', phone: '', department: 'Outpatient', status: 'Active'
  });

  const handleOpenAddModal = () => {
    setNewStaff({
      empId: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      role: 'Receptionist',
      email: '',
      phone: '',
      department: 'Outpatient',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    setStaff(prev => [...prev, newStaff]);
    addAuditLog(currentRole, "Created Staff Account", "Staff Management", `Created ${newStaff.role} login account for ${newStaff.name} (ID: ${newStaff.empId})`);
    setShowModal(false);
  };

  const toggleStaffStatus = (empId) => {
    setStaff(prev => prev.map(member => {
      if (member.empId === empId) {
        const nextStatus = member.status === 'Active' ? 'Inactive' : 'Active';
        addAuditLog(currentRole, "Toggled Staff Access Status", "Staff Management", `Toggled access state for ${member.name} to ${nextStatus}`);
        return { ...member, status: nextStatus };
      }
      return member;
    }));
  };

  const handleResetPassword = (name) => {
    alert(`A secure password reset link has been dispatched to ${name}'s official email address.`);
    addAuditLog(currentRole, "Requested Staff Password Reset", "Staff Management", `Dispatched credential reset link to ${name}`);
  };

  const filteredStaff = staff.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Staff & User Directory</h2>
          <p>Provision portal logins, manage security clearance levels, and reset credentials.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add Staff Member
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div className="header-search" style={{ width: '100%' }}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search by Employee ID, Name, Role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Staff List */}
      <div className="card">
        <div className="table-container">
          <table className="table-list">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Email / Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member, idx) => (
                <tr key={idx} style={{ opacity: member.status === 'Inactive' ? 0.65 : 1 }}>
                  <td><strong>{member.empId}</strong></td>
                  <td>{member.name}</td>
                  <td>
                    <span className="badge badge-info" style={{ gap: '4px' }}>
                      <Shield size={12} /> {member.role}
                    </span>
                  </td>
                  <td>{member.department}</td>
                  <td>
                    <div>{member.email}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{member.phone}</div>
                  </td>
                  <td>
                    <span className={`badge ${member.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.78rem' }} onClick={() => handleResetPassword(member.name)}>
                        <Key size={12} style={{ marginRight: '4px' }} /> Reset
                      </button>
                      <button 
                        className={`btn ${member.status === 'Active' ? 'btn-danger' : 'btn-success'}`}
                        style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                        onClick={() => toggleStaffStatus(member.empId)}
                      >
                        {member.status === 'Active' ? <UserMinus size={12} /> : <UserCheck size={12} />}
                        {member.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleSaveStaff}>
            <div className="modal-header">
              <h3>Register New Staff Account</h3>
              <button type="button" className="btn-icon" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Employee Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. John Doe"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Assign Portal Role</label>
                  <select 
                    className="form-input"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, role: e.target.value }))}
                  >
                    <option value="Hospital Admin">Hospital Admin</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Billing Staff">Billing Staff</option>
                    <option value="Department Admin">Department Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. Outpatient"
                    value={newStaff.department}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, department: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required 
                    placeholder="e.g. john@hospital.com"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. +91 99887 76655"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create Login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
