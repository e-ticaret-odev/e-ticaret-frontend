/**
 * Navigasyon çubuğu bileşeni
 */

import { isLoggedIn, logout } from '../utils/auth.js';

// Aktif sayfaya göre navigasyon linklerine 'active' sınıfı eklemek için
function getActiveClass(href) {
    const currentPage = window.location.pathname;
    return currentPage.includes(href) ? 'active' : '';
}

// Oturum durumuna göre navigasyon çubuğunu oluştur
function createNavbar() {
    const loggedIn = isLoggedIn();
    
    // Temel navigasyon HTML yapısı
    const navbarHtml = `
        <nav class="navbar">
            <div class="container navbar-container">
                <a href="/pages/products.html" class="navbar-brand">E-Ticaret</a>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="/pages/products.html" class="nav-link ${getActiveClass('products')}">Ürünler</a>
                    </li>
                    ${loggedIn ? `
                        <li class="nav-item">
                            <a href="/pages/cart.html" class="nav-link ${getActiveClass('cart')}">Sepetim</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/orders.html" class="nav-link ${getActiveClass('orders')}">Siparişlerim</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/profile.html" class="nav-link ${getActiveClass('profile')}">Profilim</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" id="logoutButton">Çıkış Yap</a>
                        </li>
                    ` : `
                        <li class="nav-item">
                            <a href="/pages/login.html" class="nav-link ${getActiveClass('login')}">Giriş Yap</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/register.html" class="nav-link ${getActiveClass('register')}">Kayıt Ol</a>
                        </li>
                    `}
                </ul>
            </div>
        </nav>
    `;
    
    return navbarHtml;
}

// Çıkış yapma işlevini ekleyerek navigasyonu sayfaya ekle
function renderNavbar(elementId = 'navbar') {
    const navbarElement = document.getElementById(elementId);
    
    if (navbarElement) {
        navbarElement.innerHTML = createNavbar();
        
        // Çıkış yapma butonuna olay dinleyici ekle
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    }
}

export { renderNavbar }; 