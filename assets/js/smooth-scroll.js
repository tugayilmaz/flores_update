/**
 * FLORES - Akıcı Arayüz Etkileşimleri (Smooth Scroll & UI Interactivity)
 * Sticky Header, Mobil Hamburger Menü ve Aktif Link İzleme işlemlerini yönetir.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Konumlandırması (Absolute olduğu için artık scroll takibine gerek yoktur, performans için kaldırılmıştır)

  // 2. Global Mobil Menü Toggle Fonksiyonu (onclick ile çağrılır)
  const mobToggleBtn = document.querySelector('.flores-mob-toggle');
  const mobDrawer = document.getElementById('floresDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-menu-links a');

  window.toggleFloresMenu = () => {
    if (!mobToggleBtn || !mobDrawer) return;
    
    mobToggleBtn.classList.toggle('flores-mob-toggle--active');
    mobDrawer.classList.toggle('flores-lux-mob-drawer--active');
    
    // Mobil menü açıkken sayfa kaymasını kilitle
    if (mobDrawer.classList.contains('flores-lux-mob-drawer--active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Mobil linklerden birine tıklandığında menüyü kapat
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobDrawer && mobDrawer.classList.contains('flores-lux-mob-drawer--active')) {
        window.toggleFloresMenu();
      }
    });
  });

  // 3. Menü Linkleri İçin Akıcı Kaydırma (Smooth Scroll Anchor Links)
  const allScrollLinks = document.querySelectorAll('a[href^="#"]');
  allScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return; // Sadece boş linkse geç
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Header yüksekliğini hesaba kat
        const header = document.getElementById('floresHeader');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Scroll Durumuna Göre Aktif Menü Linki Güncelleme (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-center-menu > a, .nav-center-menu .dropbtn');

  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 140; // Kaydırma payı

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active'); // Gerekirse aktif rengi kaldırmak için
          link.style.color = ''; // Temizle
          
          let targetHref = link.getAttribute('href') || (link.classList.contains('dropbtn') ? '#kurumsal' : '');
          if (targetHref === `#${sectionId}`) {
            link.style.color = 'var(--color-accent)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // İlk açılışta çalıştır
});
