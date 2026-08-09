import React, { useState } from 'react';
import { Bell, Send, Check, Settings, Save } from 'lucide-react';

export default function Notifications({ 
  addAuditLog, 
  currentRole 
}) {
  const [activeChannelTab, setActiveChannelTab] = useState('WhatsApp');
  
  // Notification templates state
  const [templates, setTemplates] = useState({
    reminder: "Your appointment with Dr. {{doctor}} is scheduled for {{date}} at {{time}}. Location: ABC Hospital.",
    payment: "Dear {{patient}}, payment of {{amount}} is received successfully for booking {{bookingId}}.",
    cancel: "Hello {{patient}}, your appointment booking {{bookingId}} with Dr. {{doctor}} has been cancelled."
  });

  const [reminderTemplate, setReminderTemplate] = useState(templates.reminder);
  const [paymentTemplate, setPaymentTemplate] = useState(templates.payment);
  const [cancelTemplate, setCancelTemplate] = useState(templates.cancel);

  const mockSentLogs = [
    { type: 'WhatsApp', recipient: '+91 98456 73221', content: "Your appointment with Dr. Arun Kumar is scheduled for 25 July 2025 at 5:00 PM.", time: 'Today, 10:17 AM', status: 'Delivered' },
    { type: 'SMS', recipient: '+91 99456 88734', content: "Dear Priya Sharma, payment of ₹600 is received successfully for booking APT-25872.", time: 'Today, 09:47 AM', status: 'Delivered' },
    { type: 'Email', recipient: 'karthik@example.com', content: "Your appointment with Dr. Rajesh Kumar is scheduled for 25 July 2025 at 12:00 PM.", time: 'Today, 09:15 AM', status: 'Sent' },
    { type: 'WhatsApp', recipient: '+91 93456 22111', content: "Hello Meena Iyer, your appointment booking APT-25874 with Dr. Sarah Mathews has been cancelled.", time: 'Yesterday, 04:31 PM', status: 'Delivered' }
  ];

  const handleSaveTemplates = (e) => {
    e.preventDefault();
    setTemplates({
      reminder: reminderTemplate,
      payment: paymentTemplate,
      cancel: cancelTemplate
    });
    addAuditLog(currentRole, "Updated Notification Templates", "Notifications", "Modified SMS/WhatsApp templates in settings");
    alert("Notification templates saved successfully!");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Notifications & Templates</h2>
          <p>Configure automated dispatch channels and edit reminder template variables.</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Templates Form */}
        <div className="card">
          <div className="card-header">
            <h3>Notification Templates</h3>
          </div>

          <form onSubmit={handleSaveTemplates} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>Appointment Booking Reminder (WhatsApp / SMS / Email)</label>
              <textarea 
                className="form-input" 
                rows="3" 
                value={reminderTemplate}
                onChange={(e) => setReminderTemplate(e.target.value)}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supported tokens: `{"{{doctor}}"}` `{"{{date}}"}` `{"{{time}}"}`</span>
            </div>

            <div className="form-group">
              <label>Payment Receipt Confirmation</label>
              <textarea 
                className="form-input" 
                rows="3" 
                value={paymentTemplate}
                onChange={(e) => setPaymentTemplate(e.target.value)}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supported tokens: `{"{{patient}}"}` `{"{{amount}}"}` `{"{{bookingId}}"}`</span>
            </div>

            <div className="form-group">
              <label>Cancellation Notification</label>
              <textarea 
                className="form-input" 
                rows="3" 
                value={cancelTemplate}
                onChange={(e) => setCancelTemplate(e.target.value)}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supported tokens: `{"{{patient}}"}` `{"{{doctor}}"}` `{"{{bookingId}}"}`</span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              <Save size={16} /> Save Templates
            </button>
          </form>
        </div>

        {/* Dispatch logs list */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <h3>Sent Logs</h3>
            <div className="tabs-navigation" style={{ border: 'none', margin: 0 }}>
              {['All', 'WhatsApp', 'SMS', 'Email'].map((ch, idx) => (
                <button 
                  key={idx} 
                  className={`tab-btn ${activeChannelTab === ch ? 'active' : ''}`}
                  onClick={() => setActiveChannelTab(ch)}
                  style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '420px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockSentLogs
              .filter(log => activeChannelTab === 'All' || log.type === activeChannelTab)
              .map((log, idx) => (
                <div key={idx} style={{ padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-info" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>{log.type}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{log.time}</span>
                  </div>
                  <div style={{ fontWeight: '600' }}>To: {log.recipient}</div>
                  <p style={{ marginTop: '4px', color: 'var(--text-medium)', fontStyle: 'italic' }}>"{log.content}"</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                    <span className="badge badge-success" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>
                      <Check size={10} /> {log.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
