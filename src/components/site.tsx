"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── Public GitHub profile ─── */
export const GITHUB_URL = "https://github.com/CPfeiferForge";
export const LINKEDIN_URL = "https://www.linkedin.com/company/telepath-technology-solutions/";

/* ───────── palette matched to logo ───────── */
export const T = {
  green:     "#1D9E75",
  greenDk:   "#0F6E56",
  greenMd:   "#5DCAA5",
  greenLt:   "#9FE1CB",
  greenPale: "#e2f5ee",
  charcoal:  "#2C2C2A",
  slate:     "#636e72",
  silver:    "#888780",
  light:     "#f8faf9",
  white:     "#ffffff",
  bg:        "#f4f9f7",
};

/* ───────── Shared layout constants ───────── */
export const container = { maxWidth: 1600, margin: "0 auto", paddingLeft: 48, paddingRight: 48, paddingTop: 0, paddingBottom: 0 };
export const navContainer = { width: "100%", margin: "0 auto", paddingLeft: 24, paddingRight: 24 };
export const footerContainer = { width: "100%", margin: "0 auto", paddingLeft: 24, paddingRight: 24 };
export const sectionPad = { paddingTop: 100, paddingBottom: 100 };

/* ───────── Intersection Observer reveal ───────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

export function RevealDiv({ children, delay = 0, style = {}, className = "" }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  ANIMATED LOGO — full version for hero         */
/* ═══════════════════════════════════════════════ */
export function AnimatedLogo({ showWordmark = true, maxWidth = 420 }: { showWordmark?: boolean; maxWidth?: number }) {
  const [phase, setPhase] = useState(0); // 0=hidden, 1=lines, 2=nodes, 3=wordmark
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 400);
    const t3 = setTimeout(() => setPhase(3), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const edgeStyle = (delay: number) => ({
    stroke: "currentColor",
    transition: `stroke-dashoffset 1s ease ${delay}s`,
    strokeDasharray: 60,
    strokeDashoffset: phase >= 1 ? 0 : 60,
  });

  const nodeStyle = (delay: number) => ({
    opacity: phase >= 2 ? 1 : 0,
    transition: `opacity 0.35s ease ${delay}s, transform 0.35s ease ${delay}s`,
    transform: phase >= 2 ? "scale(1)" : "scale(0)",
    transformOrigin: "center",
    transformBox: "fill-box" as const,
  });

  const wmStyle = {
    opacity: phase >= 3 ? 1 : 0,
    transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
    transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
  };

  const lines = [
    { x1:-15, y1:-35, x2:0,   y2:0,   c:"#9FE1CB", w:0.8, o:0.25, d:0 },
    { x1:15,  y1:-35, x2:0,   y2:0,   c:"#9FE1CB", w:0.8, o:0.25, d:0.08 },
    { x1:-40, y1:-20, x2:0,   y2:0,   c:"#1D9E75", w:1.2, o:0.45, d:0.16 },
    { x1:40,  y1:-20, x2:0,   y2:0,   c:"#1D9E75", w:1.2, o:0.45, d:0.24 },
    { x1:-15, y1:-35, x2:-40, y2:-20, c:"#9FE1CB", w:0.7, o:0.2,  d:0.32 },
    { x1:15,  y1:-35, x2:40,  y2:-20, c:"#9FE1CB", w:0.7, o:0.2,  d:0.4 },
    { x1:-40, y1:-20, x2:40,  y2:-20, c:"#5DCAA5", w:0.8, o:0.2,  d:0.48 },
    { x1:-75, y1:-10, x2:-40, y2:-20, c:"#9FE1CB", w:0.8, o:0.25, d:0.56 },
    { x1:75,  y1:-10, x2:40,  y2:-20, c:"#9FE1CB", w:0.8, o:0.25, d:0.64 },
    { x1:-60, y1:15,  x2:-40, y2:-20, c:"#5DCAA5", w:1,   o:0.3,  d:0.72 },
    { x1:60,  y1:15,  x2:40,  y2:-20, c:"#5DCAA5", w:1,   o:0.3,  d:0.8 },
    { x1:-75, y1:-10, x2:-60, y2:15,  c:"#9FE1CB", w:0.7, o:0.2,  d:0.88 },
    { x1:75,  y1:-10, x2:60,  y2:15,  c:"#9FE1CB", w:0.7, o:0.2,  d:0.96 },
    { x1:0,   y1:0,   x2:-30, y2:40,  c:"#1D9E75", w:1,   o:0.35, d:1.04 },
    { x1:0,   y1:0,   x2:30,  y2:40,  c:"#1D9E75", w:1,   o:0.35, d:1.12 },
    { x1:-60, y1:15,  x2:-30, y2:40,  c:"#1D9E75", w:1,   o:0.35, d:1.2 },
    { x1:60,  y1:15,  x2:30,  y2:40,  c:"#1D9E75", w:1,   o:0.35, d:1.28 },
    { x1:-30, y1:40,  x2:0,   y2:55,  c:"#0F6E56", w:1,   o:0.35, d:1.36 },
    { x1:30,  y1:40,  x2:0,   y2:55,  c:"#0F6E56", w:1,   o:0.35, d:1.44 },
  ];

  const nodes = [
    { cx:0,   cy:0,   r:9,   fill:"#1D9E75", d:0 },
    { cx:-40, cy:-20, r:6,   fill:"#5DCAA5", d:0.1 },
    { cx:40,  cy:-20, r:6,   fill:"#5DCAA5", d:0.1 },
    { cx:-60, cy:15,  r:7,   fill:"#1D9E75", d:0.2 },
    { cx:60,  cy:15,  r:7,   fill:"#1D9E75", d:0.2 },
    { cx:-30, cy:40,  r:5,   fill:"#5DCAA5", d:0.35 },
    { cx:30,  cy:40,  r:5,   fill:"#5DCAA5", d:0.35 },
    { cx:0,   cy:55,  r:6,   fill:"#0F6E56", d:0.45 },
    { cx:-75, cy:-10, r:3.5, fill:"#9FE1CB", d:0.55 },
    { cx:75,  cy:-10, r:3.5, fill:"#9FE1CB", d:0.55 },
    { cx:-15, cy:-35, r:3,   fill:"#9FE1CB", d:0.65 },
    { cx:15,  cy:-35, r:3,   fill:"#9FE1CB", d:0.65 },
  ];

  return (
    <div style={{ width: "100%", maxWidth }}>
      <svg width="100%" viewBox={showWordmark ? "0 0 680 320" : "0 0 680 240"} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(340, 110)">
          {lines.map((l, i) => (
            <line key={`e${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={l.c} strokeWidth={l.w} opacity={l.o}
              style={edgeStyle(l.d)}/>
          ))}
          {/* Pulse rings — CSS animation for infinite loop */}
          {[0, 1, 2].map(i => (
            <circle key={`pr${i}`} cx="0" cy="0" r="9" fill="none" stroke="#1D9E75" strokeWidth="1"
              style={{
                opacity: phase >= 2 ? undefined : 0,
                transformOrigin: "center",
                transformBox: "fill-box" as const,
                animation: phase >= 2 ? `telepath-pulse 3s ease-in-out ${2 + i * 0.6}s infinite` : "none",
              }}/>
          ))}
          {nodes.map((n, i) => (
            <circle key={`n${i}`} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill}
              style={nodeStyle(n.d)}/>
          ))}
        </g>
        {showWordmark && (
          <text x="340" y="240" textAnchor="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="34" fontWeight="500" fill="#2C2C2A" letterSpacing="3" style={wmStyle}>TELEPATH IT SERVICES</text>
        )}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  COMPACT LOGO — static, for nav & footer       */
/* ═══════════════════════════════════════════════ */
export function LogoMark({ size = 36 }: { size?: number }) {
  // True brand mark geometry (matches signature/kit lockups). size = rendered height.
  const w = Math.round(size * 1.5);
  return (
    <svg width={w} height={size} viewBox="-88 -46 176 118" fill="none" style={{ display: "block" }}>
      <line x1="-15" y1="-35" x2="0"   y2="0"   stroke="#9FE1CB" strokeWidth="2.4" opacity="0.25"/>
      <line x1="15"  y1="-35" x2="0"   y2="0"   stroke="#9FE1CB" strokeWidth="2.4" opacity="0.25"/>
      <line x1="-40" y1="-20" x2="0"   y2="0"   stroke="#1D9E75" strokeWidth="3.6" opacity="0.45"/>
      <line x1="40"  y1="-20" x2="0"   y2="0"   stroke="#1D9E75" strokeWidth="3.6" opacity="0.45"/>
      <line x1="-15" y1="-35" x2="-40" y2="-20" stroke="#9FE1CB" strokeWidth="2.1" opacity="0.2"/>
      <line x1="15"  y1="-35" x2="40"  y2="-20" stroke="#9FE1CB" strokeWidth="2.1" opacity="0.2"/>
      <line x1="-40" y1="-20" x2="40"  y2="-20" stroke="#5DCAA5" strokeWidth="2.4" opacity="0.2"/>
      <line x1="-75" y1="-10" x2="-40" y2="-20" stroke="#9FE1CB" strokeWidth="2.4" opacity="0.25"/>
      <line x1="75"  y1="-10" x2="40"  y2="-20" stroke="#9FE1CB" strokeWidth="2.4" opacity="0.25"/>
      <line x1="-60" y1="15"  x2="-40" y2="-20" stroke="#5DCAA5" strokeWidth="3"   opacity="0.3"/>
      <line x1="60"  y1="15"  x2="40"  y2="-20" stroke="#5DCAA5" strokeWidth="3"   opacity="0.3"/>
      <line x1="-75" y1="-10" x2="-60" y2="15"  stroke="#9FE1CB" strokeWidth="2.1" opacity="0.2"/>
      <line x1="75"  y1="-10" x2="60"  y2="15"  stroke="#9FE1CB" strokeWidth="2.1" opacity="0.2"/>
      <line x1="0"   y1="0"   x2="-30" y2="40"  stroke="#1D9E75" strokeWidth="3"   opacity="0.35"/>
      <line x1="0"   y1="0"   x2="30"  y2="40"  stroke="#1D9E75" strokeWidth="3"   opacity="0.35"/>
      <line x1="-60" y1="15"  x2="-30" y2="40"  stroke="#1D9E75" strokeWidth="3"   opacity="0.35"/>
      <line x1="60"  y1="15"  x2="30"  y2="40"  stroke="#1D9E75" strokeWidth="3"   opacity="0.35"/>
      <line x1="-30" y1="40"  x2="0"   y2="55"  stroke="#0F6E56" strokeWidth="3"   opacity="0.35"/>
      <line x1="30"  y1="40"  x2="0"   y2="55"  stroke="#0F6E56" strokeWidth="3"   opacity="0.35"/>
      <circle cx="0"   cy="0"   r="9"   fill="#1D9E75"/>
      <circle cx="-40" cy="-20" r="6"   fill="#5DCAA5"/>
      <circle cx="40"  cy="-20" r="6"   fill="#5DCAA5"/>
      <circle cx="-60" cy="15"  r="7"   fill="#1D9E75"/>
      <circle cx="60"  cy="15"  r="7"   fill="#1D9E75"/>
      <circle cx="-30" cy="40"  r="5"   fill="#5DCAA5"/>
      <circle cx="30"  cy="40"  r="5"   fill="#5DCAA5"/>
      <circle cx="0"   cy="55"  r="6"   fill="#0F6E56"/>
      <circle cx="-75" cy="-10" r="3.5" fill="#9FE1CB"/>
      <circle cx="75"  cy="-10" r="3.5" fill="#9FE1CB"/>
      <circle cx="-15" cy="-35" r="3"   fill="#9FE1CB"/>
      <circle cx="15"  cy="-35" r="3"   fill="#9FE1CB"/>
    </svg>
  );
}

/* ───────── Icons ───────── */
export function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const s = { width: size, height: size, stroke: T.green, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, React.ReactNode> = {
    linkedin: <svg viewBox="0 0 24 24" style={{...s, stroke: "none", fill: s.stroke}}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    github: <svg viewBox="0 0 24 24" style={s}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>,
    ai: <svg viewBox="0 0 24 24" style={s}><path d="M12 2a6 6 0 00-6 6c0 2.22 1.21 4.16 3 5.2V15a1 1 0 001 1h4a1 1 0 001-1v-1.8c1.79-1.04 3-2.98 3-5.2a6 6 0 00-6-6z"/><line x1="10" y1="18" x2="14" y2="18"/><line x1="10" y1="20" x2="14" y2="20"/><line x1="11" y1="22" x2="13" y2="22"/><line x1="8" y1="6" x2="4" y2="4"/><line x1="16" y1="6" x2="20" y2="4"/><line x1="6" y1="10" x2="2" y2="10"/><line x1="18" y1="10" x2="22" y2="10"/></svg>,
    scissors: <svg viewBox="0 0 24 24" style={s}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>,
    strategy: <svg viewBox="0 0 24 24" style={s}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
    code: <svg viewBox="0 0 24 24" style={s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    shield: <svg viewBox="0 0 24 24" style={s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    users: <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    cloud: <svg viewBox="0 0 24 24" style={s}><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
    zap: <svg viewBox="0 0 24 24" style={s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    chart: <svg viewBox="0 0 24 24" style={s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg>,
    repeat: <svg viewBox="0 0 24 24" style={s}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
    server: <svg viewBox="0 0 24 24" style={s}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
    arrow: <svg viewBox="0 0 24 24" style={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    check: <svg viewBox="0 0 24 24" style={s}><polyline points="20 6 9 17 4 12"/></svg>,
    mail: <svg viewBox="0 0 24 24" style={s}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
    phone: <svg viewBox="0 0 24 24" style={s}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    star: <svg viewBox="0 0 24 24" style={{...s, fill: "#f0c040", stroke: "#f0c040"}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    calendar: <svg viewBox="0 0 24 24" style={s}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  };
  return icons[name] || null;
}

/* ───────── Shared typography & buttons ───────── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: 2.6, textTransform: "uppercase", color: T.green, marginBottom: 14 }}>{children}</div>;
}

export function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: light ? T.white : T.charcoal, lineHeight: 1.2, margin: "0 0 20px" }}>{children}</h2>;
}

export function Btn({ children, variant = "primary", onClick, style: extra = {} }: { children: React.ReactNode; variant?: "primary" | "outline" | "white"; onClick?: () => void; style?: React.CSSProperties }) {
  const base = { fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", padding: "14px 32px", transition: "all 0.25s ease", letterSpacing: 0.3 };
  const variants = {
    primary: { ...base, background: T.green, color: T.white, ...extra },
    outline: { ...base, background: "transparent", color: T.green, border: `1.5px solid ${T.green}`, ...extra },
    white:   { ...base, background: T.white, color: T.green, ...extra },
  };
  return <button style={variants[variant]} onClick={onClick} onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 4px 16px rgba(29,158,117,0.25)"; }} onMouseLeave={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "none"; }}>{children}</button>;
}

/* Btn styled as a real link (for page navigation & external links) */
export function BtnLink({ children, href, variant = "primary", external = false, style: extra = {} }: { children: React.ReactNode; href: string; variant?: "primary" | "outline" | "white"; external?: boolean; style?: React.CSSProperties }) {
  const base = { fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, borderRadius: 6, cursor: "pointer", padding: "14px 32px", transition: "all 0.25s ease", letterSpacing: 0.3, textDecoration: "none", display: "inline-block" };
  const variants = {
    primary: { ...base, background: T.green, color: T.white, border: "1.5px solid transparent", ...extra },
    outline: { ...base, background: "transparent", color: T.green, border: `1.5px solid ${T.green}`, ...extra },
    white:   { ...base, background: T.white, color: T.green, border: "1.5px solid transparent", ...extra },
  };
  const hover = {
    onMouseEnter: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(29,158,117,0.25)"; },
    onMouseLeave: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; },
  };
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={variants[variant]} {...hover}>{children}</a>;
  }
  return <Link href={href} style={variants[variant]} {...hover}>{children}</Link>;
}

/* ═══════════════════════════════════════════════ */
/*  SITE NAV — shared across all pages            */
/* ═══════════════════════════════════════════════ */
const NAV_LINKS: [string, string][] = [
  ["/", "About"],
  ["/services", "Services"],
  ["/contact", "Contact"],
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.greenPale}` : "1px solid transparent",
        transition: "all 0.35s ease",
        padding: scrolled ? "14px 0" : "28px 0",
      }}>
        <div style={{ ...navContainer, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          {/* Logo — hard left */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0, textDecoration: "none" }}>
            <LogoMark size={34}/>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: 3, color: T.charcoal, textTransform: "uppercase", whiteSpace: "nowrap" }}>Telepath</span>
              <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 500, fontSize: 9.5, letterSpacing: 4.4, color: T.charcoal, textTransform: "uppercase", whiteSpace: "nowrap", marginTop: 3 }}>IT Services</span>
            </span>
          </Link>
          {/* Desktop nav links — centered */}
          <div style={{ display: "flex", alignItems: "center", gap: 32, position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="desktop-nav">
            {NAV_LINKS.map(([href, label]) => (
              <Link key={href} href={href} style={{
                background: "none", border: "none", cursor: "pointer", textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                color: isActive(href) ? T.green : T.slate,
                borderBottom: isActive(href) ? `2px solid ${T.green}` : "2px solid transparent",
                paddingBottom: 4, transition: "all 0.2s ease", whiteSpace: "nowrap",
              }}>{label}</Link>
            ))}
          </div>
          {/* Book a Call + GitHub + LinkedIn — hard right */}
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 16 }} className="desktop-nav">
            <BtnLink href="/contact" style={{ padding: "10px 24px", fontSize: 14 }}>Book a Call</BtnLink>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: "flex", alignItems: "center", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}>
              <Icon name="linkedin" size={22}/>
            </a>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="mobile-menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.charcoal} strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.98)", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", fontSize: 28, cursor: "pointer" }}>&#x00d7;</button>
          {NAV_LINKS.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", fontSize: 20, fontWeight: 500, color: T.charcoal, cursor: "pointer", textDecoration: "none" }}>{label}</Link>
          ))}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/*  FOOTER — shared across all pages              */
/* ═══════════════════════════════════════════════ */
export function SiteFooter() {
  const linkStyle: React.CSSProperties = {
    fontSize: 14, color: T.silver, textDecoration: "none", transition: "color 0.2s",
  };
  const hover = {
    onMouseEnter: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = T.white; },
    onMouseLeave: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.color = T.silver; },
  };
  return (
    <footer style={{ background: T.charcoal, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ ...footerContainer, maxWidth: 1600, paddingTop: 40, paddingBottom: 24 }}>
        {/* Row 1: brand / page links / social */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <LogoMark size={30} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: 3, color: T.white, textTransform: "uppercase", whiteSpace: "nowrap" }}>Telepath</span>
              <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 500, fontSize: 9, letterSpacing: 4.1, color: T.white, textTransform: "uppercase", whiteSpace: "nowrap", marginTop: 3 }}>IT Services</span>
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
            {NAV_LINKS.map(([href, label]) => (
              <Link key={href} href={href} style={linkStyle} {...hover}>{label}</Link>
            ))}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: "flex", alignItems: "center", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={T.silver} stroke="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 28, paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: T.silver }}>
            &copy; 2026 Telepath Technology Solutions LLC. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="/privacy" style={{ ...linkStyle, fontSize: 13 }} {...hover}>Privacy Policy</Link>
            <Link href="/terms" style={{ ...linkStyle, fontSize: 13 }} {...hover}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════ */
/*  COOKIE CONSENT — shared across all pages      */
/* ═══════════════════════════════════════════════ */
export function CookieBanner() {
  const COOKIE_KEY = "telepath_cookie_consent_v1";
  const [cookieConsent, setCookieConsent] = useState<"accepted" | "essential" | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_KEY);
      if (saved === "accepted" || saved === "essential") setCookieConsent(saved);
    } catch {
      // Ignore storage failures (e.g., privacy mode).
    }
    setLoaded(true);
  }, []);

  const accept = (mode: "accepted" | "essential") => {
    try {
      localStorage.setItem(COOKIE_KEY, mode);
    } catch {
      // Ignore storage failures.
    }
    setCookieConsent(mode);
  };

  if (!loaded || cookieConsent) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: 14,
        zIndex: 2200,
        width: "min(980px, calc(100% - 24px))",
        background: "rgba(226,245,238,0.86)",
        borderRadius: 12,
        boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div style={{ color: T.slate, fontSize: 13, lineHeight: 1.4 }}>
        <div style={{ fontWeight: 700, color: T.charcoal, marginBottom: 2 }}>Cookies</div>
        <div>
          We use cookies to improve your experience. By clicking{" "}
          <span style={{ fontWeight: 700 }}>&ldquo;Accept all&rdquo;</span>, you consent to our use of cookies.
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexDirection: "column", justifyContent: "flex-end", alignItems: "stretch" }}>
        <button
          onClick={() => accept("accepted")}
          style={{
            background: T.green,
            color: T.white,
            border: "none",
            borderRadius: 10,
            padding: "10px 14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Accept all
        </button>
        <button
          onClick={() => accept("essential")}
          style={{
            background: T.white,
            color: T.charcoal,
            border: `1.5px solid rgba(99,110,114,0.35)`,
            borderRadius: 10,
            padding: "10px 14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
