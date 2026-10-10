import { useState } from "react";
import { motion } from "motion/react";
import {
  Code,
  CreditCard,
  CheckCircle,
  Lightning,
  ShieldCheck,
  Cpu,
  Database,
  ChartPieSlice,
  Broadcast,
} from "@phosphor-icons/react";
import { FloatingButtonGroup } from "./FloatingButtonGroup";
import { ArcDonutChart } from "./ArcDonutChart";
import { ArcBillingToggle } from "./ArcBillingToggle";
import { motionTokens } from "./motion-tokens";

const telemetryData = [
  {
    key: "vuk",
    label: "VUK 507 Uyum",
    value: 35,
    color: "#38bdf8",
    metric: "%100",
    description: "Mali onaylı ÖKC protokolleri ve GİB güvenli servis standartları ile tam entegrasyon.",
  },
  {
    key: "pos",
    label: "POS İşlem Hızı",
    value: 28,
    color: "#34d399",
    metric: "0.28s",
    description: "Temassız NFC, chip & PIN işlemlerinde ultra hızlı işlem süresi ve kesintisiz akış.",
  },
  {
    key: "uptime",
    label: "Sistem Sürekliliği",
    value: 22,
    color: "#818cf8",
    metric: "%99.99",
    description: "Yüksek erişilebilirlikli mikroservis mimarisi ve felaket kurtarma senaryoları.",
  },
  {
    key: "latency",
    label: "API Gecikmesi",
    value: 15,
    color: "#f472b6",
    metric: "12ms",
    description: "Global kenar ağlar (Edge CDN) ve optimize edilmiş veritabanı sorgu yanıt süresi.",
  },
];

const modulesData = {
  ai: {
    title: "Yapay Zekâ Destekli Modern Yazılım Mimarisi",
    subtitle: "Doğal Dil & Otomasyon Motoru",
    desc: "Doküman ayrıştırma, ödeme anomali tespiti ve otomatik muhasebe eşleştirmelerinde çalışan yapay zekâ altyapısı.",
    stats: [
      { label: "İşlem Hacmi", val: "15k / sn" },
      { label: "Doğruluk Oranı", val: "%99.8" },
      { label: "Yanıt Süresi", val: "12 ms" },
    ],
    features: [
      {
        icon: Cpu,
        title: "Model Optimizasyonu",
        text: "Hafifletilmiş sinir ağları ile cihaz üzerinde veya bulutta sıfır gecikmeli çıkarım.",
      },
      {
        icon: Database,
        title: "Veri Boru Hattı",
        text: "Gerçek zamanlı Kafka & Redis veri akışı ve güvenli saklama.",
      },
      {
        icon: ShieldCheck,
        title: "Kurumsal Güvenlik",
        text: "Uçtan uca şifreleme ve KVKK standartlarında veri izolasyonu.",
      },
    ],
  },
  pos: {
    title: "Yeni Nesil Android POS & ÖKC Mühendisliği",
    subtitle: "Uçtan Uca Mali Çözümler",
    desc: "PAX, Ingenico ve Sunmi gibi donanımlarda çalışan mali onaylı Android uygulamalar ve ECR kasa entegrasyonu.",
    stats: [
      { label: "Desteklenen Terminal", val: "50+ Model" },
      { label: "İşlem Güvenliği", val: "EMV L1/L2" },
      { label: "VUK 507 Durumu", val: "Hazır" },
    ],
    features: [
      {
        icon: CreditCard,
        title: "Çoklu Kart Şemaları",
        text: "Troy, Visa, Mastercard, AMEX ve yemek kartları tek bir uygulamada.",
      },
      {
        icon: Broadcast,
        title: "ECR / Kasa Protokolü",
        text: "Perakende kasaları ile kablolu ve kablosuz haberleşme altyapısı.",
      },
      {
        icon: Lightning,
        title: "Anında Slip Üretimi",
        text: "Termal yazıcı ve dijital e-arşiv fiş gönderimi.",
      },
    ],
  },
  qa: {
    title: "Kapsamlı Test & Kalite Güvencesi Laboratuvarı",
    subtitle: "Gerçek Cihaz Regresyonu",
    desc: "Donanım üzerinde gerçek POS işlem simülasyonları, sınır durum senaryoları ve otomatik regresyon testleri.",
    stats: [
      { label: "Test Senaryosu", val: "1,200+" },
      { label: "Başarı Oranı", val: "%100" },
      { label: "Cihaz Kapsamı", val: "18 Matris" },
    ],
    features: [
      {
        icon: CheckCircle,
        title: "Fonksiyonel Doğrulama",
        text: "İptal, iade, puan, taksit ve yetkilendirme akışlarının tam testi.",
      },
      {
        icon: ChartPieSlice,
        title: "Stres & Yük Testi",
        text: "Yoğun kampanya dönemlerinde eşzamanlı işlem dayanıklılığı.",
      },
      {
        icon: ShieldCheck,
        title: "Mali Denetim Uyumu",
        text: "GİB ve yetkili kuruluş sertifikasyon standartlarına hazırlık.",
      },
    ],
  },
};

export function ArcInteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"ai" | "pos" | "qa">("ai");
  const [deployMode, setDeployMode] = useState<"cloud" | "enterprise">("cloud");

  const navItems = [
    { id: "ai", label: "Yazılım & Yapay Zekâ", icon: <Code size={18} />, badge: "v2.4" },
    { id: "pos", label: "Android POS & Ödeme", icon: <CreditCard size={18} />, badge: "VUK 507" },
    { id: "qa", label: "Test & Kalite Güvencesi", icon: <CheckCircle size={18} /> },
  ];

  const currentModule = modulesData[activeTab];

  return (
    <div className="arc-showcase-container">
      {/* 1. Arc Library Floating Navigation Bar */}
      <div className="arc-showcase-topbar">
        <FloatingButtonGroup
          items={navItems}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as "ai" | "pos" | "qa")}
        />
        <ArcBillingToggle mode={deployMode} onChange={setDeployMode} />
      </div>

      {/* 2. Visual Bento Grid with Arc Calm Motion */}
      <div className="arc-bento-grid">
        {/* Main interactive module card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTokens.spring.gentle}
          className="arc-bento-card arc-card-main"
        >
          <div className="arc-card-header">
            <span className="arc-module-badge">{currentModule.subtitle}</span>
            <div className="arc-live-pill">
              <span className="arc-pulse-dot" />
              <span>{deployMode === "cloud" ? "BULUT SAAS AKTİF" : "ÖZEL ALTYAPI HAZIR"}</span>
            </div>
          </div>

          <h3 className="arc-module-title">{currentModule.title}</h3>
          <p className="arc-module-desc">{currentModule.desc}</p>

          {/* Key Metric Gauges */}
          <div className="arc-metrics-strip">
            {currentModule.stats.map((st) => (
              <div key={st.label} className="arc-metric-box">
                <span className="arc-metric-val">{st.val}</span>
                <span className="arc-metric-lbl">{st.label}</span>
              </div>
            ))}
          </div>

          {/* Three Feature Pillars */}
          <div className="arc-features-list">
            {currentModule.features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="arc-feature-item">
                  <div className="arc-feature-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h5 className="arc-feature-heading">{feat.title}</h5>
                    <p className="arc-feature-body">{feat.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Donut Telemetry Component from Arc Library */}
        <div className="arc-bento-card arc-card-side">
          <ArcDonutChart data={telemetryData} title="Mimari Güvenilirlik & Hız" />
        </div>
      </div>
    </div>
  );
}
