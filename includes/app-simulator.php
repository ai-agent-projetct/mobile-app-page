<!-- Experience Our Interactive UI/UX Mobile Apps Component -->
<section id="simulator" class="py-20 md:py-28 relative bg-slate-950/80 border-t border-b border-slate-800/80 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                🎬 3D Mouse-Scrollable Video Showcases
            </div>

            <h2 class="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-100">
                Experience Our <span class="text-cyan-400 text-white-to-blue">Interactive UI/UX Mobile Apps</span>
            </h2>

            <p class="text-slate-300 text-base sm:text-lg">
                Click the 4 platform buttons below or scroll your mouse wheel to preview live 3D application videos.
            </p>

            <!-- 4 App Platform Buttons -->
            <div class="flex justify-center items-center gap-3 pt-4 flex-wrap" id="phpAppTabContainer">
                <button onclick="switchPhpVideo(0, 'assets/videos/taxi_ai.mp4', 'Taxi AI App', 'Logistics & AI Ride Dispatch')" class="btn-ithrive-pill px-5 py-2.5 text-xs font-bold">
                    🚕 Taxi AI App
                </button>
                <button onclick="switchPhpVideo(1, 'assets/videos/meetoo_dating.mp4', 'MeeToo', 'Social & Matchmaking')" class="btn-ithrive-outline px-5 py-2.5 text-xs font-bold">
                    💖 MeeToo
                </button>
                <button onclick="switchPhpVideo(2, 'assets/videos/foodtime.mp4', 'FoodTime', 'Food & Grocery Delivery')" class="btn-ithrive-outline px-5 py-2.5 text-xs font-bold">
                    🍕 FoodTime
                </button>
                <button onclick="switchPhpVideo(3, 'assets/videos/ai_healthcare.mp4', 'AI Health Care', 'Digital Health & Telemedicine')" class="btn-ithrive-outline px-5 py-2.5 text-xs font-bold">
                    🩺 AI Health Care
                </button>
            </div>
        </div>

        <!-- 3D Smartphone Video Stage -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/40 shadow-2xl relative">
            
            <div class="lg:col-span-6 space-y-6">
                <div class="space-y-2">
                    <span id="phpAppCategory" class="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                        Logistics & AI Ride Dispatch • Python + PostGIS + WebSockets
                    </span>
                    <h3 id="phpAppName" class="text-3xl sm:text-4xl font-black text-slate-100 font-heading text-white-to-blue">
                        Taxi AI App
                    </h3>
                    <p id="phpAppTagline" class="text-sm font-semibold text-cyan-400">
                        Real-Time Driver Dispatch & GPS Tracking
                    </p>
                </div>

                <p id="phpAppDesc" class="text-slate-300 text-sm leading-relaxed">
                    Sub-second driver matching algorithm, real-time route optimization, and live spatial GPS map dispatch.
                </p>

                <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-8 py-3.5 text-xs sm:text-sm font-extrabold flex items-center gap-2 uppercase tracking-wider">
                    <span>Request Custom Build for This App</span> →
                </button>
            </div>

            <!-- Smartphone Video Player Container -->
            <div class="lg:col-span-6 flex justify-center">
                <div class="w-[300px] sm:w-[340px] h-[600px] sm:h-[650px] bg-slate-950 rounded-[44px] p-3 border-4 border-slate-800 shadow-2xl relative overflow-hidden">
                    <div class="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3">
                        <div class="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
                        <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                    </div>

                    <div class="w-full h-full rounded-[34px] overflow-hidden bg-black relative">
                        <video id="phpVideoPlayer" src="assets/videos/taxi_ai.mp4" autoplay loop muted playsinline class="w-full h-full object-cover"></video>
                    </div>
                </div>
            </div>

        </div>

    </div>
</section>
