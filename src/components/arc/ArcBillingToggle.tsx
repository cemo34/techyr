import { motion } from "motion/react";
import { motionTokens } from "./motion-tokens";

interface ArcBillingToggleProps {
  mode: "cloud" | "enterprise";
  onChange: (mode: "cloud" | "enterprise") => void;
}

export function ArcBillingToggle({ mode, onChange }: ArcBillingToggleProps) {
  return (
    <div className="arc-toggle-container">
      <div className="arc-toggle-tray">
        <button
          type="button"
          className={`arc-toggle-opt ${mode === "cloud" ? "is-selected" : ""}`}
          onClick={() => onChange("cloud")}
        >
          {mode === "cloud" && (
            <motion.div
              layoutId="arc-toggle-thumb"
              className="arc-toggle-thumb"
              transition={motionTokens.spring.snappy}
            />
          )}
          <span className="arc-toggle-text">Bulut SaaS &amp; API</span>
          <span className="arc-toggle-tag">Hızlı Başlangıç</span>
        </button>

        <button
          type="button"
          className={`arc-toggle-opt ${mode === "enterprise" ? "is-selected" : ""}`}
          onClick={() => onChange("enterprise")}
        >
          {mode === "enterprise" && (
            <motion.div
              layoutId="arc-toggle-thumb"
              className="arc-toggle-thumb"
              transition={motionTokens.spring.snappy}
            />
          )}
          <span className="arc-toggle-text">Özel Kurulum &amp; POS</span>
          <span className="arc-toggle-tag arc-tag-accent">VUK 507 &amp; ECR</span>
        </button>
      </div>
    </div>
  );
}
