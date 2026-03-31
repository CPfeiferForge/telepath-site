"use client";
import { useState, useEffect, useRef } from "react";

const SECTIONS = ["home","services","case-studies","about","testimonials","pricing","contact"];

/* ───────── palette matched to logo ───────── */
const T = {
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

/* ───────── Intersection Observer hook ───────── */
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

function RevealDiv({ children, delay = 0, style = {}, className = "" }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
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
function AnimatedLogo({ showWordmark = true, maxWidth = 420 }: { showWordmark?: boolean; maxWidth?: number }) {
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
                animation: phase >= 2 ? `telepath-pulse 3s ease-in-out ${2 + i * 0.6}s infinite` : "none",
              }}/>
          ))}
          {nodes.map((n, i) => (
            <circle key={`n${i}`} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill}
              style={nodeStyle(n.d)}/>
          ))}
        </g>
        {showWordmark && (
          <text x="340" y="240" textAnchor="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="34" fontWeight="500" fill="#2C2C2A" letterSpacing="3" style={wmStyle}>TELEPATH</text>
        )}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  COMPACT LOGO — static, for nav & footer       */
/* ═══════════════════════════════════════════════ */
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <g transform="translate(18, 15)">
        <line x1="-6"  y1="-13" x2="0"  y2="0"  stroke="#9FE1CB" strokeWidth="0.6" opacity="0.3"/>
        <line x1="6"   y1="-13" x2="0"  y2="0"  stroke="#9FE1CB" strokeWidth="0.6" opacity="0.3"/>
        <line x1="-15" y1="-7"  x2="0"  y2="0"  stroke="#1D9E75" strokeWidth="0.8" opacity="0.5"/>
        <line x1="15"  y1="-7"  x2="0"  y2="0"  stroke="#1D9E75" strokeWidth="0.8" opacity="0.5"/>
        <line x1="-15" y1="-7"  x2="15" y2="-7" stroke="#5DCAA5" strokeWidth="0.6" opacity="0.25"/>
        <line x1="0"   y1="0"   x2="-11" y2="14" stroke="#1D9E75" strokeWidth="0.7" opacity="0.4"/>
        <line x1="0"   y1="0"   x2="11"  y2="14" stroke="#1D9E75" strokeWidth="0.7" opacity="0.4"/>
        <line x1="-15" y1="-7"  x2="-11" y2="14" stroke="#5DCAA5" strokeWidth="0.6" opacity="0.3"/>
        <line x1="15"  y1="-7"  x2="11"  y2="14" stroke="#5DCAA5" strokeWidth="0.6" opacity="0.3"/>
        <line x1="-11" y1="14"  x2="0"   y2="19" stroke="#0F6E56" strokeWidth="0.7" opacity="0.4"/>
        <line x1="11"  y1="14"  x2="0"   y2="19" stroke="#0F6E56" strokeWidth="0.7" opacity="0.4"/>
        <circle cx="0"   cy="0"   r="3.2" fill="#1D9E75"/>
        <circle cx="-15" cy="-7"  r="2.2" fill="#5DCAA5"/>
        <circle cx="15"  cy="-7"  r="2.2" fill="#5DCAA5"/>
        <circle cx="-11" cy="14"  r="1.8" fill="#5DCAA5"/>
        <circle cx="11"  cy="14"  r="1.8" fill="#5DCAA5"/>
        <circle cx="0"   cy="19"  r="2"   fill="#0F6E56"/>
        <circle cx="-6"  cy="-13" r="1.2" fill="#9FE1CB"/>
        <circle cx="6"   cy="-13" r="1.2" fill="#9FE1CB"/>
      </g>
    </svg>
  );
}

/* ───────── Icons ───────── */
function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const s = { width: size, height: size, stroke: T.green, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<string, React.ReactNode> = {
    strategy: <svg viewBox="0 0 24 24" style={s}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
    code: <svg viewBox="0 0 24 24" style={s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    shield: <svg viewBox="0 0 24 24" style={s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    users: <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    cloud: <svg viewBox="0 0 24 24" style={s}><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
    zap: <svg viewBox="0 0 24 24" style={s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    arrow: <svg viewBox="0 0 24 24" style={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    check: <svg viewBox="0 0 24 24" style={s}><polyline points="20 6 9 17 4 12"/></svg>,
    mail: <svg viewBox="0 0 24 24" style={s}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
    phone: <svg viewBox="0 0 24 24" style={s}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    star: <svg viewBox="0 0 24 24" style={{...s, fill: "#f0c040", stroke: "#f0c040"}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    calendar: <svg viewBox="0 0 24 24" style={s}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  };
  return icons[name] || null;
}

/* ───────── Shared ───────── */
const container = { maxWidth: 1600, margin: "0 auto", paddingLeft: 48, paddingRight: 48, paddingTop: 0, paddingBottom: 0 };
// Header needs to reach closer to viewport edges than the main content container.
const navContainer = { width: "100%", margin: "0 auto", paddingLeft: 24, paddingRight: 24 };
// Footer also benefits from wider coverage than main sections.
const footerContainer = { width: "100%", margin: "0 auto", paddingLeft: 24, paddingRight: 24 };
const sectionPad = { paddingTop: 100, paddingBottom: 100 };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: 2.6, textTransform: "uppercase", color: T.green, marginBottom: 14 }}>{children}</div>;
}

function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: light ? T.white : T.charcoal, lineHeight: 1.2, margin: "0 0 20px" }}>{children}</h2>;
}

function Btn({ children, variant = "primary", onClick, style: extra = {} }: { children: React.ReactNode; variant?: "primary" | "outline" | "white"; onClick?: () => void; style?: React.CSSProperties }) {
  const base = { fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", padding: "14px 32px", transition: "all 0.25s ease", letterSpacing: 0.3 };
  const variants = {
    primary: { ...base, background: T.green, color: T.white, ...extra },
    outline: { ...base, background: "transparent", color: T.green, border: `1.5px solid ${T.green}`, ...extra },
    white:   { ...base, background: T.white, color: T.green, ...extra },
  };
  return <button style={variants[variant]} onClick={onClick} onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 4px 16px rgba(29,158,117,0.25)"; }} onMouseLeave={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "none"; }}>{children}</button>;
}

/* ═══════════════════════════════════════════ */
/*               MAIN COMPONENT                */
/* ═══════════════════════════════════════════ */
export default function TelepathSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const COOKIE_KEY = "telepath_cookie_consent_v1";
  const [cookieConsent, setCookieConsent] = useState<"accepted" | "essential" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" });
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_KEY);
      if (saved === "accepted" || saved === "essential") setCookieConsent(saved);
    } catch {
      // Ignore storage failures (e.g., privacy mode).
    }
  }, []);

  const acceptAllCookies = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "accepted");
    } catch {
      // Ignore storage failures.
    }
    setCookieConsent("accepted");
  };

  const acceptEssentialCookies = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "essential");
    } catch {
      // Ignore storage failures.
    }
    setCookieConsent("essential");
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.charcoal, background: T.white, overflowX: "hidden" }}>
      {/* ─── NAV ─── */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }} onClick={() => scrollTo("home")}>
            <LogoMark size={34}/>
            <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: 2.5, color: T.charcoal, textTransform: "uppercase" }}>Telepath</span>
          </div>
          {/* Desktop nav links — centered */}
          <div style={{ display: "flex", alignItems: "center", gap: 32, position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="desktop-nav">
            {[["services","Services"],["case-studies","Case Studies"],["about","About"],["contact","Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                color: activeSection === id ? T.green : T.slate,
                borderBottom: activeSection === id ? `2px solid ${T.green}` : "2px solid transparent",
                paddingBottom: 4, transition: "all 0.2s ease", whiteSpace: "nowrap",
              }}>{label}</button>
            ))}
          </div>
          {/* Book a Call — hard right */}
          <div style={{ flexShrink: 0 }} className="desktop-nav">
            <Btn onClick={() => scrollTo("contact")} style={{ padding: "10px 24px", fontSize: 14 }}>Book a Call</Btn>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="mobile-menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.charcoal} strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.98)", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", fontSize: 28, cursor: "pointer" }}>&#x00d7;</button>
          {[["home","Home"],["services","Services"],["case-studies","Case Studies"],["about","About"],["contact","Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", fontSize: 20, fontWeight: 500, color: T.charcoal, cursor: "pointer" }}>{label}</button>
          ))}
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(165deg, ${T.white} 0%, ${T.greenPale} 50%, ${T.bg} 100%)`, position: "relative", overflow: "hidden" }}>
        {/* Subtle dot texture */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          {[
            { w:12, l:5,  t:8  }, { w:8,  l:15, t:22 }, { w:14, l:28, t:12 },
            { w:10, l:42, t:35 }, { w:7,  l:55, t:8  }, { w:11, l:68, t:28 },
            { w:9,  l:82, t:15 }, { w:13, l:92, t:42 }, { w:8,  l:10, t:55 },
            { w:15, l:35, t:65 }, { w:7,  l:50, t:78 }, { w:11, l:65, t:58 },
            { w:9,  l:78, t:72 }, { w:12, l:88, t:85 }, { w:8,  l:22, t:88 },
            { w:10, l:45, t:92 }, { w:14, l:72, t:48 }, { w:7,  l:95, t:62 },
          ].map((dot, i) => (
            <div key={i} style={{
              position: "absolute",
              width: dot.w, height: dot.w,
              borderRadius: "50%",
              background: T.green,
              left: `${dot.l}%`,
              top: `${dot.t}%`,
            }}/>
          ))}
        </div>
        {/* Animated logo — large watermark behind content */}
        <div style={{
          position: "absolute",
          top: "46%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(1080px, 85vw)",
          opacity: 0.33,
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <AnimatedLogo showWordmark={false} maxWidth={1080}/>
        </div>
        {/* Hero content — single column, centered */}
        <div style={{ ...container, position: "relative", zIndex: 1, paddingTop: 136, paddingBottom: 80, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <RevealDiv style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SectionLabel>Fractional CTO Services</SectionLabel>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: 400, lineHeight: 1.15, color: T.charcoal, margin: "0 0 24px", maxWidth: 800 }}>
              Executive technology leadership,<br/>
              <span style={{ color: T.green }}>without the executive price tag.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: T.slate, maxWidth: 600, margin: "0 0 40px" }}>
              Telepath Technology Solutions provides seasoned CTO-level guidance to startups and scaling companies. Strategy, architecture, team building — on your terms.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <Btn onClick={() => scrollTo("contact")}>Schedule a Discovery Call</Btn>
              <Btn variant="outline" onClick={() => scrollTo("services")}>Explore Services</Btn>
            </div>
          </RevealDiv>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: T.slate }}>Scroll</div>
          <div style={{ width: 1, height: 32, background: T.slate, animation: "pulse-scroll 2s infinite" }}/>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ ...sectionPad, background: T.white }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <SectionLabel>Services</SectionLabel>
            <SectionTitle>Everything a CTO does — tailored to your stage and budget.</SectionTitle>
            <p style={{ color: T.slate, fontSize: 17, lineHeight: 1.7 }}>From pre-seed architecture decisions to scaling engineering teams, we plug into your organization exactly where you need us.</p>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {[
              { icon: "strategy", title: "Technology Strategy", desc: "Roadmap development, tech stack evaluation, build-vs-buy analysis, and strategic planning aligned with your business goals." },
              { icon: "code", title: "Architecture & Engineering", desc: "System design, code reviews, technical debt assessment, and hands-on guidance for your development team." },
              { icon: "users", title: "Team Building & Leadership", desc: "Hiring strategy, engineering culture development, performance frameworks, and mentoring your technical leaders." },
              { icon: "shield", title: "Security & Compliance", desc: "Security audits, compliance roadmaps (SOC 2, HIPAA, GDPR), vendor risk assessment, and incident response planning." },
              { icon: "cloud", title: "Cloud & Infrastructure", desc: "Cloud architecture, DevOps strategy, CI/CD pipelines, cost optimization, and scalability planning." },
              { icon: "zap", title: "Digital Transformation", desc: "Legacy modernization, AI/ML integration strategy, process automation, and technology-driven innovation." },
            ].map((svc, i) => (
              <RevealDiv key={i} delay={i * 0.08} style={{
                background: T.light, borderRadius: 12, padding: 36,
                border: `1px solid ${T.greenPale}`, transition: "all 0.3s ease", cursor: "default",
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: T.greenPale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon name={svc.icon}/>
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, margin: "0 0 12px", color: T.charcoal }}>{svc.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: T.slate, margin: 0 }}>{svc.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES ─── */}
      <section id="case-studies" style={{ ...sectionPad, background: T.bg }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <SectionLabel>Case Studies</SectionLabel>
            <SectionTitle>Results that speak for themselves.</SectionTitle>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
            {[
              { tag: "HealthTech Startup", title: "From MVP to Series A in 8 months", metric: "3.2M", metricLabel: "Raised in Series A", desc: "Designed the technical architecture, built the engineering team from 0 to 8, and established the development processes that gave investors confidence." },
              { tag: "E-Commerce Platform", title: "60% reduction in infrastructure costs", metric: "60%", metricLabel: "Cost Reduction", desc: "Audited cloud spend, re-architected for serverless, and implemented auto-scaling — saving $400K annually while improving uptime to 99.97%." },
              { tag: "FinTech Scale-Up", title: "SOC 2 compliance in 12 weeks", metric: "12wk", metricLabel: "To Compliance", desc: "Led the security transformation, implemented controls, and guided the team through audit — unlocking enterprise sales pipeline worth $2M ARR." },
            ].map((cs, i) => (
              <RevealDiv key={i} delay={i * 0.1} style={{
                background: T.white, borderRadius: 12, overflow: "hidden",
                border: `1px solid ${T.greenPale}`,
              }}>
                <div style={{ background: `linear-gradient(135deg, ${T.greenDk}, ${T.green})`, padding: "32px 32px 28px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.greenLt, marginBottom: 8 }}>{cs.tag}</div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: T.white, lineHeight: 1.3 }}>{cs.title}</div>
                </div>
                <div style={{ padding: 32 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 40, fontWeight: 700, color: T.green }}>{cs.metric}</span>
                    <span style={{ fontSize: 14, color: T.slate, fontWeight: 500 }}>{cs.metricLabel}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: T.slate, margin: 0 }}>{cs.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ ...sectionPad, background: T.white }}>
        <div style={{ ...container, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
          <RevealDiv>
            <div style={{
              width: "100%", aspectRatio: "4/5", borderRadius: 16,
              background: `linear-gradient(160deg, ${T.greenPale}, ${T.greenLt})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ fontSize: 14, color: T.greenDk, fontWeight: 500, letterSpacing: 1, textAlign: "center" }}>
                <LogoMark size={80}/>
                <div style={{ marginTop: 16 }}>Your Photo Here</div>
              </div>
              <div style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: T.green, opacity: 0.1 }}/>
            </div>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <SectionLabel>About</SectionLabel>
            <SectionTitle>Technology leadership rooted in real-world experience.</SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: "0 0 24px" }}>
              With over 15 years leading engineering teams at startups and Fortune 500 companies, I founded Telepath Technology Solutions to make executive-level technical leadership accessible to companies at every stage.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: "0 0 32px" }}>
              I've scaled teams from 2 to 200, architected systems handling millions of transactions, and guided dozens of companies through critical technical inflection points — from first hire to IPO.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[["15+", "Years in Tech Leadership"], ["50+", "Companies Advised"], ["$200M+", "Funding Guided"], ["99.9%", "Client Retention"]].map(([num, label], i) => (
                <div key={i} style={{ padding: 20, borderRadius: 10, background: T.light, border: `1px solid ${T.greenPale}` }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: T.green }}>{num}</div>
                  <div style={{ fontSize: 13, color: T.slate, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" style={{ ...sectionPad, background: `linear-gradient(170deg, ${T.greenDk}, ${T.green})` }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel><span style={{ color: T.greenLt }}>Testimonials</span></SectionLabel>
            <SectionTitle light>What clients are saying.</SectionTitle>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {[
              { quote: "Hiring a full-time CTO would have cost us $300K+. Telepath gave us the same caliber of leadership at a fraction of the cost — and we closed our Series A because of it.", name: "Sarah Chen", role: "CEO, MedFlow Health" },
              { quote: "Our engineering team went from chaotic to cohesive in three months. The frameworks and processes they put in place are still driving our success two years later.", name: "Marcus Rivera", role: "Founder, ShipStack" },
              { quote: "When we needed SOC 2 compliance to close enterprise deals, Telepath didn't just guide us through it — they made our entire security posture a competitive advantage.", name: "Priya Patel", role: "COO, VaultPay" },
            ].map((t, i) => (
              <RevealDiv key={i} delay={i * 0.1} style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: 12, padding: 36,
                border: "1px solid rgba(255,255,255,0.15)",
              }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <Icon key={j} name="star" size={16}/>)}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.9)", margin: "0 0 24px", fontStyle: "italic" }}>"{t.quote}"</p>
                <div>
                  <div style={{ fontWeight: 600, color: T.white, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: T.greenLt, fontSize: 13, marginTop: 2 }}>{t.role}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{ ...sectionPad, background: T.white }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <SectionLabel>Engagement Models</SectionLabel>
            <SectionTitle>Flexible structures designed for your needs.</SectionTitle>
            <p style={{ color: T.slate, fontSize: 17, lineHeight: 1.7 }}>Every company is different. Choose the engagement model that fits your team, or let's design a custom arrangement.</p>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              { tier: "Advisory", hours: "8 hrs/month", features: ["Bi-weekly strategy sessions", "Async Slack access", "Architecture reviews", "Hiring consultation"], accent: false },
              { tier: "Embedded", hours: "20 hrs/month", features: ["Weekly leadership meetings", "Daily Slack access", "Team mentoring", "Hands-on code reviews", "Board/investor prep"], accent: true },
              { tier: "Intensive", hours: "40 hrs/month", features: ["Full CTO integration", "Daily standups", "Unlimited access", "Hiring & firing authority", "Roadmap ownership", "Vendor management"], accent: false },
            ].map((plan, i) => (
              <RevealDiv key={i} delay={i * 0.1} style={{
                borderRadius: 14,
                padding: plan.accent ? 0 : 40,
                background: plan.accent ? `linear-gradient(160deg, ${T.greenDk}, ${T.green})` : T.light,
                border: plan.accent ? "none" : `1px solid ${T.greenPale}`,
                position: "relative", overflow: "hidden",
              }}>
                {plan.accent && <div style={{ padding: "10px 0", textAlign: "center", background: "rgba(0,0,0,0.12)", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: T.white }}>Most Popular</div>}
                <div style={{ padding: plan.accent ? "32px 40px 40px" : 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: plan.accent ? T.greenLt : T.green, marginBottom: 8 }}>{plan.tier}</div>
                  <div style={{ fontSize: 13, color: plan.accent ? T.greenLt : T.slate, marginBottom: 28 }}>{plan.hours}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: plan.accent ? "rgba(255,255,255,0.9)" : T.slate }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.accent ? T.greenLt : T.green} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Btn variant={plan.accent ? "white" : "primary"} onClick={() => scrollTo("contact")} style={{ width: "100%", textAlign: "center" }}>Get Started</Btn>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ ...sectionPad, background: T.white }}>
        <div style={{ ...container, display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          <RevealDiv>
            <SectionLabel>Contact</SectionLabel>
            <SectionTitle>Let's talk about your technology challenges.</SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: "0 0 40px" }}>
              Book a free 30-minute discovery call to discuss your needs and explore whether Telepath is the right fit.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <div style={{ background: T.light, borderRadius: 14, padding: 40, border: `1px solid ${T.greenPale}` }}>
              {[
                { label: "Name", type: "text" },
                { label: "Email", type: "email" },
                { label: "Phone", type: "tel" },
                { label: "Company", type: "text" },
              ].map((field, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.charcoal, marginBottom: 6, letterSpacing: 0.5 }}>{field.label}</label>
                  <input
                    type={field.type}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 8, border: `1.5px solid ${T.greenLt}`,
                      fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: T.white, outline: "none",
                      transition: "border-color 0.2s", boxSizing: "border-box",
                    }}
                    placeholder={field.label === "Phone" ? "Your phone number" : `Your ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.charcoal, marginBottom: 6, letterSpacing: 0.5 }}>How can we help?</label>
                <textarea rows={4} style={{
                  width: "100%", padding: "12px 16px", borderRadius: 8, border: `1.5px solid ${T.greenLt}`,
                  fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: T.white, outline: "none",
                  resize: "vertical", boxSizing: "border-box",
                }} placeholder="Tell us about your project..."/>
              </div>
              <Btn style={{ width: "100%", textAlign: "center" }}>Send Message</Btn>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: T.charcoal, padding: "12px 0" }}>
        <div
          style={{
            ...footerContainer,
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifySelf: "start" }}>
            <div style={{ transform: "translateY(-1px)" }}>
              <LogoMark size={30} />
            </div>
            <span
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontWeight: 500,
                fontSize: 18,
                letterSpacing: 2,
                color: T.white,
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Telepath
            </span>
          </div>

          <div style={{ fontSize: 13, color: T.silver, justifySelf: "start" }}>
            &copy; 2026 Telepath Technology Solutions LLC. All rights reserved.
          </div>

          <div style={{ display: "flex", gap: 20, justifySelf: "end" }}>
            {["Privacy Policy", "Terms of Service"].map((s) => (
              <span
                key={s}
                style={{ fontSize: 13, color: T.silver, cursor: "pointer" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* ─── Cookie Consent ─── */}
      {!cookieConsent && (
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
              <span style={{ fontWeight: 700 }}>“Accept all”</span>, you consent to our use of cookies.
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexDirection: "column", justifyContent: "flex-end", alignItems: "stretch" }}>
            <button
              onClick={acceptAllCookies}
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
              onClick={acceptEssentialCookies}
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
      )}

      {/* ─── RESPONSIVE + ANIMATION STYLES ─── */}
      <style>{`
        @keyframes pulse-scroll { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        @keyframes telepath-pulse {
          0%   { opacity: 0; r: 9; }
          15%  { opacity: 0.35; }
          50%  { opacity: 0; r: 28; }
          100% { opacity: 0; r: 28; }
        }
        @media (max-width: 1024px) {
          section > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        input:focus, textarea:focus { border-color: ${T.green} !important; }
        ::selection { background: ${T.greenLt}; color: ${T.charcoal}; }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
