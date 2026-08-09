import React, { useState, useEffect } from 'react';
import { 
  Bot, Phone, MessageSquare, Database, Sparkles, Check, Play, Pause, 
  Volume2, ShieldCheck, Activity, Calendar, Pill, AlertTriangle, Send, RefreshCw 
} from 'lucide-react';

export default function AgenticAiConsole({ 
  patients, 
  doctors, 
  appointments, 
  addAppointment, 
  addAuditLog, 
  currentRole 
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('Tamil');
  const [selectedPatientId, setSelectedPatientId] = useState('PAT-101');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0);
  const [whatsappDelivered, setWhatsappDelivered] = useState(false);
  const [aiPrediction, setAiPrediction] = useState(null);

  // 6 Languages Support Map
  const languageOptions = [
    { code: 'English', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'Tamil', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'Malayalam', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
    { code: 'Kannada', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'Telugu', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'Hindi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' }
  ];

  // Selected Patient Details from DB
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Database Patient History Records & Active Medications (Simulated DB fetch)
  const patientMemory = {
    'PAT-101': {
      visitCount: 4,
      lastVisitDate: '18 May 2026',
      pastVisits: [
        { date: '12 Jan 2026', dept: 'General Medicine', doctor: 'Dr. Arun Kumar', reason: 'Seasonal Flu & Fever' },
        { date: '04 Mar 2026', dept: 'Cardiology', doctor: 'Dr. Arun Kumar', reason: 'Mild Chest Discomfort' },
        { date: '18 May 2026', dept: 'Cardiology', doctor: 'Dr. Priya Sharma', reason: 'BP Routine Follow-up' },
        { date: '09 Aug 2026 (Today)', dept: 'Cardiology', doctor: 'Dr. Arun Kumar', reason: 'Chest Pain & Palpitations' }
      ],
      currentMedications: [
        { name: 'Metformin 500mg', dosage: '1-0-1 after food', condition: 'Type 2 Diabetes' },
        { name: 'Ramipril 2.5mg', dosage: '1-0-0 before food', condition: 'Hypertension' },
        { name: 'Atorvastatin 10mg', dosage: '0-0-1 at bedtime', condition: 'Hyperlipidemia' }
      ],
      aiPredictionModel: {
        diseaseRisk: 'Elevated Risk of Hypertensive Cardiac Strain (88% Confidence)',
        recommendedAction: 'Immediate ECG & Echocardiogram evaluation under Cardiology',
        suggestedSpecialist: 'Dr. Arun Kumar (Senior Cardiologist)',
        medicationReview: 'Check for potential interaction with Beta-Blockers if prescribed.'
      }
    },
    'PAT-102': {
      visitCount: 2,
      lastVisitDate: '10 Jun 2026',
      pastVisits: [
        { date: '15 Feb 2026', dept: 'Dermatology', doctor: 'Dr. Sarah Mathews', reason: 'Skin Allergy' },
        { date: '10 Jun 2026', dept: 'Dermatology', doctor: 'Dr. Sarah Mathews', reason: 'Eczema Follow-up' }
      ],
      currentMedications: [
        { name: 'Loratadine 10mg', dosage: '0-0-1 once daily', condition: 'Allergic Dermatitis' },
        { name: 'Hydrocortisone 1% Cream', dosage: 'Apply twice daily', condition: 'Skin Rash' }
      ],
      aiPredictionModel: {
        diseaseRisk: 'Seasonal Contact Dermatitis Exacerbation (76% Confidence)',
        recommendedAction: 'Allergen patch test & prescription renewal',
        suggestedSpecialist: 'Dr. Sarah Mathews (HOD Dermatology)',
        medicationReview: 'Current topical corticosteroid regimen is well tolerated.'
      }
    }
  };

  const currentMemory = patientMemory[selectedPatientId] || patientMemory['PAT-101'];

  // Multilingual Dialogue Datasets
  const multilingualDialogues = {
    English: [
      { speaker: 'ai', text: `Hello Mr. ${selectedPatient.name}! Welcome back to ABC Hospital. I see this is your ${currentMemory.visitCount}th visit with us. How can I assist you today?` },
      { speaker: 'patient', text: "Hello AI! I have been getting chest tightness since morning. Can you check my records and book me with my doctor?" },
      { speaker: 'ai', text: `Checking your electronic health database... You are currently undergoing medication with ${currentMemory.currentMedications[0].name} and ${currentMemory.currentMedications[1].name}.` },
      { speaker: 'ai', text: `AI Predictive Risk Analysis: ${currentMemory.aiPredictionModel.diseaseRisk}. I recommend booking with ${currentMemory.aiPredictionModel.suggestedSpecialist}.` },
      { speaker: 'ai', text: `Booking confirmed with Dr. Arun Kumar for Today at 05:00 PM. Instant WhatsApp confirmation and medication summary sent to ${selectedPatient.phone}!` }
    ],
    Tamil: [
      { speaker: 'ai', text: `வணக்கம் ${selectedPatient.name} அவர்களின் நினைவகம்! ABC மருத்துவமனைக்கு மீண்டும் நல்வரவு. இது உங்களின் ${currentMemory.visitCount}-வது வருகை ஆகும்.` },
      { speaker: 'patient', text: "வணக்கம் ஏஐ! எனக்கு நெஞ்சு பாரமாக இருக்கிறது. என் மருத்துவ பதிவுகளை பார்த்து அப்பாயிண்ட்மென்ட் முன்பதிவு செய்யுங்கள்." },
      { speaker: 'ai', text: `உங்கள் மருத்துவ தரவுத்தளத்தை ஆய்வு செய்கிறேன்... நீங்கள் தற்போது ${currentMemory.currentMedications[0].name} மற்றும் ${currentMemory.currentMedications[1].name} மாத்திரைகளை சாப்பிட்டு வருகிறீர்கள்.` },
      { speaker: 'ai', text: `ஏஐ சுகாதார கணிப்பு: ${currentMemory.aiPredictionModel.diseaseRisk}. டாக்டர் அருண் குமாரை சந்திக்க பரிந்துரைக்கப்படுகிறது.` },
      { speaker: 'ai', text: `இன்று மாலை 5:00 மணிக்கு அப்பாயிண்ட்மென்ட் உறுதி செய்யப்பட்டது. வாட்ஸ்அப் செய்தி ${selectedPatient.phone} எண்ணிற்கு அனுப்பப்பட்டது!` }
    ],
    Malayalam: [
      { speaker: 'ai', text: `നമസ്കാരം ${selectedPatient.name}! ABC ഹോസ്പിറ്റലിലേക്ക് സ്വാഗതം. ഇത് താങ്കളുടെ ${currentMemory.visitCount}-ാം സന്ദർശനമാണ്.` },
      { speaker: 'patient', text: "ഹലോ AI! എനിക്ക് നെഞ്ചുവേദന അനുഭവപ്പെടുന്നു. എന്റെ മെഡിക്കൽ റെക്കോർഡുകൾ പരിശോധിച്ച് അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക." },
      { speaker: 'ai', text: `താങ്കളുടെ മെഡിക്കൽ റെക്കോർഡുകൾ പരിശോധിക്കുന്നു... താങ്കൾ ഇപ്പോൾ ${currentMemory.currentMedications[0].name} കഴിക്കുന്നുണ്ട്.` },
      { speaker: 'ai', text: `AI പ്രവചനം: ${currentMemory.aiPredictionModel.diseaseRisk}. ഡോക്ടർ അരുൺ കുമാറിനെ കാണാൻ നിർദ്ദേശിക്കുന്നു.` },
      { speaker: 'ai', text: `ഇന്ന് വൈകുന്നേരം 5:00 മണിക്ക് അപ്പോയിന്റ്മെന്റ് ഉറപ്പാക്കി. വാട്ട്‌സ്ആപ്പ് സന്ദേശം അയച്ചു!` }
    ],
    Kannada: [
      { speaker: 'ai', text: `ನಮಸ್ಕಾರ ${selectedPatient.name}! ABC ಆಸ್ಪತ್ರೆಗೆ ಸುಸ್ವಾಗತ. ಇದು ನಿಮ್ಮ ${currentMemory.visitCount}ನೇ ಭೇಟಿಯಾಗಿದೆ.` },
      { speaker: 'patient', text: "ಹಲೋ AI! ನನಗೆ ಎದೆ ನೋವು ಕಾಣಿಸಿಕೊಂಡಿದೆ. ನನ್ನ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ." },
      { speaker: 'ai', text: `ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ... ನೀವು ಪ್ರಸ್ತುತ ${currentMemory.currentMedications[0].name} ಔಷಧಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೀರಿ.` },
      { speaker: 'ai', text: `AI ಮುನ್ಸೂಚನೆ: ${currentMemory.aiPredictionModel.diseaseRisk}. ಡಾ. ಅರುಣ್ ಕುಮಾರ್ ಅವರ ಭೇಟಿಗೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.` },
      { speaker: 'ai', text: `ಇಂದು ಸಂಜೆ 5:00 ಗಂಟೆಗೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ವಾಟ್ಸಾಪ್ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸಲಾಗಿದೆ!` }
    ],
    Telugu: [
      { speaker: 'ai', text: `నమస్కారం ${selectedPatient.name}! ABC హాస్పిటల్‌కు స్వాగతం. ఇది మీకు ${currentMemory.visitCount}వ సందర్శన.` },
      { speaker: 'patient', text: "హలో AI! నాకు ఛాతీలో నొప్పిగా ఉంది. నా మెడికల్ రికార్డులను చూసి అపాయింట్‌మెంట్ బుక్ చేయండి." },
      { speaker: 'ai', text: `మీ మెడికల్ రికార్డులను పరిశీలిస్తున్నాను... మీరు ప్రస్తుతం ${currentMemory.currentMedications[0].name} వాడుతున్నారు.` },
      { speaker: 'ai', text: `AI ముందస్తు అంచనా: ${currentMemory.aiPredictionModel.diseaseRisk}. డాక్టర్ అరుణ్ కుమార్‌ను సంప్రదించండి.` },
      { speaker: 'ai', text: `ఈ రోజు సాయంత్రం 5:00 గంటలకు అపాయింట్‌మెంట్ ఖరారైంది. వాట్సాప్ సందేశం పంపబడింది!` }
    ],
    Hindi: [
      { speaker: 'ai', text: `नमस्ते ${selectedPatient.name} जी! ABC अस्पताल में आपका स्वागत है। यह आपकी ${currentMemory.visitCount}वीं यात्रा है।` },
      { speaker: 'patient', text: "नमस्ते AI! मुझे सीने में जकड़न हो रही है। कृपया मेरे मेडिकल रिकॉर्ड देखकर अपॉइंटमेंट बुक करें।" },
      { speaker: 'ai', text: `आपके मेडिकल रिकॉर्ड की जांच की जा रही है... आप वर्तमान में ${currentMemory.currentMedications[0].name} और ${currentMemory.currentMedications[1].name} की दवा ले रहे हैं।` },
      { speaker: 'ai', text: `AI स्वास्थ्य पूर्वानुमान: ${currentMemory.aiPredictionModel.diseaseRisk}। डॉ. अरुण कुमार से परामर्श की सलाह दी जाती है।` },
      { speaker: 'ai', text: `आज शाम 5:00 बजे अपॉइंटमेंट कन्फर्म हो गया है। व्हाट्सएप मैसेज भेज दिया गया है!` }
    ]
  };

  const activeScript = multilingualDialogues[selectedLanguage] || multilingualDialogues['English'];

  const handleStartVoiceCall = () => {
    setIsVoiceActive(true);
    setVoiceStep(0);
    setWhatsappDelivered(false);
    setAiPrediction(currentMemory.aiPredictionModel);
    addAuditLog("Agentic AI", `Initiated Multilingual Voice Call (${selectedLanguage})`, "Agentic AI Studio", `Patient ${selectedPatient.name} (Visits: ${currentMemory.visitCount})`);
  };

  const handleNextVoiceStep = () => {
    if (voiceStep < activeScript.length - 1) {
      setVoiceStep(prev => prev + 1);
      if (voiceStep === activeScript.length - 2) {
        setWhatsappDelivered(true);
        // Automatically write appointment to DB
        const newApt = {
          id: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
          patient: selectedPatient.name,
          doctor: 'Dr. Arun Kumar',
          department: 'Cardiology',
          date: '2026-08-09',
          time: '05:00 PM',
          status: 'Confirmed',
          type: 'Offline',
          fee: 800
        };
        addAppointment(newApt);
        addAuditLog("Agentic AI", "Booked Appointment via Multilingual Voice", "Appointments", `Booking ID: ${newApt.id} in ${selectedLanguage}`);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h2>
            Agentic AI Voice & Clinical Memory Engine
            <span className="badge badge-info" style={{ marginLeft: '12px', backgroundColor: '#f3e8ff', color: '#6b21a8', border: '1px solid #d8b4fe' }}>
              🤖 Autonomous 6-Language Agent
            </span>
          </h2>
          <p>Autonomous Agentic AI that speaks 6 languages, queries medical records history, analyzes ongoing medications, predicts health risks, and dispatches instant WhatsApp notifications.</p>
        </div>
      </div>

      {/* 6-Language Selector Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px 20px', backgroundColor: 'var(--bg-input)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Select Agent Voice Language:</span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              {languageOptions.map((lang, idx) => (
                <button 
                  key={idx}
                  className={`btn ${selectedLanguage === lang.code ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  onClick={() => { setSelectedLanguage(lang.code); setVoiceStep(0); }}
                >
                  {lang.flag} {lang.label} ({lang.native})
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Select Patient:</span>
            <select 
              className="role-dropdown"
              value={selectedPatientId}
              onChange={(e) => { setSelectedPatientId(e.target.value); setVoiceStep(0); }}
            >
              {patients.map((p, idx) => (
                <option key={idx} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid-main-side">
        {/* Left Side: Agentic AI Voice Simulator & Live Transcript */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Agentic Voice Call Control Card */}
          <div className="card" style={{ border: isVoiceActive ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={22} style={{ color: 'var(--primary)' }} /> 
                Agentic Voice Engine ({selectedLanguage})
              </h3>
              <span className="badge badge-success">Language: {selectedLanguage}</span>
            </div>

            {!isVoiceActive ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '16px' }}>
                  <Phone size={32} />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>Start Agentic AI Voice Call</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '400px', marginBottom: '20px' }}>
                  Simulate an inbound patient phone call in <strong>{selectedLanguage}</strong>. The Agentic AI will autonomously query patient EMR history, past visits count, active medications, and predict health risks.
                </p>
                <button className="btn btn-primary" onClick={handleStartVoiceCall} style={{ padding: '12px 24px' }}>
                  <Play size={16} /> Initiate {selectedLanguage} Voice Session
                </button>
              </div>
            ) : (
              <div>
                {/* Active Call Live Transcript */}
                <div className="chat-container" style={{ height: '280px' }}>
                  {activeScript.slice(0, voiceStep + 1).map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg.speaker === 'ai' ? 'ai' : 'patient'}`}>
                      <span className="chat-sender">
                        {msg.speaker === 'ai' ? `Agentic AI (${selectedLanguage})` : `Patient (${selectedPatient.name})`}
                      </span>
                      {msg.text}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  {voiceStep < activeScript.length - 1 ? (
                    <button className="btn btn-primary" onClick={handleNextVoiceStep} style={{ flex: 1, justifyContent: 'center' }}>
                      Continue Agentic Dialogue ({voiceStep + 1}/{activeScript.length}) <ChevronRight size={16} />
                    </button>
                  ) : (
                    <div className="badge badge-success" style={{ padding: '10px 14px', flex: 1, justifyContent: 'center' }}>
                      <Check size={16} /> Booking Completed & WhatsApp Sent
                    </div>
                  )}
                  <button className="btn btn-danger" onClick={() => setIsVoiceActive(false)}>
                    End Call Session
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instant WhatsApp Notification Delivery Mockup */}
          {whatsappDelivered && (
            <div className="card">
              <div className="card-header">
                <h3>
                  <MessageSquare size={18} style={{ color: '#25D366' }} /> 
                  Automated WhatsApp Notification Sent
                </h3>
                <span className="badge badge-success">Delivered ✓✓</span>
              </div>

              <div className="whatsapp-preview">
                <div className="whatsapp-header">
                  <div className="whatsapp-avatar">H</div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>ABC Hospital Agentic Care</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>WhatsApp Business API</div>
                  </div>
                </div>
                <div className="whatsapp-body">
                  <div className="whatsapp-bubble">
                    <strong>🏥 ABC Hospital Booking Ticket</strong>
                    {`\n\nPatient Name: ${selectedPatient.name}\nPatient ID: ${selectedPatient.id}\nRecorded Hospital Visits: ${currentMemory.visitCount} Visits\n\n✅ Appointment Confirmed!\nDoctor: Dr. Arun Kumar (Senior Cardiologist)\nDate: Today (09 Aug 2026)\nTime: 05:00 PM\nLocation: 3rd Floor, Cardiology Wing\n\n💊 Active Medication Summary:\n${currentMemory.currentMedications.map(m => `- ${m.name} (${m.dosage})`).join('\n')}\n\n🔮 AI Health Prediction:\n${currentMemory.aiPredictionModel.diseaseRisk}\n\nWe look forward to serving you.`}
                    
                    <div className="whatsapp-actions" style={{ marginTop: '10px' }}>
                      <button className="whatsapp-btn">View Route Map</button>
                      <button className="whatsapp-btn">Reschedule</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Database Memory & AI Prediction System */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Patient EMR Memory & Visit Counter Card */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)' }}>
                <Database size={18} /> EMR Memory & Visit Tracker
              </h3>
              <span className="badge badge-info">{selectedPatient.name}</span>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-input)', borderRadius: '12px', marginBottom: '16px', textAlignment: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Longitudinal Hospital Visits</span>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginTop: '2px', fontFamily: 'var(--font-display)' }}>
                {currentMemory.visitCount} Times
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Last Visit: {currentMemory.lastVisitDate}</div>
            </div>

            {/* Past Visits Timeline */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>PAST VISITS HISTORY LOG</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentMemory.pastVisits.map((v, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong>{v.date}</strong> — {v.doctor}
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{v.reason}</div>
                    </div>
                    <span className="badge badge-secondary" style={{ padding: '2px 6px', fontSize: '0.68rem', height: 'fit-content' }}>{v.dept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Ongoing Medications */}
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>CURRENT ACTIVE MEDICATIONS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentMemory.currentMedications.map((m, idx) => (
                  <div key={idx} style={{ padding: '10px 12px', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ color: '#0369a1' }}>💊 {m.name}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600 }}>{m.condition}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#334155', marginTop: '2px' }}>Dosage: {m.dosage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Health Risk Prediction Engine Card */}
          <div className="card" style={{ border: '1px solid #d8b4fe', backgroundColor: '#faf5ff' }}>
            <div className="card-header">
              <h3 style={{ fontSize: '1rem', color: '#6b21a8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: '#9333ea' }} /> AI Health Prediction Engine
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9333ea', textTransform: 'uppercase' }}>Predicted Health Risk</span>
                <div style={{ fontWeight: 'bold', color: '#581c87', marginTop: '2px' }}>{currentMemory.aiPredictionModel.diseaseRisk}</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9333ea', textTransform: 'uppercase' }}>Recommended Clinical Action</span>
                <div style={{ color: '#334155', marginTop: '2px' }}>{currentMemory.aiPredictionModel.recommendedAction}</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9333ea', textTransform: 'uppercase' }}>Medication Interaction Check</span>
                <div style={{ color: '#334155', marginTop: '2px' }}>{currentMemory.aiPredictionModel.medicationReview}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
