/* ============================================
   WEDDING INVITATION — ASWANA & HAFIZ
   Main JavaScript (Mobile-Optimized for Cerah/Floral Theme)
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
    const handleLoad = () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }
        }, 1200);
    };

    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
    }
}

/* ---------- Navbar ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !navToggle || !navMenu) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    }, { passive: true });

    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
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
        const scrollPos = window.scrollY + 100;

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
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ---------- Countdown Timer Ke 7 Jun 2026 ---------- */
function initCountdown() {
    const weddingDate = new Date('2026-06-07T08:00:00+08:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ---------- Hero Glitter Particles ---------- */
function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1.5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

/* ---------- Floating Floral Petals ---------- */
function initFloatingPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    function createPetal() {
        if (document.hidden) return;
        
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 10 + 6;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 6) + 's';
        petal.style.animationDelay = Math.random() * 1 + 's';
        petal.style.opacity = Math.random() * 0.25 + 0.15;

        // Ditukarkan kepada palet warna kelopak bunga putih gading & keemasan lembut mengikut tema kad fizikal
        const hue = Math.random() > 0.5 ? 
            `radial-gradient(ellipse at center, rgba(223, 207, 157, 0.7), rgba(179, 146, 70, 0.4))` : 
            `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8), rgba(247, 244, 238, 0.5))`;
        petal.style.background = hue;

        container.appendChild(petal);

        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    const initialPetals = window.innerWidth < 768 ? 3 : 6;
    for (let i = 0; i < initialPetals; i++) {
        setTimeout(createPetal, i * 600);
    }
    setInterval(createPetal, window.innerWidth < 768 ? 3000 : 1800);
}

/* ---------- Music Player (iOS Bypass Logic) ---------- */
function initMusicPlayer() {
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    if (!musicBtn || !audio) return;

    let isPlaying = false;
    let audioContext;
    let oscillator;
    let gainNode;
    let melodyInterval;
    let usingWebAudio = false;

    function playWeddingMusic() {
        if (isPlaying) return;
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            usingWebAudio = false;
        }).catch(() => {
            if (!isPlaying) playWebAudioMelody();
        });
    }

    // Memintas sekatan autoplay Safari iOS / Android browser melalui sebarang interaksi sentuhan skrin pintar pertama
    document.addEventListener('click', playWeddingMusic, { once: true });
    document.addEventListener('touchstart', playWeddingMusic, { once: true });

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                usingWebAudio = false;
            }).catch(() => {
                playWebAudioMelody();
            });
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
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            isPlaying = true;
            musicBtn.classList.add('playing');
            usingWebAudio = true;

            const notes = [
                { freq: 523.25, dur: 0.5 }, { freq: 587.33, dur: 0.5 }, { freq: 659.25, dur: 0.75 }, 
                { freq: 523.25, dur: 0.25 }, { freq: 659.25, dur: 0.5 }, { freq: 698.46, dur: 0.5 }, 
                { freq: 783.99, dur: 1.0 }, { freq: 783.99, dur: 0.5 }, { freq: 880.00, dur: 0.5 }
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
                    gainNode.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 0.05);
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
        } catch (err) { console.log(err); }
    }

    function stopWebAudioMelody() {
        if (melodyInterval) clearTimeout(melodyInterval);
        if (audioContext) { audioContext.close(); audioContext = null; }
    }
}

/* ---------- RSVP Form ---------- */
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const modal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');

    if (!form || !modal) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        form.reset();
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => { modal.classList.remove('active'); });
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

/* ---------- Wishes Form ---------- */
function initWishesForm() {
    const form = document.getElementById('wishes-form');
    const wall = document.getElementById('wishes-wall');

    if (!form || !wall) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEl = document.getElementById('wish-name');
        const messageEl = document.getElementById('wish-message');

        const name = nameEl.value.trim();
        const message = messageEl.value.trim();

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
            wishCard.style.opacity = '0';
            wishCard.style.transform = 'translateY(10px)';
            
            requestAnimationFrame(() => {
                setTimeout(() => {
                    wishCard.style.transition = 'all 0.4s ease';
                    wishCard.style.opacity = '1';
                    wishCard.style.transform = 'translateY(0)';
                }, 20);
            });

            form.reset();
            nameEl.blur();
            messageEl.blur();
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
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = btn.getAttribute('data-copy');
            if (!text) return;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => { handleCopySuccess(btn); });
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    handleCopySuccess(btn);
                } catch (err) {
                    console.error(err);
                }
                document.body.removeChild(textArea);
            }
        });
    });
}

function handleCopySuccess(btn) {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--white)';
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = window.innerWidth < 768 ? 50 : 70;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });
}
