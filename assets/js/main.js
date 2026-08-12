/**
 * iThrive Software JavaScript Engine (PHP Version - 100% Functionality & Color Preserved)
 * Path: assets/js/main.js
 */

// Modal Toggle Function
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
}

// Global Cursor Spotlight Tracking
document.addEventListener('mousemove', function(e) {
    const spotlight = document.getElementById('cursorSpotlight');
    if (spotlight) {
        spotlight.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
});

// Hexagon Grid Background Canvas (7 Exact Horizontal Mouse-X Color Zones)
(function initHexagonCanvas() {
    const canvas = document.getElementById('hexagonCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let mouse = { x: width / 2, y: height / 2 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const get7ZoneColor = (ratio) => {
        if (ratio < 0.14) return '#00bfff';       // 1. Full Left: Electric Cyan
        if (ratio < 0.28) return '#0099ff';       // 2. Half Left: Azure Blue
        if (ratio < 0.42) return '#1a75ff';       // 3. Slight Left: Royal Blue
        if (ratio < 0.57) return '#2b56f5';       // 4. Middle: Cobalt Blue
        if (ratio < 0.71) return '#4b32ea';       // 5. Slight Right: Electric Indigo
        if (ratio < 0.85) return '#7c3aed';       // 6. Half Right: Deep Blue Purple
        return '#d946ef';                          // 7. Full Right: Vibrant Violet Magenta
    };

    const hexRadius = 26;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;

    function drawHexagon(x, y, color, alpha) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + hexRadius * Math.cos(angle);
            const hy = y + hexRadius * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
        }
        ctx.closePath();

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha;
        ctx.stroke();

        if (alpha > 0.3) {
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha * 0.25;
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const cols = Math.ceil(width / hexWidth) + 2;
        const rows = Math.ceil(height / (hexHeight * 0.75)) + 2;

        const zoneColor = get7ZoneColor(mouse.x / width);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let x = c * hexWidth;
                let y = r * hexHeight * 0.75;
                if (r % 2 === 1) x += hexWidth / 2;

                const dx = mouse.x - x;
                const dy = mouse.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let alpha = 0.08;
                if (dist < 220) {
                    alpha = 0.85 * (1 - dist / 220);
                }

                drawHexagon(x, y, zoneColor, alpha);
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
})();

// avivashishta.com Style 3D Mouseover Tilt & Spotlight Effect on Tech Cards
document.addEventListener('DOMContentLoaded', function() {
    const techCards = document.querySelectorAll('.tech-card-3d');
    techCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;

            // Radial Spotlight Glow Effect inside Card
            card.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(0, 229, 255, 0.22), rgba(8, 14, 30, 0.85) 80%)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.background = 'rgba(8, 14, 30, 0.85)';
        });
    });
});

// Mouse-Scrollable 3D Process Flow Diagram Track
(function initProcessScroll3D() {
    const track = document.getElementById('processTrack3D');
    const container = document.getElementById('processCardsContainer');
    if (!track || !container) return;

    let activeStep = 0;
    const cards = container.children;
    const totalSteps = cards.length;

    function update3DPositions() {
        for (let idx = 0; idx < totalSteps; idx++) {
            const card = cards[idx];
            const offset = idx - activeStep;
            const isActive = idx === activeStep;

            const rotateY = offset * -28;
            const translateZ = isActive ? 120 : -140 * Math.abs(offset);
            const translateX = offset * 20;
            const opacity = isActive ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.3);
            const scale = isActive ? 1.08 : 0.88;

            card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = 50 - Math.abs(offset) * 10;
            card.style.transition = 'all 0.5s ease-out';
        }
    }

    track.addEventListener('wheel', function(e) {
        if (Math.abs(e.deltaY) > 20) {
            if (e.deltaY > 0) {
                activeStep = Math.min(activeStep + 1, totalSteps - 1);
            } else {
                activeStep = Math.max(activeStep - 1, 0);
            }
            update3DPositions();
        }
    });

    update3DPositions();
})();

// Three.js 3D Phone Model Initialization
(function init3DPhone() {
    const container = document.getElementById('phoneCanvas');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Phone Body Mesh
    const geometry = new THREE.BoxGeometry(2.3, 4.8, 0.2);
    const material = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.95,
        roughness: 0.08
    });
    const phone = new THREE.Mesh(geometry, material);
    scene.add(phone);

    // Screen Mesh
    const screenGeo = new THREE.PlaneGeometry(2.1, 4.5);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.11;
    phone.add(screen);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 2.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    });

    function animate() {
        requestAnimationFrame(animate);
        phone.rotation.y += (mouseX - phone.rotation.y) * 0.05;
        phone.rotation.x += (-mouseY - phone.rotation.x) * 0.05;
        renderer.render(scene, camera);
    }
    animate();
})();
