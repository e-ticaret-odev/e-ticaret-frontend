# ModernShop - Modern E-Ticaret Sitesi

Modern ve kullanıcı dostu bir e-ticaret sitesi. Sadece HTML ve CSS kullanılarak tasarlanmış, Clean Architecture prensiplerine uygun dosya yapısına sahip bir web projesi.

## Proje Özellikleri

- Tamamen HTML ve CSS ile geliştirilmiştir
- Modern ve duyarlı (responsive) tasarım
- Kullanıcı dostu arayüz
- Clean Architecture prensiplerine uygun dosya yapısı
- Font Awesome ikonları kullanılmıştır

## Dosya Yapısı

```
e-ticaret-frontend/
│
├── public/               # Statik dosyalar
│   ├── images/           # Görseller
│   ├── styles/           # CSS dosyaları
│   └── fonts/            # Fontlar
│
├── pages/                # HTML sayfaları
│   ├── index.html        # Ana sayfa
│   ├── product-list.html # Ürün listesi
│   ├── product-detail.html # Ürün detay
│   ├── cart.html         # Sepet
│   ├── about.html        # Hakkımızda
│   └── contact.html      # İletişim
│
└── components/           # Yeniden kullanılabilir HTML komponentleri
```

## Sayfalar

1. **Ana Sayfa (index.html)**: Web sitesinin karşılama sayfası. Öne çıkan ürünler, kategoriler ve genel site tanıtımı.
2. **Ürün Listesi (product-list.html)**: Tüm ürünlerin listelendiği, filtreleme ve sıralama seçeneklerinin bulunduğu sayfa.
3. **Ürün Detay (product-detail.html)**: Bir ürünün detaylı bilgilerinin, görsellerin ve yorumların gösterildiği sayfa.
4. **Sepet (cart.html)**: Alışveriş sepeti ve satın alma işlemlerine yönlendiren sayfa.
5. **Hakkımızda (about.html)**: Site ve şirket hakkında bilgiler içeren sayfa.
6. **İletişim (contact.html)**: İletişim formu, adres ve diğer iletişim bilgilerini içeren sayfa.

## Kurulum ve Çalıştırma

1. Repoyu klonlayın:
   ```
   git clone https://github.com/kullanici/e-ticaret-frontend.git
   ```

2. Proje klasörüne gidin:
   ```
   cd e-ticaret-frontend
   ```

3. Herhangi bir HTTP sunucusu ile çalıştırabilirsiniz. Örneğin:
   ```
   python -m http.server
   ```
   veya
   ```
   npx serve
   ```

4. Tarayıcınızda `http://localhost:8000/pages/index.html` adresine giderek projeyi görüntüleyebilirsiniz.

## Katkı Sağlama

1. Fork'layın
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## İletişim

Sorularınız veya önerileriniz için [info@modernshop.com](mailto:info@modernshop.com) adresine e-posta gönderebilirsiniz. 