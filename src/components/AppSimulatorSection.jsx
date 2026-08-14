import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, ShieldCheck, ArrowRight, Video, HeartPulse, Car, Utensils, Heart, Play, Pause, RefreshCw, Volume2, VolumeX
} from 'lucide-react';
import MouseOverText from './MouseOverText';
import { playClickSound, playHoverSound } from './AudioEngine';

export default function AppSimulatorSection({ onOpenConsultation }) {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const requestRef = useRef(null);

  const apps = [
    {
      id: 'taxi_ai',
      name: 'Taxi AI App',
      category: 'Logistics & AI Ride Dispatch',
      badge: 'Python + PostGIS + WebSockets',
      icon: Car,
      video: '/videos/taxi_ai.mp4',
      tagline: 'Real-Time Driver Dispatch & Spatial GPS Tracking',
      desc: 'Experience sub-second driver dispatch algorithm, real-time route optimization, and spatial PostGIS map tracking scrubbing smoothly with your mouse scroll.',
      features: ['Sub-Second Driver Matching', 'Live Spatial GPS Map', 'Dynamic Fare Estimator', 'In-App Instant Audio Call']
    },
    {
      id: 'meetoo',
      name: 'MeeToo',
      category: 'Social & Matchmaking',
      badge: 'React Native + Node.js + WebRTC',
      icon: Heart,
      video: '/videos/meetoo_dating.mp4',
      tagline: 'AI Compatibility & Live Video Matchmaking',
      desc: 'Location-based matchmaking platform with real-time video chat, AI personality compatibility score, and anti-spoofing selfie verification.',
      features: ['Real-time Video Matchmaking', 'AI Personality Score', 'Location Geofence Pulse', 'Biometric Selfie Verification']
    },
    {
      id: 'foodtime',
      name: 'FoodTime',
      category: 'Food & Grocery Delivery',
      badge: 'Flutter + Django + Stripe',
      icon: Utensils,
      video: '/videos/foodtime.mp4',
      tagline: 'Hyperlocal Kitchen Kiosk & Delivery Track',
      desc: 'Personalized food ordering platform with real-time kitchen status sync, sub-25 min delivery algorithm, and 1-click UPI checkout.',
      features: ['Sub-25 Min Delivery SLA', 'Kitchen Order Kiosk Sync', 'Live Driver Delivery Map', '1-Click UPI & Card Checkout']
    },
    {
      id: 'ai_healthcare',
      name: 'AI Health Care',
      category: 'Digital Health & Telemedicine',
      badge: 'Swift 6 + CoreML + WebRTC',
      icon: HeartPulse,
      video: '/videos/ai_healthcare.mp4',
      tagline: 'AI Symptom Diagnostic & Telehealth',
      desc: 'Embedded AI symptom checker, doctor appointment booking, real-time Bluetooth heart monitor sync, and HIPAA-compliant digital prescriptions.',
      features: ['CoreML Symptom Diagnostic', 'HD Video Tele-consultation', 'Bluetooth Vitals Monitor Sync', 'HIPAA 100% Compliant']
    }
  ];

  const currentApp = apps[activeAppIndex];

  // Scroll-Driven Video Scrubbing Engine (Matching coonoor-club Hero Scrubbing)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress from 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollPercent(Math.round(progress * 100));

      // Scrub Video currentTime smoothly based on scroll progress
      if (videoRef.current.duration) {
        const targetTime = progress * videoRef.current.duration;
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.04) {
          videoRef.current.currentTime = targetTime;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeAppIndex]);

  return (
    <section 
      ref={sectionRef} 
      id="simulator" 
      className="relative bg-slate-950 border-t border-b border-slate-800/80 min-h-[220vh]"
    >
      {/* Sticky Pin Container during Scroll */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
        
        {/* Top Header & 4 App Selector Tabs */}
        <div className="space-y-4 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" /> Mouse-Scrollable 16:9 Video Scrubbing
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-100">
            Experience Our <MouseOverText text="Interactive UI/UX Mobile Apps" variant="glow" className="text-cyan-400" />
          </h2>

          {/* 4 App Platform Buttons */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap pt-1">
            {apps.map((app, idx) => {
              const Icon = app.icon;
              const isActive = activeAppIndex === idx;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    playClickSound();
                    setActiveAppIndex(idx);
                  }}
                  onMouseEnter={() => playHoverSound()}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 rounded-full ${
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

        {/* CENTER: 16:9 FULL-WIDTH WIDESCREEN SCROLLABLE VIDEO STAGE */}
        <div className="relative w-full aspect-video max-h-[58vh] rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 group">
          
          <video
            ref={videoRef}
            key={currentApp.video}
            src={currentApp.video}
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* Video Gradient Overlay with App Info */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none"></div>

          {/* Bottom Video Controls & Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 z-20">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span>{currentApp.category}</span>
                <span>•</span>
                <span>{currentApp.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                {currentApp.name} — <span className="text-cyan-400 font-medium text-sm sm:text-base">{currentApp.tagline}</span>
              </h3>
            </div>

            {/* Scroll Timeline Progress Bar & Sound Toggle */}
            <div className="flex items-center gap-3 bg-slate-950/90 p-2.5 rounded-2xl border border-slate-800 backdrop-blur-md">
              <div className="text-xs font-mono text-cyan-400 font-bold min-w-[75px]">
                SCRUB {scrollPercent}%
              </div>
              <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-75"
                  style={{ width: `${scrollPercent}%` }}
                ></div>
              </div>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Scroll Down Indicator Overlay */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 animate-bounce">
            <span>🖱️ Scroll Mouse to Scrub Video</span>
          </div>

        </div>

        {/* BOTTOM: App Features & CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          
          <div className="flex items-center gap-2 flex-wrap">
            {currentApp.features.map((feat, fIdx) => (
              <span key={fIdx} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {feat}
              </span>
            ))}
          </div>

          <button
            onClick={onOpenConsultation}
            className="btn-ithrive-pill px-6 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 flex-shrink-0"
          >
            <span>Build {currentApp.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </section>
  );
}
