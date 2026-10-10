import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { motionTokens } from "./motion-tokens";

export interface DonutDatum {
  key: string;
  label: string;
  value: number;
  color: string;
  metric: string;
  description: string;
}

interface ArcDonutChartProps {
  data: DonutDatum[];
  title?: string;
  size?: number;
  thickness?: number;
}

export function ArcDonutChart({
  data,
  title = "Sistem Verimliliği",
  size = 240,
  thickness = 26,
}: ArcDonutChartProps) {
  const [activeKey, setActiveKey] = useState<string>(data[0]?.key || "");

  const total = data.reduce((acc, d) => acc + d.value, 0);
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const center = size / 2;

  // Calculate arc slices
  let cumulative = 0;
  const slices = data.map((d) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 360;
    return {
      ...d,
      startAngle,
      endAngle,
      midAngle: (startAngle + endAngle) / 2,
      percentage: Math.round((d.value / total) * 100),
    };
  });

  const activeItem = slices.find((s) => s.key === activeKey) || slices[0];

  function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  }

  function describeArc(cx: number, cy: number, rOut: number, rIn: number, startA: number, endA: number) {
    // Gap padding between slices (1.5 degrees)
    const gap = 1.5;
    const s = Math.min(startA + gap, endA - 0.5);
    const e = Math.max(endA - gap, startA + 0.5);
    const largeArc = e - s > 180 ? 1 : 0;

    const p1 = polarToCartesian(cx, cy, rOut, s);
    const p2 = polarToCartesian(cx, cy, rOut, e);
    const p3 = polarToCartesian(cx, cy, rIn, e);
    const p4 = polarToCartesian(cx, cy, rIn, s);

    return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${largeArc} 0 ${p4.x} ${p4.y} Z`;
  }

  return (
    <div className="arc-donut-card">
      <div className="arc-donut-header">
        <span className="arc-donut-badge">CANLI TELEMETRİ</span>
        <h4>{title}</h4>
      </div>

      <div className="arc-donut-visual-wrap">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="arc-donut-svg"
        >
          {slices.map((slice) => {
            const isActive = slice.key === activeKey;
            // Arc Library lift effect
            const liftDist = isActive ? 5 : 0;
            const liftRad = ((slice.midAngle - 90) * Math.PI) / 180;
            const dx = liftDist * Math.cos(liftRad);
            const dy = liftDist * Math.sin(liftRad);

            return (
              <g
                key={slice.key}
                transform={`translate(${dx}, ${dy})`}
                style={{ cursor: "pointer", transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)" }}
                onClick={() => setActiveKey(slice.key)}
                onMouseEnter={() => setActiveKey(slice.key)}
              >
                <path
                  d={describeArc(center, center, radius, innerRadius, slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  opacity={isActive ? 1 : 0.65}
                  style={{
                    filter: isActive ? `drop-shadow(0 0 10px ${slice.color}88)` : "none",
                    transition: "opacity 0.2s ease, filter 0.2s ease",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Center calm readout */}
        <div className="arc-donut-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.key}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={motionTokens.spring.snappy}
              className="arc-donut-center-inner"
            >
              <span className="arc-donut-val" style={{ color: activeItem.color }}>
                {activeItem.metric}
              </span>
              <span className="arc-donut-label">{activeItem.label}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Synchronized Legend */}
      <div className="arc-donut-legend">
        {slices.map((slice) => {
          const isActive = slice.key === activeKey;
          return (
            <button
              key={slice.key}
              type="button"
              className={`arc-legend-item ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveKey(slice.key)}
              onMouseEnter={() => setActiveKey(slice.key)}
            >
              <span
                className="arc-legend-dot"
                style={{ backgroundColor: slice.color, boxShadow: isActive ? `0 0 8px ${slice.color}` : "none" }}
              />
              <span className="arc-legend-name">{slice.label}</span>
              <span className="arc-legend-share">%{slice.percentage}</span>
            </button>
          );
        })}
      </div>

      {/* Description readout */}
      <div className="arc-donut-footer-text">
        <p>{activeItem.description}</p>
      </div>
    </div>
  );
}
