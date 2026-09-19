"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { copy, localeOf } from "@/lib/content";
import { Icon } from "./Icon";

const electrodes = [
  { x: 174, y: 280, markerX: 105, markerY: 207, angle: -8 },
  { x: 371, y: 300, markerX: 355, markerY: 198, angle: 8 },
  { x: 468, y: 282, markerX: 534, markerY: 211, angle: 8 },
  { x: 470, y: 333, markerX: 541, markerY: 390, angle: 0 },
];

export function Science() {
  const t = copy[localeOf(useLocale())];
  const [active, setActive] = useState(0);
  return (
    <section className="science-section section" id="how-it-works">
      <div className="container">
        <div className="science-heading">
          <div>
            <p className="eyebrow">{t.scienceEyebrow}</p>
            <h2>{t.scienceTitle}<br /><em>{t.scienceAccent}</em></h2>
          </div>
          <p className="science-intro">{t.scienceIntro}</p>
        </div>
        <div className="science-grid">
          <div className="anatomy-card">
            <div className="diagram-top">
              <span>ALBEA / PULSE</span>
              <span>{t.diagramView}</span>
            </div>
            <svg
              viewBox="0 0 640 430"
              role="group"
              aria-label={`${t.anatomy} · ${t.diagramView}`}
              className="anatomy-svg"
            >
              <image href="/images/foot-anatomy-medial.webp" x="0" y="0" width="640" height="427" aria-hidden="true" />
              <g aria-hidden="true">
                <path d="M278 293v92h-73" fill="none" stroke="#a05249" strokeWidth="1.2" />
                <circle cx="278" cy="293" r="3" fill="#a05249" />
                <text x="197" y="390" textAnchor="end" className="muscle-label">{t.anatomy}</text>
                <text x="67" y="410" className="orientation-label">{t.diagramHeel}</text>
                <text x="609" y="260" textAnchor="end" className="orientation-label">{t.diagramToe}</text>
              </g>
              {electrodes.map((point, i) => (
                <g
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={`${i + 1}. ${t.electrodes[i].title}`}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(i);
                    }
                  }}
                  className={`electrode-point ${active === i ? "active" : ""}`}
                >
                  <path d={`M${point.x} ${point.y} L${point.markerX} ${point.markerY}`} className="electrode-leader" />
                  <ellipse cx={point.x} cy={point.y} rx="24" ry="10" transform={`rotate(${point.angle} ${point.x} ${point.y})`} className="electrode-pad" />
                  <ellipse cx={point.x} cy={point.y} rx="16" ry="5" transform={`rotate(${point.angle} ${point.x} ${point.y})`} className="electrode-pad-inner" />
                  <circle cx={point.markerX} cy={point.markerY} r="28" fill="transparent" />
                  <circle cx={point.markerX} cy={point.markerY} r="23" className="electrode-halo" />
                  <circle cx={point.markerX} cy={point.markerY} r="17" className="electrode-marker" />
                  <text x={point.markerX} y={point.markerY + 5} textAnchor="middle" className="electrode-number">0{i + 1}</text>
                </g>
              ))}
            </svg>
            <div className="diagram-legend" aria-hidden="true">
              <span><i className="legend-muscle" />{t.diagramMuscle}</span>
              <span><i className="legend-electrode" />{t.diagramElectrodes}</span>
              <span>{t.clickExplore}</span>
            </div>
            <p className="diagram-caption">{t.schematic}</p>
          </div>
          <div className="electrode-list">
            {t.electrodes.map((e, i) => (
              <button
                key={e.title}
                className={`electrode-row ${active === i ? "selected" : ""}`}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className="step-number">0{i + 1}</span>
                <span><strong>{e.title}</strong><span>{e.description}</span></span>
                <Icon name={active === i ? "check" : "arrow"} width="16" />
              </button>
            ))}
            <div className="evidence-note">
              <p>{t.evidence}</p>
              <Link href="/science">{t.evidenceLink}<Icon width="16" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
