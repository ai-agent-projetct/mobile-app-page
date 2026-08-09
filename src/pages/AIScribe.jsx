import React, { useState, useEffect } from 'react';
import { 
  Sparkles, FileText, Check, AlertCircle, RefreshCw, 
  ArrowLeft, Bell, Mic, Play, Pause, Send, FileDown, PlusCircle 
} from 'lucide-react';

export default function AIScribe({ 
  patients, 
  doctors, 
  addAuditLog, 
  currentRole 
}) {
  // Mobile Flow Step: 0 = Appointment Details, 1 = Recording, 2 = Listen, 3 = Review Transcript, 4 = SOAP Ready
  const [mobileStep, setMobileStep] = useState(0);
  const [recordingTime, setRecordingTime] = useState(12); // Initialized to 12s as per screenshot
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Editable fields to mimic high-fidelity app inputs
  const [transcript, setTranscript] = useState(
    "Doctor: Good morning, what brings you in today?\nPatient: I have had a mild headache and some dizziness for the past two days.\nDoctor: Any nausea, vision changes, or fever?\nPatient: No fever, but I felt a little..."
  );

  const [soapNotes, setSoapNotes] = useState(
    "SUBJECTIVE:\nPatient reported symptoms in transcript: Doctor: Good morning, what brings you in today? Patient: I have had a mild headache and so...\n\nOBJECTIVE:\nBP 120/80 mmHg. Patient conscious"
  );

  const [prescription, setPrescription] = useState(
    "1. Tab Paracetamol 500mg — 1-0-1 after food (3 days)\n2. Tab Pantoprazole 40mg — 1-0-0 before food (3 days)\n3. Multivitamin Capsule — 0-0-1 after food (5 days)"
  );

  // Scribe Usage Stats
  const mockScribeStats = {
    totalSessions: 148,
    soapGenerated: 146,
    avgProcessingTime: '4.2s',
    successRate: '98.6%',
    status: 'Operational'
  };

  // Timer logic for Recording Step
  useEffect(() => {
    let interval;
    if (mobileStep === 1) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [mobileStep]);

  // Audio Playback simulation timer
  useEffect(() => {
    let interval;
    if (isPlaying && mobileStep === 2) {
      interval = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= 15) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, mobileStep]);

  const handleStartConsultation = () => {
    setRecordingTime(0);
    setMobileStep(1);
    addAuditLog("Doctor", "Started Scribe Consultation", "AI Scribe", "Initiated voice record for Murugan");
  };

  const handleStopRecording = () => {
    setMobileStep(2);
    setPlaybackTime(0);
    setIsPlaying(false);
  };

  const handleSendToServer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setMobileStep(3);
    }, 1200);
  };

  const handleGenerateSoapNotes = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setMobileStep(4);
      addAuditLog("Doctor", "Committed Scribe SOAP Notes", "AI Scribe", "Auto-generated SOAP and prescription logs");
    }, 1500);
  };

  const handleMarkComplete = () => {
    alert("SOAP Notes and prescription successfully signed, committed to EMR, and patient Murugan checked out.");
    setMobileStep(0);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>AI Clinical Scribe</h2>
          <p>Utilize speech-to-text AI to record patient visits and auto-generate medical SOAP notes.</p>
        </div>
        <span className="badge badge-success" style={{ gap: '6px' }}>
          <div className="live-indicator"></div> AI Engine: Operational
        </span>
      </div>

      <div className="grid-main-side">
        {/* Left Side: Stats & Scribe Sessions info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Usage Metrics */}
          <div className="card">
            <div className="card-header">
              <h3>Doctor Usage Stats</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-input)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Scribe Sessions Today</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--primary)' }}>24</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Dr. Rajesh Kumar (HOD Ortho)</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-input)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>SOAP Notes Generated</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--success)' }}>146</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>98.6% processing success</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-input)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Avg Processing Latency</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--warning)' }}>4.2s</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Using Whispers & GPT-4o API</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-input)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Failed Scribe Sessions</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--danger)' }}>2</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Due to network interruptions</div>
              </div>
            </div>
          </div>

          {/* Scribe Session Logs */}
          <div className="card">
            <div className="card-header">
              <h3>Today's Scribe Sessions Log</h3>
            </div>
            <div className="table-container">
              <table className="table-list">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dr. Rajesh Kumar</strong></td>
                    <td>Murugan</td>
                    <td>10:00 AM</td>
                    <td>00:15</td>
                    <td><span className="badge badge-success">Completed</span></td>
                  </tr>
                  <tr>
                    <td><strong>Dr. Arun Kumar</strong></td>
                    <td>Ravi Kumar</td>
                    <td>09:30 AM</td>
                    <td>04:12</td>
                    <td><span className="badge badge-success">Completed</span></td>
                  </tr>
                  <tr>
                    <td><strong>Dr. Sarah Mathews</strong></td>
                    <td>Meena Iyer</td>
                    <td>09:00 AM</td>
                    <td>08:35</td>
                    <td><span className="badge badge-success">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Mobile App Mockup (High Fidelity Screen Simulator) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="mobile-device-container">
            <div className="mobile-device">
              
              {/* Header Status Bar (Vitals) */}
              <div className="mobile-app-header">
                <button 
                  className="btn-icon" 
                  style={{ border: 'none', background: 'transparent', padding: 0 }}
                  onClick={() => setMobileStep(prev => Math.max(0, prev - 1))}
                  disabled={mobileStep === 0}
                >
                  <ArrowLeft size={20} style={{ color: '#0f172a' }} />
                </button>
                
                <div className="mobile-app-title">
                  {mobileStep === 0 ? 'Appointment Details' : 'Scribe · Murugan'}
                </div>

                <div style={{ position: 'relative' }}>
                  <Bell size={20} style={{ color: '#0f172a' }} />
                  <div className="notification-badge" style={{ top: 0, right: 0 }}></div>
                </div>
              </div>

              {/* Mobile Screen App Body */}
              <div className="mobile-app-body">
                
                {/* ── STEP 0: APPOINTMENT DETAILS (SCREEN 3) ── */}
                {mobileStep === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="mobile-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                      <div className="mobile-avatar">MU</div>
                      <div>
                        <h4 style={{ fontWeight: '700', fontSize: '1.05rem', color: '#0f172a' }}>Murugan</h4>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                          <span className="mobile-badge mobile-badge-purple" style={{ backgroundColor: '#f1f1f5', color: '#555' }}>Token #49</span>
                          <span className="mobile-badge mobile-badge-upcoming">Upcoming</span>
                        </div>
                      </div>
                    </div>

                    <div className="mobile-card" style={{ flex: 1, padding: '10px 18px', marginBottom: '20px' }}>
                      <div className="mobile-info-row">
                        <div className="mobile-info-label">Date</div>
                        <div className="mobile-info-value">Tue, Aug 4, 2026</div>
                      </div>
                      <div className="mobile-info-row">
                        <div className="mobile-info-label">Time</div>
                        <div className="mobile-info-value">10:00 AM</div>
                      </div>
                      <div className="mobile-info-row">
                        <div className="mobile-info-label">Visit type</div>
                        <div className="mobile-info-value">General</div>
                      </div>
                      <div className="mobile-info-row">
                        <div className="mobile-info-label">Phone</div>
                        <div className="mobile-info-value">+91 98765 43214</div>
                      </div>
                      <div className="mobile-info-row">
                        <div className="mobile-info-label">Token number</div>
                        <div className="mobile-info-value">#49</div>
                      </div>
                      <div className="mobile-info-row" style={{ borderBottom: 'none' }}>
                        <div className="mobile-info-label">Status</div>
                        <div className="mobile-info-value">Upcoming</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button className="mobile-btn-primary" onClick={handleStartConsultation}>
                        <Play size={16} fill="white" /> Start Consultation
                      </button>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="mobile-btn-secondary" style={{ flex: 1 }} onClick={() => alert("Calling patient Murugan (+91 98765 43214)...")}>
                          Call
                        </button>
                        <button className="mobile-btn-secondary" style={{ flex: 1 }} onClick={() => alert("Reschedule window opened.")}>
                          Reschedule
                        </button>
                      </div>
                      <button className="mobile-btn-secondary" onClick={() => alert("Book Follow-up slot opened.")}>
                        Book Follow-up
                      </button>
                      <button className="mobile-btn-outline-danger" onClick={() => { if(confirm("Cancel appointment for Murugan?")) setMobileStep(0); }}>
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 1: RECORDING CONSULTATION (SCREEN 1) ── */}
                {mobileStep === 1 && (
                  <div className="mobile-mic-container" style={{ height: '100%', justifyContent: 'space-between', padding: '40px 0 20px 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="mobile-mic-button" onClick={handleStopRecording}>
                        <Mic size={42} />
                      </div>
                      
                      <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#2b1a8f' }}>
                        00:{recordingTime.toString().padStart(2, '0')}
                      </h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e15252', fontSize: '0.88rem', fontWeight: 600, marginTop: '8px' }}>
                        <div className="pulse-indicator" style={{ width: '8px', height: '8px' }}></div>
                        Recording Consultation...
                      </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                      <button className="mobile-btn-primary" onClick={handleStopRecording}>
                        Stop Recording
                      </button>
                      <button 
                        className="btn-icon" 
                        style={{ border: 'none', background: 'transparent', color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}
                        onClick={() => setMobileStep(0)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: LISTEN TO RECORDING (SCREEN 2) ── */}
                {mobileStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div className="mobile-card" style={{ textAlign: 'center', padding: '24px 20px' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f4ff', color: '#2b1a8f', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </svg>
                      </div>

                      <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a' }}>Listen to Recording</h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>
                        Hear your recorded audio before sending to the server.
                      </p>

                      {/* Timeline player mockup */}
                      <div className="mobile-audio-player">
                        <button className="mobile-play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                          {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" style={{ marginLeft: '4px' }} />}
                        </button>
                        
                        <div className="mobile-progress-bar">
                          <div className="mobile-progress-fill" style={{ width: `${(playbackTime / 15) * 100}%` }}></div>
                          <div className="mobile-progress-handle" style={{ left: `calc(${(playbackTime / 15) * 100}% - 7px)` }}></div>
                        </div>

                        <div className="mobile-progress-time">
                          <span>00:{playbackTime.toString().padStart(2, '0')}</span>
                          <span>00:15</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button className="mobile-btn-primary" onClick={handleSendToServer} disabled={isProcessing}>
                        {isProcessing ? 'Sending Audio File...' : 'Send to Server via API'}
                      </button>
                      <button className="mobile-btn-secondary" onClick={() => setMobileStep(1)}>
                        Re-record Audio
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: REVIEW & EDIT TRANSCRIPT (SCREEN 5) ── */}
                {mobileStep === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                      <h4 style={{ fontWeight: '700', fontSize: '1.2rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Review & Edit Transcript
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', marginBottom: '16px', lineHeight: 1.4 }}>
                        Check the transcribed audio below. Edit any words if needed before generating clinical notes & prescription.
                      </p>

                      <div className="mobile-card" style={{ padding: '16px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Audio Transcript</span>
                          <span className="mobile-badge" style={{ backgroundColor: '#f1f0ff', color: '#3b20a6' }}>Editable</span>
                        </div>
                        <textarea 
                          className="mobile-textarea" 
                          value={transcript}
                          onChange={(e) => setTranscript(e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                      <button className="mobile-btn-primary" onClick={handleGenerateSoapNotes} disabled={isProcessing}>
                        {isProcessing ? 'AI processing...' : 'Generate SOAP Notes & Prescription'}
                      </button>
                      <button className="mobile-btn-secondary" onClick={() => setMobileStep(1)}>
                        Re-record Audio
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: SOAP NOTES & PRESCRIPTION READY (SCREEN 4) ── */}
                {mobileStep === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                      <h4 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} /></div>
                        SOAP Notes & Prescription Ready
                      </h4>

                      {/* Card 1: SOAP */}
                      <div className="mobile-card" style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Clinical Notes (SOAP)</span>
                          <span className="mobile-badge" style={{ backgroundColor: '#f1f0ff', color: '#3b20a6' }}>Editable</span>
                        </div>
                        <textarea 
                          className="mobile-textarea" 
                          style={{ minHeight: '120px' }}
                          value={soapNotes}
                          onChange={(e) => setSoapNotes(e.target.value)}
                        />
                      </div>

                      {/* Card 2: Prescription */}
                      <div className="mobile-card" style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Medical Prescription</span>
                          <span className="mobile-badge" style={{ backgroundColor: '#f1f0ff', color: '#3b20a6' }}>Editable</span>
                        </div>
                        <textarea 
                          className="mobile-textarea" 
                          style={{ minHeight: '100px' }}
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="mobile-btn-secondary" style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#64748b', border: 'none' }} disabled>
                          <Check size={16} /> Saved
                        </button>
                        <button className="mobile-btn-primary" style={{ flex: 1, backgroundColor: '#10b981', boxShadow: 'none' }} onClick={handleMarkComplete}>
                          <Check size={16} /> Mark Complete
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="mobile-btn-secondary" style={{ flex: 1, borderColor: '#3b20a6', color: '#3b20a6' }} onClick={() => alert("Downloading PDF summary...")}>
                          <FileDown size={14} /> Download PDF
                        </button>
                        <button className="mobile-btn-secondary" style={{ flex: 1, color: '#64748b' }} onClick={() => setMobileStep(0)}>
                          New Recording
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
