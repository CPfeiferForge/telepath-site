"use client";
import { useState } from "react";
import {
  T, container, sectionPad,
  SectionLabel, SectionTitle, RevealDiv,
} from "../../components/site";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: 8, border: `1.5px solid ${T.greenLt}`,
  fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: T.white, outline: "none",
  transition: "border-color 0.2s", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 600, color: T.charcoal,
  marginBottom: 6, letterSpacing: 0.5,
};

function Req() {
  return <span style={{ color: T.green }} aria-hidden="true"> *</span>;
}

function Opt() {
  return <span style={{ color: T.silver, fontWeight: 400, textTransform: "none" }}> (optional)</span>;
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "", preferred: "", website: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const submit = async () => {
    if (status === "sending") return;
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and a message.");
      return;
    }

    if (form.preferred === "phone" && !form.phone.trim()) {
      setStatus("error");
      setErrorMsg("Please provide a phone number since it's your preferred contact method.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Your message could not be sent. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Your message could not be sent. Please check your connection and try again.");
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.charcoal, background: T.white, overflowX: "hidden" }}>

      {/* ─── HEADER ─── */}
      <section style={{ paddingTop: 180, paddingBottom: 20, background: `linear-gradient(165deg, ${T.white} 0%, ${T.greenPale} 100%)` }}>
        <div style={{ ...container, textAlign: "center" }}>
          <RevealDiv style={{ maxWidth: 680, margin: "0 auto" }}>
            <SectionLabel>Contact</SectionLabel>
            <SectionTitle>Let&rsquo;s talk about your technology challenges.</SectionTitle>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.slate, margin: 0 }}>
              Tell us a bit about your needs and we&rsquo;ll set up a free 30-minute discovery call to explore whether Telepath is the right fit.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section style={{ ...sectionPad, paddingTop: 60, background: T.white }}>
        <div style={{ ...container, maxWidth: 860 }}>
          <RevealDiv delay={0.1}>
            {status === "sent" ? (
              <div style={{ background: T.greenPale, borderRadius: 14, padding: 48, border: `1px solid ${T.greenLt}`, textAlign: "center" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><circle cx="12" cy="12" r="10"/><polyline points="8 12.5 11 15.5 16 9.5"/></svg>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: T.charcoal, marginBottom: 8 }}>Message sent</div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: T.slate, margin: 0 }}>
                  Thanks for reaching out — you&rsquo;ll hear back within one business day. A confirmation is on its way to your inbox.
                </p>
              </div>
            ) : (
              <div style={{ background: T.light, borderRadius: 14, padding: 40, border: `1px solid ${T.greenPale}`, position: "relative" }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Name<Req/></label>
                  <input type="text" value={form.name} onChange={set("name")} style={inputStyle} placeholder="Your name"/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Email<Req/></label>
                  <input type="email" value={form.email} onChange={set("email")} style={inputStyle} placeholder="Your email"/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Phone<Opt/></label>
                  <input type="tel" value={form.phone} onChange={set("phone")} style={inputStyle} placeholder="Your phone number"/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Company<Opt/></label>
                  <input type="text" value={form.company} onChange={set("company")} style={inputStyle} placeholder="Your company"/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Preferred contact method<Opt/></label>
                  <select
                    value={form.preferred}
                    onChange={set("preferred")}
                    style={{ ...inputStyle, appearance: "auto", color: form.preferred ? T.charcoal : T.slate, cursor: "pointer" }}
                  >
                    <option value="">No preference</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="either">Either works</option>
                  </select>
                </div>
                {/* Honeypot — hidden from humans, bots fill it and get silently dropped */}
                <div style={{ position: "absolute", left: -9999, top: -9999, height: 0, overflow: "hidden" }} aria-hidden="true">
                  <label>Website</label>
                  <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label style={labelStyle}>How can we help?<Req/></label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    style={{ ...inputStyle, resize: "vertical" }}
                    placeholder="Tell us about your project..."
                  />
                </div>
                <div style={{ fontSize: 12, color: T.silver, marginBottom: 20 }}><span style={{ color: T.green }}>*</span> required</div>
                {status === "error" && errorMsg && (
                  <div style={{ marginBottom: 20, padding: "12px 16px", borderRadius: 8, background: "#fdecea", border: "1px solid #f5c6c1", color: "#8a2a20", fontSize: 14, lineHeight: 1.5 }}>
                    {errorMsg}
                  </div>
                )}
                <button
                  onClick={submit}
                  disabled={status === "sending"}
                  style={{
                    width: "100%", textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                    border: "none", borderRadius: 6,
                    cursor: status === "sending" ? "wait" : "pointer",
                    padding: "14px 32px", letterSpacing: 0.3,
                    background: status === "sending" ? T.greenMd : T.green,
                    color: T.white, transition: "all 0.25s ease",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </div>
            )}
          </RevealDiv>
        </div>
      </section>
    </div>
  );
}
