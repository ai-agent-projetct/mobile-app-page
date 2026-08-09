import React, { useState } from 'react';
import { Eye, Search, Sparkles, Users, Award, DollarSign, Star, Info, Check } from 'lucide-react';

export default function ProfileVisibility({ 
  addAuditLog, 
  currentRole 
}) {
  const [publicProfile, setPublicProfile] = useState(true);
  const [showInSearch, setShowInSearch] = useState(true);
  const [recommendations, setRecommendations] = useState(true);
  const [newPatients, setNewPatients] = useState(true);

  const [experienceYears, setExperienceYears] = useState(true);
  const [consultationFees, setConsultationFees] = useState(false); // Off as per screenshot 6
  const [patientReviews, setPatientReviews] = useState(true);

  const handleSaveVisibility = (e) => {
    e.preventDefault();
    addAuditLog(currentRole, "Updated Profile Visibility", "Profile Visibility", `Public profile: ${publicProfile ? 'Live' : 'Hidden'}`);
    alert("Visibility settings updated successfully!");
  };

  return (
    <div className="page-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Profile Visibility</h2>
          <p>Control doctor discovery settings, public listings, and patient privacy preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSaveVisibility} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Main Public Profile Banner Card */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', backgroundColor: 'var(--bg-input)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Public Profile <span className="badge badge-success" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>● LIVE</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Allow patients to discover your profile and book appointments in search results.
              </p>
            </div>
            <input 
              type="checkbox" 
              style={{ width: '24px', height: '24px', cursor: 'pointer' }}
              checked={publicProfile}
              onChange={(e) => setPublicProfile(e.target.checked)}
            />
          </div>
        </div>

        {/* Discovery Settings Section */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Discovery Settings
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="stat-icon primary" style={{ width: '38px', height: '38px' }}><Search size={16} /></div>
                <div>
                  <strong style={{ fontSize: '0.92rem' }}>Show in Search</strong>
                </div>
              </div>
              <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} checked={showInSearch} onChange={(e) => setShowInSearch(e.target.checked)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="stat-icon info" style={{ width: '38px', height: '38px' }}><Sparkles size={16} /></div>
                <div>
                  <strong style={{ fontSize: '0.92rem' }}>Recommendations</strong>
                </div>
              </div>
              <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} checked={recommendations} onChange={(e) => setRecommendations(e.target.checked)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="stat-icon success" style={{ width: '38px', height: '38px' }}><Users size={16} /></div>
                <div>
                  <strong style={{ fontSize: '0.92rem' }}>New Patients</strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Allow first-time bookings</p>
                </div>
              </div>
              <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} checked={newPatients} onChange={(e) => setNewPatients(e.target.checked)} />
            </div>
          </div>
        </div>

        {/* Profile Details Privacy Section */}
        <div className="card">
          <div className="card-header" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Profile Details Privacy
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="stat-icon primary" style={{ width: '38px', height: '38px' }}><Award size={16} /></div>
                <div>
                  <strong style={{ fontSize: '0.92rem' }}>Experience Years</strong>
                </div>
              </div>
              <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} checked={experienceYears} onChange={(e) => setExperienceYears(e.target.checked)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="stat-icon warning" style={{ width: '38px', height: '38px' }}><DollarSign size={16} /></div>
                <div>
                  <strong style={{ fontSize: '0.92rem' }}>Consultation Fees</strong>
                </div>
              </div>
              <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} checked={consultationFees} onChange={(e) => setConsultationFees(e.target.checked)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="stat-icon success" style={{ width: '38px', height: '38px' }}><Star size={16} /></div>
                <div>
                  <strong style={{ fontSize: '0.92rem' }}>Patient Reviews</strong>
                </div>
              </div>
              <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} checked={patientReviews} onChange={(e) => setPatientReviews(e.target.checked)} />
            </div>
          </div>
        </div>

        {/* Info Meter Banner */}
        <div className="card" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Info size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <p style={{ fontSize: '0.82rem', color: 'var(--text-medium)', lineHeight: 1.45 }}>
              Your profile is <strong>85% complete</strong>. Showing your consultation fees can increase booking conversion by up to 30%.
            </p>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
          <Check size={16} /> Save Visibility Changes
        </button>
      </form>
    </div>
  );
}
