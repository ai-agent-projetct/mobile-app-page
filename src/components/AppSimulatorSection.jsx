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
      desc: 'Ultra-crisp 4K high-bitrate video showcase with 60 FPS frame interpolation lerp scrubbing.',
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

  // 4K Ultra-Crisp Smooth Frame Lerp Interpolation Engine (60 FPS Smooth Scrubbing)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    targetTimeRef.current = 0;
    smoothTimeRef.current = 0;
    video.currentTime = 0;

    let isRunning = true;

    // Smooth Lerp Loop (smoothTime += (targetTime - smoothTime) * 0.35)
    const updateVideoFrame = () => {
      if (!isRunning) return;

      if (video && video.duration) {
        const diff = targetTimeRef.current - smoothTimeRef.current;
        if (Math.abs(diff) > 0.005) {
          smoothTimeRef.current += diff * 0.35; // Buttery-smooth lerp interpolation
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

  // Wheel Interception Lock Handler
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const handleWheel = (e) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const rect = sectionEl.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;

      if (!inView) return;

      const duration = video.duration;
      const curTime = targetTimeRef.current;
      const delta = e.deltaY;

      // Downward Scroll
      if (delta > 0) {
        if (curTime < duration - 0.1) {
          e.preventDefault(); // Freeze page body scroll
          targetTimeRef.current = Math.min(duration, curTime + delta * 0.0032);
          setIsLocked(true);
        } else {
          targetTimeRef.current = duration;
          setScrollPercent(100);
          setIsLocked(false);
        }
      } 
      // Upward Scroll
      else if (delta < 0) {
        if (curTime > 0.1) {
          e.preventDefault(); // Freeze page body scroll
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
      className="relative bg-slate-950 border-t border-b border-slate-800/80 h-screen w-full overflow-hidden"
    >
      {/* 100% FULL-BLEED 4K WIDESCREEN BANNER STAGE */}
      <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-black">
        
        {/* BACKGROUND 4K VIDEO PLAYER WITH HARDWARE ACCELERATED CRISP RENDERING */}
        <div className="absolute inset-0 w-full h-full z-0">
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
            className="w-full h-full object-cover shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/20 to-slate-950/95 pointer-events-none"></div>
        </div>

        {/* TOP FLOATING OVERLAY */}
        <div className="relative z-20 w-full pt-6 px-4 sm:px-8 lg:px-12 text-center space-y-3">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span>4K Ultra-Crisp • {isLocked ? 'Page Scroll Locked Until Video Completes' : 'Video Complete — Page Unlocked'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white drop-shadow-lg">
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
                  className={`px-5 py-2 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 rounded-full backdrop-blur-md ${
                    isActive
                      ? 'btn-ithrive-pill scale-105 shadow-xl shadow-cyan-500/40'
                      : 'btn-ithrive-outline bg-slate-950/80 opacity-80 hover:opacity-100 border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{app.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* MIDDLE RIGHT FLOATING STATUS */}
        <div className="relative z-20 self-end mr-6 sm:mr-12 mb-auto px-4 py-2 rounded-full bg-slate-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xl">
          <span className={`w-2.5 h-2.5 rounded-full ${scrollPercent < 100 ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`}></span>
          <span>{scrollPercent < 100 ? '🖱️ Scroll mouse for 4K video playback (Page locked)' : '✅ Video Complete! Scroll down for next section ↓'}</span>
        </div>

        {/* BOTTOM FLOATING OVERLAY */}
        <div className="relative z-20 w-full pb-8 px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md">
              <span>{currentApp.category}</span>
              <span>•</span>
              <span>{currentApp.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading drop-shadow-md">
              {currentApp.name} — <span className="text-cyan-400 font-medium text-base sm:text-lg">{currentApp.tagline}</span>
            </h3>

            <div className="hidden sm:flex items-center gap-2 pt-1 flex-wrap">
              {currentApp.features.map((feat, fIdx) => (
                <span key={fIdx} className="px-3 py-1 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            
            {/* Timeline Counter & Mute Button */}
            <div className="flex items-center justify-between gap-3 bg-slate-950/95 p-3 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-2xl">
              <div className="text-xs font-mono text-cyan-400 font-bold min-w-[75px]">
                SCRUB {scrollPercent}%
              </div>
              <div className="w-32 sm:w-44 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-75 shadow-lg shadow-cyan-500/50"
                  style={{ width: `${scrollPercent}%` }}
                ></div>
              </div>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={onOpenConsultation}
              className="btn-ithrive-pill px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl flex-shrink-0"
            >
              <span>Build {currentApp.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
