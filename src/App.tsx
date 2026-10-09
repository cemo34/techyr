import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, ArrowDownRight, Plus, Minus, List, X, Code, CreditCard, CheckCircle, ArrowRight, WhatsappLogo, Phone } from '@phosphor-icons/react'

const siteEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'techyr@techyr.app'

const capabilities = [
  { icon: Code, title: 'Yazılım & yapay zekâ', text: 'İşinize özel yazılımlar, ölçeklenebilir SaaS ürünleri ve süreçlerinize entegre yapay zekâ çözümleri.', tags: ['SaaS geliştirme', 'AI entegrasyonu', 'Web & mobil'], details: 'Fikir ve ihtiyaç analizinden ürün mimarisine, API geliştirmeden canlıya geçişe kadar projenizi uçtan uca ele alıyoruz. Yapay zekâyı doküman işleme, iş akışı otomasyonu ve karar destek süreçlerine uyguluyoruz.' },
  { icon: CreditCard, title: 'Ödeme teknolojileri', text: 'Cihaz, uygulama ve kasa arasında doğru bağlantılar. Sahada çalışan ödeme sistemleri için mühendislik.', tags: ['Android POS', 'Yeni nesil ÖKC', 'ECR entegrasyonu'], details: 'Android POS uygulamaları, yeni nesil yazar kasa POS projeleri ve ECR kasa-POS bağlantıları geliştiriyoruz. VUK 507 kapsamındaki projelerde teknik ihtiyaçlara uygun yazılım ve entegrasyon çözümleri sunuyoruz.' },
  { icon: CheckCircle, title: 'Test & kalite güvencesi', text: 'Sadece çalışan değil, farklı cihazlarda ve gerçek kullanım senaryolarında güven veren uygulamalar.', tags: ['POS testleri', 'Mobil testler', 'Web testleri'], details: 'POS, mobil ve web uygulamalarında fonksiyonel test, regresyon, entegrasyon ve kullanıcı senaryosu testleri yürütüyoruz. Bulguları yeniden üretilebilir adımlarla raporluyor, düzeltmeleri doğruluyoruz.' },
]
const paymentAreas = [
  ['Android POS geliştirme', 'Cihaza ve iş akışınıza özel ödeme uygulamaları; donanım ve servis entegrasyonları.'],
  ['Yeni nesil yazar kasa POS', 'Satış, tahsilat ve mali cihaz süreçlerini bir araya getiren uygulama ve proje çözümleri.'],
  ['VUK 507 çözümleri', 'VUK 507 kapsamındaki projeler için yazılım geliştirme, teknik entegrasyon ve test desteği.'],
  ['ECR kasa-POS bağlantıları', 'Kasa ve ödeme terminali arasında tutarlı işlem akışları ve haberleşme entegrasyonları.'],
]

function ProjectForm() {
  const [status, setStatus] = useState('')
  const email = siteEmail
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const brief = `TECHYR · PROJE ÖZETİ\n\nAd / şirket: ${data.get('name')}\nE-posta: ${data.get('email')}\nİlgilendiğim alan: ${data.get('service')}\n\nProje:\n${data.get('message')}`
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Techyr proje talebi')}&body=${encodeURIComponent(brief)}`
      setStatus('E-posta uygulamanızda proje özeti hazırlandı. Göndermeden önce içeriği kontrol edebilirsiniz.')
    } else {
      const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url; link.download = 'techyr-proje-ozeti.txt'; link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setStatus('Proje özetiniz indirildi. Bu işlem bir mesaj göndermez; bilgileriniz yalnızca cihazınızda kalır.')
    }
  }
  return <form className="project-form" onSubmit={submit}>
    <div className="form-pair"><label>Adınız / şirketiniz<input name="name" autoComplete="organization" required maxLength={120} /></label><label>E-posta adresiniz<input name="email" type="email" autoComplete="email" required maxLength={180} /></label></div>
    <label>Hangi alanda birlikte çalışalım?<select name="service"><option>Yazılım & yapay zekâ</option><option>Ödeme teknolojileri</option><option>Test & kalite güvencesi</option><option>Birden fazla alan</option></select></label>
    <label>Projenizden biraz bahsedin<textarea name="message" rows={3} required minLength={10} maxLength={2000} placeholder="Ne yapmak istiyorsunuz? Hangi ihtiyacı çözüyoruz?" /></label>
    <div className="form-bottom"><p>{email ? 'Form verileri sunucuda saklanmaz. Özet, e-posta uygulamanızda açılır.' : 'Proje özetinizi dosya olarak hazırlayın. Bilgileriniz sunucuya gönderilmez.'}</p><button type="submit" className="button">{email ? 'E-posta ile paylaş' : 'Proje notunu indir'}<ArrowUpRight size={19}/></button></div>
    <p role="status" className="form-status">{status}</p>
  </form>
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(0)
  const contactEmail = siteEmail
  return <>
    <a className="skip-link" href="#main">İçeriğe geç</a>
    <header className="site-header container">
      <a className="brand" href="#" aria-label="Techyr ana sayfa"><img src="/techyr-logo.svg" alt="Techyr" width="132" height="62" /></a>
      <button className="menu-toggle" type="button" aria-label={menu ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={24}/> : <List size={24}/>}</button>
      <nav id="navigation" className={menu ? 'navigation is-open' : 'navigation'} aria-label="Ana menü">
        <a href="#cozumler" onClick={() => setMenu(false)}>Çözümlerimiz</a><a href="#yaklasim" onClick={() => setMenu(false)}>Yaklaşımımız</a><a className="nav-contact" href="#iletisim" onClick={() => setMenu(false)}>Birlikte çalışalım <ArrowUpRight size={17}/></a>
      </nav>
    </header>
    <main id="main">
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-intro"><span className="eyebrow">Yazılım. Ödeme. Yapay zekâ.</span><h1 id="hero-heading">Fikirden<br/><span>çalışan sisteme.</span></h1><p>Yazılım, yapay zekâ ve ödeme teknolojilerini bir araya getiriyor; işinize özel, sağlam dijital çözümler geliştiriyoruz.</p><a className="text-link" href="#cozumler">Çözümlerimizi keşfedin <ArrowDownRight size={22}/></a></div>
        <div className="hero-mark"><img src="/techyr-logo.svg" alt="Çizimden doğan Techyr eskiz logosu" width="850" height="390" fetchPriority="high" /></div>
      </section>
      <section id="cozumler" className="solutions container section" aria-labelledby="solutions-heading">
        <div className="section-heading"><h2 id="solutions-heading">Karmaşık ihtiyaçlar.<br/><span>Net çözümler.</span></h2><p>Bir ürünün kodundan ödeme noktasına, kalite kontrolünden canlı kullanıma kadar yanınızdayız.</p></div>
        <div className="capabilities">{capabilities.map((item, i) => <article className={`capability ${expanded === i ? 'expanded' : ''}`} key={item.title}>
          <button className="capability-toggle" aria-expanded={expanded === i} aria-controls={`capability-${i}`} onClick={() => setExpanded(expanded === i ? null : i)}><item.icon size={27} weight="light"/><h3>{item.title}</h3>{expanded === i ? <Minus size={23}/> : <Plus size={23}/>}</button>
          <p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div id={`capability-${i}`} hidden={expanded !== i} className="capability-detail"><p>{item.details}</p></div>
        </article>)}</div>
      </section>
      <section className="payment-section container section" aria-labelledby="payment-heading">
        <div className="payment-visual"><img src="/images/payment-studio.webp" srcSet="/images/payment-studio-640.webp 640w, /images/payment-studio-960.webp 960w, /images/payment-studio.webp 1536w" sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 117px) / 2), (max-width: 1440px) calc((100vw - 192px) / 2), 620px" alt="Kâğıt zemin üzerinde Android POS terminali, fiş ve kasa bağlantı donanımı" width="1536" height="1024" loading="lazy"/><span className="image-caption">Uygulamadan cihaza, uçtan uca.</span></div>
        <div className="payment-copy"><span className="eyebrow">Ödeme sistemleri</span><h2 id="payment-heading">Her bağlantının<br/>arkasında mühendislik.</h2><p className="section-description">Ödeme ekosisteminin farklı parçalarını, işletmenizin ihtiyaçlarına göre bir araya getiriyoruz.</p><div className="payment-areas">{paymentAreas.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>
      <section id="yaklasim" className="approach container section" aria-labelledby="approach-heading">
        <h2 id="approach-heading">Önce anlarız.<br/><span>Sonra inşa ederiz.</span></h2>
        <div className="process"><article><span className="process-step">01</span><h3>İhtiyacı netleştiririz.</h3><p>İş akışınızı, kullanıcılarınızı ve teknik gereksinimleri birlikte tanımlarız.</p></article><article><span className="process-step">02</span><h3>Çözümü geliştiririz.</h3><p>Doğru mimariyle yazılımı kurar, cihaz ve servis bağlantılarını gerçekleştiririz.</p></article><article><span className="process-step">03</span><h3>Test eder, doğrularız.</h3><p>POS, mobil ve web uygulamalarını gerçek kullanım senaryolarıyla sınarız.</p></article><article><span className="process-step">04</span><h3>Birlikte ilerleriz.</h3><p>Canlıya geçişi planlar, geri bildirimlerle çözümünüzü geliştirmeye devam ederiz.</p></article></div>
      </section>
      <section id="iletisim" className="contact container section" aria-labelledby="contact-heading"><div className="contact-intro"><h2 id="contact-heading">Sıradaki fikrinizi<br/><span>birlikte çizelim.</span></h2><p>Yeni bir ürün, daha iyi bir entegrasyon ya da güvenilir bir test süreci. Projenizin ilk adımını birlikte netleştirelim.</p><a className="text-link" href={`mailto:${contactEmail}`}>{contactEmail}<ArrowUpRight size={22}/></a><div className="contact-channels"><a href="tel:+905442460660"><Phone size={18}/>0544 246 06 60</a><a href="https://wa.me/905442460660" target="_blank" rel="noopener noreferrer"><WhatsappLogo size={19}/>WhatsApp<ArrowUpRight size={16}/></a></div></div><ProjectForm/></section>
    </main>
    <footer className="footer container"><a className="brand" href="#" aria-label="Sayfanın başına dön"><img src="/techyr-logo.svg" alt="Techyr" width="132" height="62"/></a><p>Teknolojiyi işinize bağlarız.</p><span>© {new Date().getFullYear()} Techyr</span><a href="#main" aria-label="Başa dön"><ArrowRight size={22} className="back-top"/></a></footer>
  </>
}
