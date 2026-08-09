import React from 'react';
import { Shield, Lock, FileText, CheckCircle, Mail, FileDown, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy({ 
  addAuditLog, 
  currentRole 
}) {
  const handleDownloadPDF = () => {
    addAuditLog(currentRole, "Downloaded Privacy Policy PDF", "Privacy & Policy", "Exported HIPAA compliance document");
    alert("ABC_Hospital_HIPAA_Privacy_Policy.pdf downloaded successfully.");
  };

  return (
    <div className="page-container" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Privacy & Policy</h2>
          <p>HIPAA Business Associate Compliance, AES-256 encryption standards, and PHI access control rules.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '8px' }}>Commitment to Privacy</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>
            At ABC Hospital, we understand that as a healthcare provider, the security of your professional data and your patients' 
            health information is paramount. This policy outlines our rigorous standards for data protection and HIPAA compliance.
          </p>
        </div>

        {/* Data Collection */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '10px' }}>Data Collection</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            We collect information necessary to maintain a secure and efficient clinical environment:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} style={{ color: 'var(--primary)' }} />
              <span>Professional credentials and NPI verification data.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} style={{ color: 'var(--primary)' }} />
              <span>Technical metadata for secure session management and audit trails.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} style={{ color: 'var(--primary)' }} />
              <span>Communication records between you and the hospital support team.</span>
            </div>
          </div>
        </div>

        {/* Patient Confidentiality Callout Box */}
        <div className="card" style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '20px' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Shield size={20} /> Patient Confidentiality
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-medium)', marginBottom: '16px' }}>
            ABC Hospital operates as a <strong>Business Associate under HIPAA regulations</strong>. We implement:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="card" style={{ padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Lock size={16} style={{ color: 'var(--primary)' }} />
                <strong style={{ fontSize: '0.88rem' }}>AES-256 Encryption</strong>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>All patient data is encrypted at rest and in transit.</p>
            </div>

            <div className="card" style={{ padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Shield size={16} style={{ color: 'var(--primary)' }} />
                <strong style={{ fontSize: '0.88rem' }}>Access Controls</strong>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Strict role-based access ensures only authorized personnel view PHI.</p>
            </div>
          </div>
        </div>

        {/* Third-Party Sharing */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '8px' }}>Third-Party Sharing</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            We do not sell your personal or professional data. Data is only shared with third parties under the following conditions:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>
            <li>Service providers performing clinical laboratory or pharmacy integrations.</li>
            <li>Regulatory bodies when required by law or medical auditing standards.</li>
          </ul>
        </div>

        {/* Privacy Inquiries */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '6px' }}>Privacy Inquiries</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            If you have questions regarding our data practices or wish to exercise your rights under GDPR or CCPA, please contact our Data Protection Officer:
          </p>
          <a href="mailto:privacy@hospital.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.88rem', marginTop: '6px' }}>
            <Mail size={14} /> privacy@hospital.com
          </a>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <button className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px' }} onClick={() => alert("Returning to settings menu.")}>
            <ArrowLeft size={16} /> Return to Settings
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '12px' }} onClick={handleDownloadPDF}>
            <FileDown size={16} /> Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
