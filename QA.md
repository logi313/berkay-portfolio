# Kontrol özeti

14 Eylül 2026, gerçek Chrome (Playwright) ile yerel sunucuda.

## Temizlik sonrası birebirlik
- Temizlikten önce ve sonra sayfadaki her elemanın konumu ve bütün hesaplanmış stilleri kaydedildi: 10 ekran boyutu (1920×900, 1536×730, 1366×657, 1280×800, 1001×800, 1100×1000, 820×1180, 600×900, 390×844, 844×390), proje penceresi açıkken, intro'nun her aşaması ve hareket azaltma modu.
- Sayfa ve proje penceresinde fark: 0. İntro katmanında yalnızca görünmeyen farklar var: hiç görünmeyen iki gizli yazı kopyası kaldırıldı, süresi zaten sıfır olan geçiş tanımları sadeleşti.
- Kullanılmayan 22 dosya siteden çıkarıldı (eski intro videoları, kullanılmayan fontlar, eski görseller); koddaki her dosya referansı mevcut.

## Davranış
- İntro: 1920×900, 1536×730, 1280×800 ve 390×844'te videodaki isim sitedeki başlığın tam üstüne iniyor (yatayda birebir, dikeyde en fazla 1 px). Hizalama 4,92 sn'de başlıyor, canlı başlık 5,25 sn'de devralıyor. Geçişte hiçbir karede çift isim yok.
- Bölüm geçişi: masaüstünde tek tekerlek tıkı, trackpad savurması ve hızlı çevirme tam bir bölüm ilerletiyor; 1366×657 ve 1280×600 dahil kısa pencerelerde de bölümler ekrana sığıyor, içerik taşmıyor.
- Menü, bölüm noktaları, ok tuşları ve #commercials gibi bağlantılar doğru bölüme gidiyor; görünür bölümün önizlemesi oynuyor.
- Kısa video şeridi tekerlekle kart kart kayıyor; sonunda About'a geçiyor.
- Proje seçme, pencereyi açma, sonraki proje, Escape ile kapatma, doğrudan proje bağlantısı ve e-posta kopyalama çalışıyor.
- Konsol hatası yok. Pencere kapanınca yarıda kesilen film indirmeleri dışında başarısız dosya isteği yok.

## Filmler (assets/films)
19 dosya, toplam 766 MB (site 804 MB). En büyük dosya 94,6 MB: GitHub Pages'in 100 MB dosya ve 1 GB site sınırının altında.
H.264 High, x264 veryslow iki geçiş, tune film, aq-mode 3. Filmler 1080p, kısa videolar kendi 720p boyutunda. Ses kaynaktan kopyalandı, yeniden kodlanmadı. Kalite her dosyada kaynağa karşı VMAF ile ölçüldü (95 üstü gözle ayırt edilemez kabul edilir).

| Dosya | Boyut | VMAF |
|---|---|---|
| the-systems-compass | 93,9 MB | 96,05 |
| vr-show | 94,2 MB | 96,85 |
| samurai | 63,3 MB | 99,46 |
| one-last-message | 93,8 MB | 97,53 |
| fix-this-plumbing | 47,5 MB | 98,37 |
| real-estate | 49,0 MB | 98,15 |
| the-impossible-drive | 94,6 MB | 98,64 |
| showreel | 93,9 MB | 98,66 |
| 11 kısa video | 12,1–12,6 MB | 96,89–99,28 |

- Parça parça gönderim (Range) yapan bir sunucuda 19 proje doğrudan bağlantıyla açıldı: hepsi doğru dosyayı, doğru süre ve çözünürlükle oynatıyor, %60'a atlama çalışıyor. Hata: 0.
- Oynatıcı: oynat/durdur, ilerleme çubuğunda sürükleyerek arama, ses, tam ekran, klavye (boşluk/K, oklar, M, F, Home/End), dokunmatikte ilk dokunuşla kontrollerin görünmesi test edildi.

## Test edilmeyenler
- Gerçek iPhone Safari ve Android cihaz, Firefox.
- Parmakla kaydırma (test ortamında simüle edilemedi).
- Canlı GitHub Pages sunucusunda indirme hızı.
