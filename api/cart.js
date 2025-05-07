/**
 * Sepet API modülü
 */

import { get, post, put, del } from '../utils/api.js';

// Sepet içeriğini getir
async function getCart() {
    try {
        const response = await get('/cart');
        if (response && response.success && response.data) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Sepet içeriği alınırken hata oluştu:', error);
        return [];
    }
}

// Sepete ürün ekle
async function addToCart(productId, quantity = 1) {
    try {
        const response = await post('/cart/add', { product_id: productId, quantity });
        return response;
    } catch (error) {
        console.error('Ürün sepete eklenirken hata oluştu:', error);
        throw error;
    }
}

// Sepetteki ürün miktarını güncelle
async function updateCartItem(cartItemId, quantity) {
    try {
        const response = await put(`/cart/${cartItemId}`, { quantity });
        return response;
    } catch (error) {
        console.error('Sepet öğesi güncellenirken hata oluştu:', error);
        throw error;
    }
}

// Sepetten ürün çıkar
async function removeFromCart(cartItemId) {
    try {
        const response = await del(`/cart/${cartItemId}`);
        return response;
    } catch (error) {
        console.error('Ürün sepetten çıkarılırken hata oluştu:', error);
        throw error;
    }
}

// Sepeti temizle
async function clearCart() {
    try {
        const response = await del('/cart');
        return response;
    } catch (error) {
        console.error('Sepet temizlenirken hata oluştu:', error);
        throw error;
    }
}

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}; 