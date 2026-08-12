<!-- Mobile App Development Services Component -->
<section id="services" class="py-20 md:py-28 relative bg-slate-950/60 border-t border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                ⚡ What We Build
            </div>

            <h2 class="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-100">
                End-to-End <span class="text-cyan-400 text-white-to-blue">Mobile App Development Services</span>
            </h2>

            <p class="text-slate-300 text-base sm:text-lg">
                From initial wireframe to App Store #1 ranking, iThrive Software delivers cutting-edge iOS, Android, and cross-platform mobile solutions in Chennai.
            </p>

            <!-- Filter Tabs -->
            <div class="flex justify-center items-center gap-3 pt-4 flex-wrap">
                <button onclick="filterServices('all')" class="btn-ithrive-pill px-5 py-2 text-xs font-bold">All Services</button>
                <button onclick="filterServices('native')" class="btn-ithrive-outline px-5 py-2 text-xs font-bold">Native iOS & Android</button>
                <button onclick="filterServices('cross')" class="btn-ithrive-outline px-5 py-2 text-xs font-bold">Cross-Platform</button>
                <button onclick="filterServices('ai')" class="btn-ithrive-outline px-5 py-2 text-xs font-bold">AI Mobile</button>
                <button onclick="filterServices('enterprise')" class="btn-ithrive-outline px-5 py-2 text-xs font-bold">Enterprise Cloud</button>
            </div>
        </div>

        <!-- Services Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- iOS -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group">
                <div class="space-y-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">🍎</div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-100 text-white-to-blue">Native iOS App Development</h3>
                        <p class="text-xs text-cyan-400 font-medium mt-0.5">Swift & SwiftUI Engineering for iPhone & iPad</p>
                    </div>
                    <p class="text-slate-300 text-sm leading-relaxed">Custom iOS applications built with Apple’s native Swift, SwiftUI, and Metal graphics framework. Optimized for iOS 18+, Apple Watch, and Vision Pro integration.</p>
                    <ul class="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                        <li class="flex items-center gap-2">✓ Swift & SwiftUI Architecture</li>
                        <li class="flex items-center gap-2">✓ Apple Pay & HealthKit Integration</li>
                        <li class="flex items-center gap-2">✓ CoreML & On-Device AI</li>
                        <li class="flex items-center gap-2">✓ App Store Review Guarantee</li>
                    </ul>
                </div>
                <div class="pt-6 mt-4 border-t border-slate-800/50 flex items-center justify-between">
                    <span class="text-[11px] text-slate-400 font-mono uppercase">iThrive Engineered</span>
                    <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-4 py-2 text-xs font-bold">Consult Architect →</button>
                </div>
            </div>

            <!-- Android -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group">
                <div class="space-y-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">🤖</div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-100 text-white-to-blue">Native Android App Development</h3>
                        <p class="text-xs text-cyan-400 font-medium mt-0.5">Kotlin & Jetpack Compose Excellence</p>
                    </div>
                    <p class="text-slate-300 text-sm leading-relaxed">High-speed, scalable Android applications built using Kotlin, Jetpack Compose, and Material 3 design system. Compatible across 10,000+ Android devices.</p>
                    <ul class="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                        <li class="flex items-center gap-2">✓ Kotlin Coroutines & Flow</li>
                        <li class="flex items-center gap-2">✓ Google Play Billing 6.0</li>
                        <li class="flex items-center gap-2">✓ Background Workers & Push</li>
                        <li class="flex items-center gap-2">✓ Android 15 Optimization</li>
                    </ul>
                </div>
                <div class="pt-6 mt-4 border-t border-slate-800/50 flex items-center justify-between">
                    <span class="text-[11px] text-slate-400 font-mono uppercase">iThrive Engineered</span>
                    <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-4 py-2 text-xs font-bold">Consult Architect →</button>
                </div>
            </div>

            <!-- Flutter -->
            <div class="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group">
                <div class="space-y-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">💙</div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-100 text-white-to-blue">Cross-Platform Flutter & React Native</h3>
                        <p class="text-xs text-cyan-400 font-medium mt-0.5">Single Codebase. Dual Platform Perfection</p>
                    </div>
                    <p class="text-slate-300 text-sm leading-relaxed">Accelerate your time-to-market by 50% with near-native performance across iOS and Android from a single unified codebase engineered by iThrive Software.</p>
                    <ul class="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                        <li class="flex items-center gap-2">✓ 60 FPS Flutter Dart Animations</li>
                        <li class="flex items-center gap-2">✓ React Native Fabric Engine</li>
                        <li class="flex items-center gap-2">✓ Shared Business Logic</li>
                        <li class="flex items-center gap-2">✓ Instant Hot Reload Updates</li>
                    </ul>
                </div>
                <div class="pt-6 mt-4 border-t border-slate-800/50 flex items-center justify-between">
                    <span class="text-[11px] text-slate-400 font-mono uppercase">iThrive Engineered</span>
                    <button onclick="toggleModal('proposalModal')" class="btn-ithrive-pill px-4 py-2 text-xs font-bold">Consult Architect →</button>
                </div>
            </div>

        </div>

    </div>
</section>
