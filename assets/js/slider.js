/**
 * FLORES - Premium Gold Slider / Carousel Modülü
 * Yüksek performanslı, donanım ivmeli (hardware accelerated) Vanilla JS Slider.
 */

let cur = 0;
const total = 3;
let autoplayInterval = null;

// Slayta gitme fonksiyonu
window.goTo = function(n) {
  const track = document.getElementById('track');
  if (!track) return;
  cur = (n + total) % total;
  track.style.transform = `translateX(${-cur * 100}%)`;
};

// Slaytı yönlendirme fonksiyonu (Prev/Next)
window.move = function(dir) {
  window.goTo(cur + dir);
  window.resetAutoplay(); // Manuel müdahale yapıldığında zamanlayıcıyı sıfırla
};

// Otomatik oynatmayı başlatma
window.startAutoplay = function() {
  autoplayInterval = setInterval(() => {
    window.goTo(cur + 1);
  }, 5000); // 5 saniyede bir otomatik geçiş
};

// Zamanlayıcıyı sıfırlama (Kullanıcı tıkladığında geçiş sırasının bozulmaması için)
window.resetAutoplay = function() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
  window.startAutoplay();
};

// Sayfa yüklendiğinde otomatik oynatmayı tetikle
document.addEventListener('DOMContentLoaded', () => {
  window.startAutoplay();
});
