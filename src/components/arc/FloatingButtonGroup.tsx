import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { motionTokens } from "./motion-tokens";

export interface FloatingButtonItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string;
}

interface FloatingButtonGroupProps {
  items: FloatingButtonItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function FloatingButtonGroup({
  items,
  activeId,
  onChange,
  className = "",
}: FloatingButtonGroupProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className={`arc-floating-tray ${className}`}
      onMouseLeave={() => setHoveredId(null)}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`arc-floating-btn ${isActive ? "is-active" : ""}`}
            onClick={() => onChange(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
          >
            {/* Active shared indicator (Arc calm spring motion) */}
            {isActive && (
              <motion.div
                layoutId="arc-active-pill"
                className="arc-pill-active"
                transition={motionTokens.spring.snappy}
              />
            )}

            {/* Hover preview indicator when not active */}
            {isHovered && !isActive && (
              <motion.div
                layoutId="arc-hover-pill"
                className="arc-pill-hover"
                transition={motionTokens.spring.gentle}
              />
            )}

            <span className="arc-btn-content">
              {item.icon && <span className="arc-btn-icon">{item.icon}</span>}
              <span className="arc-btn-label">{item.label}</span>
              {item.badge && <span className="arc-btn-badge">{item.badge}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
