/* ============================================
   WEDDING INVITATION — ASWANA & HAFIZ
   Main JavaScript (Mobile-Optimized for iOS & Android)
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
    // Memastikan tingkap kandungan sempat dimuat naik sepenuhnya
    const handleLoad = () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }
        }, 1500); // Dikurangkan kepada 1.5s untuk tindak balas mobile yang lebih pantas
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
        if (window.scrollY > 60) { // Dikurangkan jarak skrol bersesuaian dengan peranti mobile
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    }, { passive: true }); // Menggunakan passive listener untuk mengoptimumkan prestasi skrol mobile

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
        const scrollPos = window.scrollY + 120; // Diubah suai bersesuaian dengan kelebaran skrin mobile

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
        threshold: 0.1, // Dikurangkan nilai ambang agar mudah dipicu pada skrin sempit peranti mobile
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 80);
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
    // Diubah suai terus ke tarikh perkahwinan sebenar: Ahad, 7 Jun 2026 (Jam 8:00 Pagi)
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

/* ---------- Hero Particles ---------- */
function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    
    // Jumlah partikel dikurangkan daripada 50 ke 25 bagi meringankan beban GPU/Bateri telefon pintar
    const particleCount = window.innerWidth < 768 ? 25 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

/* ---------- Floating Petals ---------- */
function initFloatingPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    function createPetal() {
        if (document.hidden) return; // Menghalang pembentukan elemen baru jika tab pelayar ditutup (jimat RAM mobile)
        
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 12 + 6; // Dikecilkan sedikit saiz kelopak agar kelihatan lebih kemas di skrin kecil
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
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

    // Mengoptimumkan jumlah kelopak terapung berdasarkan kelebaran paparan skrin
    const initialPetals = window.innerWidth < 768 ? 4 : 8;
    const intervalTime = window.innerWidth < 768 ? 3500 : 2000;

    for (let i = 0; i < initialPetals; i++) {
        setTimeout(createPetal, i * 500);
    }

    setInterval(createPetal, intervalTime);
}

/* ---------- Music Player (iOS & Android Autoplay Bypass) ---------- */
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

    // Fungsi utama pencetus audio fail mp3 / fallback Web Audio
    function playWeddingMusic() {
        if (isPlaying) return;

        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            usingWebAudio = false;
        }).catch((error) => {
            console.log("Audio file disekat sekatan pelayar, mencuba Web Audio API fallback...", error);
            // Jika mp3 disekat oleh polisi autoplay iOS Safari / Chrome, gunakan fallback bunyi sintetik
            if (!isPlaying) {
                playWebAudioMelody();
            }
        });
    }

    // Memintas sekatan keselamatan Autoplay peranti mudah alih (iOS/Android) melalui interaksi pertama skrin
    document.addEventListener('click', playWeddingMusic, { once: true });
    document.addEventListener('touchstart', playWeddingMusic, { once: true });
    document.addEventListener('touchend', playWeddingMusic, { once: true });

    // Kawalan butang klik manual play/pause
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Menghalang pencetus event berulang pada peringkat dokumen
        
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
                    gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.05);
                    gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + note.dur * 0.7);
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
        } catch (e) {
            console.log("Web Audio API tidak disokong pada pelayar ini", e);
        }
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

    if (!form || !modal) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('rsvp-name').value,
            phone: document.getElementById('rsvp-phone').value,
            email: document.getElementById('rsvp-email')?.value || '',
            guests: document.getElementById('rsvp-guests').value,
            attendance: document.querySelector('input[name="attendance"]:checked')?.value,
            message: document.getElementById('rsvp-message').value
        };

        console.log('RSVP Data Submitted:', formData);

        modal.classList.add('active');
        form.reset();
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

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

            // Trigger animation smooth
            wishCard.style.opacity = '0';
            wishCard.style.transform = 'translateY(15px)';
            
            requestAnimationFrame(() => {
                setTimeout(() => {
                    wishCard.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    wishCard.style.opacity = '1';
                    wishCard.style.transform = 'translateY(0)';
                }, 30);
            });

            form.reset();
            // Menghilangkan fokus keyboard pada mobile sebaik sahaja selesai menghantar
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

            // Reka bentuk salinan hibrid untuk keserasian optimum pelayar iOS Safari & Android WebView
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    handleCopySuccess(btn);
                });
            } else {
                // Fallback cara lama sekiranya fungsi pengesahan SecureContext gagal
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed'; // Mengelakkan skrin skrol melompat pada mobile
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    handleCopySuccess(btn);
                } catch (err) {
                    console.error('Gagal menyalin teks: ', err);
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
        if (window.scrollY > 400) {
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
                const offset = window.innerWidth < 768 ? 60 : 80; // Suasana offset dikecilkan pada peranti mobile
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });
}
