"use client";
import { T, container, SectionLabel, SectionTitle } from "../../components/site";

const h: React.CSSProperties = { fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, fontWeight: 400, color: T.charcoal, margin: "36px 0 12px" };
const p: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: T.slate, margin: "0 0 16px" };

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.charcoal, background: T.white }}>
      <section style={{ paddingTop: 180, paddingBottom: 30, background: `linear-gradient(165deg, ${T.white} 0%, ${T.greenPale} 100%)` }}>
        <div style={{ ...container, textAlign: "center" }}>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle>Privacy Policy</SectionTitle>
          <p style={{ ...p, margin: 0, color: T.slate }}>Effective date: July 7, 2026</p>
        </div>
      </section>
      <section style={{ paddingTop: 40, paddingBottom: 100, background: T.white }}>
        <div style={{ ...container, maxWidth: 820 }}>
          <p style={p}>
            Telepath Technology Solutions LLC (&ldquo;Telepath,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates telepathit.com. This policy describes what information we collect through this website, how we use it, and the choices you have.
          </p>

          <h2 style={h}>Information we collect</h2>
          <p style={p}>
            <strong>Information you provide.</strong> When you submit our contact form or book a meeting, we collect the information you enter — such as your name, email address, phone number, company, preferred contact method, and the content of your message.
          </p>
          <p style={p}>
            <strong>Information collected automatically.</strong> Our hosting provider may collect standard technical information such as IP address, browser type, and pages visited for security and operational purposes.
          </p>

          <h2 style={h}>How we use your information</h2>
          <p style={p}>
            We use the information you provide to respond to your inquiry, schedule and conduct meetings, provide our services, and communicate with you about your engagement. We do not sell your personal information, and we do not use it for third-party advertising.
          </p>

          <h2 style={h}>Cookies</h2>
          <p style={p}>
            This site uses a small number of cookies and similar technologies necessary for the site to function, and, with your consent, cookies that help us improve your experience. You can manage your preference through the cookie notice presented on the site and through your browser settings.
          </p>

          <h2 style={h}>Service providers</h2>
          <p style={p}>
            We rely on a small set of service providers to operate this site and our business: our website is hosted on Vercel, and inquiries and scheduling are processed through Microsoft 365 services. These providers process information on our behalf under their own security and privacy commitments.
          </p>

          <h2 style={h}>Data retention</h2>
          <p style={p}>
            We retain inquiry and correspondence records for as long as reasonably necessary to serve you, meet legal obligations, and maintain business records. You may request deletion of your information at any time using the contact below.
          </p>

          <h2 style={h}>Your choices and rights</h2>
          <p style={p}>
            You may request access to, correction of, or deletion of the personal information we hold about you by emailing us. Depending on where you live, you may have additional rights under applicable privacy laws.
          </p>

          <h2 style={h}>Contact</h2>
          <p style={p}>
            Questions about this policy or your information: <a href="mailto:info@telepathit.com" style={{ color: T.green }}>info@telepathit.com</a>.
          </p>

          <h2 style={h}>Changes to this policy</h2>
          <p style={p}>
            We may update this policy from time to time. The effective date above reflects the latest revision, and material changes will be posted on this page.
          </p>
        </div>
      </section>
    </div>
  );
}
