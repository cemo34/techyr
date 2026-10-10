import { useState, useEffect } from "react";
import {
  Code,
  CreditCard,
  CheckCircle,
  ArrowsClockwise,
  TerminalWindow,
  Cpu,
  ShieldCheck,
  Lightning,
} from "@phosphor-icons/react";

interface PipelineMode {
  id: string;
  tabLabel: string;
  icon: typeof Code;
  headline: string;
  stage1: { title: string; subtitle: string; tag: string };
  stage2: { title: string; subtitle: string; tag: string };
  stage3: { title: string; subtitle: string; tag: string };
  codeFile: string;
  codeLang: string;
  codeLines: { num: string; text: string; type: "comment" | "keyword" | "exec" | "success" }[];
  metrics: { label: string; value: string; hint: string }[];
}

const MODES: PipelineMode[] = [
  {
    id: "software",
    tabLabel: "Yazılım & Yapay Zekâ",
    icon: Lightning,
    headline: "Yapay zekâ destekli modern yazılım mimarisi",
    stage1: {
      title: "1. Veri & İstek",
      subtitle: "Web, Mobil & API Çağrıları",
      tag: "Giriş",
    },
    stage2: {
      title: "2. Techyr AI Motoru",
      subtitle: "Doğal Dil & Otomasyon",
      tag: "İşleme",
    },
    stage3: {
      title: "3. Canlı Sistem",
      subtitle: "Ölçeklenebilir SaaS Dağıtımı",
      tag: "Çıktı",
    },
    codeFile: "techyr/ai/pipeline.ts",
    codeLang: "typescript",
    codeLines: [
      { num: "01", text: "// Akıllı karar destek ve veri işleme hattı", type: "comment" },
      { num: "02", text: 'const ai = new TechyrPipeline({ model: "neural-v3", stream: true });', type: "keyword" },
      { num: "03", text: "const output = await ai.executeWorkflow(request.payload);", type: "exec" },
      { num: "04", text: "✓ [200 OK] 12ms · Yapay zekâ iş akışı başarıyla sonuçlandı", type: "success" },
    ],
    metrics: [
      { label: "Gecikme Süresi", value: "12 ms", hint: "Ultra hızlı yanıt" },
      { label: "İşlem Hacmi", value: "15k / sn", hint: "Yüksek eşzamanlılık" },
      { label: "Model Doğruluğu", value: "%99.8", hint: "Hassas çıkarım" },
    ],
  },
  {
    id: "pos",
    tabLabel: "Android POS & Ödeme",
    icon: CreditCard,
    headline: "Donanım, POS terminali ve kasa arasında kesintisiz köprü",
    stage1: {
      title: "1. Android POS",
      subtitle: "Temassız NFC & Çip Kart",
      tag: "Tahsilat",
    },
    stage2: {
      title: "2. ECR & Kasa Motoru",
      subtitle: "Güvenli Donanım Bağlantısı",
      tag: "Protokol",
    },
    stage3: {
      title: "3. VUK 507 Onay",
      subtitle: "Mali Mühür & Fiş Üretimi",
      tag: "Mevzuat",
    },
    codeFile: "techyr/pos/vuk507.kt",
    codeLang: "kotlin",
    codeLines: [
      { num: "01", text: "// Android POS donanım ve kasa haberleşme akışı", type: "comment" },
      { num: "02", text: 'val tx = PosBridge.charge(amount = 1450.00, currency = "TRY")', type: "keyword" },
      { num: "03", text: "val receipt = EcrEngine.signFiscalVuk507(tx, secureHardware = true)", type: "exec" },
      { num: "04", text: "✓ [ONAYLANDI] Mali onay alındı · VUK 507 e-belge üretildi", type: "success" },
    ],
    metrics: [
      { label: "Mali Mevzuat", value: "VUK 507", hint: "Tam uyumlu mimari" },
      { label: "İşlem Süresi", value: "< 0.8 sn", hint: "Sahada anında onay" },
      { label: "Terminal Senk.", value: "%100", hint: "Kasa-POS el sıkışması" },
    ],
  },
  {
    id: "qa",
    tabLabel: "Test & Kalite Güvencesi",
    icon: CheckCircle,
    headline: "Gerçek cihaz ve donanımlarda uçtan uca doğrulama",
    stage1: {
      title: "1. Test Senaryosu",
      subtitle: "POS, Web & Mobil Fleet",
      tag: "Senaryo",
    },
    stage2: {
      title: "2. Otomatik QA Koşumu",
      subtitle: "Regresyon & Stres Yükü",
      tag: "Doğrulama",
    },
    stage3: {
      title: "3. Sıfır Hata Raporu",
      subtitle: "Canlıya Geçiş Onayı",
      tag: "Sertifika",
    },
    codeFile: "techyr/qa/runner.sh",
    codeLang: "bash",
    codeLines: [
      { num: "01", text: "$ techyr-qa run --target pos-android-fleet --stress-test", type: "comment" },
      { num: "02", text: "✓ Donanım NFC ve EMV çip doğrulaması ......... GEÇTİ (4ms)", type: "success" },
      { num: "03", text: "✓ ECR kasa haberleşme protokol testi ........ GEÇTİ (6ms)", type: "success" },
      { num: "04", text: "✓ 10.000 eşzamanlı işlem yük testi .......... %100 BAŞARILI", type: "success" },
    ],
    metrics: [
      { label: "Test Kapsamı", value: "%98.6", hint: "Tüm kritik akışlar" },
      { label: "Regresyon Hatası", value: "0 Hata", hint: "Temiz kod tabanı" },
      { label: "Uptime Güvencesi", value: "%99.99", hint: "Kesintisiz çalışma" },
    ],
  },
];

export default function TechAnimation() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % MODES.length);
      setPulseKey((k) => k + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const mode = MODES[activeTab];

  return (
    <div
      className="modern-tech-chassis"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Techyr teknoloji mimarisi ve canlı sistem animasyonu"
    >
      {/* macOS Style Glass Window Header */}
      <div className="modern-window-header">
        <div className="mac-traffic-lights">
          <span className="mac-dot mac-dot-close" />
          <span className="mac-dot mac-dot-min" />
          <span className="mac-dot mac-dot-max" />
        </div>
        <div className="window-center-title">
          <span className="live-pulse-badge">
            <span className="live-ping" />
            <span className="live-dot" />
          </span>
          <span className="window-title-text">TECHYR MİMARİ MERKEZİ</span>
          <span className="window-ver-badge">v2.4 PROD</span>
        </div>
        <div className="window-right-actions">
          <span className="realtime-tag">
            <ArrowsClockwise size={12} className="spin-infinite" />
            CANLI
          </span>
        </div>
      </div>

      {/* Modern Pill Tab Switcher */}
      <div className="modern-pills-bar">
        {MODES.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === activeTab;
          return (
            <button
              key={item.id}
              type="button"
              className={`modern-pill-btn ${isActive ? "active" : ""}`}
              onClick={() => {
                setActiveTab(idx);
                setPulseKey((k) => k + 1);
              }}
              aria-selected={isActive}
            >
              <Icon size={15} weight={isActive ? "fill" : "regular"} />
              <span>{item.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* 3-Stage Interactive Visual Pipeline */}
      <div className="pipeline-flow-wrapper">
        <div className="pipeline-headline">
          <span className="pipeline-eyebrow">MİMARİ AKIŞ</span>
          <p>{mode.headline}</p>
        </div>

        <div className="pipeline-stages-grid">
          {/* Stage 1 */}
          <div className="pipeline-card stage-card-1">
            <div className="card-top">
              <span className="stage-tag">{mode.stage1.tag}</span>
              <span className="stage-dot" />
            </div>
            <h4>{mode.stage1.title}</h4>
            <p>{mode.stage1.subtitle}</p>
          </div>

          {/* Connection Vector 1 */}
          <div className="pipeline-connector">
            <svg viewBox="0 0 60 20" fill="none" className="connector-svg">
              <line
                x1="0"
                y1="10"
                x2="60"
                y2="10"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle r="3" fill="#38bdf8">
                <animateMotion
                  path="M 0 10 L 60 10"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* Stage 2 (Center Hero Node) */}
          <div className="pipeline-card stage-card-2 active-center-card">
            <div className="card-top">
              <span className="stage-tag accent-cyan">{mode.stage2.tag}</span>
              <Cpu size={14} className="accent-icon" />
            </div>
            <h4>{mode.stage2.title}</h4>
            <p>{mode.stage2.subtitle}</p>
            <div className="center-glow-halo" />
          </div>

          {/* Connection Vector 2 */}
          <div className="pipeline-connector">
            <svg viewBox="0 0 60 20" fill="none" className="connector-svg">
              <line
                x1="0"
                y1="10"
                x2="60"
                y2="10"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle r="3" fill="#38bdf8">
                <animateMotion
                  path="M 0 10 L 60 10"
                  dur="1.8s"
                  begin="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* Stage 3 */}
          <div className="pipeline-card stage-card-3">
            <div className="card-top">
              <span className="stage-tag">{mode.stage3.tag}</span>
              <ShieldCheck size={14} className="success-icon" />
            </div>
            <h4>{mode.stage3.title}</h4>
            <p>{mode.stage3.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Modern Monospace Code Terminal Window */}
      <div className="modern-terminal-deck">
        <div className="terminal-header-mini">
          <div className="terminal-file-meta">
            <TerminalWindow size={13} className="cyan-text" />
            <code>{mode.codeFile}</code>
          </div>
          <span className="terminal-env-badge">EXECUTING · 200 OK</span>
        </div>

        <div className="terminal-content" key={pulseKey}>
          {mode.codeLines.map((line, i) => (
            <div key={i} className="terminal-row">
              <span className="row-number">{line.num}</span>
              <span className={`row-code type-${line.type}`}>{line.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Metric Cards */}
      <div className="modern-metrics-bar">
        {mode.metrics.map((m, i) => (
          <div key={i} className="metric-pod">
            <span className="pod-value">{m.value}</span>
            <span className="pod-label">{m.label}</span>
            <span className="pod-hint">{m.hint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
