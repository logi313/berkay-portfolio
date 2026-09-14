# Berkay Alioglu — Portfolio

`index.html` dosyasını aç. Kurulum, derleme veya ücretli bir servis gerekmiyor. Site internet olmadan da yerel dosyadan çalışır. `index.html`, `content.js`, `app.js`, `intro.js`, `styles.css`, `intro.css` ve `assets` klasörü birlikte kalmalı.

## Gerçek işleri eklemek

Tüm içerik **content.js** dosyasında. Videoları `assets` klasörüne koy ve ilgili projenin alanlarını güncelle:

```js
{
  id: 'the-last-message',       // Kalıcı proje bağlantısı; sonradan değiştirme.
  title: 'The Last Message',
  type: 'Narrative film',
  description: 'Gerçek projenin kısa açıklaması.',
  poster: 'assets/the-last-message.webp',
  focal: '62% 50%',            // Ana karakterin / ürünün kadrajdaki konumu.
  preview: 'assets/the-last-message-loop.mp4',
  film: 'assets/the-last-message-full.mp4',
  previewStart: 0,
  previewLength: 5,            // Önizleme döngüsü; tam filmin süresini etkilemez.
  captions: ''                 // İsteğe bağlı WebVTT dosyası.
}
```

- `preview`: sessiz, kısa arka plan videosu. Tercihen ayrı ve hafif bir dosya. Beş saniyeden kısaysa doğal sonundan döner.
- `film`: sesli, tam video. Bu alan dolunca “Explore project” otomatik olarak “Watch film” olur.
- `poster`: video başlamadan önce, kartta ve video açılamadığında gösterilen görsel. Ana arka planda kaliteli görünmesi için yüksek çözünürlüklü bir kare kullan.
- Proje listelerine aynı biçimde yeni kayıt ekleyebilirsin. Kart şeridi kaydırılabilir, sayı sınırı yok; üstteki Work sayacı kendini günceller.
- Açıklamaları, yılı ve disiplin bilgisini kendi kredilerinle güncelle.

## Filmler ve oynatıcı

Tam filmler sitenin içinde, `assets/films/` klasöründe duruyor ve sitenin kendi oynatıcısında açılıyor (Vimeo yok, yönlendirme yok). Oynatıcıda ince yeşil ilerleme çizgisi, süre, ses ve tam ekran var; film oynarken kontroller kendiliğinden gizlenir. Klavye: boşluk veya K oynat/duraklat, ←/→ 5 saniye, M ses, F tam ekran. Telefonda ilk dokunuş kontrolleri gösterir, ikincisi oynatır/duraklatır.

Bir projeye film bağlamak için `content.js` içinde `film` alanına dosya yolunu yaz: `film: 'assets/films/vr-show.mp4'`. Alan doluysa proje düğmesi "Watch film" olur.

Yeni bir filmi web için hazırlarken kaliteyi korumak ve GitHub'ın 100 MB dosya sınırında kalmak için iki geçişli kodlama kullan. Önce video bitrate'ini hesapla: `(94 MB × 8 ÷ süre saniye) − ses bitrate'i`, en fazla 12000 kbps. Sonra:

```
ffmpeg -i kaynak.mp4 -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset veryslow -tune film -x264-params aq-mode=3 -profile:v high -pix_fmt yuv420p -g 48 -b:v 3755k -pass 1 -an -f mp4 NUL
ffmpeg -i kaynak.mp4 -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset veryslow -tune film -x264-params aq-mode=3 -profile:v high -pix_fmt yuv420p -g 48 -b:v 3755k -maxrate 11265k -bufsize 22530k -pass 2 -c:a copy -movflags +faststart film.mp4
```

Kaynak zaten 1080p ise `-vf` kısmını çıkar. Bütün filmlerin toplamı sitenin 1 GB sınırını geçmemeli; güncel boyutlar `QA.md` içinde.

İleride Vimeo kullanmak istersen `film` alanına Vimeo linki de yapıştırabilirsin (herkese açık, liste dışı link veya embed kodu); o zaman Vimeo'nun kendi oynatıcısı açılır.

## Intro

Sitede oynayan intro `assets/intro-v07-web.mp4` (2,6 MB). Resolve'daki "BA IRIS - Rhythm v07" timeline'ının ilk 128 karesi, yani 20_TITLE_SCAN'in ilk karesine kadarki kısım. Başlık animasyonunun devamını sitenin gerçek başlığı yapıyor.

Geçiş şöyle çalışıyor: 118–125. karelerde klipler isim çizgisine toplanırken video, o ekrandaki başlığın tam üstüne gelecek şekilde kaydırılıp ölçekleniyor. Bu yüzden laptopta da telefonda da isim yerinden oynamıyor. 126. karede (5,25 sn) canlı başlık devralıyor ve site açılıyor.

Yeni bir intro hazırlarsan aynı ayarla sıkıştır, `intro.js` içindeki dosya adını ve en üstteki `STEER_FROM`, `STEER_TO`, `REVEAL_AT` kare zamanlarıyla `TITLE` (başlığın 1280×720 karedeki yeri) değerlerini güncelle:

```
ffmpeg -i yeni-intro.mov -frames:v 128 -map 0:v:0 -an -c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p -g 48 -movflags +faststart intro-web.mp4
```

Intro, videonun ilk 1,5 saniyesi inmeden başlamaz; 3 saniye içinde başlayamazsa (yavaş bağlantı) atlanır ve site açılır. İntro oynarken showreel önizlemesi inmez, geçiş anında başlar.

## Showreel ve gözlük videosu

`showreel` altındaki `preview` açılış ekranının arkasında dönen sessiz önizleme, `poster` ilk kare. Tam showreel'i Vimeo'ya yükleyince linkini `film` alanına koy; "Watch showreel" onu açar.

Gözlük videosu `about.video` alanında. Orijinal videonun ortadaki hareketli katmanı ve geniş arka planı korundu. `about.poster` geniş sabit arka planıdır. Aynı konsepti sürdürürken ikisini uyumlu güncelle.

## İletişim

E-posta `email` alanından değişir. Mail bağlantısı ve ayrı kopyalama düğmesi hazırdır. `socials` altına gerçek profil adresini yazınca bağlantı görünür; boş olanlar gösterilmez. Platform ana sayfalarına giden sahte bağlantı yoktur.

## Yayına alma (GitHub Pages)

Site GitHub Pages için hazır: `CNAME` dosyasında `berkayalioglu.com` yazıyor, `.nojekyll` dosyası GitHub'ın dosyaları işlemeden olduğu gibi yayınlamasını sağlıyor, paylaşım görseli ve sayfa adresi tam `https://berkayalioglu.com/` adresiyle tanımlı.

- Dosyaları GitHub'ın web sitesinden sürükleyip bırakarak yükleme: tarayıcıdan yüklemede dosya başına 25 MB sınırı var, filmler sığmaz. `git` veya GitHub Desktop ile yükle.
- GitHub Pages sınırları: dosya başına 100 MB, site toplamı 1 GB, aylık yaklaşık 100 GB trafik.
- E-posta adresinin gerçekten posta alması alan adının e-posta hizmetine bağlıdır; bu paket bir e-posta sunucusu içermez.

Proje adresleri `/#project/vr-show` biçimindedir. Özel sunucu yönlendirmesi gerektirmez.

## Hazır davranışlar

- Bölümler dikey bir akış gibi geçer: her bölüm tam ekrandır ve yerine oturur, bir bölüm diğerinin üstüne binmez. Masaüstünde tekerlek ve trackpad her harekette tam bir bölüm ilerletir; klavye ve dokunmatik ekranda tarayıcının kendi snap kaydırması çalışır.
- Kısa video şeridinin üzerindeyken tekerlek şeridi kart kart kaydırır; şeridin sonunda bir sonraki bölüme geçer.
- Üst menü yalnızca açılış ekranında görünür; Work bölümleri arasında tekrar etmez.
- Masaüstü ve laptopta 1920×900 tasarım ekrana orantılı ölçeklenir; tablet ve telefonda ayrı yerleşimler var.
- Yalnızca görünür bölümün videosu çalışır. Sekme gizlenince veya tam film açılınca önizleme durur.
- Hareket azaltma tercihi açıksa intro oynamaz ve bölüm sayfalama yerine normal kaydırma kullanılır. Portfolio videoları gizlenmez ve görünür bölümde sessiz oynar. Veri tasarrufu açıkken önizleme videoları inmez, posterler görünür.
- Gözlük videosu `about.playbackRate: 0.72` ile yavaş döngüdedir. `1` normal hızdır.
- Gerçek `<dialog>` oynatıcısı, Escape, klavye odağı, tam ekran için yerel video kontrolleri, altyazı desteği.
- Medya yükleme hatasında kapak ve anlaşılır mesaj; boş dosyada proje ayrıntıları.
- Başlıklarda Monument Extended Regular, gövde ve küçük arayüz metinlerinde Inter kullanılır. Fontlar yerel yüklenir; lisans notları `assets/monument-extended-LICENSE.txt` ve `assets/inter-LICENSE.txt` içindedir.

Kontrol sonucu: `QA.md`.
