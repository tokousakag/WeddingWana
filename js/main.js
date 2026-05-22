/* ============================================
   WEDDING INVITATION — ASWANA & B
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavbar();
    initScrollAnimations();
    initCountdown();
    initHeroParticles();
    initFloatingPetals();
    initMusicPlayer();
    initRSVPForm();
    initWishesForm();
    initCopyButtons();
    initBackToTop();
    initSmoothScroll();
});

/* ---------- Preloader ---------- */
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 2000);
    });
}

/* ---------- Navbar ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ---------- Countdown Timer ---------- */
function initCountdown() {
    // Set wedding date — December 2025 (placeholder)
    const weddingDate = new Date('2025-12-20T10:00:00+08:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ---------- Hero Particles ---------- */
function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

/* ---------- Floating Petals ---------- */
function initFloatingPetals() {
    const container = document.getElementById('petals-container');

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 15 + 8;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        petal.style.opacity = Math.random() * 0.3 + 0.1;

        const hue = Math.random() > 0.5 ? 
            `radial-gradient(ellipse at center, rgba(232, 212, 139, 0.8), rgba(201, 168, 76, 0.6))` : 
            `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6), rgba(245, 240, 232, 0.4))`;
        petal.style.background = hue;

        container.appendChild(petal);

        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    // Create initial petals
    for (let i = 0; i < 8; i++) {
        setTimeout(createPetal, i * 500);
    }

    // Continue creating petals
    setInterval(createPetal, 2000);
}

/* ---------- Music Player ---------- */
function initMusicPlayer() {
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    // Generate a simple wedding melody using Web Audio API as fallback
    let audioContext;
    let oscillator;
    let gainNode;
    let melodyInterval;
    let usingWebAudio = false;

    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            // Try to play the audio file first
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicBtn.classList.add('playing');
                    usingWebAudio = false;
                }).catch(() => {
                    // Fallback to Web Audio API melody
                    playWebAudioMelody();
                });
            }
        } else {
            if (usingWebAudio) {
                stopWebAudioMelody();
            } else {
                audio.pause();
            }
            isPlaying = false;
            musicBtn.classList.remove('playing');
        }
    });

    function playWebAudioMelody() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isPlaying = true;
        musicBtn.classList.add('playing');
        usingWebAudio = true;

        const notes = [
            { freq: 523.25, dur: 0.5 },  // C5
            { freq: 587.33, dur: 0.5 },  // D5
            { freq: 659.25, dur: 0.75 }, // E5
            { freq: 523.25, dur: 0.25 }, // C5
            { freq: 659.25, dur: 0.5 },  // E5
            { freq: 698.46, dur: 0.5 },  // F5
            { freq: 783.99, dur: 1.0 },  // G5
            { freq: 783.99, dur: 0.5 },  // G5
            { freq: 880.00, dur: 0.5 },  // A5
            { freq: 783.99, dur: 0.5 },  // G5
            { freq: 698.46, dur: 0.5 },  // F5
            { freq: 659.25, dur: 1.0 },  // E5
            { freq: 523.25, dur: 0.5 },  // C5
            { freq: 587.33, dur: 0.5 },  // D5
            { freq: 523.25, dur: 1.0 },  // C5
            { freq: 0, dur: 0.5 },       // Rest
        ];

        let noteIndex = 0;

        function playNote() {
            if (!isPlaying || !audioContext) return;

            const note = notes[noteIndex % notes.length];
            
            if (note.freq > 0) {
                oscillator = audioContext.createOscillator();
                gainNode = audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + note.dur * 0.7);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + note.dur);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + note.dur);
            }

            noteIndex++;
            melodyInterval = setTimeout(playNote, note.dur * 1000);
        }

        playNote();
    }

    function stopWebAudioMelody() {
        if (melodyInterval) clearTimeout(melodyInterval);
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
    }
}

/* ---------- RSVP Form ---------- */
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const modal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('rsvp-name').value,
            phone: document.getElementById('rsvp-phone').value,
            email: document.getElementById('rsvp-email').value,
            guests: document.getElementById('rsvp-guests').value,
            attendance: document.querySelector('input[name="attendance"]:checked')?.value,
            message: document.getElementById('rsvp-message').value
        };

        console.log('RSVP Data:', formData);

        // Show success modal
        modal.classList.add('active');
        form.reset();
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* ---------- Wishes Form ---------- */
function initWishesForm() {
    const form = document.getElementById('wishes-form');
    const wall = document.getElementById('wishes-wall');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('wish-name').value;
        const message = document.getElementById('wish-message').value;

        if (name && message) {
            const wishCard = document.createElement('div');
            wishCard.classList.add('wish-card');
            wishCard.innerHTML = `
                <div class="wish-avatar"><i class="fas fa-user-circle"></i></div>
                <div class="wish-content">
                    <h4>${escapeHtml(name)}</h4>
                    <p>"${escapeHtml(message)}"</p>
                </div>
            `;

            wall.insertBefore(wishCard, wall.firstChild);

            // Animate in
            wishCard.style.opacity = '0';
            wishCard.style.transform = 'translateY(20px)';
            setTimeout(() => {
                wishCard.style.transition = 'all 0.5s ease';
                wishCard.style.opacity = '1';
                wishCard.style.transform = 'translateY(0)';
            }, 50);

            form.reset();
        }
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* ---------- Copy Buttons ---------- */
function initCopyButtons() {
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(() => {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
                btn.style.background = 'var(--gold)';
                btn.style.color = 'var(--white)';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            });
        });
    });
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });
}
