/**
 * Ürün kartı bileşeni
 */

import { post } from '../utils/api.js';
import { isLoggedIn } from '../utils/auth.js';
import { showToast } from '../utils/api.js';

// Ürün kartı HTML'i oluştur
function createProductCard(product) {
    // Ürün verilerini kontrol et, eksik verilere karşı koruma ekle
    const id = product.id || 0;
    const name = product.name || 'İsimsiz Ürün';
    // Ürün resminin URL'ini kontrol et
    let image = product.image;
    // Eğer resim yoksa veya eksikse, varsayılan bir resim kullan
    if (!image || image === 'undefined' || image === 'null') {
        image = '../public/placeholder.jpg';
    }
    const price = typeof product.price === 'number' ? parseFloat(product.price) : parseFloat(product.price) || 0;
    
    return `
        <div class="product-card card" data-id="${id}">
            <div class="product-image">
                <img src="${image}" alt="${name}" loading="lazy" onerror="this.src='../public/placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${name}</h3>
                <p class="product-price">${price.toFixed(2)} TL</p>
                <div class="product-actions">
                    <a href="product-detail.html?id=${id}" class="btn btn-sm">Detay</a>
                    ${isLoggedIn() ? `<button class="btn btn-sm add-to-cart" data-id="${id}">Sepete Ekle</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Ürün kartı stillerini belge başına ekle
function injectProductCardStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .product-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .product-image {
            height: 200px;
            overflow: hidden;
            border-radius: var(--radius) var(--radius) 0 0;
        }
        
        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .product-card:hover .product-image img {
            transform: scale(1.05);
        }
        
        .product-info {
            padding: 15px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        
        .product-title {
            margin: 0 0 10px;
            font-size: 1.1rem;
        }
        
        .product-price {
            color: var(--accent-color);
            font-weight: bold;
            margin-bottom: 15px;
        }
        
        .product-actions {
            margin-top: auto;
            display: flex;
            justify-content: space-between;
        }
        
        .btn-sm {
            padding: 5px 10px;
            font-size: 0.9rem;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Ürün kartlarını belgeye ekle ve sepete ekleme işlevselliğini ekle
function renderProductCards(products, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`'${containerId}' ID'li konteyner bulunamadı!`);
        return;
    }
    
    if (!Array.isArray(products)) {
        console.error('Ürünler bir dizi değil:', products);
        return;
    }
    
    // Stilleri enjekte et
    injectProductCardStyles();
    
    try {
        // Her ürün için kart oluştur ve kapsayıcıya ekle
        const productsHtml = products.map(product => {
            if (!product || !product.id || !product.name || product.price === undefined) {
                console.warn('Geçersiz ürün verisi:', product);
                return ''; // Geçersiz ürünleri atla
            }
            return createProductCard(product);
        }).join('');
        
        container.innerHTML = productsHtml;
        
        // Eğer kullanıcı giriş yapmışsa, sepete ekle düğmelerine olay dinleyicileri ekle
        if (isLoggedIn()) {
            const addToCartButtons = container.querySelectorAll('.add-to-cart');
            
            addToCartButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const productId = button.getAttribute('data-id');
                    
                    // Düğmeyi devre dışı bırak
                    button.disabled = true;
                    button.textContent = 'Ekleniyor...';
                    
                    try {
                        // Sepete ekleme API çağrısı
                        await post('/cart/add', { productId, quantity: 1 });
                        showToast('Ürün sepete eklendi!', 'success');
                    } catch (error) {
                        console.error('Sepete eklenirken hata oluştu:', error);
                    } finally {
                        // Düğmeyi yeniden etkinleştir
                        button.disabled = false;
                        button.textContent = 'Sepete Ekle';
                    }
                });
            });
        }
    } catch (error) {
        console.error('Ürün kartları oluşturulurken hata:', error);
    }
}

export { renderProductCards }; 