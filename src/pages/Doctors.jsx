import React, { useState } from 'react';
import { Search, Plus, Edit, UserCheck, UserMinus, Star } from 'lucide-react';

export default function Doctors({ 
  doctors, 
  setDoctors, 
  departments, 
  addAuditLog, 
  currentRole 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState({
    id: '', name: '', department: '', specialization: '', 
    qualification: '', experience: '', fee: 500, 
    availableDays: [], availableTime: '', onlineConsultation: true, status: 'Active'
  });

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentDoctor({
      id: `DOC-00${doctors.length + 1}`,
      name: '',
      department: departments[0]?.name || '',
      specialization: '',
      qualification: '',
      experience: '',
      fee: 500,
      availableDays: ['Mon', 'Wed', 'Fri'],
      availableTime: '09:00 AM - 01:00 PM',
      onlineConsultation: true,
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (doctor) => {
    setIsEditing(true);
    setCurrentDoctor({ ...doctor });
    setShowModal(true);
  };

  const handleSaveDoctor = (e) => {
    e.preventDefault();
    if (!currentDoctor.name) return;

    if (isEditing) {
      setDoctors(prev => prev.map(doc => doc.id === currentDoctor.id ? currentDoctor : doc));
      addAuditLog(currentRole, "Updated Doctor", "Doctor Management", `Updated profile of Dr. ${currentDoctor.name}`);
    } else {
      setDoctors(prev => [...prev, currentDoctor]);
      addAuditLog(currentRole, "Added Doctor", "Doctor Management", `Added new doctor Dr. ${currentDoctor.name} to ${currentDoctor.department}`);
    }
    setShowModal(false);
  };

  const toggleDoctorStatus = (id) => {
    setDoctors(prev => prev.map(doc => {
      if (doc.id === id) {
        const nextStatus = doc.status === 'Active' ? 'Inactive' : 'Active';
        addAuditLog(currentRole, "Changed Doctor Status", "Doctor Management", `Toggled status of Dr. ${doc.name} to ${nextStatus}`);
        return { ...doc, status: nextStatus };
      }
      return doc;
    }));
  };

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Doctors Directory</h2>
          <p>Manage hospital doctors, qualifications, consultation rules, and availability hours.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div className="header-search" style={{ flex: 1, minWidth: '250px' }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search by name, specialty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Department:</span>
            <select 
              className="role-dropdown" 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid-3">
        {filteredDoctors.map((doc, idx) => (
          <div className="card" key={idx} style={{ opacity: doc.status === 'Inactive' ? 0.7 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="user-avatar" style={{ width: '56px', height: '56px', fontSize: '1.4rem' }}>
                {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
              </div>
              <span className={`badge ${doc.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                {doc.status}
              </span>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>{doc.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{doc.specialization} — {doc.department}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{doc.qualification}</p>
            </div>

            <div style={{ margin: '16px 0', borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Experience:</span>
                <div style={{ fontWeight: '600' }}>{doc.experience}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Consultation Fee:</span>
                <div style={{ fontWeight: '600', color: 'var(--success)' }}>₹{doc.fee}</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--text-muted)' }}>Availability:</span>
                <div style={{ fontWeight: '600', fontSize: '0.78rem' }}>{doc.availableDays.join(', ')} ({doc.availableTime})</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '6px' }} onClick={() => handleOpenEditModal(doc)}>
                <Edit size={14} /> Edit Profile
              </button>
              <button 
                className={`btn ${doc.status === 'Active' ? 'btn-danger' : 'btn-success'}`}
                style={{ flex: 1, padding: '6px' }} 
                onClick={() => toggleDoctorStatus(doc.id)}
              >
                {doc.status === 'Active' ? <UserMinus size={14} /> : <UserCheck size={14} />} 
                {doc.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Doctor Modal */}
      {showModal && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleSaveDoctor}>
            <div className="modal-header">
              <h3>{isEditing ? 'Edit Doctor Profile' : 'Add New Doctor'}</h3>
              <button type="button" className="btn-icon" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Doctor Name (with prefix)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. Dr. Arun Kumar"
                  value={currentDoctor.name}
                  onChange={(e) => setCurrentDoctor(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Department</label>
                  <select 
                    className="form-input"
                    value={currentDoctor.department}
                    onChange={(e) => setCurrentDoctor(prev => ({ ...prev, department: e.target.value }))}
                  >
                    {departments.map((dept, idx) => (
                      <option key={idx} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Specialization</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. Cardiologist"
                    value={currentDoctor.specialization}
                    onChange={(e) => setCurrentDoctor(prev => ({ ...prev, specialization: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Qualifications</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. MD DM (Cardio)"
                    value={currentDoctor.qualification}
                    onChange={(e) => setCurrentDoctor(prev => ({ ...prev, qualification: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. 15 Years"
                    value={currentDoctor.experience}
                    onChange={(e) => setCurrentDoctor(prev => ({ ...prev, experience: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Consultation Fee (₹)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    required 
                    value={currentDoctor.fee}
                    onChange={(e) => setCurrentDoctor(prev => ({ ...prev, fee: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="form-group">
                  <label>Available Hours</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. 09:00 AM - 01:00 PM"
                    value={currentDoctor.availableTime}
                    onChange={(e) => setCurrentDoctor(prev => ({ ...prev, availableTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Online Consultation Support</label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="onlineConsultation" 
                      checked={currentDoctor.onlineConsultation === true}
                      onChange={() => setCurrentDoctor(prev => ({ ...prev, onlineConsultation: true }))}
                    />
                    Enable
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="onlineConsultation" 
                      checked={currentDoctor.onlineConsultation === false}
                      onChange={() => setCurrentDoctor(prev => ({ ...prev, onlineConsultation: false }))}
                    />
                    Disable
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Profile</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
