<!-- Experience Our Interactive UI/UX Mobile Apps (Standalone 4K 16:9 Video Stage with Content Above and Below) -->
<section id="simulator" class="relative bg-slate-950 border-t border-b border-slate-800/80 min-h-[350vh] w-full py-16">
    
    <!-- PINNED FULLSCREEN CONTAINER -->
    <div class="sticky top-0 h-screen w-full flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden bg-slate-950/95">
        
        <!-- ================= ABOVE VIDEO: Section Title & 4 Platform Tabs ================= -->
        <div class="space-y-3 text-center z-20">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                🔒 Standalone 4K Video Stage
            </div>

            <h2 class="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white">
                Experience Our <span class="text-cyan-400 text-white-to-blue">Interactive UI/UX Mobile Apps</span>
            </h2>

            <!-- 4 App Platform Buttons -->
            <div class="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
                <button onclick="switch169PhpVideo('assets/videos/taxi_ai.mp4', 'Taxi AI App', 'Logistics & AI Ride Dispatch')" class="btn-ithrive-pill px-5 py-2 text-xs sm:text-sm font-bold rounded-full">
                    🚕 Taxi AI App
                </button>
                <button onclick="switch169PhpVideo('assets/videos/meetoo_dating.mp4', 'MeeToo', 'Social & Matchmaking')" class="btn-ithrive-outline px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-slate-900">
                    💖 MeeToo
                </button>
                <button onclick="switch169PhpVideo('assets/videos/foodtime.mp4', 'FoodTime', 'Food & Grocery Delivery')" class="btn-ithrive-outline px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-slate-900">
                    🍕 FoodTime
                </button>
                <button onclick="switch169PhpVideo('assets/videos/ai_healthcare.mp4', 'AI Health Care', 'Digital Health & Telemedicine')" class="btn-ithrive-outline px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-slate-900">
                    🩺 AI Health Care
                </button>
            </div>
        </div>

        <!-- ================= CENTER: STANDALONE 4K 16:9 VIDEO STAGE ================= -->
        <div 
            class="relative w-full aspect-video max-h-[52vh] rounded-3xl overflow-hidden glass-panel border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 my-auto group"
            style="perspective: 1200px; transform: perspective(1200px) rotateX(1deg); boxShadow: 0 25px 60px -15px rgba(0, 229, 255, 0.25);"
        >
            <video id="php169Video" src="assets/videos/taxi_ai.mp4" muted playsinline preload="auto" class="w-full h-full object-cover"></video>

            <!-- Minimal Scrub Progress Counter at Bottom Right -->
            <div class="absolute bottom-3 right-3 flex items-center gap-3 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md text-xs font-mono text-cyan-400 font-bold z-20">
                <span id="php169ScrubText">SCRUB 0%</span>
                <div class="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div id="php169ProgressBar" class="h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-0 transition-all duration-75"></div>
                </div>
            </div>

            <!-- Scroll Mouse Hint Badge -->
            <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 z-20">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>🖱️ Scroll mouse to scrub 4K video</span>
            </div>
        </div>

        <!-- ================= BELOW VIDEO: App Info & CTA ================= -->
        <div class="space-y-3 pt-2 z-20 bg-slate-950/90 p-4 sm:p-6 rounded-2xl border border-slate-800">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="space-y-1">
                    <span id="php169Category" class="px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                        Logistics & AI Ride Dispatch • Python + PostGIS + WebSockets
                    </span>
                    <h3 id="php169Name" class="text-xl sm:text-2xl font-black text-white font-heading">
                        Taxi AI App — Real-Time Driver Dispatch & Spatial GPS Tracking
                    </h3>
                </div>

                <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-8 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex-shrink-0">
                    Request Proposal →
                </button>
            </div>
        </div>

    </div>

</section>
