"use client";
import { T, container, SectionLabel, SectionTitle } from "../../components/site";

const h: React.CSSProperties = { fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, fontWeight: 400, color: T.charcoal, margin: "36px 0 12px" };
const p: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: T.slate, margin: "0 0 16px" };

export default function TermsPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.charcoal, background: T.white }}>
      <section style={{ paddingTop: 180, paddingBottom: 30, background: `linear-gradient(165deg, ${T.white} 0%, ${T.greenPale} 100%)` }}>
        <div style={{ ...container, textAlign: "center" }}>
          <SectionLabel>Legal</SectionLabel>
          <SectionTitle>Terms of Service</SectionTitle>
          <p style={{ ...p, margin: 0, color: T.slate }}>Effective date: July 7, 2026</p>
        </div>
      </section>
      <section style={{ paddingTop: 40, paddingBottom: 100, background: T.white }}>
        <div style={{ ...container, maxWidth: 820 }}>
          <p style={p}>
            These terms govern your use of telepathit.com, operated by Telepath Technology Solutions LLC (&ldquo;Telepath,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using this website, you agree to these terms.
          </p>

          <h2 style={h}>Use of this website</h2>
          <p style={p}>
            This website is provided for informational purposes and to allow you to contact us about our services. You agree not to misuse the site, including attempting to disrupt its operation, submitting false or misleading information, or using automated means to submit inquiries.
          </p>

          <h2 style={h}>No professional relationship</h2>
          <p style={p}>
            Content on this website is general information and does not constitute professional, technical, or legal advice for your specific situation. Submitting an inquiry or booking a call does not by itself create a client relationship; engagements are established through a separate written agreement.
          </p>

          <h2 style={h}>Intellectual property</h2>
          <p style={p}>
            The content, design, and branding of this website are the property of Telepath Technology Solutions LLC and may not be reproduced without permission, except as permitted by applicable law.
          </p>

          <h2 style={h}>Third-party links and services</h2>
          <p style={p}>
            This site may link to or rely on third-party services (such as scheduling and video-conferencing tools). We are not responsible for the content or practices of third-party services, which are governed by their own terms.
          </p>

          <h2 style={h}>Disclaimer and limitation of liability</h2>
          <p style={p}>
            This website is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. To the maximum extent permitted by law, Telepath will not be liable for any indirect, incidental, or consequential damages arising from your use of this website.
          </p>

          <h2 style={h}>Governing law</h2>
          <p style={p}>
            These terms are governed by the laws of the State of North Carolina, without regard to conflict-of-law principles.
          </p>

          <h2 style={h}>Contact</h2>
          <p style={p}>
            Questions about these terms: <a href="mailto:info@telepathit.com" style={{ color: T.green }}>info@telepathit.com</a>.
          </p>

          <h2 style={h}>Changes to these terms</h2>
          <p style={p}>
            We may update these terms from time to time. The effective date above reflects the latest revision.
          </p>
        </div>
      </section>
    </div>
  );
}
