/**
 * FLORES - Ana Uygulama Yönetim Noktası (Core App Orchestrator)
 * Projedeki tüm bağımsız JS modüllerini başlatır ve koordine eder.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('FLORES Web Sitesi başarıyla yüklendi! - Clean Architecture initialized.');

  // Slider otomatik olarak kendi kendini slider.js içinden başlatmaktadır.

  // 2. Ön Talep Formu Başlatma
  const formHandler = new FormHandler('#on-talep-formu');
});
