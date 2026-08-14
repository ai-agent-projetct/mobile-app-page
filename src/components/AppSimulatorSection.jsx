import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Video, HeartPulse, Car, Utensils, Heart, Volume2, VolumeX, CheckCircle2, Lock, Unlock, Monitor
} from 'lucide-react';
import MouseOverText from './MouseOverText';
import { playClickSound, playHoverSound } from './AudioEngine';

export default function AppSimulatorSection({ onOpenConsultation }) {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  const apps = [
    {
      id: 'taxi_ai',
      name: 'Taxi AI App',
      category: 'Logistics & AI Ride Dispatch',
      badge: 'Python + PostGIS + WebSockets',
      icon: Car,
      video: '/videos/taxi_ai.mp4',
      tagline: 'Real-Time Driver Dispatch & Spatial GPS Tracking',
      desc: 'Sub-second driver matching algorithm, real-time route optimization, and spatial PostGIS map tracking scrubbing smoothly.',
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

  // 4K Ultra-Crisp Smooth Frame Lerp Loop (60 FPS)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    targetTimeRef.current = 0;
    smoothTimeRef.current = 0;
    video.currentTime = 0;

    let isRunning = true;

    const updateVideoFrame = () => {
      if (!isRunning) return;

      if (video && video.duration) {
        const diff = targetTimeRef.current - smoothTimeRef.current;
        if (Math.abs(diff) > 0.002) {
          smoothTimeRef.current += diff * 0.35;
          video.currentTime = Math.max(0, Math.min(video.duration, smoothTimeRef.current));
          
          const pct = Math.round((smoothTimeRef.current / video.duration) * 100);
          setScrollPercent(pct);
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateVideoFrame);
    };

    animationFrameRef.current = requestAnimationFrame(updateVideoFrame);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeAppIndex]);

  // Strict Section Wheel Interception & Automatic Unlocking Engine
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const handleWheel = (e) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const rect = sectionEl.getBoundingClientRect();
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight - 80;

      if (!inView) return;

      const duration = video.duration;
      const curTime = targetTimeRef.current;
      const delta = e.deltaY;

      if (delta > 0) {
        if (curTime < duration - 0.15) {
          e.preventDefault();
          e.stopPropagation();
          targetTimeRef.current = Math.min(duration, curTime + delta * 0.0032);
          setIsLocked(true);
        } else {
          targetTimeRef.current = duration;
          setScrollPercent(100);
          setIsLocked(false);
        }
      } else if (delta < 0) {
        if (curTime > 0.15) {
          e.preventDefault();
          e.stopPropagation();
          targetTimeRef.current = Math.max(0, curTime + delta * 0.0032);
          setIsLocked(true);
        } else {
          targetTimeRef.current = 0;
          setScrollPercent(0);
          setIsLocked(false);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeAppIndex]);

  return (
    <section 
      ref={sectionRef} 
      id="simulator" 
      className="relative bg-slate-950 border-t border-b border-slate-800/80 min-h-[350vh] w-full py-12"
    >
      {/* PINNED FULLSCREEN CONTAINER - 100% FULL-BLEED SCREEN WIDTH (NO LEFT/RIGHT EMPTY MARGINS) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-4 px-0 z-10 overflow-hidden bg-slate-950/95">
        
        {/* ================= ABOVE VIDEO: Section Title & 4 Platform Tabs ================= */}
        <div className="space-y-3 text-center z-20 px-4 sm:px-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            {isLocked ? <Lock className="w-3.5 h-3.5 text-cyan-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
            <span>1920x1080 Widescreen 16:9 • {isLocked ? 'Scroll Locked Until Video Completes' : 'Video Complete — Scroll Down For Next Section'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white">
            Experience Our <MouseOverText text="Interactive UI/UX Mobile Apps" variant="glow" className="text-cyan-400" />
          </h2>

          {/* 4 App Platform Buttons */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
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
                  className={`px-5 py-2 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 rounded-full ${
                    isActive
                      ? 'btn-ithrive-pill scale-105 shadow-xl shadow-cyan-500/40'
                      : 'btn-ithrive-outline bg-slate-900/90 opacity-80 hover:opacity-100 border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{app.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ================= CENTER: 100% EDGE-TO-EDGE 1920x1080 WIDESCREEN BANNER STAGE (ZERO SIDE MARGINS) ================= */}
        <div 
          className="relative w-full aspect-video max-h-[58vh] overflow-hidden border-y-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 my-auto bg-black group"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0, 229, 255, 0.3), 0 0 50px rgba(59, 130, 246, 0.25)'
          }}
        >
          {/* Standalone 100% Edge-to-Edge Widescreen Video Banner */}
          <video
            ref={videoRef}
            key={currentApp.video}
            src={currentApp.video}
            muted={isMuted}
            playsInline
            preload="auto"
            style={{
              objectFit: 'cover',
              imageRendering: '-webkit-optimize-contrast',
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden'
            }}
            className="w-full h-full object-cover"
          />

          {/* Minimal Floating Scrub Progress Counter at Bottom Right Corner */}
          <div className="absolute bottom-3 right-6 flex items-center gap-3 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md text-xs font-mono text-cyan-400 font-bold z-20">
            <span>SCRUB {scrollPercent}%</span>
            <div className="w-28 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-75"
                style={{ width: `${scrollPercent}%` }}
              ></div>
            </div>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Mouse Scroll Hint Badge */}
          <div className="absolute top-3 left-6 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 z-20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>🖱️ Scroll mouse to scrub 1920x1080 4K video banner</span>
          </div>

        </div>

        {/* ================= BELOW VIDEO: Content, Features Checklist & CTA ================= */}
        <div className="space-y-3 pt-2 z-20 bg-slate-950/95 p-4 sm:p-6 rounded-none md:rounded-2xl border-t border-slate-800 max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span>{currentApp.category}</span>
                <span>•</span>
                <span>{currentApp.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                {currentApp.name} — <span className="text-cyan-400 font-medium text-sm sm:text-base">{currentApp.tagline}</span>
              </h3>
            </div>

            <button
              onClick={onOpenConsultation}
              className="btn-ithrive-pill px-8 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 flex-shrink-0"
            >
              <span>Build {currentApp.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-800/80">
            {currentApp.features.map((feat, fIdx) => (
              <div key={fIdx} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
