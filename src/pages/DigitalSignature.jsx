import React, { useState } from 'react';
import { PenTool, CheckCircle, Upload, Fingerprint, Shield, Save } from 'lucide-react';

export default function DigitalSignature({ 
  addAuditLog, 
  currentRole 
}) {
  const [useForPrescriptions, setUseForPrescriptions] = useState(true);
  const [biometricLock, setBiometricLock] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('Oct 12, 2023');

  const handleUploadSignature = () => {
    alert("Signature image uploaded successfully and verified with SHA-256 hash.");
    setLastUpdated(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    addAuditLog(currentRole, "Uploaded Digital Signature", "Digital Signature", "Updated e-prescription signature hash");
  };

  const handleSaveSignature = (e) => {
    e.preventDefault();
    addAuditLog(currentRole, "Saved Digital Signature Settings", "Digital Signature", `Prescriptions: ${useForPrescriptions}, Biometric: ${biometricLock}`);
    alert("Digital Signature settings saved successfully!");
  };

  return (
    <div className="page-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Digital Signature</h2>
          <p>Configure e-signature credentials and biometric verification locks for legal prescriptions.</p>
        </div>
      </div>

      <form onSubmit={handleSaveSignature} className="card" style={{ padding: '24px' }}>
        <div className="card-header" style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Current Active Signature
          </span>
          <span className="badge badge-info" style={{ backgroundColor: '#e0f2fe', color: '#0369a1', gap: '4px' }}>
            <CheckCircle size={12} /> Verified
          </span>
        </div>

        {/* Signature Preview Image Box */}
        <div style={{ 
          border: '2px dashed var(--border-color)', 
          borderRadius: '16px', 
          backgroundColor: '#f8fafc', 
          height: '160px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{ 
            fontFamily: "'Playfair Display', 'Cormorant Garamond', cursive", 
            fontSize: '2.2rem', 
            fontStyle: 'italic', 
            color: '#334155',
            letterSpacing: '1px'
          }}>
            Dr. Julian Thor
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', position: 'absolute', bottom: '12px' }}>
            Last updated {lastUpdated}
          </span>
        </div>

        <button 
          type="button" 
          className="btn btn-secondary" 
          style={{ width: '100%', justifyContent: 'center', marginBottom: '24px', padding: '12px' }}
          onClick={handleUploadSignature}
        >
          <Upload size={16} /> Upload Image Signature
        </button>

        {/* Preferences Toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '20px', marginBottom: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="stat-icon primary" style={{ width: '40px', height: '40px' }}>
                <PenTool size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Use for Prescriptions</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automatically apply to e-scripts</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              style={{ width: '22px', height: '22px', cursor: 'pointer' }}
              checked={useForPrescriptions}
              onChange={(e) => setUseForPrescriptions(e.target.checked)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="stat-icon info" style={{ width: '40px', height: '40px' }}>
                <Fingerprint size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Biometric Lock</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FaceID / TouchID required to sign</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              style={{ width: '22px', height: '22px', cursor: 'pointer' }}
              checked={biometricLock}
              onChange={(e) => setBiometricLock(e.target.checked)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
          <Save size={16} /> Save Signature
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '16px' }}>
          This digital signature is legally binding under the ESIGN Act.
        </p>
      </form>
    </div>
  );
}
