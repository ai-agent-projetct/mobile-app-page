import React, { useState } from 'react';
import { 
  Phone, Calendar, Users, PhoneMissed, Play, Pause, 
  Volume2, Check, X, ShieldAlert, ChevronRight, MessageSquare,
  Video, Sparkles, CreditCard, DollarSign, AlertTriangle, Activity
} from 'lucide-react';

export default function Dashboard({ 
  doctors, 
  patients, 
  appointments, 
  addAppointment, 
  addAuditLog, 
  currentRole 
}) {
  const [activeCall, setActiveCall] = useState(null);
  const [callStep, setCallStep] = useState(0);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState("Ravi Kumar");
  const [showAlertsDrawer, setShowAlertsDrawer] = useState(true);

  // IVR Dialogue steps simulation
  const ivrDialogue = [
    { speaker: 'ai', text: "Welcome to ABC Hospital. I am your AI receptionist. In which language would you like to proceed? (English, Hindi, Tamil, Telugu, Kannada)" },
    { speaker: 'patient', text: "English please. I have severe chest pain and breathlessness since morning." },
    { speaker: 'ai', text: "I understand you are experiencing chest pain and breathlessness. This sounds like a potential cardiac issue. I highly recommend consulting a Cardiology specialist immediately. Checking available cardiologists..." },
    { speaker: 'ai', text: "We have Dr. Arun Kumar and Dr. Priya Sharma available in Cardiology today and tomorrow. I have sent the doctor selection buttons to your WhatsApp. Please choose your preferred doctor there." },
    { speaker: 'whatsapp-1', text: "Choose Doctor:\n1. Dr. Arun Kumar (Cardiology Specialist)\n2. Dr. Priya Sharma (Cardiology Specialist)" },
    { speaker: 'patient-wa', text: "Dr. Arun Kumar" },
    { speaker: 'ai', text: "Great, you've selected Dr. Arun Kumar. Let me check his available slots for today and tomorrow. Sending slots to your WhatsApp..." },
    { speaker: 'whatsapp-2', text: "Available slots for Dr. Arun Kumar:\n- Today 04:00 PM\n- Today 05:00 PM\n- Tomorrow 10:00 AM\n- Tomorrow 11:00 AM" },
    { speaker: 'patient-wa-2', text: "Today 05:00 PM" },
    { speaker: 'ai', text: "Thank you. Your appointment with Dr. Arun Kumar is confirmed for Today at 5:00 PM at ABC Hospital, 3rd Floor, Cardiology Wing. A confirmation ticket with direction details and booking ID APT-25876 has been sent to your WhatsApp." }
  ];

  const handleSimulateCall = () => {
    setActiveCall({
      phone: "+91 98456 73221",
      name: "Ravi Kumar",
      symptoms: "Chest Pain, Breathlessness",
      dept: "Cardiology",
      status: "Selecting Slot"
    });
    setCallStep(0);
    setWhatsappSent(false);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    addAuditLog("System", "Simulated Call Started", "IVR & Calls", "Incoming call from +91 98456 73221");
  };

  const nextCallStep = () => {
    if (callStep < ivrDialogue.length - 1) {
      setCallStep(prev => prev + 1);
      
      if (ivrDialogue[callStep + 1].speaker.startsWith('whatsapp')) {
        setWhatsappSent(true);
      }
      if (callStep === 4) {
        setSelectedDoctor("Dr. Arun Kumar");
      }
      if (callStep === 7) {
        setSelectedSlot("Today 05:00 PM");
        const newApt = {
          id: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
          patient: patientName,
          doctor: "Dr. Arun Kumar",
          department: "Cardiology",
          date: "2026-08-09",
          time: "05:00 PM",
          status: "Confirmed",
          type: "Offline",
          fee: 800
        };
        addAppointment(newApt);
        addAuditLog("AI Receptionist", "Booked Appointment through IVR", "Appointments", `Booking ID: ${newApt.id} for ${patientName}`);
      }
    }
  };

  const endCall = () => {
    setActiveCall(null);
    setCallStep(0);
    setWhatsappSent(false);
    addAuditLog("System", "Call Ended", "IVR & Calls", "Call with +91 98456 73221 terminated");
  };

  const takeOverCall = () => {
    setActiveCall(prev => ({ ...prev, status: "Connected" }));
    addAuditLog(currentRole, "Staff Took Over Call", "IVR & Calls", "Manual takeover of call +91 98456 73221");
    alert("You have successfully taken over this call. AI Receptionist is now offline for this session.");
  };

  const todayAppointments = appointments.filter(apt => apt.date === "2026-08-09");

  // Actionable Exception Handling Alerts (Spec Page 15)
  const actionableAlerts = [
    { type: 'warning', text: 'Pending payments above threshold (₹34,900 pending)' },
    { type: 'error', text: 'Failed AI Scribe sessions (2 transcript timeouts logged today)' },
    { type: 'info', text: 'Doctors with scheduling conflicts (Dr. Rajesh Kumar has overlapping slots)' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>Super Admin Command Center</h2>
          <p>Centralized monitoring layer unifying Doctor App, Patient App, IVR, Online Consultations, AI Scribe & Payments.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleSimulateCall}>
            <Phone size={16} /> Simulate IVR Call
          </button>
        </div>
      </div>

      {/* Exception Handling Actionable Alerts Banner (Spec Page 15 & Page 28 Wireframe) */}
      {showAlertsDrawer && (
        <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--warning)', backgroundColor: 'var(--warning-bg)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} style={{ color: 'var(--warning)' }} /> Exception Handling — Actionable Dashboard Alerts
            </h3>
            <button className="btn-icon" style={{ border: 'none', background: 'transparent' }} onClick={() => setShowAlertsDrawer(false)}>
              <X size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {actionableAlerts.map((alert, idx) => (
              <div key={idx} style={{ fontSize: '0.82rem', color: '#78350f', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>⚠</span> {alert.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top KPI Cards — Row 1 (Spec Page 6) */}
      <div className="grid-4" style={{ marginBottom: '16px' }}>
        <div className="stat-card">
          <div className="stat-info">
            <p>Total Patients</p>
            <div className="stat-value">{patients.length * 28}</div>
            <div className="stat-trend up">→ Opens Patients module</div>
          </div>
          <div className="stat-icon primary"><Users size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Total Doctors</p>
            <div className="stat-value">{doctors.length}</div>
            <div className="stat-trend up">→ Opens Doctors module</div>
          </div>
          <div className="stat-icon success"><Users size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Today's Appointments</p>
            <div className="stat-value">{appointments.length}</div>
            <div className="stat-trend up">→ Opens Appointments module</div>
          </div>
          <div className="stat-icon warning"><Calendar size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Today's Revenue</p>
            <div className="stat-value">₹2,84,500</div>
            <div className="stat-trend up">→ Opens Revenue Overview</div>
          </div>
          <div className="stat-icon info"><DollarSign size={24} /></div>
        </div>
      </div>

      {/* Top KPI Cards — Row 2 (Spec Page 6) */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-info">
            <p>Online Consultations</p>
            <div className="stat-value">219</div>
            <div className="stat-trend up">→ Opens Telehealth module</div>
          </div>
          <div className="stat-icon info"><Video size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>IVR Calls Today</p>
            <div className="stat-value">842</div>
            <div className="stat-trend up">→ Opens IVR & Calls module</div>
          </div>
          <div className="stat-icon primary"><Phone size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>AI Scribe Sessions</p>
            <div className="stat-value">163</div>
            <div className="stat-trend up">→ Opens AI Scribe module</div>
          </div>
          <div className="stat-icon success"><Sparkles size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Pending Payments</p>
            <div className="stat-value">₹34,900</div>
            <div className="stat-trend down">→ Opens Payments module</div>
          </div>
          <div className="stat-icon danger"><CreditCard size={24} /></div>
        </div>
      </div>

      {/* Interactive IVR Simulator Panel */}
      {activeCall && (
        <div className="card call-simulator" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <h3>
              <div className="pulse-indicator"></div> Live IVR Call & AI Receptionist Simulator
            </h3>
            <span className="badge badge-warning">{activeCall.status}</span>
          </div>

          <div className="grid-main-side">
            <div>
              <div className="chat-container">
                {ivrDialogue.slice(0, callStep + 1).map((msg, idx) => (
                  <div key={idx} className={`chat-bubble ${msg.speaker.startsWith('ai') || msg.speaker.startsWith('whatsapp') ? 'ai' : 'patient'}`}>
                    <span className="chat-sender">
                      {msg.speaker === 'ai' ? 'AI Receptionist' : 
                       msg.speaker === 'patient' ? 'Patient (Voice)' :
                       msg.speaker === 'whatsapp-1' || msg.speaker === 'whatsapp-2' ? 'WhatsApp Hook' : 'Patient (WhatsApp)'}
                    </span>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {callStep < ivrDialogue.length - 1 ? (
                  <button className="btn btn-primary" onClick={nextCallStep}>
                    Next Interaction Step <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="badge badge-success" style={{ padding: '10px 14px' }}>
                    <Check size={14} /> Interaction Flow Completed
                  </div>
                )}
                <button className="btn btn-secondary" onClick={takeOverCall}>
                  Take Over Call
                </button>
                <button className="btn btn-danger" onClick={endCall}>
                  End Call
                </button>
              </div>
            </div>

            {/* WhatsApp Integration Preview */}
            <div className="whatsapp-preview">
              <div className="whatsapp-header">
                <div className="whatsapp-avatar">H</div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>ABC Hospital Support</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Online</div>
                </div>
              </div>
              <div className="whatsapp-body">
                {whatsappSent && (
                  <div className="whatsapp-bubble">
                    <strong>ABC Hospital Appointment Desk</strong>
                    {selectedSlot ? (
                      `\n\n✅ Appointment Confirmed!\n\nPatient: ${patientName}\nDoctor: Dr. Arun Kumar\nDepartment: Cardiology\nDate: 25 July 2025\nTime: 5:00 PM\nLocation: 3rd Floor, Cardiology Wing\nBooking ID: APT-25876\n\nWe look forward to serving you.`
                    ) : selectedDoctor ? (
                      `\n\nWe found available doctors for your symptoms.\n\nSelected Doctor: ${selectedDoctor}\n\nAvailable slots:\n- Today 04:00 PM\n- Today 05:00 PM\n- Tomorrow 10:00 AM\n- Tomorrow 11:00 AM\n\nPlease reply with the slot number.`
                    ) : (
                      `\n\nWe found available doctors for your symptoms.\n\n1. Dr. Arun Kumar\n   Orthopedic Specialist\n2. Dr. Priya Sharma\n   Cardiology Specialist\n\nPlease select a doctor.`
                    )}
                    
                    {selectedSlot ? (
                      <div className="whatsapp-actions">
                        <button className="whatsapp-btn">Reschedule</button>
                        <button className="whatsapp-btn">Cancel</button>
                        <button className="whatsapp-btn">Directions</button>
                      </div>
                    ) : selectedDoctor ? (
                      <div className="whatsapp-actions">
                        <button className="whatsapp-btn" onClick={() => { setSelectedSlot("Today 05:00 PM"); nextCallStep(); }}>Today 05:00 PM</button>
                        <button className="whatsapp-btn" onClick={() => { setSelectedSlot("Today 04:00 PM"); nextCallStep(); }}>Today 04:00 PM</button>
                      </div>
                    ) : (
                      <div className="whatsapp-actions">
                        <button className="whatsapp-btn" onClick={() => { setSelectedDoctor("Dr. Arun Kumar"); nextCallStep(); }}>Select Dr. Arun Kumar</button>
                        <button className="whatsapp-btn" onClick={() => { setSelectedDoctor("Dr. Priya Sharma"); nextCallStep(); }}>Select Dr. Priya Sharma</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Details */}
      <div className="grid-main-side">
        {/* Left Side: Call & Appointments Lists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Live Calls List */}
          <div className="card">
            <div className="card-header">
              <h3>Live Active Calls</h3>
              <span className="badge badge-danger">5 Active</span>
            </div>
            <div className="table-container">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Caller</th>
                    <th>Duration</th>
                    <th>Symptoms</th>
                    <th>Suggested Dept</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>+91 98456 73221</strong></td>
                    <td>02:35</td>
                    <td>Chest Pain</td>
                    <td>Cardiology</td>
                    <td><span className="badge badge-info">Selecting Slot</span></td>
                  </tr>
                  <tr>
                    <td><strong>+91 99456 88734</strong></td>
                    <td>01:45</td>
                    <td>Skin Allergy</td>
                    <td>Dermatology</td>
                    <td><span className="badge badge-success">Options Sent</span></td>
                  </tr>
                  <tr>
                    <td><strong>+91 90876 54321</strong></td>
                    <td>03:12</td>
                    <td>Severe Knee Pain</td>
                    <td>Orthopedics</td>
                    <td><span className="badge badge-warning">Confirming</span></td>
                  </tr>
                  <tr>
                    <td><strong>+91 93456 22111</strong></td>
                    <td>01:05</td>
                    <td>Fever, Cold</td>
                    <td>General Physician</td>
                    <td><span className="badge badge-secondary">Collecting Info</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="card">
            <div className="card-header">
              <h3>Today's Appointments Queue</h3>
              <span className="badge badge-info">{todayAppointments.length} total</span>
            </div>
            <div className="table-container">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((apt, idx) => (
                    <tr key={idx}>
                      <td>{apt.time}</td>
                      <td><strong>{apt.patient}</strong></td>
                      <td>{apt.doctor}</td>
                      <td>{apt.department}</td>
                      <td>
                        <span className={`badge ${apt.type === 'Online' ? 'badge-info' : 'badge-secondary'}`}>
                          {apt.type}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          apt.status === 'Confirmed' ? 'badge-success' : 
                          apt.status === 'Checked In' ? 'badge-info' : 
                          apt.status === 'Waiting' ? 'badge-warning' : 'badge-secondary'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Operations Snapshot & Lifecycle Breakdown (Spec Page 7) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Operations Snapshot: Today's Lifecycle Breakdown (Spec Page 7) */}
          <div className="card">
            <div className="card-header">
              <h3>Today's Appointment Lifecycle</h3>
              <span className="badge badge-info">137 Total</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span>Confirmed</span>
                <strong style={{ color: 'var(--primary)' }}>38</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span>Waiting</span>
                <strong style={{ color: 'var(--warning)' }}>18</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span>In Progress</span>
                <strong style={{ color: 'var(--info)' }}>9</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span>Completed</span>
                <strong style={{ color: 'var(--success)' }}>61</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span>Cancelled</span>
                <strong style={{ color: 'var(--danger)' }}>7</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span>No Show</span>
                <strong style={{ color: 'var(--text-muted)' }}>4</strong>
              </div>
            </div>
          </div>

          {/* Booking Conversion Funnel */}
          <div className="card">
            <div className="card-header">
              <h3>Booking Funnel (Today)</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>Calls Received</span>
                  <strong>842</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>AI Conversations</span>
                  <strong>731 (86%)</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '86%', height: '100%', backgroundColor: 'var(--info)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>Doctor Matches</span>
                  <strong>512 (60%)</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--warning)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span>Bookings Confirmed</span>
                  <strong>96 (34%)</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '34%', height: '100%', backgroundColor: 'var(--success)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
