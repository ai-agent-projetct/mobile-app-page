<!-- Experience Our Interactive UI/UX Mobile Apps (100% Full-Bleed Edge-to-Edge Banner Video) -->
<section id="simulator" class="relative bg-slate-950 border-t border-b border-slate-800/80 min-h-[350vh] w-full">
    
    <!-- 100% EDGE-TO-EDGE FULL-WIDTH & FULL-HEIGHT STICKY BANNER -->
    <div class="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
        
        <!-- BACKGROUND 100% FULL-BLEED BANNER VIDEO -->
        <div class="absolute inset-0 w-full h-full z-0">
            <video id="php169Video" src="assets/videos/taxi_ai.mp4" muted playsinline preload="auto" class="w-full h-full object-cover"></video>
            <div class="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/20 to-slate-950/95 pointer-events-none"></div>
        </div>

        <!-- TOP FLOATING OVERLAY: Header & 4 App Platform Tabs -->
        <div class="relative z-20 w-full pt-6 px-4 sm:px-8 lg:px-12 text-center space-y-3">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                🔒 Full-Bleed 100% Widescreen Banner Video
            </div>

            <h2 class="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white drop-shadow-lg">
                Experience Our <span class="text-cyan-400 text-white-to-blue">Interactive UI/UX Mobile Apps</span>
            </h2>

            <!-- 4 App Platform Tabs -->
            <div class="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
                <button onclick="switch169PhpVideo('assets/videos/taxi_ai.mp4', 'Taxi AI App', 'Logistics & AI Ride Dispatch')" class="btn-ithrive-pill px-5 py-2 text-xs sm:text-sm font-bold rounded-full">
                    🚕 Taxi AI App
                </button>
                <button onclick="switch169PhpVideo('assets/videos/meetoo_dating.mp4', 'MeeToo', 'Social & Matchmaking')" class="btn-ithrive-outline px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-slate-950/80">
                    💖 MeeToo
                </button>
                <button onclick="switch169PhpVideo('assets/videos/foodtime.mp4', 'FoodTime', 'Food & Grocery Delivery')" class="btn-ithrive-outline px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-slate-950/80">
                    🍕 FoodTime
                </button>
                <button onclick="switch169PhpVideo('assets/videos/ai_healthcare.mp4', 'AI Health Care', 'Digital Health & Telemedicine')" class="btn-ithrive-outline px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-slate-950/80">
                    🩺 AI Health Care
                </button>
            </div>
        </div>

        <!-- MIDDLE RIGHT FLOATING BADGE -->
        <div class="relative z-20 self-end mr-6 sm:mr-12 mb-auto px-4 py-2 rounded-full bg-slate-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xl">
            <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span id="phpScrollHint">🖱️ Scroll mouse to scrub video banner</span>
        </div>

        <!-- BOTTOM FLOATING OVERLAY: Information & Controls -->
        <div class="relative z-20 w-full pb-8 px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div class="space-y-2 max-w-2xl">
                <span id="php169Category" class="px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md">
                    Logistics & AI Ride Dispatch • Python + PostGIS + WebSockets
                </span>
                <h3 id="php169Name" class="text-2xl sm:text-3xl font-black text-white font-heading drop-shadow-md">
                    Taxi AI App — Real-Time Driver Dispatch & Spatial GPS Tracking
                </h3>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-3 bg-slate-950/95 p-3 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-2xl">
                    <div id="php169ScrubText" class="text-xs font-mono text-cyan-400 font-bold min-w-[75px]">
                        SCRUB 0%
                    </div>
                    <div class="w-32 sm:w-44 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div id="php169ProgressBar" class="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 w-0 transition-all duration-75"></div>
                    </div>
                </div>

                <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    Request Proposal →
                </button>
            </div>
        </div>

    </div>

</section>
