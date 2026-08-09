import React from 'react';
import { Video, Check, X, ShieldAlert, Monitor, Clock, Play } from 'lucide-react';

export default function OnlineConsultations({ 
  appointments, 
  currentRole 
}) {
  // Filters to find only Online consultations
  const onlineAppts = appointments.filter(apt => apt.type === 'Online');

  // Compute stats
  const total = onlineAppts.length;
  const completed = onlineAppts.filter(a => a.status === 'Completed').length;
  const ongoing = onlineAppts.filter(a => a.status === 'Checked In' || a.status === 'Waiting').length;
  const cancelled = onlineAppts.filter(a => a.status === 'Cancelled').length;
  const noShow = onlineAppts.filter(a => a.status === 'No-Show').length;

  const mockRooms = [
    { id: 'ROOM-441', doctor: 'Dr. Priya Sharma', patient: 'Priya Sharma', startTime: '11:00 AM', status: 'Ongoing', duration: '12m 45s', ping: '15ms (Excellent)' },
    { id: 'ROOM-442', doctor: 'Dr. Sarah Mathews', patient: 'Meena Iyer', startTime: '01:00 PM', status: 'Waiting', duration: '00:00', ping: 'N/A' },
    { id: 'ROOM-443', doctor: 'Dr. Arun Kumar', patient: 'Sanjay R.', startTime: '02:00 PM', status: 'Scheduled', duration: '00:00', ping: 'N/A' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Online Consultations Monitor</h2>
          <p>Monitor tele-consultation channels, call connectivity metrics, and doctor-patient session durations.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-info">
            <p>Total Telehealth</p>
            <div className="stat-value">{total}</div>
          </div>
          <div className="stat-icon primary"><Video size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Active Ongoing</p>
            <div className="stat-value">{ongoing}</div>
          </div>
          <div className="stat-icon warning"><div className="pulse-indicator" style={{ backgroundColor: 'var(--warning)' }}></div></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Completed Sessions</p>
            <div className="stat-value">{completed}</div>
          </div>
          <div className="stat-icon success"><Check size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Cancelled / No-Show</p>
            <div className="stat-value">{cancelled + noShow}</div>
          </div>
          <div className="stat-icon danger"><X size={24} /></div>
        </div>
      </div>

      <div className="grid-main-side">
        {/* Left Side: Room Monitor */}
        <div className="card">
          <div className="card-header">
            <h3>Live Tele-Rooms Monitor</h3>
            <span className="badge badge-info">Admin View</span>
          </div>

          <div className="table-container">
            <table className="table-list">
              <thead>
                <tr>
                  <th>Room ID</th>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Scheduled Time</th>
                  <th>Duration</th>
                  <th>Network Health</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRooms.map((room, idx) => (
                  <tr key={idx}>
                    <td><strong>{room.id}</strong></td>
                    <td>{room.doctor}</td>
                    <td>{room.patient}</td>
                    <td>{room.startTime}</td>
                    <td>{room.duration}</td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: room.ping.includes('Excellent') ? 'var(--success)' : 'var(--text-muted)' }}>
                        {room.ping}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        room.status === 'Ongoing' ? 'badge-success' : 
                        room.status === 'Waiting' ? 'badge-warning' : 'badge-secondary'
                      }`}>
                        {room.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Usage Guidelines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Clinical Interference Protection Panel */}
          <div className="card" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <ShieldAlert size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold' }}>Privacy Assurance Mode</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.45 }}>
                  Admin access is restricted to connectivity ping checks and billing logs. 
                  Direct video stream hook-in is disabled to respect physician-patient clinical privacy policies.
                </p>
              </div>
            </div>
          </div>

          {/* Consultation Metrics */}
          <div className="card">
            <div className="card-header">
              <h3>Avg Session Duration</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock size={32} style={{ color: 'var(--info)' }} />
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>18 min 42s</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average duration per tele-consultation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
