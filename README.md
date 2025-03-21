# HyperShop E-Ticaret Uygulaması

## Özellikler

- **Ürün Listesi**: Tüm ürünleri görüntüleme
- **Kategori Filtreleme**: Ürünleri kategorilere göre filtreleme
- **Sepet Yönetimi**: Ürünleri sepete ekleme, çıkarma ve sepeti temizleme
- **Sipariş Tamamlama**: Sepetteki ürünlerle sipariş oluşturma
- **Responsive Tasarım**: Tüm ekran boyutlarına uyumlu kullanıcı arayüzü
- **Bildirimler**: Kullanıcı işlemleri için bildirim sistemi
- **Yükleme Durumları**: Veri yüklenirken kullanıcıya görsel geri bildirim
- **Hata Yönetimi**: API isteklerinde oluşabilecek hataların yönetimi


### State Yönetimi

- Redux Toolkit kullanılmıştır

### API İletişimi

- RTK Query ile fakestore.api kullanarak yapılmıştır

### State Yönetimi

- **Redux Store**: Merkezi durum yönetimi
- **Slices**: Özellik bazlı durum parçaları (ürünler, sepet)
- **Selectors**: Durum erişimi için optimize edilmiş seçiciler



## Proje Yapısı

```
/app
  /components        # Yeniden kullanılabilir UI bileşenleri
  /store             # Redux store yapılandırması
    /api.js          # RTK Query API tanımları
    /productSlice.js # Ürün ve sepet durumu
    /provider.jsx    # Redux provider
    /store.js        # Store yapılandırması
  /page.js           # Ana sayfa
  /layout.js         # Kök layout
  /globals.css       # Global stil tanımları
/public              # Statik dosyalar
```
Link:https://starlit-youtiao-0697a4.netlify.app/


