/**
 * Kimlik doğrulama işlemleri için yardımcı fonksiyonlar
 */

// Token işlemleri
const TOKEN_KEY = 'auth_token';

// JWT token'ı localStorage'a kaydet
function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

// JWT token'ı localStorage'dan al
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// JWT token'ı localStorage'dan sil
function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

// Kullanıcının giriş yapmış olup olmadığını kontrol et
function isLoggedIn() {
    return getToken() !== null;
}

// Korumalı sayfalarda oturum kontrolü yap ve giriş yapılmamışsa yönlendir
function checkAuth() {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// Kullanıcı girişi yapılmışsa, giriş/kayıt sayfalarında ana sayfaya yönlendir
function checkAlreadyLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = '/pages/products.html';
        return true;
    }
    return false;
}

// Çıkış yap
function logout() {
    removeToken();
    window.location.href = '/pages/login.html';
}

// Token'ı HTTP isteği için Authorization header'ına ekle
function getAuthHeader() {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export {
    setToken,
    getToken,
    removeToken,
    isLoggedIn,
    checkAuth,
    checkAlreadyLoggedIn,
    logout,
    getAuthHeader
}; 