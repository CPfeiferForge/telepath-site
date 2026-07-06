"use client";
import {
  T, container, sectionPad, GITHUB_URL,
  SectionLabel, SectionTitle, BtnLink, RevealDiv, Icon,
} from "../../components/site";

const BUILDS = [
  {
    tag: "Regulated Financial Services Firm",
    title: "Enterprise AI portal serving 200 employees",
    desc: "Designed and built a secure, LLM-powered AI workspace for a wealth management and trust organization: conversational assistance, document and presentation generation with live preview, and role-aware access — all inside the firm's own cloud tenant.",
    tech: ["Next.js", "Azure", "Claude API", "Docker", "Python"],
  },
  {
    tag: "Regulated Financial Services Firm",
    title: "Zero-egress sandbox for AI-generated code",
    desc: "Architected disposable, per-request container environments for safely executing AI-generated code: no network egress, no cloud identity, strict CPU, memory, and wall-clock budgets, and validated output only — backed by a formal security architecture brief for InfoSec approval.",
    tech: ["Azure Container Instances", "Python", "Security Architecture"],
  },
  {
    tag: "Enterprise CRM Platform",
    title: "Synthetic performance monitoring across a device fleet",
    desc: "Built a browser-automation monitoring fleet that measures real user journeys in a hosted CRM from multiple office locations, streams timings into a SQL data warehouse, and surfaces them in a React analytics dashboard with Apdex scoring, change-point detection, and automated vendor-facing reports.",
    tech: ["Playwright", "Azure SQL", "React", "Node.js"],
  },
  {
    tag: "Regulated Financial Services Firm",
    title: "AI governance & deployment framework",
    desc: "Authored a NIST CSF 2.0-aligned IT risk assessment, a formal technology change control playbook, and a two-lane AI deployment framework — API-based frontier models and self-hosted open-weight models for the most sensitive data — covering 21 use cases in an SEC/FFIEC-regulated environment.",
    tech: ["NIST CSF 2.0", "AI Governance", "Risk Assessment"],
  },
  {
    tag: "Cloud Automation",
    title: "Hands-off document archival pipeline",
    desc: "Built an unattended SharePoint-to-Azure archival pipeline with certificate-based app authentication, automated email confirmations via the Graph API, and delete-only-after-verified-transfer safety logic.",
    tech: ["PowerShell", "Microsoft Graph", "Entra ID", "SharePoint"],
  },
  {
    tag: "Telepath Technology Solutions",
    title: "This website",
    desc: "The site you're reading — a hand-built Next.js and TypeScript application with an animated SVG brand system, deployed continuously from GitHub. The source is public, because a consultancy that builds software should be willing to show its own.",
    tech: ["Next.js", "TypeScript", "Vercel"],
  },
];

const ENGAGEMENTS = [
  { tag: "Settlement Planning & Wealth Management Firm", title: "15% IT cost reduction while expanding the app portfolio", metric: "15%", metricLabel: "IT Spend Reduced", desc: "Audited the full technology landscape, eliminated redundant tools and vendor overlap, and reinvested savings into AI-powered internal tools, secure LLM middleware, and a re-architected data warehouse — delivering more capability for less budget in year one." },
  { tag: "Global Real Estate Services Firm", title: "Multi-million-dollar tech incubator replicated by Fortune 500 clients", metric: "25+", metricLabel: "Apps Managed Globally", desc: "Designed and implemented a world-class technology incubator workspace that became a model for corporate workplace transformation. Rationalized a 25+ application portfolio across 900 users on four continents, introduced security controls that slashed hardware costs, and consulted with additional Fortune 500 clients seeking to replicate the approach." },
  { tag: "Real Estate Investment Manager", title: "Trusted technology advisor for a $7.1B investment firm", metric: "$7.1B", metricLabel: "Assets Under Management", desc: "Served as the senior technology leader overseeing infrastructure, cybersecurity, data warehouse, ERP, and strategic roadmap. Partnered directly with managing partners on technology strategy and budget forecasting to support the firm's continued growth." },
];

export default function PortfolioPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.charcoal, background: T.white, overflowX: "hidden" }}>

      {/* ─── HEADER ─── */}
      <section style={{ paddingTop: 180, paddingBottom: 40, background: `linear-gradient(165deg, ${T.white} 0%, ${T.greenPale} 100%)` }}>
        <div style={{ ...container, textAlign: "center" }}>
          <RevealDiv style={{ maxWidth: 720, margin: "0 auto" }}>
            <SectionLabel>Portfolio</SectionLabel>
            <SectionTitle>Work you can inspect, not just read about.</SectionTitle>
            <p style={{ color: T.slate, fontSize: 17, lineHeight: 1.7 }}>
              Recent builds and career engagements. Client work is anonymized to respect confidentiality — the technology and the results are real.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── GITHUB CALLOUT ─── */}
      <section style={{ paddingTop: 40, paddingBottom: 40, background: T.bg }}>
        <div style={container}>
          <RevealDiv style={{
            background: `linear-gradient(135deg, ${T.greenDk}, ${T.green})`,
            borderRadius: 14, padding: "36px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 24, flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flex: "1 1 400px" }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: T.white, marginBottom: 4 }}>See the code for yourself</div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>Public repositories, including the source for this site, live on GitHub.</div>
              </div>
            </div>
            <BtnLink href={GITHUB_URL} external variant="white">Visit GitHub</BtnLink>
          </RevealDiv>
        </div>
      </section>

      {/* ─── RECENT BUILDS ─── */}
      <section style={{ ...sectionPad, background: T.bg, paddingTop: 40 }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <SectionLabel>Recent Builds</SectionLabel>
            <SectionTitle>Shipped, deployed, and in production.</SectionTitle>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
            {BUILDS.map((p, i) => (
              <RevealDiv key={i} delay={(i % 3) * 0.1} style={{
                background: T.white, borderRadius: 12, overflow: "hidden",
                border: `1px solid ${T.greenPale}`,
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ padding: "28px 32px 0" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.green, marginBottom: 10 }}>{p.tag}</div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 23, color: T.charcoal, lineHeight: 1.3, marginBottom: 14 }}>{p.title}</div>
                </div>
                <div style={{ padding: "0 32px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: T.slate, margin: "0 0 20px", flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.tech.map((t, j) => (
                      <span key={j} style={{
                        fontSize: 12, fontWeight: 600, color: T.greenDk,
                        background: T.greenPale, borderRadius: 999,
                        padding: "5px 12px", letterSpacing: 0.3,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP ENGAGEMENTS ─── */}
      <section style={{ ...sectionPad, background: T.white }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <SectionLabel>Leadership Engagements</SectionLabel>
            <SectionTitle>Results that speak for themselves.</SectionTitle>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
            {ENGAGEMENTS.map((cs, i) => (
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

      {/* ─── CTA ─── */}
      <section style={{ paddingTop: 0, paddingBottom: 100, background: T.white }}>
        <div style={{ ...container, textAlign: "center" }}>
          <RevealDiv style={{ maxWidth: 560, margin: "0 auto" }}>
            <p style={{ fontSize: 17, color: T.slate, marginBottom: 20 }}>Have a project that looks like one of these? Let&rsquo;s talk about it.</p>
            <BtnLink href="/contact">Start a Conversation</BtnLink>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
