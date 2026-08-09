import React, { useState } from 'react';
import { Search, Play, Pause, Lock, Volume2, ShieldAlert, Calendar, Filter } from 'lucide-react';

export default function IVRCalls({ 
  addAuditLog, 
  currentRole 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [playingId, setPlayingId] = useState(null);

  // Access policy: Only Super Admin & Hospital Admin can play calls. Billing & Receptionist cannot.
  const hasRecordingAccess = currentRole === 'Super Admin' || currentRole === 'Hospital Admin';

  const mockCalls = [
    { id: 'CALL-9021', phone: '+91 98456 73221', direction: 'Incoming', time: 'Today, 10:15 AM', duration: '03:12', status: 'Answered', language: 'English', bookings: 'Yes (Dr. Arun Kumar)', recording: 'rec_9021.mp3' },
    { id: 'CALL-9022', phone: '+91 99456 88734', direction: 'Incoming', time: 'Today, 09:45 AM', duration: '01:45', status: 'Answered', language: 'English', bookings: 'No', recording: 'rec_9022.mp3' },
    { id: 'CALL-9023', phone: '+91 90876 54321', direction: 'Incoming', time: 'Today, 09:12 AM', duration: '03:02', status: 'Answered', language: 'Tamil', bookings: 'Yes (Dr. Rajesh Kumar)', recording: 'rec_9023.mp3' },
    { id: 'CALL-9024', phone: '+91 93456 22111', direction: 'Incoming', time: 'Yesterday, 04:30 PM', duration: '02:10', status: 'Answered', language: 'Hindi', bookings: 'No', recording: 'rec_9024.mp3' },
    { id: 'CALL-9025', phone: '+91 97012 33445', direction: 'Incoming', time: 'Yesterday, 03:15 PM', duration: '00:45', status: 'Missed', language: 'Telugu', bookings: 'No', recording: 'N/A' },
    { id: 'CALL-9026', phone: '+91 91234 56789', direction: 'Outgoing', time: 'Yesterday, 11:00 AM', duration: '01:25', status: 'Answered', language: 'Kannada', bookings: 'No', recording: 'rec_9026.mp3' },
    { id: 'CALL-9027', phone: '+91 98765 43210', direction: 'Incoming', time: 'Yesterday, 09:00 AM', duration: '00:00', status: 'Failed', language: 'Unknown', bookings: 'No', recording: 'N/A' }
  ];

  const handlePlayRecording = (callId) => {
    if (!hasRecordingAccess) {
      alert(`Access Denied: Your current role (${currentRole}) does not have permission to listen to patient call recordings due to HIPAA privacy settings.`);
      return;
    }
    if (playingId === callId) {
      setPlayingId(null);
    } else {
      setPlayingId(callId);
      addAuditLog(currentRole, "Played Call Recording", "IVR & Calls", `Listened to recording of Call ID: ${callId}`);
    }
  };

  const filteredCalls = mockCalls.filter(call => 
    call.phone.includes(searchTerm) || 
    call.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>IVR & Call Center</h2>
          <p>Track automated phone reception logs, language preferences, and listen to voice records.</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-info">
            <p>Total Calls</p>
            <div className="stat-value">1,482</div>
            <div className="stat-trend up">↑ 4% this month</div>
          </div>
          <div className="stat-icon primary"><Volume2 size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Answered</p>
            <div className="stat-value">1,390</div>
            <div className="stat-trend up">93.7% success rate</div>
          </div>
          <div className="stat-icon success"><Check size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Missed / Failed</p>
            <div className="stat-value">92</div>
            <div className="stat-trend down">↓ 1.2% reduction</div>
          </div>
          <div className="stat-icon danger"><X size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>IVR Bookings</p>
            <div className="stat-value">482</div>
            <div className="stat-trend up">34.6% conversion</div>
          </div>
          <div className="stat-icon info"><Calendar size={24} /></div>
        </div>
      </div>

      <div className="grid-main-side">
        {/* Left Side: Call Logs Table */}
        <div className="card">
          <div className="card-header">
            <h3>Call Logs</h3>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div className="header-search" style={{ flex: 1 }}>
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search by phone, call ID, language..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <table className="table-list">
              <thead>
                <tr>
                  <th>Call ID</th>
                  <th>Patient Phone</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Lang</th>
                  <th>Booked</th>
                  <th>Status</th>
                  <th>Recording</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map((call, idx) => (
                  <tr key={idx}>
                    <td><strong>{call.id}</strong></td>
                    <td>{call.phone}</td>
                    <td>{call.time}</td>
                    <td>{call.duration}</td>
                    <td>{call.language}</td>
                    <td>
                      <span className={`badge ${call.bookings !== 'No' ? 'badge-success' : 'badge-secondary'}`}>
                        {call.bookings}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        call.status === 'Answered' ? 'badge-success' : 
                        call.status === 'Missed' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td>
                      {call.recording !== 'N/A' ? (
                        <button 
                          className={`btn ${playingId === call.id ? 'btn-danger' : 'btn-secondary'}`}
                          style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                          onClick={() => handlePlayRecording(call.id)}
                        >
                          {playingId === call.id ? <Pause size={12} /> : <Play size={12} />}
                          {playingId === call.id ? 'Stop' : 'Listen'}
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Unavailable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Language Breakdown & Call Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Languages Breakdown */}
          <div className="card">
            <div className="card-header">
              <h3>Language Distribution</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>English</span>
                  <strong>54%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '54%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>Tamil</span>
                  <strong>24%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '24%', height: '100%', backgroundColor: 'var(--info)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>Hindi</span>
                  <strong>12%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '12%', height: '100%', backgroundColor: 'var(--warning)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>Telugu</span>
                  <strong>6%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '6%', height: '100%', backgroundColor: 'var(--success)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>Kannada</span>
                  <strong>4%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '4%', height: '100%', backgroundColor: 'var(--danger)' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Lock Banner */}
          <div className="card" style={{ border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <ShieldAlert size={20} style={{ color: 'var(--warning)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold' }}>Recording Security Policy</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  All call audio recordings containing clinical details are protected under Patient Confidentiality laws. 
                  Access is logged and permitted to Authorized Admins only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
