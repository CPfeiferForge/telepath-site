"use client";
import { T, LogoMark, LINKEDIN_URL, BOOKING_PAGE_URL } from "../../components/site";

const PHONE = "+1-704-930-3255";
const EMAIL = "cpfeifer@telepathit.com";
const TITLE = "Founder & CTO";

const BTN_BASE: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
  width: "100%", padding: "15px 20px", borderRadius: 10,
  fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
  textDecoration: "none", letterSpacing: 0.3, transition: "all 0.2s ease",
  boxSizing: "border-box",
};

function CardButton({ href, children, primary = false, download = false }: { href: string; children: React.ReactNode; primary?: boolean; download?: boolean }) {
  return (
    <a
      href={href}
      {...(download ? { download: true } : {})}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        ...BTN_BASE,
        background: primary ? T.green : T.white,
        color: primary ? T.white : T.charcoal,
        border: primary ? "1.5px solid transparent" : `1.5px solid ${T.greenLt}`,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(29,158,117,0.2)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
    >
      {children}
    </a>
  );
}

export default function CardPage() {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", color: T.charcoal,
      background: `linear-gradient(165deg, ${T.white} 0%, ${T.greenPale} 60%, ${T.bg} 100%)`,
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "140px 20px 80px",
    }}>
      <div style={{
        width: "100%", maxWidth: 420, background: T.white, borderRadius: 18,
        border: `1px solid ${T.greenPale}`, boxShadow: "0 20px 60px rgba(15,110,86,0.10)",
        padding: "44px 32px", textAlign: "center",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <LogoMark size={72}/>
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, fontWeight: 400, margin: "0 0 6px", color: T.charcoal }}>Chris Pfeifer</h1>
        <div style={{ fontSize: 15, color: T.slate, marginBottom: 4 }}>{TITLE}</div>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.green, marginBottom: 28 }}>Telepath IT Services</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <CardButton href="/chris-pfeifer.vcf" primary download>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Save Contact
          </CardButton>
          <CardButton href={`mailto:${EMAIL}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
            Email Me
          </CardButton>
          <CardButton href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call
          </CardButton>
          <CardButton href="https://telepathit.com">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            telepathit.com
          </CardButton>
          <CardButton href={LINKEDIN_URL}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={T.green} stroke="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </CardButton>
          <CardButton href={BOOKING_PAGE_URL}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Book a Discovery Call
          </CardButton>
        </div>

        <div style={{ marginTop: 26, fontSize: 12, color: T.silver, lineHeight: 1.6 }}>
          Managed IT &middot; AI Development &middot; Cloud &amp; DevOps<br/>Security &middot; Fractional CTO
        </div>
      </div>
    </div>
  );
}
