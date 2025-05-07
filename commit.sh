#!/bin/bash

# Renk tanımlamaları
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Renk yok

echo -e "${BLUE}E-Ticaret Frontend Projesi Commit İşlemi${NC}"
echo -e "${YELLOW}=======================================${NC}"

# Değişiklikleri kontrol et
git status

# API Modülleri ekleniyor - Sepet API
echo -e "\n${GREEN}Sepet API modülü ekleniyor...${NC}"
git add api/cart.js
git commit -m "feat(api): Sepet API modülü eklendi

- Sepet içeriğini getirme
- Sepete ürün ekleme
- Sepetteki ürün miktarını güncelleme
- Sepetten ürün çıkarma
- Sepeti temizleme

fonksiyonları eklendi."

# API Modülleri ekleniyor - Sipariş API
echo -e "\n${GREEN}Sipariş API modülü ekleniyor...${NC}"
git add api/orders.js
git commit -m "feat(api): Sipariş API modülü eklendi

- Siparişleri listeleme
- Sipariş detayı getirme
- Yeni sipariş oluşturma
- Sipariş durumunu güncelleme (Admin)

fonksiyonları eklendi."

# Sayfalar ekleniyor - Ürün Detay Sayfası
echo -e "\n${GREEN}Ürün Detay sayfası ekleniyor...${NC}"
git add pages/product-detail.html
git commit -m "feat(UI): Ürün detay sayfası eklendi

- Ürün bilgileri görüntüleme
- Stok durumu gösterimi
- Sepete ekleme işlevselliği
- Miktar ayarlama kontrolü
- Responsive tasarım düzenlemeleri

özellikleri eklendi."

# Sayfalar ekleniyor - Sepet Sayfası
echo -e "\n${GREEN}Sepet sayfası ekleniyor...${NC}"
git add pages/cart.html
git commit -m "feat(UI): Sepet sayfası eklendi

- Sepetteki ürünleri listeleme
- Ürün miktarını değiştirme
- Sepetten ürün kaldırma
- Sepeti temizleme
- Siparişe dönüştürme
- Toplam tutarın hesaplanması

işlevleri eklendi."

# Sayfalar ekleniyor - Siparişlerim Sayfası
echo -e "\n${GREEN}Siparişlerim sayfası ekleniyor...${NC}"
git add pages/orders.html
git commit -m "feat(UI): Siparişlerim sayfası eklendi

- Kullanıcı siparişlerini listeleme
- Sipariş durumu gösterimi
- Sipariş tarihi formatlaması
- Sipariş detay sayfasına yönlendirme
- Responsive tasarım düzenlemeleri

özellikleri eklendi."

# Sayfalar ekleniyor - Sipariş Detay Sayfası
echo -e "\n${GREEN}Sipariş Detay sayfası ekleniyor...${NC}"
git add pages/order-detail.html
git commit -m "feat(UI): Sipariş detay sayfası eklendi

- Sipariş bilgilerini görüntüleme
- Sipariş ürünlerini listeleme
- Toplam tutarı gösterme
- Sipariş durumu gösterimi
- Responsive tasarım düzenlemeleri

özellikleri eklendi."

# Tüm değişiklikleri uzak sunucuya gönder
echo -e "\n${YELLOW}Tüm değişiklikler uzak sunucuya gönderiliyor...${NC}"
git push origin HEAD

echo -e "\n${GREEN}Tüm değişiklikler başarıyla commit edildi ve uzak sunucuya gönderildi!${NC}"
echo -e "${BLUE}İşlem tamamlandı!${NC}" 