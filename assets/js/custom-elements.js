/**
 * FLORES - Custom Premium Elements Scripts
 * Bu dosya index.html içerisindeki gömülü JS kodlarının dışa aktarılmasıyla oluşturulmuştur.
 * Temiz mimari (clean architecture) prensiplerine uygun olarak mantıksal kodları ayrıştırır.
 */

/* ==========================================================================
   1. CUSTOM HEADER & MOBILE DRAWER LOGIC
   ========================================================================== */
// 1. Sayfa Kaydırıldığında Header'ı Küçültme ve Koyulaştırma
window.addEventListener('scroll', function() {
    // Devre dışı bırakıldı - Header küçülmeyecek, sabit boyutta kalacak.
});

// 2. Mobil Menü Tetikleyicisi
window.toggleFloresMenu = function() {
    const drawer = document.getElementById('floresDrawer');
    if (drawer) {
        drawer.classList.toggle('active');
    }
};


/* ==========================================================================
   2. HERO SLIDER LOGIC
   ========================================================================== */
let cur = 0;
const total = 3;
let autoplayInterval = null;

window.goTo = function(n) {
    const track = document.getElementById('track');
    if (!track) return;
    cur = (n + total) % total;
    track.style.transform = `translateX(${-cur * 100}%)`;
};

window.move = function(dir) {
    window.goTo(cur + dir);
    window.resetAutoplay();
};

window.startAutoplay = function() {
    autoplayInterval = setInterval(() => {
        window.goTo(cur + 1);
    }, 5000);
};

window.resetAutoplay = function() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
    window.startAutoplay();
};

document.addEventListener('DOMContentLoaded', () => {
    window.startAutoplay();
});


/* ==========================================================================
   3. TEXT SPLITTING & SCROLLOUT LOGIC
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Splitting kütüphanesini tetikle
    if (typeof Splitting === 'function') {
        Splitting();
    }
    
    // ScrollOut tetikle
    if (typeof ScrollOut === 'function') {
        ScrollOut({
            targets: '.char', 
            once: true,
            onScroll: function () {
                document.querySelectorAll('.char').forEach(function (char, index) {
                    const rect = char.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        setTimeout(function () {
                            char.classList.add('visible');
                        }, index * 30); 
                    }
                });
            }
        });
    }
});

/* ==========================================================================
   4. MODAL OPEN/CLOSE LOGIC
   ========================================================================== */
window.openTalepModal = function() {
    const modal = document.getElementById('premiumTalepModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeTalepModal = function() {
    const modal = document.getElementById('premiumTalepModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('premiumTalepModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeTalepModal();
            }
        });
    }
});
