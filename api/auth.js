/**
 * Kimlik doğrulama API modülü
 */

import { post, get } from '../utils/api.js';
import { setToken, removeToken } from '../utils/auth.js';

// Kullanıcı girişi
async function login(email, password) {
    try {
        const response = await post('/login', { email, password });
        console.log('Login API yanıtı:', response);
        
        // Token'ı API yanıtının muhtemel konumlarından almaya çalış
        let token = null;
        
        // Token olası yollar
        if (response && response.data && response.data.token) {
            token = response.data.token;
        } else if (response && response.token) {
            token = response.token;
        } else if (response && response.data && response.data.user && response.data.user.token) {
            token = response.data.user.token;
        }
        
        if (token) {
            setToken(token);
            return {
                success: true,
                data: response
            };
        }
        
        throw new Error('Token bulunamadı. API yanıtı: ' + JSON.stringify(response));
    } catch (error) {
        console.error('Giriş yapılırken hata oluştu:', error);
        throw error;
    }
}

// Kullanıcı kaydı
async function register(userData) {
    try {
        return await post('/register', userData);
    } catch (error) {
        console.error('Kayıt olunurken hata oluştu:', error);
        throw error;
    }
}

// Kullanıcı çıkışı
function logout() {
    removeToken();
}

// Kullanıcı profili bilgilerini getir
async function getProfile() {
    try {
        return await get('/profile');
    } catch (error) {
        console.error('Profil bilgileri alınırken hata oluştu:', error);
        throw error;
    }
}

export {
    login,
    register,
    logout,
    getProfile
}; 