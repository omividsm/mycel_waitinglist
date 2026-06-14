'use client'

import { useState, useEffect } from "react";
import { joinWaitingList, getWaitingList } from "./actions";

const WORDS = [
  "anonymous","identity","community","token","mycel","text-first",
  "burner","reputation","public","private","college","city",
  "web3","freedom","speak","connect","earn","trade",
  "blockchain","substrate","MYC","channels","discover","confess",
  "explore","liquidity","decentralized","open","protocol","network"
];

const FEATURES = [
  {
    title: "Text-First Communities",
    body: "Ideas over aesthetics. No image posts, no video noise — just thought. Organized around colleges, cities, and interests, with institutions able to participate without taking over.",
    glyph: "¶"
  },
  {
    title: "Three-Tier Identity",
    body: "Public profile. Anonymous persona. Burner mode for when it counts. Each tier has its own reputation — you control which face to wear and when.",
    glyph: "◈"
  },
  {
    title: "Real Token Economy",
    body: "Earn $MYC for growing the network. Hold it, trade it, or redeem it for premium access, badges, and merchandise. Buyback liquidity from day one.",
    glyph: "⬡"
  }
];

const TEAM = [
  {
    name: "Pope",
    role: "Co-Founder · Developer",
    github: "https://github.com/omividsm",
    handle: "@omividsm",
    initial: "P"
  },
  {
    name: "Sanskar Jain",
    role: "Co-Founder · Architect",
    github: "https://github.com/sanskarjain09",
    handle: "@sanskarjain09",
    initial: "J"
  }
];

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function MycelXWaitlist() {
  const [dark, setDark] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(847);

  useEffect(() => {
    getWaitingList().then(list => {
      setCount(847 + list.length);
    });
  }, []);

  const bg      = dark ? "#000000" : "#ffffff";
  const fg      = dark ? "#ffffff" : "#000000";
  const muted   = dark ? "#737373" : "#737373";
  const surface = dark ? "#0a0a0a" : "#fafafa";
  const border  = dark ? "#171717" : "#e5e5e5";
  const bMid    = dark ? "#262626" : "#d4d4d4";

  async function handleJoin() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    
    setLoading(true);
    const res = await joinWaitingList(email);
    setLoading(false);
    
    if (res.success) {
      setSubmitted(true);
      setCount(prev => prev + 1);
    }
  }

  return (
    <div style={{ background: bg, color: fg, minHeight: "100vh", transition: "background .4s, color .4s", overflowX: "hidden" }} className="font-inter">

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dsp { font-family: var(--font-display); }

        @keyframes bgIn {
          from { opacity: 0; transform: scale(.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes wDrift {
          0%,100% { transform: translate(0,0) rotate(var(--r)); }
          38%     { transform: translate(var(--dx),calc(var(--dy)*-1)) rotate(calc(var(--r)+1.5deg)); }
          72%     { transform: translate(calc(var(--dx)*-.6),var(--dy)) rotate(calc(var(--r)-.9deg)); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: .45; transform: scale(.75); }
        }

        @keyframes scrollBounce {
          0%,100% { transform: translateY(0) translateX(-50%); }
          50%     { transform: translateY(8px) translateX(-50%); }
        }

        .bg-ch  { animation: bgIn 1.3s cubic-bezier(.16,1,.3,1) both; }
        .wn     { animation: wDrift var(--dur,12s) ease-in-out infinite; }
        .fu     { animation: fadeUp .75s cubic-bezier(.16,1,.3,1) both; }
        .fu1    { animation-delay:.06s; }
        .fu2    { animation-delay:.16s; }
        .fu3    { animation-delay:.26s; }
        .fu4    { animation-delay:.36s; }
        .pdot   { animation: pulse 2.3s ease-in-out infinite; }
        .sarrow { animation: scrollBounce 2s ease-in-out infinite; }

        .hl { transition: transform .22s, border-color .22s; }
        .hl:hover { transform: translateY(-3px); border-color: ${bMid} !important; }

        .tog {
          cursor: pointer; border: none; background: none;
          font-family: inherit; transition: opacity .2s;
          display: flex; align-items: center; gap: 8px;
        }
        .tog:hover { opacity: .65; }

        .jbtn {
          cursor: pointer; border: none; font-family: inherit;
          transition: opacity .18s, transform .14s, background .2s;
        }
        .jbtn:hover  { opacity: .9; transform: translateY(-1px); }
        .jbtn:active { transform: translateY(0); }
        .jbtn:disabled { opacity: 0.5; cursor: not-allowed; }

        .nl { text-decoration: none; transition: opacity .2s; }
        .nl:hover { opacity: .55; }

        input::placeholder { color: #737373; }
        input:focus { outline: none; }
        a { color: inherit; }

        @media (max-width: 660px) {
          .hbg { display: none !important; }
          .hhl { font-size: 48px !important; }
          .fg  { grid-template-columns: 1fr !important; }
          .tg  { grid-template-columns: 1fr !important; }
          .np  { padding: 16px 20px !important; }
          .sp  { padding: 60px 20px !important; }
          .fp  { flex-direction: column !important; gap: 16px !important; text-align: center; }
          .htags { gap: 12px !important; }
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${border}`, background: dark ? "rgba(0,0,0,.7)" : "rgba(255,255,255,.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
        <div className="np" style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <div className="dsp" style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-.04em", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: fg, color: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, boxShadow: dark ? "0 0 20px rgba(255,255,255,0.1)" : "0 0 20px rgba(0,0,0,0.05)" }}>M</div>
            MycelX
          </div>

          <button className="tog" onClick={() => setDark(d => !d)} style={{ color: muted, fontSize: 13, fontWeight: 500 }}>
            <span style={{ width: 36, height: 20, borderRadius: 100, background: dark ? "#262626" : "#e5e5e5", display: "inline-block", position: "relative", transition: "background .35s", flexShrink: 0 }}>
              <span style={{ position: "absolute", top: 3, left: dark ? 19 : 3, width: 14, height: 14, borderRadius: "50%", background: dark ? "#fff" : "#fff", transition: "left .32s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </span>
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 80 }}>

        {/* Huge background MYCELX */}
        <div className="hbg" aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none", overflow: "hidden" }}>
          {"MYCELX".split("").map((ch, i) => (
            <span key={i} className="bg-ch dsp" style={{ fontSize: "clamp(80px, 19vw, 230px)", fontWeight: 700, color: fg, opacity: .012, lineHeight: 1, letterSpacing: "-.05em", animationDelay: `${i * .09}s` }}>{ch}</span>
          ))}
        </div>

        {/* Subtle grid */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: dark ? .03 : .05, backgroundImage: `linear-gradient(${fg} 1px,transparent 1px),linear-gradient(90deg,${fg} 1px,transparent 1px)`, backgroundSize: "64px 64px", pointerEvents: "none" }} />

        {/* Floating words */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", userSelect: "none" }}>
          {WORDS.map((w, i) => (
            <span key={w} className="wn" style={{
              position: "absolute",
              left: `${(i * 12.9 + i * i * .28) % 87 + 2}%`,
              top:  `${(i * 10.3 + i * 1.7) % 81 + 5}%`,
              fontSize: `${9 + (i % 5) * 4}px`,
              fontWeight: i % 3 === 0 ? 600 : 300,
              color: fg, opacity: .025 + (i % 4) * .005,
              textTransform: "uppercase", letterSpacing: ".1em",
              "--dur": `${7 + (i % 7) * 2.2}s`,
              "--r":   `${-16 + (i % 9) * 4}deg`,
              "--dx":  `${-9 + (i % 7) * 3}px`,
              "--dy":  `${-7 + (i % 5) * 3.5}px`,
              animationDelay: `${(i * .45) % 7}s`
            } as any}>{w}</span>
          ))}
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 820, padding: "0 32px" }}>

          {/* Live badge */}
          <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", border: `1px solid ${border}`, background: surface, borderRadius: 100, marginBottom: 32, fontSize: 12, fontWeight: 600, color: muted, letterSpacing: ".02em" }}>
            <span className="pdot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            {count.toLocaleString()} people already waiting
          </div>

          {/* Headline */}
          <h1 className="hhl dsp fu fu1" style={{ fontSize: "clamp(50px,10vw,96px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-.05em", marginBottom: 24 }}>
            Speak freely.<br />
            <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundImage: dark ? "linear-gradient(180deg, #fff 0%, #737373 100%)" : "linear-gradient(180deg, #000 0%, #737373 100%)" }}>
              Build wealth.
            </span>
          </h1>

          {/* Sub */}
          <p className="fu fu2" style={{ fontSize: 18, lineHeight: 1.6, color: muted, maxWidth: 520, margin: "0 auto 40px", fontWeight: 400 }}>
            A text-first anonymous social platform with a real token economy — built for the communities that actually have something to say.
          </p>

          {/* Form */}
          <div className="fu fu3" style={{ maxWidth: 480, margin: "0 auto" }}>
            {!submitted ? (
              <>
                <div style={{ display: "flex", background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "6px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                  <input
                    type="email" placeholder="Enter your email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleJoin()}
                    disabled={loading}
                    style={{ flex: 1, background: "transparent", border: "none", color: fg, fontSize: 15, padding: "0 16px", minWidth: 0 }}
                  />
                  <button className="jbtn" onClick={handleJoin} disabled={loading || !email}
                    style={{ padding: "12px 24px", borderRadius: 12, background: fg, color: bg, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
                    {loading ? "Joining..." : "Get Early Access"}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: muted, marginTop: 12 }}>Join the list. No spam, ever.</p>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", border: `1px solid ${border}`, borderRadius: 16, background: surface, textAlign: "left" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#10b981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✓</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 2 }}>You're on the list!</p>
                  <p style={{ color: muted, fontSize: 14 }}>We'll email you when MycelX is ready.</p>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="htags fu fu4" style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {["Text-only", "Anonymous", "$MYC token", "Open market"].map(tag => (
              <span key={tag} style={{ fontSize: 13, color: muted, fontWeight: 500 }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="sarrow" style={{ position: "absolute", bottom: 40, left: "50%", color: muted, fontSize: 20, opacity: 0.5 }}>↓</div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="sp" style={{ padding: "100px 40px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: muted, marginBottom: 16 }}>Core Pillars</p>
          <h2 className="dsp" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-.04em", marginBottom: 64, lineHeight: 1.1 }}>
            Built for the<br />next generation.
          </h2>
          <div className="fg" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="hl" style={{ padding: "40px 32px", borderRadius: 24, border: `1px solid ${border}`, background: surface }}>
                <div style={{ fontSize: 32, marginBottom: 28, color: fg }}>{f.glyph}</div>
                <h3 className="dsp" style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-.02em", marginBottom: 16 }}>{f.title}</h3>
                <p style={{ color: muted, fontSize: 15, lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOKEN ─── */}
      <section style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "120px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: muted, marginBottom: 24 }}>The $MYC Economy</p>
          <div className="dsp" style={{ fontSize: "clamp(80px, 18vw, 180px)", fontWeight: 800, letterSpacing: "-.06em", lineHeight: 0.85, marginBottom: 32 }}>$MYC</div>
          <p style={{ color: muted, fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 64px" }}>
            A custom Substrate-based coin. Not just points — liquid, tradeable, and native to the Mycel ecosystem.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "60px 80px", flexWrap: "wrap" }}>
            {[["Earn","Contribute & Grow"],["Hold","Market Trading"],["Redeem","Access & Perks"]].map(([l, s]) => (
              <div key={l}>
                <p className="dsp" style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", marginBottom: 8 }}>{l}</p>
                <p style={{ color: muted, fontSize: 14 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="sp" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: muted, marginBottom: 16 }}>The Builders</p>
          <h2 className="dsp" style={{ fontWeight: 700, fontSize: "clamp(30px, 5vw, 48px)", letterSpacing: "-.04em", marginBottom: 60, lineHeight: 1.1 }}>
            Designed by devs,<br />for the people.
          </h2>
          <div className="tg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {TEAM.map((dev, i) => (
              <a key={i} href={dev.github} target="_blank" rel="noopener noreferrer" className="hl nl"
                style={{ padding: "40px 32px", borderRadius: 24, border: `1px solid ${border}`, background: surface, display: "block", color: fg }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: fg, color: bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, flexShrink: 0 }}>
                    {dev.initial}
                  </div>
                  <div>
                    <p className="dsp" style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-.02em", marginBottom: 4 }}>{dev.name}</p>
                    <p style={{ color: muted, fontSize: 14 }}>{dev.role}</p>
                  </div>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", border: `1px solid ${border}`, borderRadius: 12, fontSize: 13, color: muted, fontWeight: 500 }}>
                  <GitHubIcon />
                  {dev.handle}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "40px" }}>
        <div className="fp" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="dsp" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: fg, color: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>M</div>
            MycelX
          </div>
          <p style={{ color: muted, fontSize: 13, fontWeight: 500 }}>© 2026 MycelX · Built on Substrate</p>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="https://github.com/omividsm" target="_blank" rel="noopener noreferrer" className="nl" style={{ color: muted, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><GitHubIcon /></a>
            <a href="https://github.com/sanskarjain09" target="_blank" rel="noopener noreferrer" className="nl" style={{ color: muted, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><GitHubIcon /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
