import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, RoundedBox, Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Smartphone, Shield, Zap, TrendingUp, CreditCard, HeartPulse, 
  ShoppingBag, Sparkles, CheckCircle2, Star, ArrowRight, Bell, Search, User
} from 'lucide-react';

/**
 * 3D Smartphone Mesh Component with interactive material color, rotation & live screen UI
 */
function PhoneModel({ finishColor, activeScreen, onScreenClick }) {
  const phoneGroup = useRef();
  const screenRef = useRef();

  // Mouse tilt tracking
  useFrame((state) => {
    if (!phoneGroup.current) return;
    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Smooth lerp rotation toward mouse position
    phoneGroup.current.rotation.y = THREE.MathUtils.lerp(phoneGroup.current.rotation.y, mouseX * 0.45, 0.08);
    phoneGroup.current.rotation.x = THREE.MathUtils.lerp(phoneGroup.current.rotation.x, -mouseY * 0.35, 0.08);
    
    // Gentle floating bob
    phoneGroup.current.position.y = Math.sin(t * 1.5) * 0.12;
  });

  // Material finish colors map
  const finishMaterials = {
    cyan: { color: '#06b6d4', roughness: 0.15, metalness: 0.85, emissive: '#0284c7', emissiveIntensity: 0.2 },
    emerald: { color: '#10b981', roughness: 0.15, metalness: 0.85, emissive: '#059669', emissiveIntensity: 0.2 },
    violet: { color: '#8b5cf6', roughness: 0.15, metalness: 0.85, emissive: '#7c3aed', emissiveIntensity: 0.2 },
    titanium: { color: '#334155', roughness: 0.25, metalness: 0.9, emissive: '#0f172a', emissiveIntensity: 0.1 },
    gold: { color: '#f59e0b', roughness: 0.2, metalness: 0.85, emissive: '#d97706', emissiveIntensity: 0.2 }
  };

  const currentMat = finishMaterials[finishColor] || finishMaterials.cyan;

  return (
    <group ref={phoneGroup} scale={[1.1, 1.1, 1.1]} position={[0, 0, 0]}>
      {/* Phone Body Base Chassis */}
      <RoundedBox args={[2.5, 5.0, 0.35]} radius={0.25} smoothness={8}>
        <meshStandardMaterial
          color={currentMat.color}
          metalness={currentMat.metalness}
          roughness={currentMat.roughness}
          emissive={currentMat.emissive}
          emissiveIntensity={currentMat.emissiveIntensity}
        />
      </RoundedBox>

      {/* Screen Bezel (Front Black Frame) */}
      <RoundedBox args={[2.42, 4.92, 0.36]} radius={0.22} smoothness={8} position={[0, 0, 0.01]}>
        <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
      </RoundedBox>

      {/* Glass Screen Display Area */}
      <mesh ref={screenRef} position={[0, 0, 0.19]}>
        <planeGeometry args={[2.3, 4.7]} />
        <meshBasicMaterial color="#0b1329" />

        {/* Live Interactive Screen UI overlayed inside 3D canvas */}
        <Html
          transform
          wrapperClass="phone-screen-html"
          position={[0, 0, 0.01]}
          scale={0.245}
          distanceFactor={1.5}
        >
          <div className="w-[320px] h-[640px] bg-slate-950 text-white rounded-[36px] p-4 flex flex-col justify-between overflow-hidden shadow-2xl border border-slate-800/80 select-none relative font-sans">
            {/* Top Status Bar */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 px-2">
              <span className="font-semibold text-slate-200">09:41</span>
              <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto flex items-center justify-center border border-slate-800">
                <div className="w-2 h-2 rounded-full bg-slate-700 mr-1"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
              </div>
              <div className="flex space-x-1.5 items-center">
                <span className="text-[9px]">5G</span>
                <div className="w-4 h-2 border border-slate-400 rounded-sm p-[1px]">
                  <div className="w-full h-full bg-emerald-400 rounded-px"></div>
                </div>
              </div>
            </div>

            {/* Header App Title & Profile */}
            <div className="flex justify-between items-center mt-3 px-1">
              <div>
                <p className="text-[10px] text-cyan-400 font-medium tracking-wider uppercase">iThrive Mobile Showcase</p>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                  {activeScreen === 'fintech' && 'iPay FinTech App'}
                  {activeScreen === 'healthcare' && 'CarePulse AI App'}
                  {activeScreen === 'ecommerce' && 'Luxe Cart 3D Store'}
                  {activeScreen === 'delivery' && 'QuickRunner Delivery'}
                  {activeScreen === 'ai' && 'Agentic AI Assistant'}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <User className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
            </div>

            {/* Screen Content Body depending on active screen */}
            <div className="flex-1 my-3 overflow-y-auto pr-0.5 space-y-3 custom-scroll">
              {activeScreen === 'fintech' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-900/40 to-emerald-950/60 border border-cyan-500/30">
                    <p className="text-[10px] text-slate-400">Total Portfolio Value</p>
                    <h3 className="text-xl font-bold text-cyan-300 font-mono mt-0.5">₹4,85,920.00</h3>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-2 font-medium">
                      <TrendingUp className="w-3 h-3" /> +18.4% this month
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400">Cards</p>
                        <p className="text-[11px] font-semibold text-slate-200">Active (3)</p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400">Instant Pay</p>
                        <p className="text-[11px] font-semibold text-slate-200">UPI 2.0</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-2">
                      <span>Recent Activity</span>
                      <span className="text-cyan-400 text-[10px]">View All</span>
                    </div>
                    <div className="space-y-2 text-[10px]">
                      <div className="flex justify-between items-center text-slate-300">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">₹</div>
                          <div>
                            <p className="font-medium text-slate-200">Client Payout</p>
                            <p className="text-[9px] text-slate-500">Today, 02:40 PM</p>
                          </div>
                        </div>
                        <span className="text-emerald-400 font-semibold">+₹45,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeScreen === 'healthcare' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-cyan-950/40 border border-emerald-500/30">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] text-slate-400">AI Vital Monitor</p>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Live Sync</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <h3 className="text-xl font-bold text-emerald-300 font-mono">72 BPM</h3>
                      <span className="text-[10px] text-slate-400">Normal Rhythm</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[78%] rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px]">
                    <p className="font-semibold text-slate-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> CarePulse AI Suggestion
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                      "Hydration index optimal. Scheduled consultation with Dr. Ramanathan at 4:30 PM."
                    </p>
                  </div>
                </div>
              )}

              {activeScreen === 'ecommerce' && (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-purple-950/50 p-3">
                    <div className="w-full h-24 rounded-xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 flex items-center justify-center border border-purple-500/30">
                      <ShoppingBag className="w-8 h-8 text-purple-300 animate-bounce" />
                    </div>
                    <div className="mt-2">
                      <span className="text-[9px] text-pink-400 bg-pink-950/80 px-2 py-0.5 rounded-md border border-pink-500/30">3D AR Preview</span>
                      <h4 className="text-xs font-bold text-slate-100 mt-1">Smart AR Headset 3D</h4>
                      <p className="text-[10px] text-slate-400">₹24,999 • <span className="text-emerald-400">In Stock</span></p>
                    </div>
                  </div>
                </div>
              )}

              {activeScreen === 'delivery' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-amber-500/30">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-amber-400 font-semibold">Order #QR-8910</span>
                      <span className="text-slate-400">ETA: 14 mins</span>
                    </div>
                    <div className="mt-2 text-xs font-semibold text-slate-200">Delivery en route to T. Nagar, Chennai</div>
                    <div className="w-full bg-slate-800 h-2 rounded-full mt-3 relative overflow-hidden">
                      <div className="bg-amber-400 h-full w-[65%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}

              {activeScreen === 'ai' && (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-[10px]">
                    <p className="text-cyan-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> iThrive On-Device LLM
                    </p>
                    <p className="text-slate-300 mt-1">
                      "I've generated the Flutter & iOS SwiftUI app blueprints for your mobile project."
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Quick Switch Bar */}
            <div className="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex justify-around items-center text-[9px]">
              <button 
                onClick={() => onScreenClick('fintech')}
                className={`flex flex-col items-center gap-0.5 ${activeScreen === 'fintech' ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>FinTech</span>
              </button>

              <button 
                onClick={() => onScreenClick('healthcare')}
                className={`flex flex-col items-center gap-0.5 ${activeScreen === 'healthcare' ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Health</span>
              </button>

              <button 
                onClick={() => onScreenClick('ecommerce')}
                className={`flex flex-col items-center gap-0.5 ${activeScreen === 'ecommerce' ? 'text-purple-400 font-bold' : 'text-slate-500'}`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shop</span>
              </button>

              <button 
                onClick={() => onScreenClick('ai')}
                className={`flex flex-col items-center gap-0.5 ${activeScreen === 'ai' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI</span>
              </button>
            </div>
          </div>
        </Html>
      </mesh>

      {/* Rear Camera Bump */}
      <group position={[0.6, 1.8, -0.2]}>
        <RoundedBox args={[0.9, 1.0, 0.15]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
        </RoundedBox>
        {/* Camera Lens 1 */}
        <mesh position={[-0.2, 0.25, -0.09]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.95} />
        </mesh>
        {/* Camera Lens 2 */}
        <mesh position={[-0.2, -0.25, -0.09]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.95} />
        </mesh>
        {/* Camera Lens 3 */}
        <mesh position={[0.2, 0, -0.09]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.95} />
        </mesh>
      </group>

      {/* Glowing Orbital Ring around 3D Mobile */}
      <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color={currentMat.color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Phone3DCanvas wrapper component exported to Hero section
 */
export default function Phone3DCanvas({ 
  finishColor = 'cyan', 
  activeScreen = 'fintech', 
  onScreenChange,
  onFinishChange 
}) {
  return (
    <div className="w-full h-[520px] md:h-[620px] relative select-none cursor-grab active:cursor-grabbing">
      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={1.8} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, 5, 5]} intensity={1.5} color="#10b981" />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <PhoneModel 
            finishColor={finishColor} 
            activeScreen={activeScreen} 
            onScreenClick={onScreenChange} 
          />
        </Float>

        <ContactShadows position={[0, -3.2, 0]} opacity={0.5} scale={8} blur={2.5} far={4} color="#06b6d4" />
      </Canvas>

      {/* Interactive 3D Phone Controls Bar */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 flex items-center gap-4 text-xs z-20 shadow-xl">
        <span className="text-slate-400 font-medium hidden sm:inline">3D Color Finish:</span>
        <div className="flex items-center gap-2">
          <button
            title="Cyber Cyan Finish"
            onClick={() => onFinishChange('cyan')}
            className={`w-5 h-5 rounded-full bg-cyan-500 border-2 ${finishColor === 'cyan' ? 'border-white scale-110 shadow-lg shadow-cyan-500/50' : 'border-transparent opacity-70'}`}
          />
          <button
            title="Emerald Green Finish"
            onClick={() => onFinishChange('emerald')}
            className={`w-5 h-5 rounded-full bg-emerald-500 border-2 ${finishColor === 'emerald' ? 'border-white scale-110 shadow-lg shadow-emerald-500/50' : 'border-transparent opacity-70'}`}
          />
          <button
            title="Royal Violet Finish"
            onClick={() => onFinishChange('violet')}
            className={`w-5 h-5 rounded-full bg-purple-500 border-2 ${finishColor === 'violet' ? 'border-white scale-110 shadow-lg shadow-purple-500/50' : 'border-transparent opacity-70'}`}
          />
          <button
            title="Titanium Black Finish"
            onClick={() => onFinishChange('titanium')}
            className={`w-5 h-5 rounded-full bg-slate-700 border-2 ${finishColor === 'titanium' ? 'border-white scale-110 shadow-lg shadow-slate-500/50' : 'border-transparent opacity-70'}`}
          />
          <button
            title="Sunset Gold Finish"
            onClick={() => onFinishChange('gold')}
            className={`w-5 h-5 rounded-full bg-amber-500 border-2 ${finishColor === 'gold' ? 'border-white scale-110 shadow-lg shadow-amber-500/50' : 'border-transparent opacity-70'}`}
          />
        </div>
      </div>
    </div>
  );
}
