# Techyr

techyr.app için React + TypeScript + Vite kurumsal sitesi. Kese kâğıdı renkleri, yerel fontlar ve referans çizimden uyarlanan düzenlenebilir SVG logo kullanır.

## Yerel çalışma

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Node sürümü: `.node-version`. Üretim dosyaları `dist/` altında oluşur.

## İletişim

Varsayılan iletişim adresi `techyr@techyr.app`, telefon ve WhatsApp numarası `+90 544 246 06 60`. Adresi değiştirmek için `.env.example` dosyasını `.env` olarak kopyalayın ve `VITE_CONTACT_EMAIL` alanını düzenleyin. Cloudflare Pages ortam değişkenlerine de aynı değeri ekleyin ve yeniden build alın. Bu değer herkese açık build içine girer; gizli anahtar koymayın.

Form e-posta uygulamasında bir proje özeti açar. Kullanıcı gönderme işlemini kendi e-posta uygulamasında yapar. Form verileri sunucuya iletilmez. WhatsApp bağlantısı kullanıcıyı WhatsApp görüşmesine yönlendirir. Doğrudan sunucudan e-posta gönderimi için ayrıca backend gerekir.

## GitHub ve Cloudflare Pages

1. GitHub deposu: https://github.com/cemo34/techyr. Üretim dalı: `main`.
2. Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git bölümünden GitHub deposunu seçin.
3. Production branch: `main`; Framework preset: React (Vite); Build command: `npm run build`; Build output directory: `dist`; Root directory: depo kökü.
4. Environment variables: `NODE_VERSION=22.16.0` ve gerçek `VITE_CONTACT_EMAIL`.
5. İlk dağıtımdan sonra Pages projesinin Custom domains bölümünden `techyr.app` alan adını ekleyin. Apex alan adı için alan adının Cloudflare zone üzerinde olması gerekir; DNS kaydını Pages domain akışı üzerinden oluşturun.
6. Git bağlantısı tamamlandığında `main` dalına her push otomatik üretim dağıtımı yapar. GitHub Actions iş akışı ayrıca build kontrolü yapar; dağıtım Cloudflare'ın Git entegrasyonunda yürür.

Resmî rehberler: [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## İçerik ve tasarım

- `src/App.tsx`: Türkçe içerik, hizmet açılımları, mobil menü ve proje özeti formu.
- `src/styles.css`: kraft kâğıt paleti, responsive yerleşim, erişilebilir odak stilleri ve reduced-motion desteği.
- `public/techyr-logo.svg`: eskiz karakterini koruyan bağımsız vektör logo.
- `public/_headers`: Cloudflare Pages güvenlik ve önbellek başlıkları.
- `public/images/payment-studio.webp`: yapay zekâ ile oluşturulmuş konsept görsel; gerçek ürün veya müşteri referansı değildir.

Site analitik, izleme çerezi veya üçüncü taraf font isteği kullanmaz. Yasal sertifika, müşteri referansı ve doğrulanmamış performans iddiası içermez.
