import React, { useState } from 'react';
import { Search, Plus, Eye, Copy, Edit, Trash2, Check, X, FileText, Pill } from 'lucide-react';

export default function PrescriptionTemplates({ 
  addAuditLog, 
  currentRole 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [templates, setTemplates] = useState([
    {
      id: 'TPL-1',
      name: 'Standard Consult',
      isDefault: true,
      category: 'General Practice',
      description: 'General acute care medications',
      lastUsed: 'Today, 10:45 AM',
      medications: [
        { name: 'Amoxicillin 500mg', form: 'Capsule', frequency: 'Twice daily', duration: '7 Days' },
        { name: 'Paracetamol 1000mg', form: 'Tablet', frequency: 'Every 6 hours', duration: 'PRN' }
      ],
      notes: 'Take after meals, complete the full course even if feeling better...',
      setAsDefault: true,
      shareWithClinic: true
    },
    {
      id: 'TPL-2',
      name: 'Chronic Care: Type 2',
      isDefault: false,
      category: 'Endocrinology',
      description: 'Metformin & ACE Inhibitor protocol',
      lastUsed: 'Oct 24, 2023',
      medications: [
        { name: 'Metformin 500mg', form: 'Tablet', frequency: 'Twice daily', duration: '30 Days' },
        { name: 'Ramipril 2.5mg', form: 'Tablet', frequency: 'Once daily', duration: '30 Days' }
      ],
      notes: 'Check blood glucose levels regularly. Maintain low carb diet.',
      setAsDefault: false,
      shareWithClinic: true
    },
    {
      id: 'TPL-3',
      name: 'Pediatric Antibiotics',
      isDefault: false,
      category: 'Pediatrics',
      description: 'Weight-based dosing calculator',
      lastUsed: 'Yesterday',
      medications: [
        { name: 'Azithromycin Oral Susp 200mg/5ml', form: 'Syrup', frequency: 'Once daily', duration: '3 Days' }
      ],
      notes: 'Shake bottle well before use. Store in cool place.',
      setAsDefault: false,
      shareWithClinic: false
    }
  ]);

  const [currentTpl, setCurrentTpl] = useState(null);

  const handleOpenAdd = () => {
    setCurrentTpl({
      id: `TPL-${templates.length + 1}`,
      name: '',
      isDefault: false,
      category: 'General Practice',
      description: '',
      lastUsed: 'Just created',
      medications: [
        { name: 'Amoxicillin 500mg', form: 'Capsule', frequency: 'Twice daily', duration: '7 Days' }
      ],
      notes: '',
      setAsDefault: false,
      shareWithClinic: true
    });
    setShowEditorModal(true);
  };

  const handleOpenEdit = (tpl) => {
    setCurrentTpl({ ...tpl });
    setShowEditorModal(true);
  };

  const handleAddMedication = () => {
    setCurrentTpl(prev => ({
      ...prev,
      medications: [
        ...prev.medications,
        { name: 'Paracetamol 500mg', form: 'Tablet', frequency: 'As needed', duration: '3 Days' }
      ]
    }));
  };

  const handleRemoveMedication = (index) => {
    setCurrentTpl(prev => ({
      ...prev,
      medications: prev.medications.filter((_, idx) => idx !== index)
    }));
  };

  const handleSaveTemplate = (e) => {
    e.preventDefault();
    if (!currentTpl.name) return;

    setTemplates(prev => {
      const exists = prev.some(t => t.id === currentTpl.id);
      let updatedList = exists 
        ? prev.map(t => t.id === currentTpl.id ? currentTpl : t)
        : [...prev, currentTpl];

      if (currentTpl.setAsDefault) {
        updatedList = updatedList.map(t => ({
          ...t,
          isDefault: t.id === currentTpl.id
        }));
      }
      return updatedList;
    });

    addAuditLog(currentRole, "Saved Prescription Template", "Prescription Templates", `Saved template: ${currentTpl.name}`);
    setShowEditorModal(false);
  };

  const handleDeleteTemplate = (id) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplates(prev => prev.filter(t => t.id !== id));
      addAuditLog(currentRole, "Deleted Prescription Template", "Prescription Templates", `Deleted template ID: ${id}`);
      setShowEditorModal(false);
    }
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Prescription Templates</h2>
          <p>Create and manage reusable e-prescription protocols for quick clinical dispensing.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> New Template
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="header-search" style={{ flex: 1 }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search templates or conditions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="badge badge-info">{templates.length} Active Templates</span>
        </div>
      </div>

      {/* Templates List */}
      <div className="grid-3">
        {filteredTemplates.map((tpl, idx) => (
          <div className="card" key={idx}>
            <div className="card-header" style={{ marginBottom: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>
                  {tpl.name}
                  {tpl.isDefault && <span className="badge badge-info" style={{ marginLeft: '8px', fontSize: '0.65rem' }}>DEFAULT</span>}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{tpl.description}</p>
              </div>
              <div className="stat-icon primary" style={{ width: '38px', height: '38px' }}><Pill size={18} /></div>
            </div>

            <div style={{ fontSize: '0.82rem', margin: '16px 0', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
              <strong>Medications ({tpl.medications.length} items):</strong>
              <ul style={{ paddingLeft: '20px', marginTop: '6px', color: 'var(--text-medium)' }}>
                {tpl.medications.map((m, mIdx) => (
                  <li key={mIdx}>{m.name} — {m.frequency} ({m.duration})</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <div>LAST USED<br /><strong style={{ color: 'var(--text-main)' }}>{tpl.lastUsed}</strong></div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn-icon" onClick={() => handleOpenEdit(tpl)}><Eye size={14} /></button>
                <button className="btn-icon" onClick={() => handleOpenEdit(tpl)}><Edit size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Editor Modal */}
      {showEditorModal && currentTpl && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleSaveTemplate} style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3>Prescription Template Editor</h3>
              <button type="button" className="btn-icon" onClick={() => setShowEditorModal(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Template Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. Standard Consult"
                  value={currentTpl.name}
                  onChange={(e) => setCurrentTpl(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-input-row">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    className="form-input"
                    value={currentTpl.category}
                    onChange={(e) => setCurrentTpl(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="General Practice">General Practice</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. General acute care medications"
                    value={currentTpl.description}
                    onChange={(e) => setCurrentTpl(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>

              {/* Medications List Editor */}
              <div className="form-group" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ margin: 0, fontWeight: 'bold' }}>Medications ({currentTpl.medications.length} Items)</label>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }} onClick={handleAddMedication}>
                    + Add Medication
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentTpl.medications.map((med, mIdx) => (
                    <div key={mIdx} className="card" style={{ padding: '12px', backgroundColor: 'var(--bg-input)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <strong style={{ fontSize: '0.88rem' }}>Medication #{mIdx + 1}</strong>
                        {currentTpl.medications.length > 1 && (
                          <button type="button" className="btn-icon" style={{ padding: '2px' }} onClick={() => handleRemoveMedication(mIdx)}>
                            <X size={14} style={{ color: 'var(--danger)' }} />
                          </button>
                        )}
                      </div>
                      
                      <div className="form-group" style={{ marginBottom: '8px' }}>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Drug Name & Strength (e.g. Amoxicillin 500mg)"
                          value={med.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCurrentTpl(prev => ({
                              ...prev,
                              medications: prev.medications.map((m, idx) => idx === mIdx ? { ...m, name: val } : m)
                            }));
                          }}
                        />
                      </div>

                      <div className="form-input-row">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Frequency (e.g. Twice daily)"
                          value={med.frequency}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCurrentTpl(prev => ({
                              ...prev,
                              medications: prev.medications.map((m, idx) => idx === mIdx ? { ...m, frequency: val } : m)
                            }));
                          }}
                        />
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Duration (e.g. 7 Days)"
                          value={med.duration}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCurrentTpl(prev => ({
                              ...prev,
                              medications: prev.medications.map((m, idx) => idx === mIdx ? { ...m, duration: val } : m)
                            }));
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Notes for Patient</label>
                <textarea 
                  className="form-input" 
                  rows="2"
                  placeholder="e.g. Take after meals..."
                  value={currentTpl.notes}
                  onChange={(e) => setCurrentTpl(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input 
                    type="checkbox" 
                    checked={currentTpl.setAsDefault}
                    onChange={(e) => setCurrentTpl(prev => ({ ...prev, setAsDefault: e.target.checked }))}
                  />
                  Set as Default (Apply this template for all new consults)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input 
                    type="checkbox" 
                    checked={currentTpl.shareWithClinic}
                    onChange={(e) => setCurrentTpl(prev => ({ ...prev, shareWithClinic: e.target.checked }))}
                  />
                  Share with Clinic (Allow other doctors to use this template)
                </label>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              {currentTpl.id && (
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteTemplate(currentTpl.id)}>
                  <Trash2 size={14} /> Delete Template
                </button>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditorModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Template</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
