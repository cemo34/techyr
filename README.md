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

`.env.example` dosyasını `.env` olarak kopyalayın ve `VITE_CONTACT_EMAIL` alanına gerçek e-posta adresini girin. Cloudflare Pages ortam değişkenlerine de aynı değeri ekleyin ve yeniden build alın. Bu değer herkese açık build içine girer; gizli anahtar koymayın.

Form, adres tanımlanmışsa e-posta uygulamasında bir proje özeti açar. Kullanıcı gönderme işlemini kendi e-posta uygulamasında yapar. Adres tanımlanmamışsa proje özetini yerel `.txt` dosyası olarak indirir; hiçbir mesaj gönderilmiş gibi gösterilmez. Form verileri sunucuya iletilmez. Doğrudan e-posta gönderimi için ayrıca backend gerekir.

## GitHub ve Cloudflare Pages

1. GitHub üzerinde `techyr` deposu oluşturup bu projeyi `main` dalına gönderin.
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
