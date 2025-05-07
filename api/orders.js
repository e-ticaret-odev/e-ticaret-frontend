/**
 * Sipariş API modülü
 */

import { get, post, put } from '../utils/api.js';

// Kullanıcının siparişlerini getir
async function getOrders() {
    try {
        const response = await get('/orders');
        if (response && response.success && response.data && response.data.orders) {
            return response.data.orders;
        }
        return [];
    } catch (error) {
        console.error('Siparişler alınırken hata oluştu:', error);
        return [];
    }
}

// Sipariş detayını getir
async function getOrderById(orderId) {
    try {
        const response = await get(`/orders/${orderId}`);
        if (response && response.success && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error(`Sipariş detayı (ID: ${orderId}) alınırken hata oluştu:`, error);
        return null;
    }
}

// Yeni sipariş oluştur
async function createOrder() {
    try {
        const response = await post('/orders', {});
        return response;
    } catch (error) {
        console.error('Sipariş oluşturulurken hata oluştu:', error);
        throw error;
    }
}

// Sipariş durumunu güncelle (Admin)
async function updateOrderStatus(orderId, status) {
    try {
        const response = await put(`/orders/${orderId}/status`, { status });
        return response;
    } catch (error) {
        console.error('Sipariş durumu güncellenirken hata oluştu:', error);
        throw error;
    }
}

export {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus
}; 