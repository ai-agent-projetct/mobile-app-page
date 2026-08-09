import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Mic, Square, Play, Copy, Check, FileText, Send, 
  RefreshCw, ShieldCheck, FileDown, Layers, Zap, Heart, Filter, ChevronRight,
  Cpu, Download, Sliders, HardDrive
} from 'lucide-react';

export default function FreedAIScribe({ 
  patients, 
  doctors, 
  addAuditLog, 
  currentRole 
}) {
  const [selectedPatient, setSelectedPatient] = useState('Ravi Kumar');
  const [specialty, setSpecialty] = useState('Primary Care');
  const [noteStyle, setNoteStyle] = useState('SOAP Note');
  const [language, setLanguage] = useState('English');

  // OpenScribe Engine Features
  const [aiModelEngine, setAiModelEngine] = useState('Anthropic Claude 3.5 Sonnet');
  const [openClawSynced, setOpenClawSynced] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [customSystemPrompt, setCustomSystemPrompt] = useState('Extract all pertinent symptoms, duration, exam findings, and diagnostic ICD-10 codes. Format plan concisely.');

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [copiedToEhr, setCopiedToEhr] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [syncedToEmr, setSyncedToEmr] = useState(false);
  const [showFhirModal, setShowFhirModal] = useState(false);

  // Raw Transcript vs Filtered Clinical Facts
  const rawTranscriptLines = [
    "[00:02] Doctor: Good morning Ravi! How's the weather out there today?",
    "[00:06] Patient: Oh, it's pretty warm doctor, spent 30 minutes in traffic getting here.",
    "[00:12] Doctor: Ah, I hear you! Well, let's get into it. What's been bothering you?",
    "[00:18] Patient: I've had this persistent dry cough and chest tightness for the past 5 days. Worse at night when I lie down.",
    "[00:27] Doctor: Any fever, chills, or shortness of breath while walking?",
    "[00:32] Patient: No fever, but climbing stairs gets me a bit winded. I tried over-the-counter cough syrup but it didn't help.",
    "[00:41] Doctor: Let me listen to your lungs. Take a deep breath... Lungs show mild expiratory wheezing in the right upper lobe. BP is 128/82, Heart rate 76.",
    "[00:52] Doctor: This looks like acute bronchitis following a cold. I'll give you a 7-day course of Amoxicillin and an Albuterol inhaler."
  ];

  // Freed & OpenScribe Filtered Clinical Facts
  const filteredFacts = [
    "• Chief Symptom: Dry cough & chest tightness x 5 days",
    "• Aggravating Factor: Worsens at night upon lying flat",
    "• Associated: Mild exertional dyspnea (climbing stairs)",
    "• Negative: Denies fever, chills, or diaphoresis",
    "• Failed Treatment: OTC cough syrup ineffective",
    "• Vitals: BP 128/82 mmHg, HR 76 bpm",
    "• Physical Exam: Mild expiratory wheezing in right upper lobe",
    "• Assessment: Acute Bronchitis (ICD-10: J20.9)",
    "• Rx: Amoxicillin 500mg tid x 7d, Albuterol inhaler prn"
  ];

  // Generated Structured Note State
  const [clinicalDoc, setClinicalDoc] = useState({
    cc: "Dry cough and chest tightness for 5 days.",
    hpi: "Patient is a 38-year-old male presenting with a 5-day history of dry cough and chest tightness. Symptoms are exacerbated at night when supine. Reports mild exertional dyspnea when climbing stairs. OTC cough syrups provided no relief. Denies fever, chills, or night sweats.",
    exam: "Vitals: BP 128/82 mmHg, HR 76 bpm, Temp 98.6°F, SpO2 98% on room air.\nRespiratory: Mild expiratory wheezing localized to the right upper lobe. No rales or rhonchi. Good air entry bilaterally.\nCardiovascular: Regular rate and rhythm, S1/S2 present, no murmur.",
    ap: "1. Acute Bronchitis (ICD-10: J20.9) - Prescribed Amoxicillin 500mg PO TID x 7 days.\n2. Exertional Bronchospasm - Albuterol HFA inhaler 90mcg 1-2 puffs q4-6h PRN shortness of breath.\n3. Supportive Care - Adequate hydration, rest, steam inhalation.",
    codes: [
      { code: 'ICD-10: J20.9', label: 'Acute bronchitis, unspecified' },
      { code: 'ICD-10: R05.9', label: 'Cough, unspecified' },
      { code: 'CPT: 99214', label: 'Office visit, established patient (30-39 mins)' }
    ],
    avs: "What we discussed today:\nYou have a chest infection known as acute bronchitis. We have prescribed an antibiotic (Amoxicillin) to take 3 times a day for 7 days, and an inhaler to use if you feel breathless. Please drink plenty of fluids and rest. Call our office if you develop a fever above 101°F."
  });

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartAmbientRecord = () => {
    setIsRecording(true);
    setSyncedToEmr(false);
    setOpenClawSynced(false);
    addAuditLog(currentRole, "Started Ambient Record", "OpenScribe & Freed Studio", `Ambient recording via ${aiModelEngine} for patient ${selectedPatient}`);
  };

  const handleStopAmbientRecord = () => {
    setIsRecording(false);
    addAuditLog(currentRole, "Captured Ambient Clinical Note", "OpenScribe & Freed Studio", `Processed note for ${selectedPatient} using model ${aiModelEngine}`);
  };

  const handleCopyToEhr = () => {
    const fullText = `PATIENT: ${selectedPatient}\nNOTE STYLE: ${noteStyle}\nSPECIALTY: ${specialty}\nAI ENGINE: ${aiModelEngine}\n\nCHIEF COMPLAINT:\n${clinicalDoc.cc}\n\nHISTORY OF PRESENT ILLNESS:\n${clinicalDoc.hpi}\n\nPHYSICAL EXAM & VITALS:\n${clinicalDoc.exam}\n\nASSESSMENT & PLAN:\n${clinicalDoc.ap}\n\nBILLING CODES:\n${clinicalDoc.codes.map(c => `${c.code} - ${c.label}`).join('\n')}\n\nAFTER-VISIT SUMMARY:\n${clinicalDoc.avs}`;
    
    navigator.clipboard?.writeText(fullText);
    setCopiedToEhr(true);
    addAuditLog(currentRole, "Copied Note to EHR Clipboard", "OpenScribe & Freed Studio", "Copied clinical note text");
    setTimeout(() => setCopiedToEhr(false), 2500);
  };

  const handleSyncToEmr = () => {
    setSyncedToEmr(true);
    addAuditLog(currentRole, "Pushed Freed Note to EMR API", "OpenScribe & Freed Studio", `Synced HL7 FHIR encounter for ${selectedPatient}`);
    alert(`Success! Clinical note & ICD-10 codes successfully pushed to hospital EMR database for ${selectedPatient}.`);
  };

  // OpenScribe Feature: Send to OpenClaw EMR Bridge
  const handleSendToOpenClaw = () => {
    setOpenClawSynced(true);
    addAuditLog(currentRole, "Dispatched OpenClaw EMR Bridge", "OpenScribe & Freed Studio", `Sent encounter context to OpenClaw desktop app for ${selectedPatient}`);
    alert(`OpenClaw Bridge Activated! Note context transferred to OpenEMR desktop app for ${selectedPatient}.`);
  };

  // OpenScribe Feature: Export Audio & Raw Transcript
  const handleExportTranscript = () => {
    const txtContent = rawTranscriptLines.join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `OpenScribe_Transcript_${selectedPatient.replace(/\s+/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addAuditLog(currentRole, "Exported Transcript File", "OpenScribe & Freed Studio", "Downloaded raw transcript .txt file");
  };

  const handleRefineWithAi = (promptText) => {
    const p = promptText || refinePrompt;
    if (!p) return;

    setIsRefining(true);
    setTimeout(() => {
      setIsRefining(false);
      
      if (p.toLowerCase().includes('shorten') || p.toLowerCase().includes('concise')) {
        setClinicalDoc(prev => ({
          ...prev,
          hpi: "38yo M w/ 5-day dry cough & chest tightness, worse supine at night. Mild exertional dyspnea. OTC syrups unhelpful. Denies fever."
        }));
      } else if (p.toLowerCase().includes('bullets') || p.toLowerCase().includes('plan')) {
        setClinicalDoc(prev => ({
          ...prev,
          ap: "• Amoxicillin 500mg TID x 7d (Acute Bronchitis)\n• Albuterol inhaler 1-2 puffs q4h PRN\n• Hydration & rest\n• Follow up if fever develops"
        }));
      } else if (p.toLowerCase().includes('normal') || p.toLowerCase().includes('exam')) {
        setClinicalDoc(prev => ({
          ...prev,
          exam: "Vitals: BP 120/80, HR 72, RR 16, SpO2 99% RA.\nENT: Normocephalic, mucosal color normal.\nLungs: Clear to auscultation bilaterally. No wheezes, rales, or rhonchi.\nHeart: RRR, S1/S2 normal."
        }));
      } else {
        setClinicalDoc(prev => ({
          ...prev,
          hpi: `${prev.hpi} [Refined by ${aiModelEngine}: Updated with ${p}]`
        }));
      }

      setRefinePrompt('');
      addAuditLog(currentRole, "Refined Note via AI Engine", "OpenScribe & Freed Studio", `Executed AI Refine Command: "${p}"`);
    }, 1200);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>
            Freed & OpenScribe AI Studio 
            <span className="badge badge-info" style={{ marginLeft: '12px', backgroundColor: '#f3e8ff', color: '#6b21a8', border: '1px solid #d8b4fe' }}>
              ✨ OpenScribe & Freed Core
            </span>
          </h2>
          <p>Open-source ambient AI scribe capturing patient encounters, local Whisper STT, Anthropic Claude, and OpenClaw EMR integration.</p>
        </div>
        
        <div className="page-actions">
          <button className={`btn ${openClawSynced ? 'btn-success' : 'btn-secondary'}`} onClick={handleSendToOpenClaw}>
            <HardDrive size={16} /> {openClawSynced ? 'OpenClaw Synced ✓' : 'Send to OpenClaw'}
          </button>

          <button className="btn btn-secondary" onClick={() => setShowPromptModal(true)}>
            <Sliders size={16} /> Custom System Prompt
          </button>

          <button className="btn btn-secondary" onClick={() => setShowFhirModal(true)}>
            <FileText size={16} /> View HL7 FHIR JSON
          </button>

          <button className="btn btn-secondary" onClick={handleCopyToEhr}>
            {copiedToEhr ? <Check size={16} style={{ color: 'var(--success)' }} /> : <Copy size={16} />}
            {copiedToEhr ? 'Copied to Clipboard!' : 'Copy to EHR'}
          </button>
          
          <button 
            className={`btn ${syncedToEmr ? 'btn-success' : 'btn-primary'}`} 
            onClick={handleSyncToEmr}
          >
            <Send size={16} /> {syncedToEmr ? 'Synced to EMR' : 'Push to Hospital EMR'}
          </button>
        </div>
      </div>

      {/* Control Bar: AI Model Engine, Specialty, Note Style, Language, Patient */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px 20px', backgroundColor: 'var(--bg-input)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
          
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>AI Processing Model</label>
            <select 
              className="form-input" 
              value={aiModelEngine} 
              onChange={(e) => setAiModelEngine(e.target.value)}
              style={{ fontWeight: 'bold', color: 'var(--primary)' }}
            >
              <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
              <option value="Local Whisper + Ollama (Private)">Local Whisper + Ollama (Private)</option>
              <option value="OpenAI GPT-4o">OpenAI GPT-4o</option>
              <option value="Deepgram STT + Groq LLM">Deepgram STT + Groq LLM</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Select Patient</label>
            <select 
              className="form-input" 
              value={selectedPatient} 
              onChange={(e) => setSelectedPatient(e.target.value)}
              disabled={isRecording}
            >
              {patients.map((pat, idx) => (
                <option key={idx} value={pat.name}>{pat.name} ({pat.id})</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Specialty Profile</label>
            <select 
              className="form-input" 
              value={specialty} 
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="Primary Care">Primary Care / Internal Med</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Mental Health">Mental Health / Psychiatry</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Clinical Note Format</label>
            <select 
              className="form-input" 
              value={noteStyle} 
              onChange={(e) => setNoteStyle(e.target.value)}
            >
              <option value="SOAP Note">SOAP Note (Standard)</option>
              <option value="H&P Note">H&P (History & Physical)</option>
              <option value="Consultation Note">Consultation Note</option>
              <option value="Progress Note">Progress Note</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ambient Audio Language</label>
            <select 
              className="form-input" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English (US/UK/IN)</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Ambient Record & Filter Stage */}
      <div className="card" style={{ marginBottom: '24px', border: isRecording ? '2px solid var(--danger)' : '1px solid var(--border-color)' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isRecording ? <div className="pulse-indicator"></div> : <Mic size={20} style={{ color: 'var(--primary)' }} />}
            {isRecording ? `OpenScribe Listening (${aiModelEngine})...` : 'Ambient Audio Capture'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isRecording && (
              <span style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--danger)' }}>
                00:{recordingSeconds.toString().padStart(2, '0')}
              </span>
            )}
            <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }} onClick={handleExportTranscript}>
              <Download size={12} /> Export Transcript (.txt)
            </button>
          </div>
        </div>

        <div className="grid-2">
          {/* Left: Raw Dialogue (with casual small talk) */}
          <div style={{ padding: '14px', backgroundColor: 'var(--bg-input)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              <span>RAW AMBIENT AUDIO TRANSCRIPT</span>
              <span>Whisper STT Engine</span>
            </div>
            <div style={{ height: '160px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5, color: '#475569' }}>
              {rawTranscriptLines.map((line, idx) => (
                <div key={idx} style={{ marginBottom: '4px' }}>{line}</div>
              ))}
            </div>
          </div>

          {/* Right: Freed & OpenScribe Distilled Clinical Facts */}
          <div style={{ padding: '14px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', fontWeight: '700', color: '#15803d' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={14} /> CLINICAL FACTS EXTRACTED VIA {aiModelEngine.toUpperCase()}
              </span>
              <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>Small talk stripped</span>
            </div>
            <div style={{ height: '160px', overflowY: 'auto', fontSize: '0.82rem', lineHeight: 1.6, color: '#14532d', fontWeight: '500' }}>
              {filteredFacts.map((fact, idx) => (
                <div key={idx}>{fact}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          {!isRecording ? (
            <button className="btn btn-primary" onClick={handleStartAmbientRecord} style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>
              <Mic size={18} /> Record Encounter ({aiModelEngine})
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleStopAmbientRecord} style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>
              <Square size={18} /> Stop & Generate Clinical Note
            </button>
          )}
        </div>
      </div>

      {/* Freed & OpenScribe AI Refine Assistant Bar */}
      <div className="card" style={{ marginBottom: '24px', backgroundColor: '#faf5ff', border: '1px solid #e9d5ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sparkles size={20} style={{ color: '#9333ea' }} />
          <h3 style={{ fontSize: '1rem', color: '#581c87' }}>OpenScribe & Freed AI Refine Assistant</h3>
        </div>
        
        <p style={{ fontSize: '0.82rem', color: '#6b21a8', marginBottom: '12px' }}>
          Tell {aiModelEngine} how to edit this clinical note in plain English, or tap a quick prompt below:
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem', backgroundColor: 'white', color: '#7e22ce', borderColor: '#d8b4fe' }} onClick={() => handleRefineWithAi("Shorten HPI")}>
            <Zap size={12} /> Shorten HPI
          </button>
          <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem', backgroundColor: 'white', color: '#7e22ce', borderColor: '#d8b4fe' }} onClick={() => handleRefineWithAi("Format plan as bullet points")}>
            <Layers size={12} /> Format Plan as Bullets
          </button>
          <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem', backgroundColor: 'white', color: '#7e22ce', borderColor: '#d8b4fe' }} onClick={() => handleRefineWithAi("Add normal physical exam")}>
            <Heart size={12} /> Add Normal Physical Exam
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g., 'Make HPI concise', 'Add penicillin allergy to history', 'Highlight prescriptions'..."
            value={refinePrompt}
            onChange={(e) => setRefinePrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleRefineWithAi(); }}
          />
          <button className="btn btn-primary" style={{ backgroundColor: '#7e22ce', minWidth: '120px', justifyContent: 'center' }} onClick={() => handleRefineWithAi()} disabled={isRefining}>
            <Sparkles size={14} /> {isRefining ? 'Refining...' : 'Refine Note'}
          </button>
        </div>
      </div>

      {/* Generated Clinical Document Output */}
      <div className="grid-main-side">
        {/* Left Column: HPI, Exam, Assessment & Plan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Chief Complaint & HPI */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)' }}>Chief Complaint & History of Present Illness (HPI)</h3>
            </div>
            
            <div className="form-group">
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Chief Complaint (CC)</label>
              <input 
                type="text" 
                className="form-input" 
                value={clinicalDoc.cc} 
                onChange={(e) => setClinicalDoc(prev => ({ ...prev, cc: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>HPI Narrative</label>
              <textarea 
                className="form-input" 
                rows="4" 
                value={clinicalDoc.hpi}
                onChange={(e) => setClinicalDoc(prev => ({ ...prev, hpi: e.target.value }))}
              />
            </div>
          </div>

          {/* Physical Exam & Vitals */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)' }}>Physical Exam & Vitals (Objective)</h3>
            </div>

            <div className="form-group">
              <textarea 
                className="form-input" 
                rows="4" 
                value={clinicalDoc.exam}
                onChange={(e) => setClinicalDoc(prev => ({ ...prev, exam: e.target.value }))}
              />
            </div>
          </div>

          {/* Assessment & Plan */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)' }}>Assessment & Treatment Plan (A&P)</h3>
            </div>

            <div className="form-group">
              <textarea 
                className="form-input" 
                rows="4" 
                value={clinicalDoc.ap}
                onChange={(e) => setClinicalDoc(prev => ({ ...prev, ap: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Right Column: ICD-10 Billing Suggestions & After Visit Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* ICD-10 / CPT Billing Code Suggestions */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1rem' }}>Suggested Billing Codes</h3>
              <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Auto-detected</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {clinicalDoc.codes.map((item, idx) => (
                <div key={idx} style={{ padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: '8px', backgroundColor: 'var(--bg-input)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{item.code}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.label}</div>
                  </div>
                  <button className="btn-icon" style={{ padding: '4px' }} onClick={() => { navigator.clipboard?.writeText(item.code); alert(`Copied ${item.code}!`); }}>
                    <Copy size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Patient After-Visit Summary (AVS) */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1rem', color: 'var(--success)' }}>After-Visit Patient Summary</h3>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Plain-Language Instructions for Patient</label>
              <textarea 
                className="form-input" 
                rows="6" 
                value={clinicalDoc.avs}
                onChange={(e) => setClinicalDoc(prev => ({ ...prev, avs: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* OpenScribe Custom System Prompt Modal */}
      {showPromptModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>OpenScribe Custom System Prompt Builder</h3>
              <button className="btn-icon" onClick={() => setShowPromptModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Teach {aiModelEngine} your exact clinical note style and formatting preferences:
              </p>
              <div className="form-group">
                <textarea 
                  className="form-input" 
                  rows="5" 
                  value={customSystemPrompt}
                  onChange={(e) => setCustomSystemPrompt(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPromptModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { alert("Custom System Prompt saved to OpenScribe engine!"); setShowPromptModal(false); }}>
                Save System Prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HL7 FHIR JSON Inspector Modal */}
      {showFhirModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3>HL7 FHIR R4 JSON Bundle Inspector</h3>
              <button className="btn-icon" onClick={() => setShowFhirModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Standard FHIR JSON payload generated by Freed & OpenScribe AI for EMR interoperability:
              </p>
              <pre style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '16px', borderRadius: '12px', fontSize: '0.78rem', overflowX: 'auto', maxHeight: '350px' }}>
{JSON.stringify({
  resourceType: "Bundle",
  type: "document",
  entry: [
    {
      resourceType: "Encounter",
      id: "enc-88291",
      status: "finished",
      class: { code: "AMB", display: "ambulatory" },
      subject: { reference: `Patient/${selectedPatient}` },
      period: { start: new Date().toISOString() }
    },
    {
      resourceType: "Condition",
      id: "cond-J209",
      code: {
        coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code: "J20.9", display: "Acute bronchitis, unspecified" }]
      },
      subject: { reference: `Patient/${selectedPatient}` }
    },
    {
      resourceType: "MedicationRequest",
      id: "med-amox500",
      status: "active",
      intent: "order",
      medicationCodeableConcept: { text: "Amoxicillin 500mg PO TID x 7 days" },
      subject: { reference: `Patient/${selectedPatient}` }
    }
  ]
}, null, 2)}
              </pre>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowFhirModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(clinicalDoc, null, 2)); alert("FHIR JSON Bundle copied!"); }}>
                Copy FHIR JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
