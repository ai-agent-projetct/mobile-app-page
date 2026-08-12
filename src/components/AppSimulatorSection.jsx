import React, { useState } from 'react';
import { 
  Sparkles, Smartphone, CreditCard, HeartPulse, 
  ShoppingBag, Truck, Check, RefreshCw, ArrowRight, ShieldCheck
} from 'lucide-react';
import MouseOverText from './MouseOverText';

export default function AppSimulatorSection({ activeScreen, onScreenChange, onOpenConsultation }) {
  const [simulatedBalance, setSimulatedBalance] = useState(485920);
  const [simulatedHeartRate, setSimulatedHeartRate] = useState(72);
  const [cartCount, setCartCount] = useState(1);

  const apps = [
    {
      id: 'fintech',
      name: 'iPay FinTech Mobile Wallet',
      category: 'Banking & Payments',
      tech: 'SwiftUI + Kotlin + UPI 2.0 API',
      description: 'Instant UPI payments, crypto asset tracking, biometrically secured wallet, and real-time spending analytics with sub-second execution.',
      icon: CreditCard,
      color: 'cyan'
    },
    {
      id: 'healthcare',
      name: 'CarePulse AI Health App',
      category: 'Digital Health & Telemedicine',
      tech: 'Flutter + CoreML + Video Call SDK',
      description: 'AI symptom checker, doctor appointment booking, real-time Bluetooth heart monitor sync, and automated digital prescriptions.',
      icon: HeartPulse,
      color: 'emerald'
    },
    {
      id: 'ecommerce',
      name: 'Luxe Cart 3D E-Commerce',
      category: 'Retail & Shopping',
      tech: 'React Native + Three.js AR + Stripe',
      description: 'Immersive 3D product view with AR virtual try-on, 1-click Apple Pay/Google Pay checkout, and AI recommendation engine.',
      icon: ShoppingBag,
      color: 'purple'
    },
    {
      id: 'delivery',
      name: 'QuickRunner On-Demand App',
      category: 'Logistics & Delivery',
      tech: 'Flutter + Google Maps SDK + WebSockets',
      description: 'Hyperlocal real-time GPS tracking for delivery drivers, automated dispatch algorithm, and in-app instant chat.',
      icon: Truck,
      color: 'amber'
    }
  ];

  const currentApp = apps.find(a => a.id === activeScreen) || apps[0];

  return (
    <section id="simulator" className="py-20 md:py-28 relative bg-slate-950/80 border-t border-b border-slate-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-100">
            Experience Our <MouseOverText text="Interactive 3D Mobile App Demos" variant="glow" className="text-cyan-400" />
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Select an industry vertical below to test-drive simulated mobile application features engineered by iThrive Software.
          </p>
        </div>

        {/* Industry Switcher Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {apps.map((app) => {
            const AppIcon = app.icon;
            const isSelected = activeScreen === app.id;
            return (
              <button
                key={app.id}
                onClick={() => onScreenChange(app.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 scale-[1.02]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  <AppIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">
                    <MouseOverText text={app.name.split(' ')[0] + ' ' + app.name.split(' ')[1]} />
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{app.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Panel */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
              <span>{currentApp.category}</span>
              <span>•</span>
              <span className="text-slate-400">{currentApp.tech}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
              <MouseOverText text={currentApp.name} variant="glow" />
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentApp.description}
            </p>

            {/* Interactive Feature Controls */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span>Simulated In-App Action:</span>
                <span className="text-cyan-400">Live State Update</span>
              </div>

              {activeScreen === 'fintech' && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSimulatedBalance(prev => prev + 5000)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    + Add ₹5,000 Fund
                  </button>

                  <button
                    onClick={() => setSimulatedBalance(prev => Math.max(1000, prev - 2500))}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                  >
                    - Send ₹2,500 UPI
                  </button>

                  <span className="text-xs font-mono text-cyan-300 ml-auto">
                    Balance: ₹{simulatedBalance.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {activeScreen === 'healthcare' && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSimulatedHeartRate(prev => Math.min(140, prev + 8))}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Simulate Heart Rate
                  </button>

                  <span className="text-xs font-mono text-emerald-300 ml-auto">
                    Pulse: {simulatedHeartRate} BPM
                  </span>
                </div>
              )}

              {activeScreen === 'ecommerce' && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCartCount(prev => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    Add 3D AR Headset to Cart
                  </button>

                  <span className="text-xs font-mono text-purple-300 ml-auto">
                    Cart Items: {cartCount}
                  </span>
                </div>
              )}

              {activeScreen === 'delivery' && (
                <div className="flex items-center gap-3 text-xs text-amber-300">
                  <Truck className="w-4 h-4 animate-bounce" />
                  <span>Driver assigned near Anna Nagar, Chennai (ETA 12m)</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Build Similar App for Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Mobile Visual Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[280px] h-[480px] rounded-[36px] bg-slate-950 border-4 border-slate-800 shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-b-xl"></div>
              
              <div className="pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-cyan-400">{currentApp.name.split(' ')[0]} App</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Live</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Status</span>
                    <span className="text-emerald-400 font-bold">Active Engine</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[85%] animate-pulse"></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  "iThrive Software's 3D UI architecture delivers zero latency and instant user interaction."
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center text-[10px] text-slate-400">
                Powered by iThrive Mobile SDK
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
