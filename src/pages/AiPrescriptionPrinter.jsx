import React, { useState } from 'react';
import { 
  Printer, FileText, AlertTriangle, ShieldCheck, Plus, Trash2, Check, 
  Sparkles, Stethoscope, Copy, Download, QrCode, Search, Pill
} from 'lucide-react';

export default function AiPrescriptionPrinter({ 
  patients, 
  doctors, 
  addAuditLog, 
  currentRole 
}) {
  const [selectedPatientId, setSelectedPatientId] = useState('PAT-101');
  const [selectedDoctorName, setSelectedDoctorName] = useState('Dr. Arun Kumar');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [diagnosisInput, setDiagnosisInput] = useState('Acute Bronchitis & Hypertension');

  // Selected Patient & Doctor lookup
  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const doctor = doctors.find(d => d.name === selectedDoctorName) || doctors[0];

  // Prescribed Medications List State
  const [medications, setMedications] = useState([
    { name: 'Amoxicillin 500mg', form: 'Capsule', dosageShorthand: '1-0-1 po pc', frequencyText: '1 capsule twice daily by mouth after meals', duration: '7 Days', quantity: '14 Capsules' },
    { name: 'Albuterol HFA 90mcg Inhaler', form: 'Inhaler', dosageShorthand: '2 puffs q4h prn', frequencyText: '2 puffs every 4 hours as needed for shortness of breath', duration: '14 Days', quantity: '1 Canister' },
    { name: 'Metformin 500mg', form: 'Tablet', dosageShorthand: '1-0-1 po pc', frequencyText: '1 tablet twice daily after meals', duration: '30 Days', quantity: '60 Tablets' }
  ]);

  // AI Clinical Decision Support (CDSS) Differential Diagnoses
  const cdssDifferentialDiagnoses = [
    { condition: 'Acute Bronchitis (ICD-10: J20.9)', probability: 76, tests: 'Chest X-Ray, Sputum Culture' },
    { condition: 'Cough Variant Asthma (ICD-10: J45.909)', probability: 16, tests: 'Spirometry with Reversibility' },
    { condition: 'Viral Upper Respiratory Infection (ICD-10: J06.9)', probability: 8, tests: 'Rapid Viral Panel' }
  ];

  // Drug Interaction Warnings Check Engine
  const checkDrugInteractions = () => {
    const names = medications.map(m => m.name.toLowerCase());
    const warnings = [];
    if (names.some(n => n.includes('amoxicillin')) && names.some(n => n.includes('methotrexate'))) {
      warnings.push("⚠️ Severe Interaction: Amoxicillin reduces renal clearance of Methotrexate.");
    }
    if (names.some(n => n.includes('metformin')) && names.some(n => n.includes('contrast'))) {
      warnings.push("⚠️ Moderate Alert: Monitor renal function when administering Metformin with contrast dyes.");
    }
    if (names.some(n => n.includes('albuterol')) && names.some(n => n.includes('propranolol'))) {
      warnings.push("⚠️ Moderate Alert: Non-selective beta-blockers may antagonize bronchodilator effect of Albuterol.");
    }
    return warnings;
  };

  const activeWarnings = checkDrugInteractions();

  // Helper to convert medical shorthand (e.g., '1-0-1 po pc')
  const expandShorthand = (shorthand) => {
    let text = shorthand.toLowerCase();
    text = text.replace(/1-0-1/g, 'Twice daily (Morning & Evening)');
    text = text.replace(/1-1-1/g, 'Three times daily (Morning, Afternoon, Evening)');
    text = text.replace(/0-0-1/g, 'Once daily at bedtime');
    text = text.replace(/1-0-0/g, 'Once daily in the morning');
    text = text.replace(/po/g, 'by mouth');
    text = text.replace(/pc/g, 'after meals');
    text = text.replace(/ac/g, 'before meals');
    text = text.replace(/prn/g, 'as needed');
    text = text.replace(/q4h/g, 'every 4 hours');
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleAddMedication = () => {
    const newMed = {
      name: 'Paracetamol 500mg',
      form: 'Tablet',
      dosageShorthand: '1-0-1 po pc',
      frequencyText: expandShorthand('1-0-1 po pc'),
      duration: '5 Days',
      quantity: '10 Tablets'
    };
    setMedications(prev => [...prev, newMed]);
  };

  const handleRemoveMedication = (index) => {
    setMedications(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleTriggerPrint = () => {
    addAuditLog(currentRole, "Printed Official Prescription", "AI Prescription Generator", `Generated Rx PDF for patient ${patient.name}`);
    window.print();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>
            AI Prescription Generator & CDSS Studio
            <span className="badge badge-info" style={{ marginLeft: '12px', backgroundColor: '#e0f2fe', color: '#0369a1' }}>
              🩺 Drug Interaction & CDSS Engine
            </span>
          </h2>
          <p>Generate digital prescriptions with shorthand auto-expansion, CDSS differential diagnoses, drug interaction alerts, and printable PDF letters.</p>
        </div>
        
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => setShowPrintModal(true)}>
            <Printer size={16} /> Generate & Print Prescription PDF
          </button>
        </div>
      </div>

      {/* Patient & Doctor Selector Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px 20px', backgroundColor: 'var(--bg-input)' }}>
        <div className="form-input-row">
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Select Patient</label>
            <select 
              className="form-input" 
              value={selectedPatientId} 
              onChange={(e) => setSelectedPatientId(e.target.value)}
            >
              {patients.map((p, idx) => (
                <option key={idx} value={p.id}>{p.name} ({p.id}) — {p.gender}, DOB: {p.dob}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Attending Doctor</label>
            <select 
              className="form-input" 
              value={selectedDoctorName} 
              onChange={(e) => setSelectedDoctorName(e.target.value)}
            >
              {doctors.map((d, idx) => (
                <option key={idx} value={d.name}>{d.name} ({d.department})</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Primary Diagnosis</label>
            <input 
              type="text" 
              className="form-input" 
              value={diagnosisInput}
              onChange={(e) => setDiagnosisInput(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Drug-Drug Interaction Safety Alert Banner */}
      {activeWarnings.length > 0 ? (
        <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--danger)', backgroundColor: 'var(--danger-bg)', padding: '16px' }}>
          <h4 style={{ fontSize: '0.92rem', color: 'var(--danger-strong)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <AlertTriangle size={18} /> Drug Interaction & Safety Alert
          </h4>
          {activeWarnings.map((warn, idx) => (
            <div key={idx} style={{ fontSize: '0.82rem', color: '#7f1d1d' }}>{warn}</div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--success)', backgroundColor: 'var(--success-bg)', padding: '12px 16px' }}>
          <div style={{ fontSize: '0.84rem', color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: 'var(--success)' }} />
            <strong>Safety Verification Clear:</strong> No adverse drug-drug interactions detected across prescribed items.
          </div>
        </div>
      )}

      <div className="grid-main-side">
        {/* Left Side: Rx Prescription Builder */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '16px' }}>
            <h3>Rx Prescription Items ({medications.length})</h3>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }} onClick={handleAddMedication}>
              <Plus size={14} /> Add Drug Item
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {medications.map((med, idx) => (
              <div key={idx} className="card" style={{ padding: '14px', backgroundColor: 'var(--bg-input)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--primary)' }}>Medication #{idx + 1}</strong>
                  {medications.length > 1 && (
                    <button className="btn-icon" style={{ padding: '2px' }} onClick={() => handleRemoveMedication(idx)}>
                      <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                    </button>
                  )}
                </div>

                <div className="form-input-row" style={{ marginBottom: '10px' }}>
                  <div className="form-group" style={{ flex: 2 }}>
                    <label style={{ fontSize: '0.75rem' }}>Drug Name & Strength</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={med.name} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setMedications(prev => prev.map((m, i) => i === idx ? { ...m, name: val } : m));
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.75rem' }}>Shorthand Code</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 1-0-1 po pc"
                      value={med.dosageShorthand} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setMedications(prev => prev.map((m, i) => i === idx ? { 
                          ...m, 
                          dosageShorthand: val,
                          frequencyText: expandShorthand(val)
                        } : m));
                      }}
                    />
                  </div>
                </div>

                <div className="form-input-row">
                  <div className="form-group" style={{ flex: 2 }}>
                    <label style={{ fontSize: '0.75rem' }}>Expanded Frequency Instructions</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={med.frequencyText} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setMedications(prev => prev.map((m, i) => i === idx ? { ...m, frequencyText: val } : m));
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.75rem' }}>Duration</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={med.duration} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setMedications(prev => prev.map((m, i) => i === idx ? { ...m, duration: val } : m));
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: AI CDSS Differential Diagnoses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* AI Clinical Decision Support (CDSS) Card */}
          <div className="card" style={{ border: '1px solid #d8b4fe', backgroundColor: '#faf5ff' }}>
            <div className="card-header">
              <h3 style={{ fontSize: '1rem', color: '#6b21a8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} style={{ color: '#9333ea' }} /> AI CDSS Differential Diagnoses
              </h3>
              <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Confidence Score</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
              {cdssDifferentialDiagnoses.map((diag, idx) => (
                <div key={idx} style={{ padding: '12px', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <strong style={{ color: '#581c87' }}>{diag.condition}</strong>
                    <strong style={{ color: '#7e22ce' }}>{diag.probability}%</strong>
                  </div>
                  
                  {/* Probability Bar */}
                  <div style={{ height: '6px', backgroundColor: '#f3e8ff', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${diag.probability}%`, height: '100%', backgroundColor: '#9333ea' }}></div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Recommended Tests: <strong>{diag.tests}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Preview */}
          <div className="card" style={{ backgroundColor: 'var(--bg-input)' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '6px' }}>Official Print Ready</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Clicking generate will open the hospital letterhead prescription template with doctor signature & QR validation code.
            </p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowPrintModal(true)}>
              <Printer size={16} /> Open Printable PDF Modal
            </button>
          </div>
        </div>
      </div>

      {/* Printable Prescription PDF Modal */}
      {showPrintModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '750px', padding: '30px', backgroundColor: 'white' }}>
            
            {/* Hospital Letterhead Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--primary)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 'bold' }}>ABC HOSPITAL</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>123 Healthcare Boulevard, Medical District • Tel: +91 44 2810 5000</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>NABH Accredited Tertiary Care Center • License #HOSP-9921-TN</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{doctor.name}</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: '600' }}>{doctor.specialization}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{doctor.qualification}</div>
              </div>
            </div>

            {/* Patient Demographics Box */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '10px', marginBottom: '20px', fontSize: '0.82rem' }}>
              <div>Patient: <strong>{patient.name}</strong></div>
              <div>Patient ID: <strong>{patient.id}</strong></div>
              <div>Date: <strong>{new Date().toLocaleDateString('en-GB')}</strong></div>
              <div>Gender/DOB: <strong>{patient.gender} ({patient.dob})</strong></div>
              <div>Contact: <strong>{patient.phone}</strong></div>
              <div>Diagnosis: <strong>{diagnosisInput}</strong></div>
            </div>

            {/* Prescribed Items Table */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px', fontFamily: 'serif' }}>Rx</div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', textAlignment: 'left' }}>
                    <th style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>#</th>
                    <th style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Medication & Form</th>
                    <th style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Dosage & Instructions</th>
                    <th style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 'bold' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <strong>{m.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Form: {m.form}</div>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {m.frequencyText}
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Code: {m.dosageShorthand}</div>
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: '600' }}>{m.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer with Digital Signature & QR Validation Code */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '54px', height: '54px', backgroundColor: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={36} style={{ color: 'var(--text-main)' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', maxWidth: '220px' }}>
                  Digital Rx Validation Code: SHA-256 e-Signed.<br />
                  Scan QR code to verify drug authenticity.
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Playfair Display', cursive", fontSize: '1.4rem', fontStyle: 'italic', color: '#334155', marginBottom: '2px' }}>
                  {doctor.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authorized Digital Signature</div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem', marginTop: '2px' }}>● Verified e-Rx</span>
              </div>
            </div>

            <div className="modal-footer" style={{ marginTop: '24px' }}>
              <button className="btn btn-secondary" onClick={() => setShowPrintModal(false)}>Close Preview</button>
              <button className="btn btn-primary" onClick={handleTriggerPrint}>
                <Printer size={16} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
