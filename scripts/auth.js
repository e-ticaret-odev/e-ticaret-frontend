/**
 * Kimlik doğrulama işlemleri için JavaScript fonksiyonları
 * Bu dosya, login ve register formlarının API ile etkileşimini sağlar.
 */

import { showToast, showFormError, clearAllFormErrors } from '../utils/messages.js';
import { setToken } from '../utils/auth.js';

// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Debug modu - daha fazla log için true yapın
const DEBUG = true;

// Debug log
function debugLog(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

/**
 * Kullanıcı girişi yapan fonksiyon
 * @param {string} email - Kullanıcı e-posta adresi
 * @param {string} password - Kullanıcı şifresi
 * @returns {Promise<Object>} - API yanıtı
 */
async function loginUser(email, password) {
    try {
        // API isteği için form verilerini hazırla
        const loginData = {
            email: email,
            password: password
        };

        const url = `${API_BASE_URL}/login`;
        debugLog('Login isteği URL:', url);
        debugLog('Login isteği veri:', loginData);

        // Fetch API ile POST isteği gönder
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        debugLog('Response status:', response.status);
        debugLog('Response headers:', Object.fromEntries([...response.headers]));

        // API yanıtını JSON'a çevir
        const rawText = await response.text(); // Önce ham text al
        debugLog('Raw response:', rawText);
        
        let data;
        try {
            data = JSON.parse(rawText); // Sonra parse et
        } catch (parseError) {
            console.error('JSON parse hatası:', parseError);
            throw new Error('API yanıtı JSON formatında değil: ' + rawText.substring(0, 100));
        }
        
        // API yanıtını detaylı analiz et
        debugLog('API yanıtı (parsed):', data);
        debugLog('Yanıt tipi:', typeof data);
        
        if (data && typeof data === 'object') {
            debugLog('Yanıt içeriği (keys):', Object.keys(data));
            
            if (data.data) {
                debugLog('data.data içeriği (keys):', Object.keys(data.data));
            }
        }

        // Başarılı yanıt kontrolü
        if (response.ok) {
            // Token kontrolü - olası tüm token konumları
            let token = null;
            let tokenSource = '';
            
            // Yanıt yapısını detaylı olarak loglayalım
            debugLog('Token arama için tam API yanıtı:', JSON.stringify(data, null, 2));
            
            // 1. Seçenek: data.data.token
            if (data.data && data.data.token) {
                token = data.data.token;
                tokenSource = 'data.data.token';
            } 
            // 2. Seçenek: data.token
            else if (data.token) {
                token = data.token;
                tokenSource = 'data.token';
            }
            // 3. Seçenek: Eğer kullanıcı bilgisi içinde token varsa
            else if (data.data && data.data.user && data.data.user.token) {
                token = data.data.user.token;
                tokenSource = 'data.data.user.token';
            }
            // 4. Seçenek: response.data.token yolu (kullanıcı önerisi)
            else if (data.response && data.response.data && data.response.data.token) {
                token = data.response.data.token;
                tokenSource = 'data.response.data.token';
            }
            // 5. Seçenek: Direkt data nesnesinin kendisi token olabilir
            else if (typeof data === 'string' && data.length > 20) {
                token = data;
                tokenSource = 'data (string)';
            }
            
            if (token) {
                // Token'ı localStorage'a kaydet
                debugLog(`Token bulundu ve kaydediliyor (kaynak: ${tokenSource})...`);
                setToken(token);
                debugLog('Token başarıyla localStorage\'a kaydedildi');
                
                return {
                    success: true,
                    data: data.data || data,
                    user: (data.data && data.data.user) ? data.data.user : null
                };
            } else {
                console.error('Token hiçbir yoldan bulunamadı. API yanıtı:', JSON.stringify(data, null, 2));
                throw new Error('API yanıtında token bulunamadı. Yanıt yapısı: ' + JSON.stringify(Object.keys(data)));
            }
        } else {
            // API hatası döndüyse
            console.warn('API başarısız yanıt döndü:', data.message);
            return {
                success: false,
                message: data.message || 'Giriş yapılırken bir hata oluştu',
                errors: data.errors || {}
            };
        }
    } catch (error) {
        console.error('Giriş yaparken beklenmeyen bir hata oluştu:', error);
        return {
            success: false,
            message: 'Sunucuya bağlanırken bir hata oluştu: ' + error.message
        };
    }
}

/**
 * Yeni kullanıcı kaydı yapan fonksiyon
 * @param {Object} userData - Kullanıcı verileri (name, email, password)
 * @returns {Promise<Object>} - API yanıtı
 */
async function registerUser(userData) {
    try {
        // Fetch API ile POST isteği gönder
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // API yanıtını JSON'a çevir
        const data = await response.json();
        console.log('API yanıtı (register):', data);

        // Başarılı yanıt kontrolü
        if (response.ok) {
            return {
                success: true,
                data: data.data || data // data.data varsa onu, yoksa tüm data'yı döndür
            };
        } else {
            // API hatası döndüyse
            return {
                success: false,
                message: data.message || 'Kayıt olurken bir hata oluştu',
                errors: data.errors || {}
            };
        }
    } catch (error) {
        console.error('Kayıt olurken beklenmeyen bir hata oluştu:', error);
        return {
            success: false,
            message: 'Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
        };
    }
}

/**
 * Form girişlerini doğrulayan fonksiyon
 * @param {HTMLFormElement} form - Doğrulanacak form elementi
 * @returns {boolean} - Form geçerli mi?
 */
function validateForm(form) {
    let isValid = true;
    clearAllFormErrors(form);

    // Tüm zorunlu alanları kontrol et
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFormError(field, 'Bu alan zorunludur');
            isValid = false;
        }
    });

    // E-posta doğrulama
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            showFormError(emailField, 'Geçerli bir e-posta adresi giriniz');
            isValid = false;
        }
    }
    
    // Telefon numarası doğrulama
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim()) {
        // Türkiye telefon numarası formatı: başında 0 olmadan 10 haneli (5XX XXX XX XX)
        const phoneRegex = /^5\d{9}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
            showFormError(phoneField, 'Geçerli bir telefon numarası giriniz (5XXXXXXXXX formatında)');
            isValid = false;
        }
    }

    // Şifre doğrulama (kayıt formu için)
    const passwordField = form.querySelector('input[name="password"]');
    const passwordConfirmField = form.querySelector('input[name="passwordConfirm"]');
    
    if (passwordField && passwordField.value.trim() && passwordField.value.length < 6) {
        showFormError(passwordField, 'Şifre en az 6 karakter olmalıdır');
        isValid = false;
    }
    
    // Şifre eşleşme kontrolü
    if (passwordField && passwordConfirmField && 
        passwordField.value.trim() && passwordConfirmField.value.trim()) {
        if (passwordField.value !== passwordConfirmField.value) {
            showFormError(passwordConfirmField, 'Şifreler eşleşmiyor');
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Form gönderimini başlat/durdur
 * @param {HTMLFormElement} form - Form elementi
 * @param {boolean} loading - Yükleniyor durumu
 */
function setFormLoading(form, loading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    const buttonText = submitButton.querySelector('.button-text');
    
    if (loading) {
        submitButton.disabled = true;
        
        if (!loadingSpinner) {
            const spinner = document.createElement('span');
            spinner.className = 'loading-spinner';
            
            const buttonContent = document.createElement('div');
            buttonContent.className = 'button-content';
            
            // Mevcut metni koru
            const textSpan = document.createElement('span');
            textSpan.className = 'button-text';
            textSpan.textContent = submitButton.textContent;
            
            // Düğmenin içeriğini temizle ve yeni içeriği ekle
            submitButton.textContent = '';
            buttonContent.appendChild(spinner);
            buttonContent.appendChild(textSpan);
            submitButton.appendChild(buttonContent);
        }
    } else {
        submitButton.disabled = false;
        
        if (buttonText) {
            // Sadece düğme metni kalsın
            submitButton.textContent = buttonText.textContent;
        }
    }
}

/**
 * API hatalarını forma uygula
 * @param {HTMLFormElement} form - Form elementi
 * @param {Object} errors - API'den dönen hata nesnesi
 */
function applyApiErrors(form, errors) {
    if (!errors || typeof errors !== 'object') return;
    
    // Her bir hata alanı için uygun form elemanını bul
    Object.keys(errors).forEach(fieldName => {
        const inputField = form.querySelector(`[name="${fieldName}"]`);
        if (inputField) {
            // Hata mesajını göster (ilk hata mesajını al)
            const errorMessage = Array.isArray(errors[fieldName]) 
                ? errors[fieldName][0] 
                : errors[fieldName];
            
            showFormError(inputField, errorMessage);
        }
    });
}

export {
    loginUser,
    registerUser,
    validateForm,
    setFormLoading,
    applyApiErrors
}; 