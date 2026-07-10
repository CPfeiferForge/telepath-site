"use client";
import {
  T, container, sectionPad,
  SectionLabel, SectionTitle, BtnLink, RevealDiv, Icon,
} from "../../components/site";

const SERVICES = [
  { icon: "ai", title: "AI Development & Integration", desc: "Custom AI applications built end to end: LLM-powered internal portals, secure API middleware, retrieval over your own data, document and presentation generation, and sandboxed code execution — designed to hold up in regulated environments." },
  { icon: "strategy", title: "AI Strategy & Governance", desc: "Practical AI adoption frameworks: use-case identification, deployment lanes for sensitive data, risk assessment, and the policies and change controls that let regulated businesses say yes to AI safely." },
  { icon: "users", title: "Fractional CTO Leadership", desc: "Executive technology leadership on a fractional basis — roadmap ownership, board and investor prep, hiring strategy, vendor management, and mentoring for your technical team." },
  { icon: "cloud", title: "Cloud & Infrastructure", desc: "Cloud architecture, migrations, networking, identity, and scalability planning — deep hands-on experience across the Azure and Microsoft 365 ecosystem." },
  { icon: "repeat", title: "DevOps & Automation", desc: "CI/CD pipelines, containerization, infrastructure as code, release engineering, and process automation — so deployments are boring, repeatable, and fast instead of risky weekend events." },
  { icon: "code", title: "Architecture & Engineering", desc: "System design, code reviews, technical debt assessment, full-stack development, and hands-on guidance for your development team." },
  { icon: "shield", title: "Security & Compliance", desc: "Security audits, compliance roadmaps (SOC 2, HIPAA, GDPR, SEC/FFIEC), NIST-based risk assessments, vendor risk management, and incident response planning." },
  { icon: "chart", title: "Data & Analytics", desc: "Data warehouse design, business intelligence dashboards, performance telemetry and monitoring, and turning operational data into decisions." },
  { icon: "scissors", title: "Technology Audits & Cost Optimization", desc: "Comprehensive tech stack audits, elimination of redundant tools and licenses, vendor consolidation, and strategic cost reduction that streamlines operations without sacrificing capability." },
];

const MANAGED_POINTS = [
  "Proactive monitoring, patching, and endpoint management",
  "Helpdesk and day-to-day user support",
  "Microsoft 365, identity, and security administration",
  "Backup, continuity, and vendor management",
];

export default function ServicesPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.charcoal, background: T.white, overflowX: "hidden" }}>

      {/* ─── HEADER ─── */}
      <section style={{ paddingTop: 180, paddingBottom: 40, background: `linear-gradient(165deg, ${T.white} 0%, ${T.greenPale} 100%)` }}>
        <div style={{ ...container, textAlign: "center" }}>
          <RevealDiv style={{ maxWidth: 720, margin: "0 auto" }}>
            <SectionLabel>Services</SectionLabel>
            <SectionTitle>Everything an IT department does — on your terms.</SectionTitle>
            <p style={{ color: T.slate, fontSize: 17, lineHeight: 1.7 }}>
              Engage Telepath for a single project, a strategic role, or full ownership of your technology operations. Same depth at every scale.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── FEATURED: FULL-STACK MANAGED IT ─── */}
      <section style={{ paddingTop: 40, paddingBottom: 40, background: T.bg }}>
        <div style={container}>
          <RevealDiv style={{
            background: `linear-gradient(135deg, ${T.greenDk}, ${T.green})`,
            borderRadius: 14, padding: "44px 48px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: T.greenLt }}>Flagship Service</div>
                </div>
                <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 400, color: T.white, lineHeight: 1.25, margin: "0 0 16px" }}>
                  Full-Stack Managed IT
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: "0 0 24px" }}>
                  Your entire IT operation, run by Telepath: infrastructure, security, support, and strategy under one ongoing engagement. Everything below is included when it's needed — because managed IT shouldn't stop at keeping the lights on.
                </p>
                <BtnLink href="/contact" variant="white">Talk About Managed IT</BtnLink>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {MANAGED_POINTS.map((point, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.greenLt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.92)" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── ALL SERVICES GRID ─── */}
      <section style={{ ...sectionPad, background: T.bg, paddingTop: 40 }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
            <SectionLabel>Practice Areas</SectionLabel>
            <SectionTitle>Nine disciplines, one standard of depth.</SectionTitle>
            <p style={{ color: T.slate, fontSize: 17, lineHeight: 1.7 }}>Every practice area is available as a standalone project, an ongoing engagement, or part of full managed IT.</p>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {SERVICES.map((svc, i) => (
              <RevealDiv key={i} delay={(i % 3) * 0.08} style={{
                background: T.white, borderRadius: 12, padding: 36,
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

      {/* ─── CTA ─── */}
      <section style={{ paddingTop: 0, paddingBottom: 100, background: T.bg }}>
        <div style={{ ...container, textAlign: "center" }}>
          <RevealDiv style={{ maxWidth: 560, margin: "0 auto" }}>
            <p style={{ fontSize: 17, color: T.slate, marginBottom: 20 }}>Not sure which engagement fits? Tell us what you&rsquo;re facing and we&rsquo;ll figure it out together.</p>
            <BtnLink href="/contact">Get in Touch</BtnLink>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
