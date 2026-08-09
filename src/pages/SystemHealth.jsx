import React, { useState } from 'react';
import { Activity, ShieldAlert, HeartPulse, RefreshCw } from 'lucide-react';

export default function SystemHealth({ 
  addAuditLog, 
  currentRole 
}) {
  const [services, setServices] = useState([
    { name: 'Backend API', status: 'Healthy', latency: '24ms', uptime: '99.98%' },
    { name: 'Database (PostgreSQL)', status: 'Healthy', latency: '12ms', uptime: '99.99%' },
    { name: 'Doctor App API', status: 'Healthy', latency: '35ms', uptime: '99.95%' },
    { name: 'Patient App API', status: 'Healthy', latency: '40ms', uptime: '99.92%' },
    { name: 'IVR Integration (Twilio)', status: 'Healthy', latency: '110ms', uptime: '99.90%' },
    { name: 'Video Service (WebRTC)', status: 'Healthy', latency: '85ms', uptime: '99.85%' },
    { name: 'AI Scribe Parser', status: 'Healthy', latency: '320ms', uptime: '99.78%' },
    { name: 'Payment Gateway API', status: 'Healthy', latency: '150ms', uptime: '99.97%' },
    { name: 'Notification Delivery Dispatcher', status: 'Healthy', latency: '45ms', uptime: '99.99%' }
  ]);

  const [healthLogs, setHealthLogs] = useState([
    { time: '12:30:15', event: 'Database connection pool verified.', status: 'info' },
    { time: '12:00:00', event: 'Routine database index vacuum completed.', status: 'info' },
    { time: '10:45:12', event: 'Twilio webhook callback completed with 200 OK.', status: 'success' },
    { time: '08:15:30', event: 'AI Scribe endpoint scaling completed. Peak capacity: 50 concurrent requests.', status: 'info' }
  ]);

  const toggleHealth = (name) => {
    setServices(prev => prev.map(s => {
      if (s.name === name) {
        let nextStatus = 'Healthy';
        let nextLatency = '24ms';
        if (s.status === 'Healthy') {
          nextStatus = 'Outage';
          nextLatency = 'Timeout';
          // Log to services log
          setHealthLogs(lh => [
            { time: new Date().toTimeString().split(' ')[0], event: `ALERT: Outage detected on service: ${name}. Connection timeout.`, status: 'error' },
            ...lh
          ]);
          addAuditLog("System Health Check", "Service Outage Warning Triggered", "System Health", `Service ${name} toggled to OUTAGE by user`);
        } else {
          // Log repair
          setHealthLogs(lh => [
            { time: new Date().toTimeString().split(' ')[0], event: `RESOLVED: Service ${name} restored back online.`, status: 'success' },
            ...lh
          ]);
          addAuditLog("System Health Check", "Service Outage Resolved", "System Health", `Service ${name} restored to Healthy`);
        }
        return { ...s, status: nextStatus, latency: nextLatency };
      }
      return s;
    }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Technical System Health</h2>
          <p>Supervise backend microservices, DB response latencies, and simulate cloud outages.</p>
        </div>
        <span className="badge badge-success" style={{ gap: '6px' }}>
          <HeartPulse size={16} /> All Channels Active
        </span>
      </div>

      <div className="grid-main-side">
        {/* Left Side: Services Status Matrix */}
        <div className="card">
          <div className="card-header">
            <h3>Microservices Nodes</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click toggle switch to trigger simulated outage test</span>
          </div>

          <div className="table-container">
            <table className="table-list">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Uptime Target</th>
                  <th>Simulate Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc, idx) => (
                  <tr key={idx}>
                    <td><strong>{svc.name}</strong></td>
                    <td>
                      <span className={`badge ${svc.status === 'Healthy' ? 'badge-success' : 'badge-danger'}`}>
                        <div className={svc.status === 'Healthy' ? 'live-indicator' : 'pulse-indicator'}></div> {svc.status}
                      </span>
                    </td>
                    <td>{svc.latency}</td>
                    <td>{svc.uptime}</td>
                    <td>
                      <button 
                        className={`btn ${svc.status === 'Healthy' ? 'btn-danger' : 'btn-success'}`}
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={() => toggleHealth(svc.name)}
                      >
                        {svc.status === 'Healthy' ? 'Fail Service' : 'Repair Service'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Log Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              <h3>System Console Logs</h3>
            </div>
            
            <div className="health-log-list">
              {healthLogs.map((log, idx) => (
                <div key={idx} className="health-log-item">
                  <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>
                  <span className={
                    log.status === 'error' ? 'health-log-error' : 
                    log.status === 'success' ? 'health-log-success' : ''
                  } style={{ marginLeft: '8px', flex: 1 }}>
                    {log.event}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <ShieldAlert size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold' }}>DevOps Warning</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  Toggling any service to Outage will prompt alerts on active doctor and receptionist panels in production. Use fail-safes prudently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
