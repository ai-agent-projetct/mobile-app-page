import React, { useState } from 'react';
import { Save, Shield, HelpCircle, Phone, Languages } from 'lucide-react';

export default function HospitalSettings({ 
  addAuditLog, 
  currentRole 
}) {
  // Hospital Details State
  const [details, setDetails] = useState({
    name: 'ABC Hospital',
    address: '123 Healthcare Boulevard, Chennai, Tamil Nadu, 600001',
    phone: '+91 44 2810 5000',
    email: 'info@abchospital.com',
    slotDuration: '30 mins',
    currency: 'INR (₹)',
    gateway: 'Razorpay UPI'
  });

  // IVR / Voice State
  const [ivrDetails, setIvrDetails] = useState({
    languages: ['English', 'Tamil', 'Hindi'],
    gender: 'Female'
  });

  const handleSave = (e) => {
    e.preventDefault();
    addAuditLog(currentRole, "Updated Hospital settings", "Settings", "Saved general metadata, slot duration, and payment gateway config");
    alert("Hospital configuration saved successfully!");
  };

  const handleLangToggle = (lang) => {
    setIvrDetails(prev => {
      const currentLangs = [...prev.languages];
      const index = currentLangs.indexOf(lang);
      if (index > -1) {
        currentLangs.splice(index, 1);
      } else {
        currentLangs.push(lang);
      }
      return { ...prev, languages: currentLangs };
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Hospital Settings</h2>
          <p>Configure hospital metadata, consultation slot timelines, voice genders, and supported languages.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid-2">
        {/* Left Side: General Profile & Payments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <div className="card-header">
              <h3>General Configuration</h3>
            </div>
            
            <div className="form-group">
              <label>Hospital Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={details.name} 
                onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>Physical Address</label>
              <input 
                type="text" 
                className="form-input" 
                value={details.address} 
                onChange={(e) => setDetails(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>

            <div className="form-input-row">
              <div className="form-group">
                <label>Contact Phone</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={details.phone} 
                  onChange={(e) => setDetails(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Primary Email</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={details.email} 
                  onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Consultations & Billing Rules</h3>
            </div>

            <div className="form-input-row">
              <div className="form-group">
                <label>Appointment Slot Duration</label>
                <select 
                  className="form-input"
                  value={details.slotDuration}
                  onChange={(e) => setDetails(prev => ({ ...prev, slotDuration: e.target.value }))}
                >
                  <option value="15 mins">15 minutes</option>
                  <option value="30 mins">30 minutes</option>
                  <option value="45 mins">45 minutes</option>
                  <option value="60 mins">60 minutes</option>
                </select>
              </div>
              <div className="form-group">
                <label>Active Payment Gateway</label>
                <select 
                  className="form-input"
                  value={details.gateway}
                  onChange={(e) => setDetails(prev => ({ ...prev, gateway: e.target.value }))}
                >
                  <option value="Razorpay UPI">Razorpay (UPI + Cards)</option>
                  <option value="Stripe">Stripe API</option>
                  <option value="Twilio Pay">Twilio IVR Pay</option>
                  <option value="Offline Cash Only">Offline Billing Desk Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: IVR and languages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <div className="card-header">
              <h3>IVR & Voice Reception Configuration</h3>
            </div>

            <div className="form-group">
              <label>Speech Greeting Voice Gender</label>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="voiceGender" 
                    checked={ivrDetails.gender === 'Female'}
                    onChange={() => setIvrDetails(prev => ({ ...prev, gender: 'Female' }))}
                  />
                  Female (Soprano)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="voiceGender" 
                    checked={ivrDetails.gender === 'Male'}
                    onChange={() => setIvrDetails(prev => ({ ...prev, gender: 'Male' }))}
                  />
                  Male (Baritone)
                </label>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Supported IVR Languages</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                {['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada'].map((lang, idx) => (
                  <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input 
                      type="checkbox" 
                      checked={ivrDetails.languages.includes(lang)}
                      onChange={() => handleLangToggle(lang)}
                    />
                    {lang}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>
            <Save size={16} /> Save Configurations
          </button>
        </div>
      </form>
    </div>
  );
}
