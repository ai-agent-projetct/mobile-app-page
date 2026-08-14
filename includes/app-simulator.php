<!-- Experience Our Interactive UI/UX Mobile Apps (Video Alone Covers Entire 100% Full Screen) -->
<section id="simulator" class="relative bg-slate-950 border-t border-b border-slate-800/80 min-h-[350vh] w-full">
    
    <!-- 100% FULL-SCREEN FULL-VIEWPORT STICKY STAGE -->
    <div class="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
        
        <!-- VIDEO ALONE COVERS ENTIRE SCREEN (100vw x 100vh FULL BLEED) -->
        <div class="absolute inset-0 w-full h-full z-0">
            <video id="php169Video" src="assets/videos/taxi_ai.mp4" muted playsinline preload="auto" class="w-full h-full object-cover"></video>
            <div class="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-transparent to-slate-950/90 pointer-events-none"></div>
        </div>

        <!-- TOP FLOATING OVERLAY -->
        <div class="relative z-20 w-full pt-6 px-4 sm:px-8 lg:px-12 text-center space-y-3">
            <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                🔒 3D Fullscreen Video View
            </div>

            <h2 class="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white drop-shadow-2xl">
                Experience Our <span class="text-cyan-400 text-white-to-blue">Interactive UI/UX Mobile Apps</span>
            </h2>

            <!-- 4 App Platform Buttons -->
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

        <!-- MIDDLE RIGHT FLOATING STATUS -->
        <div class="relative z-20 self-end mr-6 sm:mr-12 px-4 py-2 rounded-full bg-slate-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-2xl">
            <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span id="phpScrollHint">🖱️ Scroll mouse to scrub 3D full-screen video</span>
        </div>

        <!-- BOTTOM FLOATING OVERLAY -->
        <div class="relative z-20 w-full pb-6 px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div class="space-y-1.5 max-w-2xl bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
                <span id="php169Category" class="px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                    Logistics & AI Ride Dispatch • Python + PostGIS + WebSockets
                </span>
                <h3 id="php169Name" class="text-xl sm:text-2xl font-black text-white font-heading drop-shadow-md">
                    Taxi AI App — Real-Time Driver Dispatch & Spatial GPS Tracking
                </h3>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-3 bg-slate-950/90 p-2.5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
                    <div id="php169ScrubText" class="text-xs font-mono text-cyan-400 font-bold min-w-[75px]">
                        SCRUB 0%
                    </div>
                    <div class="w-32 sm:w-40 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div id="php169ProgressBar" class="h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-0 transition-all duration-75"></div>
                    </div>
                </div>

                <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-7 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex-shrink-0">
                    Request Proposal →
                </button>
            </div>
        </div>

    </div>

</section>
