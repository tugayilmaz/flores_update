/**
 * FLORES - Ön Talep Formu ve KVKK Validasyon Modülü
 * Form gönderme işlemlerini, Regex kontrollerini ve Toast bildirimlerini yönetir.
 */

class FormHandler {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (!this.form) return;

    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.toast = document.getElementById('form-toast');

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // İnputlardaki değişikliklerde anlık hata kaldırma
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group') || input.closest('.form-checkbox');
        if (group) group.classList.remove('form-group--error');
      });
    });
  }

  handleFormSubmit() {
    let isValid = true;

    // Form Elemanları
    const nameInput = this.form.querySelector('#fullname');
    const phoneInput = this.form.querySelector('#phone');
    const emailInput = this.form.querySelector('#email');
    const kvkkInput = this.form.querySelector('#kvkk-check');

    // 1. İsim Validasyonu
    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      this.setError(nameInput);
      isValid = false;
    } else {
      this.clearError(nameInput);
    }

    // 2. Telefon Validasyonu (Türk Telefon Numaraları Formatı)
    const phoneRegex = /^(05|5)[0-9]{9}$/;
    const cleanPhone = phoneInput.value.replace(/[\s()-]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      this.setError(phoneInput);
      isValid = false;
    } else {
      this.clearError(phoneInput);
    }

    // 3. E-Posta Validasyonu (Opsiyonel ama girilirse doğru regex olmalı)
    if (emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        this.setError(emailInput);
        isValid = false;
      } else {
        this.clearError(emailInput);
      }
    } else {
      this.clearError(emailInput);
    }

    // 4. KVKK Onay Kutusu Kontrolü
    if (!kvkkInput.checked) {
      const checkLabel = kvkkInput.closest('.form-checkbox');
      if (checkLabel) checkLabel.classList.add('form-group--error');
      isValid = false;
    }

    // Form geçerliyse gönderim simülasyonu yap
    if (isValid) {
      this.sendFormData({
        fullname: nameInput.value.trim(),
        phone: cleanPhone,
        email: emailInput.value.trim()
      });
    }
  }

  setError(inputElement) {
    const group = inputElement.closest('.form-group');
    if (group) group.classList.add('form-group--error');
  }

  clearError(inputElement) {
    const group = inputElement.closest('.form-group');
    if (group) group.classList.remove('form-group--error');
  }

  sendFormData(data) {
    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.textContent = 'Gönderiliyor...';
    }

    // Sunucuya gönderim simülasyonu (2 Saniye Gecikmeli)
    setTimeout(() => {
      console.log('Form Başarıyla Gönderildi:', data);
      
      // Formu Sıfırla
      this.form.reset();

      if (this.submitBtn) {
        this.submitBtn.disabled = false;
        this.submitBtn.textContent = 'ÖN TALEP GÖNDER';
      }

      // Başarılı Toast Mesajını Göster
      this.showToast('Talebiniz başarıyla alınmıştır. En kısa sürede dönüş sağlanacaktır.', 'success');
    }, 1500);
  }

  showToast(message, type = 'success') {
    if (!this.toast) return;

    const icon = this.toast.querySelector('.toast__icon');
    const content = this.toast.querySelector('.toast__content');

    content.textContent = message;
    
    // Toast Sınıflarını Sıfırla ve Yeni Durumu Ekle
    this.toast.className = 'toast';
    this.toast.classList.add(`toast--${type}`);
    this.toast.classList.add('toast--active');

    if (icon) {
      icon.innerHTML = type === 'success' ? '✓' : '✗';
    }

    // 4 Saniye Sonra Gizle
    setTimeout(() => {
      this.toast.classList.remove('toast--active');
    }, 4000);
  }
}

// Global Kapsama Aktar
window.FormHandler = FormHandler;
