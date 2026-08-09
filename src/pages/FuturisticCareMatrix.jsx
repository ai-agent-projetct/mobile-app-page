import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Camera, Activity, Dna, ShieldAlert, Cpu, HeartPulse, Zap, 
  Layers, RefreshCw, Check, AlertCircle, Lock, Database, Eye, Globe, Radio, TrendingUp
} from 'lucide-react';

export default function FuturisticCareMatrix({ 
  patients, 
  doctors, 
  addAuditLog, 
  currentRole 
}) {
  const [activeTab, setActiveTab] = useState('rppg');
  const [selectedPatientId, setSelectedPatientId] = useState('PAT-101');
  const [isScanningVitals, setIsScanningVitals] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // rPPG AI Camera Scan Results State
  const [vitalsData, setVitalsData] = useState({
    hr: 74,
    hrv: 58,
    spo2: 98,
    rr: 16,
    bpSys: 122,
    bpDia: 80,
    stressLevel: 'Low (14%)',
    fatigueScore: 'Normal'
  });

  // Pharmacogenomics (PGx) Profile State
  const pgxMarkers = [
    { gene: 'CYP2C19', variant: '*2/*2 (Poor Metabolizer)', impact: 'High Risk', recommendation: 'Avoid Clopidogrel due to zero antiplatelet efficacy. Prescribe Prasugrel or Ticagrelor.' },
    { gene: 'CYP2D6', variant: '*1/*4 (Intermediate)', impact: 'Moderate Risk', recommendation: 'Reduce Codeine / Tramadol dosage by 50% or substitute with non-opioid analgesics.' },
    { gene: 'VKORC1', variant: '-1639G>A (Sensitive)', impact: 'Low Dose Needed', recommendation: 'Initiate Warfarin at lower starting dose (2.5mg daily) with frequent INR monitoring.' },
    { gene: 'SLCO1B1', variant: '521T>C (Decreased Function)', impact: 'Statin Myopathy Risk', recommendation: 'Limit Simvastatin to 20mg max daily or switch to Rosuvastatin.' }
  ];

  // Digital Twin 3D Organ Health State
  const [selectedOrgan, setSelectedOrgan] = useState('heart');
  const organDetails = {
    heart: { name: 'Cardiovascular System', healthScore: 92, status: 'Optimal Efficiency', notes: 'Normal ejection fraction (62%). Minor aortic wall stiffness noted.', risk5yr: '4.2% Atherosclerosis' },
    lungs: { name: 'Pulmonary / Respiratory', healthScore: 86, status: 'Mild Airways Sensitivity', notes: 'Right upper lobe mild wheezing history. SpO2 stable at 98% room air.', risk5yr: '8.1% Bronchial Hyper-reactivity' },
    brain: { name: 'Neuro-Vascular Network', healthScore: 95, status: 'High Cognitive Reserves', notes: 'Zero ischemic white matter lesions. Normal cerebral blood flow dynamics.', risk5yr: '1.5% Neuro-degenerative Risk' },
    kidneys: { name: 'Renal Filtration System', healthScore: 89, status: 'Normal eGFR (94 mL/min)', notes: 'Serum creatinine 0.9 mg/dL. No microalbuminuria detected.', risk5yr: '2.0% Chronic Kidney Disease' },
    liver: { name: 'Hepatic Metabolic Lab', healthScore: 94, status: 'Normal Enzymes', notes: 'ALT 22 U/L, AST 19 U/L. Zero signs of hepatic steatosis.', risk5yr: '1.1% Fatty Liver Risk' }
  };

  // NEWS2 Emergency Deterioration ICU Ward Tracker
  const icuWardPatients = [
    { bed: 'ICU Bed 01', patient: 'Ravi Kumar (PAT-101)', news2Score: 2, status: 'Low Risk (Green)', rr: 16, spo2: 98, bp: '122/80', hr: 74, temp: 98.6 },
    { bed: 'ICU Bed 02', patient: 'Karthik B. (PAT-103)', news2Score: 6, status: 'HIGH DETERIORATION ALERT (Red)', rr: 26, spo2: 91, bp: '94/60', hr: 118, temp: 102.4 },
    { bed: 'ICU Bed 03', patient: 'Sanjay R. (PAT-105)', news2Score: 4, status: 'Medium Risk (Yellow)', rr: 21, spo2: 94, bp: '138/88', hr: 92, temp: 99.8 }
  ];

  // AI Clinical Trial Matcher Registry
  const matchedTrials = [
    { id: 'NCT-058291', title: 'Phase III Novel SGLT2 Inhibitor in Cardio-Renal Risk Reduction', matchScore: 96, location: 'ABC Hospital Cardiology Center', eligibility: 'Metformin patient + mild hypertension + age > 35' },
    { id: 'NCT-049201', title: 'AI-Guided Targeted mRNA Immunotherapy for Allergic Bronchial Inflammations', matchScore: 88, location: 'Global Pulmonary Research Lab', eligibility: 'History of acute bronchial wheezing' }
  ];

  const handleStartRppgScan = () => {
    setIsScanningVitals(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanningVitals(false);
          setVitalsData({
            hr: Math.floor(70 + Math.random() * 8),
            hrv: Math.floor(52 + Math.random() * 12),
            spo2: 98 + Math.floor(Math.random() * 2),
            rr: 16 + Math.floor(Math.random() * 2),
            bpSys: 120 + Math.floor(Math.random() * 6),
            bpDia: 80 + Math.floor(Math.random() * 4),
            stressLevel: 'Optimal (12%)',
            fatigueScore: 'Refreshed'
          });
          addAuditLog(currentRole, "Completed rPPG AI Camera Scan", "Futuristic Care Matrix", `Scanned vitals telemetry for ${patient.name}`);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>
            Futuristic AI Care Matrix & Digital Twin Console
            <span className="badge badge-info" style={{ marginLeft: '12px', backgroundColor: '#fae8ff', color: '#86198f', border: '1px solid #f5d0fe' }}>
              🚀 Next-Gen 2026+ Innovations
            </span>
          </h2>
          <p>Cutting-edge contactless rPPG AI camera vitals, Pharmacogenomics (PGx), 3D Organ Digital Twins, NEWS2 ICU deterioration scoring, and Web3 data vaults.</p>
        </div>
      </div>

      {/* Futuristic Feature Tab Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button className={`btn ${activeTab === 'rppg' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('rppg')}>
          <Camera size={16} /> Contactless rPPG Camera Vitals
        </button>
        <button className={`btn ${activeTab === 'pgx' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('pgx')}>
          <Dna size={16} /> Pharmacogenomics (PGx)
        </button>
        <button className={`btn ${activeTab === 'twin' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('twin')}>
          <HeartPulse size={16} /> Digital Twin 3D Organ Map
        </button>
        <button className={`btn ${activeTab === 'news2' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('news2')}>
          <ShieldAlert size={16} /> NEWS2 Emergency Deterioration
        </button>
        <button className={`btn ${activeTab === 'trials' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('trials')}>
          <Globe size={16} /> AI Clinical Trial Matcher
        </button>
      </div>

      {/* Patient Selection Selector */}
      <div className="card" style={{ marginBottom: '24px', padding: '12px 20px', backgroundColor: 'var(--bg-input)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Active Patient Telemetry Subject:</span>
          <select className="role-dropdown" value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)}>
            {patients.map((p, idx) => (
              <option key={idx} value={p.id}>{p.name} ({p.id}) — DOB: {p.dob}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TAB 1: Contactless rPPG AI Camera Vitals Scanner */}
      {activeTab === 'rppg' && (
        <div className="grid-main-side">
          {/* Camera Scan Simulation Feed */}
          <div className="card" style={{ backgroundColor: '#0f172a', color: 'white' }}>
            <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={18} /> Real-Time rPPG Facial Photoplethysmography AI
              </h3>
              <span className="badge badge-info" style={{ backgroundColor: '#0284c7', color: 'white' }}>Contactless RGB Mesh</span>
            </div>

            <div style={{ 
              height: '240px', 
              backgroundColor: '#1e293b', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '16px 0',
              border: isScanningVitals ? '2px solid #38bdf8' : '1px dashed #475569',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Simulated Landmark Mesh Dots */}
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', border: '2px solid #38bdf8', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.2)' }}></div>
              </div>
              
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '12px' }}>
                {isScanningVitals ? `Analyzing Micro-Capillary Light Absorption... ${scanProgress}%` : 'Position patient face within the camera frame'}
              </span>

              {/* Progress Bar */}
              {isScanningVitals && (
                <div style={{ width: '80%', height: '6px', backgroundColor: '#334155', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ width: `${scanProgress}%`, height: '100%', backgroundColor: '#38bdf8', transition: 'width 0.3s' }}></div>
                </div>
              )}
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '12px', backgroundColor: '#0284c7' }} 
              onClick={handleStartRppgScan}
              disabled={isScanningVitals}
            >
              <RefreshCw size={16} /> {isScanningVitals ? 'Scanning Facial Biometrics...' : 'Start 10-Second Contactless Vitals Scan'}
            </button>
          </div>

          {/* Real-time Telemetry Readout Cards */}
          <div className="card">
            <div className="card-header">
              <h3>rPPG Telemetry Output</h3>
              <span className="badge badge-success">Live Sensorless</span>
            </div>

            <div className="grid-2" style={{ gap: '14px' }}>
              <div className="card" style={{ padding: '14px', backgroundColor: '#f0f9ff' }}>
                <span style={{ fontSize: '0.75rem', color: '#0369a1', textTransform: 'uppercase' }}>Heart Rate (BPM)</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0284c7' }}>{vitalsData.hr} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>BPM</span></div>
              </div>

              <div className="card" style={{ padding: '14px', backgroundColor: '#fdf4ff' }}>
                <span style={{ fontSize: '0.75rem', color: '#7e22ce', textTransform: 'uppercase' }}>Heart Rate Variability</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#a855f7' }}>{vitalsData.hrv} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>ms</span></div>
              </div>

              <div className="card" style={{ padding: '14px', backgroundColor: '#f0fdf4' }}>
                <span style={{ fontSize: '0.75rem', color: '#15803d', textTransform: 'uppercase' }}>Blood Oxygen (SpO2)</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#22c55e' }}>{vitalsData.spo2}%</div>
              </div>

              <div className="card" style={{ padding: '14px', backgroundColor: '#fff7ed' }}>
                <span style={{ fontSize: '0.75rem', color: '#c2410c', textTransform: 'uppercase' }}>Respiration Rate</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f97316' }}>{vitalsData.rr} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>/min</span></div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <div>Estimated Blood Pressure: <strong>{vitalsData.bpSys}/{vitalsData.bpDia} mmHg</strong></div>
              <div>Stress Level: <strong style={{ color: 'var(--success)' }}>{vitalsData.stressLevel}</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Pharmacogenomics (PGx) Precision Medicine */}
      {activeTab === 'pgx' && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dna size={18} style={{ color: 'var(--primary)' }} /> Pharmacogenomic Variant Screening (PGx)
            </h3>
            <span className="badge badge-info">DNA Sequencing Matrix</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {pgxMarkers.map((pgx, idx) => (
              <div key={idx} className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-input)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <strong style={{ fontSize: '1rem', color: 'var(--primary)' }}>{pgx.gene}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '10px' }}>Variant: {pgx.variant}</span>
                  </div>
                  <span className={`badge ${pgx.impact === 'High Risk' ? 'badge-danger' : pgx.impact === 'Moderate Risk' ? 'badge-warning' : 'badge-info'}`}>
                    {pgx.impact}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '4px' }}>
                  <strong>Precision Recommendation:</strong> {pgx.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Digital Twin 3D Organ Map */}
      {activeTab === 'twin' && (
        <div className="grid-main-side">
          <div className="card">
            <div className="card-header">
              <h3>Digital Twin 3D Human Organ Map</h3>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {Object.keys(organDetails).map((organKey) => (
                <button 
                  key={organKey}
                  className={`btn ${selectedOrgan === organKey ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ textTransform: 'capitalize' }}
                  onClick={() => setSelectedOrgan(organKey)}
                >
                  {organKey}
                </button>
              ))}
            </div>

            {/* Organ Visualizer Card */}
            <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '16px', backgroundColor: 'var(--bg-input)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>{organDetails[selectedOrgan].name}</h4>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--success)' }}>
                  {organDetails[selectedOrgan].healthScore} / 100
                </div>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                Status: <strong>{organDetails[selectedOrgan].status}</strong>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '12px' }}>
                {organDetails[selectedOrgan].notes}
              </div>

              <div style={{ fontSize: '0.82rem', padding: '8px 12px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #ffedd5', color: '#c2410c' }}>
                <strong>5-Year Predictive Risk Trajectory:</strong> {organDetails[selectedOrgan].risk5yr}
              </div>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: '#0f172a', color: 'white' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '8px' }}>Digital Twin Synchronization</h4>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Continuously trained on patient telemetry, EMR lab results, and AI Scribe audio notes.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: NEWS2 Emergency Deterioration Tracker */}
      {activeTab === 'news2' && (
        <div className="card">
          <div className="card-header">
            <h3>ICU Ward NEWS2 Deterioration Early Warning System</h3>
            <span className="badge badge-danger">National Early Warning Score 2</span>
          </div>

          <div className="table-container">
            <table className="table-list">
              <thead>
                <tr>
                  <th>ICU Bed & Patient</th>
                  <th>Respiratory Rate</th>
                  <th>SpO2</th>
                  <th>BP</th>
                  <th>Heart Rate</th>
                  <th>NEWS2 Score</th>
                  <th>Clinical Action Alert</th>
                </tr>
              </thead>
              <tbody>
                {icuWardPatients.map((bed, idx) => (
                  <tr key={idx}>
                    <td><strong>{bed.bed}</strong><br /><span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{bed.patient}</span></td>
                    <td>{bed.rr} /min</td>
                    <td>{bed.spo2}%</td>
                    <td>{bed.bp}</td>
                    <td>{bed.hr} bpm</td>
                    <td><strong style={{ fontSize: '1.1rem' }}>{bed.news2Score}</strong></td>
                    <td>
                      <span className={`badge ${bed.news2Score >= 5 ? 'badge-danger' : bed.news2Score >= 3 ? 'badge-warning' : 'badge-success'}`}>
                        {bed.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AI Clinical Trial Matcher */}
      {activeTab === 'trials' && (
        <div className="card">
          <div className="card-header">
            <h3>AI Global Clinical Trial Registry Matcher</h3>
            <span className="badge badge-info">ClinicalTrials.gov Sync</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {matchedTrials.map((trial, idx) => (
              <div key={idx} className="card" style={{ padding: '16px', backgroundColor: 'var(--bg-input)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>{trial.title}</strong>
                  <span className="badge badge-success" style={{ fontSize: '0.8rem' }}>{trial.matchScore}% Patient Match</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Trial ID: {trial.id} • Facility: {trial.location}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>Eligibility Criteria: {trial.eligibility}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
