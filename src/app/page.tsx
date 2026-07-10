"use client";
import {
  T, container, sectionPad,
  SectionLabel, SectionTitle, BtnLink, RevealDiv, AnimatedLogo, Icon,
} from "../components/site";

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.charcoal, background: T.white, overflowX: "hidden" }}>

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
            <SectionLabel>Full-Spectrum IT Services</SectionLabel>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: 400, lineHeight: 1.15, color: T.charcoal, margin: "0 0 24px", maxWidth: 860 }}>
              Technology consulting that thinks like an executive<br/>
              <span style={{ color: T.green }}>and builds like an engineer.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: T.slate, maxWidth: 640, margin: "0 0 40px" }}>
              Whether you need a single problem solved, a system built, or your entire IT operation managed, Telepath brings the same senior-level depth — AI development, cloud, security, data, and fractional CTO leadership — scaled to fit.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <BtnLink href="/contact" style={{ minWidth: 232, textAlign: "center" }}>Start a Conversation</BtnLink>
              <BtnLink href="/services" variant="outline" style={{ minWidth: 232, textAlign: "center" }}>Explore Services</BtnLink>
            </div>
          </RevealDiv>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: T.slate }}>Scroll</div>
          <div style={{ width: 1, height: 32, background: T.slate, animation: "pulse-scroll 2s infinite" }}/>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section id="services" style={{ ...sectionPad, background: T.white }}>
        <div style={container}>
          <RevealDiv style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
            <SectionLabel>What We Do</SectionLabel>
            <SectionTitle>One partner, three ways to engage.</SectionTitle>
          </RevealDiv>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginBottom: 48 }}>
            {[
              { icon: "server", title: "Managed IT", desc: "Full ownership of your technology operations — monitoring, support, security, and administration as an ongoing partnership. Your IT department, without the department." },
              { icon: "ai", title: "Projects & Engineering", desc: "AI development, cloud infrastructure, DevOps, and data — scoped, built, and shipped. From a single automation to a company-wide platform." },
              { icon: "users", title: "Strategy & Leadership", desc: "Fractional CTO leadership, AI governance, security and compliance roadmaps, and technology audits. Executive depth, on your terms." },
            ].map((pillar, i) => (
              <RevealDiv key={i} delay={i * 0.1} style={{
                background: T.light, borderRadius: 12, padding: 36,
                border: `1px solid ${T.greenPale}`, textAlign: "center",
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, background: T.greenPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Icon name={pillar.icon} size={26}/>
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: T.charcoal }}>{pillar.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: T.slate, margin: 0 }}>{pillar.desc}</p>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv style={{ textAlign: "center" }}>
            <BtnLink href="/services" variant="outline">Explore All Services</BtnLink>
          </RevealDiv>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ ...sectionPad, background: T.bg }}>
        <div style={{ ...container, display: "grid", gridTemplateColumns: "1.2fr 440px", gap: 60, alignItems: "center" }}>
          <RevealDiv>
            <SectionLabel>About</SectionLabel>
            <SectionTitle>Technology leadership rooted in real-world experience.</SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: "0 0 24px" }}>
              Telepath was built on 25 years of experience across every layer of the technology stack — starting in a support queue troubleshooting software for 2,000 field associates, then moving through QA, enterprise deployments, product management, innovation strategy, and executive leadership at Fortune 500 companies and high-growth investment firms. That range is the founding idea: companies at every stage deserve access to that depth of experience.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: "0 0 24px" }}>
              In recent years, that work has increasingly meant building with AI — designing and shipping LLM-powered applications, secure AI infrastructure, and the governance frameworks that make them safe to run in regulated industries. It&rsquo;s consulting that doesn&rsquo;t stop at the slide deck: we write the code, deploy the infrastructure, and stay accountable for the outcome.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: "0 0 32px" }}>
              Having worked at every level means Telepath doesn&rsquo;t just advise from the top — we understand what it takes on the ground. Whether it&rsquo;s building AI-powered tools, designing a technology incubator that Fortune 500 clients wanted to replicate, or cutting 15% from an IT budget while growing the application portfolio, every engagement pairs strategic vision with the hands-on instinct to make things work.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[["25+", "Years in Tech Leadership"], ["$7.1B", "Assets Supported"], ["900+", "Users Served Globally"], ["25+", "Enterprise Apps Managed"]].map(([num, label], i) => (
                <div key={i} style={{ padding: 24, borderRadius: 10, background: T.white, border: `1px solid ${T.greenPale}` }}>
                  <div style={{ fontSize: 30, fontWeight: 700, color: T.green }}>{num}</div>
                  <div style={{ fontSize: 13, color: T.slate, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ ...sectionPad, background: T.white }}>
        <div style={{ ...container, textAlign: "center" }}>
          <RevealDiv style={{ maxWidth: 640, margin: "0 auto" }}>
            <SectionTitle>Let&rsquo;s talk about your technology challenges.</SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: "0 0 36px" }}>
              Book a free 30-minute discovery call to discuss your needs and explore whether Telepath is the right fit.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BtnLink href="/contact">Get in Touch</BtnLink>
            </div>
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
