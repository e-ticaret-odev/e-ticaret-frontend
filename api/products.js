/**
 * Ürünler API modülü
 */

import { get } from '../utils/api.js';

// Tüm ürünleri getir
async function getProducts() {
    try {
        const response = await get('/products');
        console.log('API yanıtı (getProducts içinde):', response);
        console.log('response.data:', response.data);
        // API yanıtı ve beklenen veri yapısını kontrol et
        if (response && response.data && Array.isArray(response.data.products)) {
            console.log('Başarıyla ' + response.data.products.length + ' ürün alındı.');
            return response.data.products; // Ürün dizisini döndür
        } else {
            console.warn('API yanıtı beklenen formatta değil veya ürün dizisi bulunamadı:', response);
            return []; // Hatalı veya eksik veri durumunda boş dizi döndür
        }
    } catch (error) {
        console.error('Ürünler APIden alınırken hata oluştu:', error);
        return []; // Herhangi bir ağ veya API hatasında boş dizi döndür
    }
}

// Belirli bir ürünü ID'ye göre getir
async function getProductById(id) {
    try {
        const response = await get(`/products/${id}`);
        console.log('API yanıtı (getProductById ' + id + ' için):', response);

        // API yanıtı ve beklenen veri yapısını kontrol et
        if (response && response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
             // response.data tek bir ürün nesnesi olmalı
            if(response.data.id) { // Basit bir ürün nesnesi kontrolü
                console.log('Başarıyla ürün ID ' + id + ' alındı.');
                return response.data; // Ürün nesnesini döndür
            } else {
                console.warn('Ürün ID ' + id + ' için API yanıtı beklenen formatta değil (data bir ürün nesnesi değil):', response.data);
                return null; // Hatalı formatta boş nesne yerine null döndür
            }
        } else {
            console.warn('Ürün ID ' + id + ' için API yanıtı beklenen formatta değil veya data kısmı eksik:', response);
            return null; // Hatalı veya eksik veri durumunda null döndür
        }
    } catch (error) {
        console.error('Ürün ID ' + id + ' APIden alınırken hata oluştu:', error);
        return null; // Herhangi bir ağ veya API hatasında null döndür
    }
}

export {
    getProducts,
    getProductById
}; 