/**
 * API çağrıları için yardımcı fonksiyonlar
 */

import { getAuthHeader, logout } from './auth.js';

// API URL'i
const API_BASE_URL = 'http://localhost:8000/api';

// Toast bildirimi göster
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animasyon ekleyerek toast'ı göster
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 3 saniye sonra toast'ı kaldır
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// API'den gelen hata yanıtlarını işle
function handleApiError(error) {
    console.error('API Hatası:', error);
    
    // Eğer token geçersiz ise (401 Unauthorized) oturumu sonlandır
    if (error.status === 401) {
        showToast('Oturum süreniz doldu. Lütfen tekrar giriş yapın.', 'error');
        logout();
        return;
    }
    
    // Diğer hata türleri için genel bir hata mesajı göster
    showToast(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
}

// Fetch API ile istek gönderme
async function fetchApi(endpoint, options = {}) {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        
        // Varsayılan seçenekler
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        };
        
        // Seçenekleri birleştir
        const fetchOptions = { ...defaultOptions, ...options };
        
        // İstek gönder
        const response = await fetch(url, fetchOptions);
        
        // JSON yanıtını al
        const data = await response.json();
        
        // Başarısız yanıtlar için hata fırlat
        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || 'Bir hata oluştu',
                data
            };
        }
        
        return data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

// GET isteği
async function get(endpoint) {
    console.log(`API GET isteği: ${endpoint}`);
    try {
        const response = await fetchApi(endpoint, { method: 'GET' });
        
        // Yanıtı analiz et ve formatla
        let logMessage = '';
        
        if (response && typeof response === 'object') {
            if (response.data && response.data.products && Array.isArray(response.data.products)) {
                logMessage = `Ürünler dizisi alındı, ${response.data.products.length} adet`;
            } else {
                const preview = JSON.stringify(response).substring(0, 300);
                logMessage = `Yanıt: ${preview}${preview.length >= 300 ? '...' : ''}`;
            }
        } else {
            logMessage = `Beklenmeyen yanıt tipi: ${typeof response}`;
        }
        
        console.log(`API GET yanıtı (${endpoint}): ${logMessage}`);
        return response;
    } catch (error) {
        console.error(`API GET hatası (${endpoint}):`, error);
        throw error;
    }
}

// POST isteği
async function post(endpoint, data) {
    return fetchApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

// PUT isteği
async function put(endpoint, data) {
    return fetchApi(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

// DELETE isteği
async function del(endpoint) {
    return fetchApi(endpoint, { method: 'DELETE' });
}

export {
    showToast,
    get,
    post,
    put,
    del
}; 