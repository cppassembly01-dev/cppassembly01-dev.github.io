// --- Lógica de Navegação (SPA) ---
function handleHashChange() {
    let hash = window.location.hash.substring(1) || 'inicio';
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    let targetPage = document.getElementById('page-' + hash);
    if(targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('page-inicio').classList.add('active');
        hash = 'inicio';
    }
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + hash) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);

// --- Lógica do Player de Música ---
const audioFiles = [
    "assets/audio/Prism - Spaceflight Simulator - Build (Official Soundtrack).opus",
    "assets/audio/Prism - Spaceflight Simulator - Cosmic Ocean (Official Soundtrack).m4a",
    "assets/audio/Prism - Spaceflight Simulator - Deep Space (Official Soundtrack).opus",
    "assets/audio/Prism - Spaceflight Simulator - Far Away (Official Soundtrack).opus",
    "assets/audio/Prism - Spaceflight Simulator - Frequency (Official Soundtrack).opus",
    "assets/audio/Prism - Spaceflight Simulator - Space Whales (Official Soundtrack).opus",
    "assets/audio/Prism - Spaceflight Simulator - Tiny Planet (Official Soundtrack).opus"
];

let currentTrack = 0;

const audioEl = document.getElementById('bg-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const trackStatus = document.getElementById('track-status');
const volumeSlider = document.getElementById('volume-slider');

if (volumeSlider && audioEl) {
    audioEl.volume = volumeSlider.value;
    volumeSlider.addEventListener('input', (e) => {
        audioEl.volume = e.target.value;
    });
}

function playTrack() {
    audioEl.play().then(() => {
        playPauseBtn.innerText = '⏸';
        trackStatus.innerText = `Tocando Faixa ${currentTrack + 1}`;
    }).catch(err => {
        console.log("Erro ao tocar ou Autoplay bloqueado:", err);
        playPauseBtn.innerText = '▶';
        trackStatus.innerText = 'Erro / Pausado';
    });
}

function togglePlay() {
    if (audioEl.paused) {
        playTrack();
    } else {
        audioEl.pause();
        playPauseBtn.innerText = '▶';
        trackStatus.innerText = 'Pausado';
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % audioFiles.length;
    audioEl.src = audioFiles[currentTrack];
    playTrack();
}

playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
audioEl.addEventListener('ended', nextTrack);

// --- Lógica do Foguete do Scroll ---
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    
    // Tratativa para evitar divisão por zero
    const scrollableDistance = docHeight - winHeight;
    let scrollPercent = 0;
    if (scrollableDistance > 0) {
        scrollPercent = scrollTop / scrollableDistance;
    }
    
    const rocket = document.getElementById('scroll-rocket');
    if(rocket) {
        rocket.style.top = `${Math.min(scrollPercent * 100, 95)}%`;
    }
});

// --- Lógica do Starfield ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = [];
    const numStars = Math.floor((canvas.width * canvas.height) / 4000);
    for(let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.8;
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.x += star.vx;
        star.y += star.vy;
        
        if(star.x < 0) star.x = canvas.width;
        if(star.x > canvas.width) star.x = 0;
        if(star.y < 0) star.y = canvas.height;
        if(star.y > canvas.height) star.y = 0;
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();