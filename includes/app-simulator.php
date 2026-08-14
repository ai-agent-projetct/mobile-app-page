<!-- Experience Our Interactive UI/UX Mobile Apps (16:9 Mouse-Scrollable Video Timeline Scrubbing) -->
<section id="simulator" class="relative bg-slate-950 border-t border-b border-slate-800/80 min-h-[220vh]">
    
    <div class="sticky top-0 h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
        
        <!-- Header & 4 Platform Tabs -->
        <div class="space-y-4 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                🎬 Mouse-Scrollable 16:9 Video Scrubbing
            </div>

            <h2 class="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-100">
                Experience Our <span class="text-cyan-400 text-white-to-blue">Interactive UI/UX Mobile Apps</span>
            </h2>

            <!-- 4 App Platform Tabs -->
            <div class="flex justify-center items-center gap-2 sm:gap-3 flex-wrap pt-1" id="php169TabContainer">
                <button onclick="switch169PhpVideo('assets/videos/taxi_ai.mp4', 'Taxi AI App', 'Logistics & AI Ride Dispatch')" class="btn-ithrive-pill px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full">
                    🚕 Taxi AI App
                </button>
                <button onclick="switch169PhpVideo('assets/videos/meetoo_dating.mp4', 'MeeToo', 'Social & Matchmaking')" class="btn-ithrive-outline px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full">
                    💖 MeeToo
                </button>
                <button onclick="switch169PhpVideo('assets/videos/foodtime.mp4', 'FoodTime', 'Food & Grocery Delivery')" class="btn-ithrive-outline px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full">
                    🍕 FoodTime
                </button>
                <button onclick="switch169PhpVideo('assets/videos/ai_healthcare.mp4', 'AI Health Care', 'Digital Health & Telemedicine')" class="btn-ithrive-outline px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full">
                    🩺 AI Health Care
                </button>
            </div>
        </div>

        <!-- 16:9 WIDESCREEN SCROLLABLE VIDEO CONTAINER -->
        <div class="relative w-full aspect-video max-h-[58vh] rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-2xl shadow-cyan-950/80">
            
            <video id="php169Video" src="assets/videos/taxi_ai.mp4" muted playsinline preload="auto" class="w-full h-full object-cover"></video>

            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none"></div>

            <div class="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 z-20">
                <div class="space-y-1">
                    <span id="php169Category" class="px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                        Logistics & AI Ride Dispatch • Python + PostGIS + WebSockets
                    </span>
                    <h3 id="php169Name" class="text-xl sm:text-2xl font-black text-white font-heading">
                        Taxi AI App — Real-Time Driver Dispatch & Spatial GPS Tracking
                    </h3>
                </div>

                <div class="flex items-center gap-3 bg-slate-950/90 p-2.5 rounded-2xl border border-slate-800 backdrop-blur-md">
                    <div id="php169ScrubText" class="text-xs font-mono text-cyan-400 font-bold min-w-[75px]">
                        SCRUB 0%
                    </div>
                    <div class="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div id="php169ProgressBar" class="h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-0 transition-all duration-75"></div>
                    </div>
                </div>
            </div>

            <div class="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 animate-bounce">
                <span>🖱️ Scroll Mouse to Scrub Video</span>
            </div>
        </div>

        <!-- Footer Info -->
        <div class="flex justify-between items-center pt-2">
            <span class="text-xs text-slate-400">100% Client-Owned Source Code & Dedicated Engineering Team in Chennai</span>
            <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-6 py-2.5 text-xs font-black uppercase tracking-wider">
                Request Proposal →
            </button>
        </div>

    </div>

</section>
