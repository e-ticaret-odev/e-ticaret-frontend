/**
 * Mesaj gösterme fonksiyonları
 * Bu modül, kullanıcı mesajlarını (hata, başarı, bilgi) göstermek için kullanılır.
 */

// Toast tipi mesaj gösterme fonksiyonu
function showToast(message, type = 'info', duration = 3000) {
    // Toast element varsa kaldır
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Yeni toast elementi oluştur
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Sayfaya ekle
    document.body.appendChild(toast);
    
    // Görünürlük için kısa bir gecikme ekle (CSS animasyonu için)
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Belirtilen süre sonra kaldır
    setTimeout(() => {
        toast.classList.remove('show');
        
        // Animasyon bittikten sonra elementi tamamen kaldır
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Form hata mesajını göster (form elemanının altında)
function showFormError(inputElement, message) {
    // Mevcut hata mesajını temizle
    clearFormError(inputElement);
    
    // Hata mesajı elementi oluştur
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    // Input elementinden sonra ekle
    const parentElement = inputElement.parentElement;
    parentElement.appendChild(errorElement);
    
    // Input elementine hata sınıfı ekle
    inputElement.classList.add('input-error');
}

// Form hata mesajını temizle
function clearFormError(inputElement) {
    // Input elementinin parent'ındaki hata mesajını bul
    const parentElement = inputElement.parentElement;
    const errorElement = parentElement.querySelector('.form-error');
    
    // Varsa hata mesajını kaldır
    if (errorElement) {
        errorElement.remove();
    }
    
    // Input elementinden hata sınıfını kaldır
    inputElement.classList.remove('input-error');
}

// Tüm form hatalarını temizle
function clearAllFormErrors(formElement) {
    // Form içindeki tüm hata mesajlarını bul
    const errorElements = formElement.querySelectorAll('.form-error');
    errorElements.forEach(element => element.remove());
    
    // Form içindeki tüm inputlardan hata sınıfını kaldır
    const inputElements = formElement.querySelectorAll('.input-error');
    inputElements.forEach(element => element.classList.remove('input-error'));
}

// URL'den query parametrelerini al
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Sayfa yüklendiğinde URL query parametrelerinden mesaj göster
function showMessageFromUrl() {
    // registered parametresi varsa
    if (getQueryParam('registered') === 'true') {
        showToast('Kayıt işlemi başarılı! Lütfen giriş yapın.', 'success');
    }
    
    // error parametresi varsa
    const errorMsg = getQueryParam('error');
    if (errorMsg) {
        showToast(decodeURIComponent(errorMsg), 'error');
    }
    
    // success parametresi varsa
    const successMsg = getQueryParam('success');
    if (successMsg) {
        showToast(decodeURIComponent(successMsg), 'success');
    }
}

export {
    showToast,
    showFormError,
    clearFormError,
    clearAllFormErrors,
    getQueryParam,
    showMessageFromUrl
}; 