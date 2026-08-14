import React, { useState, useRef } from 'react';
import { 
  Smartphone, Sparkles, Play, Pause, ShieldCheck, Zap, 
  ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Video, HeartPulse, Car, Utensils, Heart
} from 'lucide-react';
import MouseOverText from './MouseOverText';
import { playClickSound, playHoverSound } from './AudioEngine';

export default function AppSimulatorSection({ onOpenConsultation }) {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const apps = [
    {
      id: 'taxi_ai',
      name: 'Taxi AI App',
      category: 'Logistics & AI Ride Dispatch',
      badge: 'Python + PostGIS + WebSockets',
      icon: Car,
      video: '/videos/taxi_ai.mp4',
      tagline: 'Real-Time Driver Dispatch & GPS Tracking',
      desc: 'Sub-second driver matching algorithm, real-time route optimization, and live spatial GPS map dispatch.',
      features: ['Sub-Second Driver Matching', 'Live GPS Vector Route Map', 'Dynamic Fare Estimator', 'In-App Instant Audio Call']
    },
    {
      id: 'meetoo',
      name: 'MeeToo',
      category: 'Social & Matchmaking',
      badge: 'React Native + Node.js + WebRTC',
      icon: Heart,
      video: '/videos/meetoo_dating.mp4',
      tagline: 'AI Compatibility & Live Video Match',
      desc: 'Location-based matchmaking app with real-time video chat, AI personality compatibility score, and anti-spoofing verification.',
      features: ['Real-time Video Matchmaking', 'AI Personality Score', 'Location Geofence Pulse', 'Biometric Selfie Verification']
    },
    {
      id: 'foodtime',
      name: 'FoodTime',
      category: 'Food & Grocery Delivery',
      badge: 'Flutter + Django + Stripe',
      icon: Utensils,
      video: '/videos/foodtime.mp4',
      tagline: 'Hyperlocal Kitchen & Order Sync',
      desc: 'Personalized food ordering app with real-time kitchen status sync, sub-25 min delivery algorithm, and 1-click UPI checkout.',
      features: ['Sub-25 Min Delivery SLA', 'Kitchen Order Kiosk Sync', 'Live Driver Delivery Map', '1-Click UPI & Card Checkout']
    },
    {
      id: 'ai_healthcare',
      name: 'AI Health Care',
      category: 'Digital Health & Telemedicine',
      badge: 'Swift 6 + CoreML + WebRTC',
      icon: HeartPulse,
      video: '/videos/ai_healthcare.mp4',
      tagline: 'AI Symptom Checker & Telehealth',
      desc: 'Embedded AI symptom checker, doctor appointment booking, real-time Bluetooth heart monitor sync, and HIPAA-compliant prescriptions.',
      features: ['CoreML Symptom Diagnostic', 'HD Video Tele-consultation', 'Bluetooth Vitals Monitor Sync', 'HIPAA 100% Compliant']
    }
  ];

  const currentApp = apps[activeAppIndex];

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0) {
        setActiveAppIndex((prev) => Math.min(prev + 1, apps.length - 1));
      } else {
        setActiveAppIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="simulator" className="py-20 md:py-28 relative bg-slate-950/80 border-t border-b border-slate-800/80 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Requested Exact Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" /> 3D Mouse-Scrollable Video Showcases
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-100">
            Experience Our <MouseOverText text="Interactive UI/UX Mobile Apps" variant="glow" className="text-cyan-400" />
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Use your <span className="text-cyan-400 font-bold">Mouse Wheel</span> or click the 4 app platforms below to switch between live 3D video showcases.
          </p>

          {/* 4 App Platform Selector Buttons */}
          <div className="flex justify-center items-center gap-3 pt-4 flex-wrap">
            {apps.map((app, idx) => {
              const Icon = app.icon;
              const isActive = activeAppIndex === idx;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    playClickSound();
                    setActiveAppIndex(idx);
                    setIsPlaying(true);
                  }}
                  onMouseEnter={() => playHoverSound()}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'btn-ithrive-pill scale-105 shadow-xl shadow-cyan-500/30'
                      : 'btn-ithrive-outline opacity-70 hover:opacity-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D MOUSE-SCROLLABLE VIDEO STAGE CONTAINER */}
        <div 
          onWheel={handleWheel}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/40 shadow-2xl relative"
        >
          
          {/* Left Column: App Specifications & Details */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span>{currentApp.category}</span>
                <span>•</span>
                <span>{currentApp.badge}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-slate-100 font-heading">
                <MouseOverText text={currentApp.name} variant="glow" />
              </h3>

              <p className="text-sm font-semibold text-cyan-400">
                {currentApp.tagline}
              </p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {currentApp.desc}
            </p>

            {/* Features Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentApp.features.map((feat, fIdx) => (
                <div key={fIdx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="font-semibold">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4 flex-wrap">
              <button
                onClick={onOpenConsultation}
                className="btn-ithrive-pill px-8 py-3.5 text-xs sm:text-sm font-extrabold flex items-center gap-2 uppercase tracking-wider"
              >
                <span>Request Custom Build for {currentApp.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={toggleVideoPlay}
                className="btn-ithrive-outline px-5 py-3.5 text-xs font-bold flex items-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
                <span>{isPlaying ? 'Pause Video' : 'Play Video'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Smartphone Container with Mapped Video */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-[300px] sm:w-[340px] h-[600px] sm:h-[650px] bg-slate-950 rounded-[44px] p-3 border-4 border-slate-800 shadow-2xl relative overflow-hidden group hover:border-cyan-500/60 transition-colors">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
              </div>

              {/* VIDEO PLAYER SCREEN INSIDE SMARTPHONE */}
              <div className="w-full h-full rounded-[34px] overflow-hidden bg-black relative">
                <video
                  ref={videoRef}
                  key={currentApp.video}
                  src={currentApp.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Video Play Overlay */}
                <div className="absolute bottom-4 left-4 right-4 px-3 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex justify-between items-center text-xs text-white">
                  <span className="font-bold flex items-center gap-1.5 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    {currentApp.name} Live Demo
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">HD 60FPS</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
