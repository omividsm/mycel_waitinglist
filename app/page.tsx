'use client'

import { useState, useEffect } from "react";
import { joinWaitingList, getWaitingList } from "./actions";
import { 
  Zap, 
  Shield, 
  ArrowRight, 
  ChevronRight,
  MessageSquare,
  Layers,
  Coins,
  ChevronDown,
  Lock,
  Users,
  Target,
  TrendingUp as TrendingUpIcon,
  Sun,
  Moon
} from "lucide-react";

// Custom SVG Icons to avoid naming issues
const Github = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Twitter = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const FEATURES = [
  {
    title: "Pure Intelligence",
    body: "Focus on thoughts, not visuals. Text-first interaction ensures that ideas remain the primary currency of your community.",
    icon: <MessageSquare size={24} />,
    tag: "Text-First"
  },
  {
    title: "Fractal Identity",
    body: "Navigate between public, anonymous, and burner modes. Each layer maintains its own reputation and impact within the ecosystem.",
    icon: <Layers size={24} />,
    tag: "Privacy"
  },
  {
    title: "Economic Layer",
    body: "A native Substrate-based token economy. Earn rewards for value creation, not just consumption. Built-in liquidity from day zero.",
    icon: <Coins size={24} />,
    tag: "$MYC Token"
  }
];

const ROADMAP = [
  { step: "01", title: "Genesis Phase", status: "Active", desc: "Private waitlist and initial protocol architecture on Substrate." },
  { step: "02", title: "Nexus Alpha", status: "Q3 2026", desc: "Release of text-first engine and anonymous identity layers." },
  { step: "03", title: "Economic Mint", status: "Q4 2026", desc: "Native token integration and community liquidity pools." }
];

const TEAM = [
  { 
    name: "Pope", 
    role: "Co-Founder · Lead", 
    github: "https://github.com/omividsm", 
    image: "https://github.com/omividsm.png",
    initial: "P" 
  },
  { 
    name: "Sanskar Jain", 
    role: "Co-Founder · Architect", 
    github: "https://github.com/sanskarjain09", 
    image: "https://github.com/sanskarjain09.png",
    initial: "J" 
  }
];

export default function MycelXWaitlist() {
  const [dark, setDark] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(847);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getWaitingList().then(list => setCount(847 + list.length));
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const orange = "#FF4D00";
  const bg = dark ? "#000000" : "#ffffff";
  const fg = dark ? "#ffffff" : "#000000";
  const muted = dark ? "#737373" : "#737373";
  const surface = dark ? "#0a0a0a" : "#fafafa";
  const border = dark ? "#171717" : "#e5e5e5";
  const gridOpacity = dark ? 0.03 : 0.05;

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
    <div style={{ background: bg, color: fg, minHeight: "100vh", transition: "background 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s" }} className="font-inter">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --font-display: 'Space Grotesk', sans-serif;
          --font-inter: 'Inter', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; outline: none; }
        
        .dsp { font-family: var(--font-display); }
        .font-inter { font-family: var(--font-inter); }

        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }

        @keyframes dataFlow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .animate-slide { animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        
        .node { animation: nodePulse 3s infinite ease-in-out; }
        .data-line { 
          stroke-dasharray: 10; 
          animation: dataFlow 5s infinite linear; 
        }

        .btn-premium {
          background: ${orange};
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 100px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 30px ${orange}33;
        }

        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px ${orange}55;
        }

        .card-feature {
          transition: all 0.4s;
          cursor: default;
          background: ${surface};
          border: 1px solid ${border};
        }
        
        .card-feature:hover {
          border-color: ${orange}44 !important;
          transform: translateY(-8px);
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "#222" : "#ccc"}; border-radius: 10px; }

        @media (max-width: 768px) {
          .hhl { font-size: 52px !important; }
          .sp { padding: 80px 24px !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* ─── NAVIGATION ─── */}
      <nav style={{ 
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, 
        transition: "all 0.4s",
        padding: scrolled ? "12px 0" : "24px 0",
        background: scrolled ? (dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)") : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="dsp" style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-.04em", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900 }}>M</div>
            <span style={{ color: fg }}>MycelX</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#features" className="hide-mobile" style={{ fontSize: 13, fontWeight: 600, color: muted, textDecoration: "none" }}>Features</a>
            
            <button onClick={() => setDark(!dark)} style={{ 
              background: dark ? "#111" : "#f5f5f5", 
              border: `1px solid ${border}`,
              padding: "6px 12px", borderRadius: 100, 
              display: "flex", alignItems: "center", gap: 8,
              cursor: "pointer", color: fg, fontSize: 12, fontWeight: 700
            }}>
              {dark ? <Sun size={14} /> : <Moon size={14} />}
              {dark ? "Light" : "Dark"}
            </button>

            <button className="btn-premium" style={{ padding: "8px 18px", fontSize: 13 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 100 }}>
        
        {/* Node Connecting Animation Background */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: dark ? 0.6 : 0.4 }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={orange} stopOpacity="0.8" />
                <stop offset="100%" stopColor={orange} stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Connection Lines */}
            <g stroke={orange} strokeWidth="0.5" opacity="0.15">
              <path className="data-line" d="M200,200 L500,500 M500,500 L800,200 M500,500 L500,800 M200,200 L200,800 L800,800 L800,200" fill="none" />
              <path className="data-line" d="M100,500 L900,500 M500,100 L500,900" style={{ animationDelay: "-2s" }} fill="none" />
            </g>

            {/* Pulsing Nodes */}
            {[
              {x:200, y:200}, {x:500, y:500}, {x:800, y:200}, 
              {x:500, y:800}, {x:200, y:800}, {x:800, y:800},
              {x:100, y:500}, {x:900, y:500}, {x:500, y:100}, {x:500, y:900}
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="6" fill={orange} className="node" style={{ animationDelay: `${i * 0.4}s` }} />
                <circle cx={p.x} cy={p.y} r="20" fill="url(#nodeGrad)" className="node" style={{ animationDelay: `${i * 0.4}s` }} />
              </g>
            ))}
          </svg>
        </div>

        {/* Subtle Grid */}
        <div style={{ position: "absolute", inset: 0, opacity: gridOpacity, backgroundImage: `linear-gradient(${fg} 1px,transparent 1px),linear-gradient(90deg,${fg} 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900, padding: "0 40px" }}>
          
          <h1 className="hhl dsp animate-slide delay-1" style={{ fontSize: "clamp(54px, 10vw, 108px)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-.06em", marginBottom: 32 }}>
            Sovereign Thought.<br />
            <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundImage: `linear-gradient(135deg, ${fg} 0%, ${orange} 100%)` }}>
              Decentralized.
            </span>
          </h1>

          <p className="animate-slide delay-2" style={{ fontSize: 19, color: muted, maxWidth: 660, margin: "0 auto 48px", lineHeight: 1.6, fontWeight: 500 }}>
            MycelX is a reputation-driven communication protocol. Built on Substrate to eliminate visual noise and empower pure, anonymous intelligence.
          </p>

          <div className="animate-slide delay-3" style={{ maxWidth: 500, margin: "0 auto" }}>
            {!submitted ? (
              <div style={{ position: "relative" }}>
                 <div style={{ display: "flex", background: dark ? "#0a0a0a" : "#fff", border: `1px solid ${border}`, borderRadius: 24, padding: "8px", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.05)" }}>
                    <input 
                      type="email" placeholder="Your access email..." value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleJoin()}
                      disabled={loading}
                      style={{ flex: 1, background: "transparent", border: "none", color: fg, fontSize: 16, padding: "0 24px", fontWeight: 500 }}
                    />
                    <button className="btn-premium" onClick={handleJoin} disabled={loading || !email}>
                      {loading ? "Syncing..." : "Get Access"} <ArrowRight size={18} />
                    </button>
                 </div>
                 <p style={{ fontSize: 13, color: muted, marginTop: 16, fontWeight: 600 }}>
                    <Users size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> <span style={{ color: fg }}>{count.toLocaleString()}</span> nodes currently in waitlist.
                 </p>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "28px", border: `1px solid ${orange}33`, borderRadius: 28, background: `${orange}08`, textAlign: "left" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, boxShadow: `0 10px 20px ${orange}44` }}>✓</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: fg }}>Access Logged.</h3>
                  <p style={{ color: muted, fontSize: 15, fontWeight: 500 }}>The network will notify you upon activation.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", color: muted, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
           <ChevronDown size={20} className="animate-bounce" />
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section id="features" className="sp" style={{ padding: "140px 40px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "center", marginBottom: 100 }}>
             <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>The Architecture</p>
                <h2 className="dsp" style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 32, color: fg }}>Engineered for Sovereignty.</h2>
                <p style={{ color: muted, fontSize: 18, lineHeight: 1.7, fontWeight: 500 }}>We've stripped away the vanity metrics of modern social web to focus on what actually grows the network: high-fidelity thought and verified reputation.</p>
             </div>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div className="card-feature" style={{ padding: 40, borderRadius: 32 }}>
                   <div style={{ width: 50, height: 50, borderRadius: 16, background: `${orange}11`, color: orange, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Shield size={24} /></div>
                   <h4 className="dsp" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: fg }}>Substrate Root</h4>
                   <p style={{ color: muted, fontSize: 15, lineHeight: 1.6 }}>Enterprise-grade decentralization using the Polkadot ecosystem's core framework.</p>
                </div>
                <div className="card-feature" style={{ padding: 40, borderRadius: 32 }}>
                   <div style={{ width: 50, height: 50, borderRadius: 16, background: `${orange}11`, color: orange, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><Zap size={24} /></div>
                   <h4 className="dsp" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: fg }}>Neural Sync</h4>
                   <p style={{ color: muted, fontSize: 15, lineHeight: 1.6 }}>Real-time synchronization across edge nodes with sub-second latency.</p>
                </div>
             </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card-feature" style={{ padding: 48, borderRadius: 40, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 20, right: 20, fontSize: 11, fontWeight: 800, color: muted, background: dark ? "#111" : "#eee", padding: "4px 12px", borderRadius: 100 }}>{f.tag}</div>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, boxShadow: `0 10px 20px ${orange}33` }}>{f.icon}</div>
                <h3 className="dsp" style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: fg }}>{f.title}</h3>
                <p style={{ color: muted, fontSize: 16, lineHeight: 1.8, fontWeight: 500 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROADMAP SECTION ─── */}
      <section id="roadmap" className="sp" style={{ padding: "120px 40px", background: dark ? "#050505" : "#fafafa", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
           <div style={{ textAlign: "center", marginBottom: 80 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>System Lifecycle</p>
              <h2 className="dsp" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: fg }}>Operational Roadmap</h2>
           </div>
           
           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {ROADMAP.map((item, i) => (
                <div key={i} style={{ position: "relative" }}>
                   <div style={{ fontSize: 64, fontWeight: 900, color: dark ? "#111" : "#eee", position: "absolute", top: -40, left: 0, zIndex: 0 }}>{item.step}</div>
                   <div style={{ position: "relative", zIndex: 1, padding: "40px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                         <h3 className="dsp" style={{ fontSize: 24, fontWeight: 800, color: fg }}>{item.title}</h3>
                         <span style={{ fontSize: 11, fontWeight: 800, background: item.status === "Active" ? `${orange}22` : (dark ? "#111" : "#eee"), color: item.status === "Active" ? orange : muted, padding: "4px 10px", borderRadius: 100 }}>{item.status}</span>
                      </div>
                      <p style={{ color: muted, fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── TOKEN SECTION ─── */}
      <section style={{ padding: "160px 40px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
           <div style={{ 
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
              width: 500, height: 500, background: orange, borderRadius: "50%", filter: "blur(180px)", opacity: 0.1, zIndex: 0 
           }} />
           <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>Native Asset</p>
              <h2 className="dsp" style={{ fontSize: "clamp(80px, 15vw, 180px)", fontWeight: 900, lineHeight: 0.8, letterSpacing: "-.08em", marginBottom: 40, color: fg }}>$MYC</h2>
              <p style={{ color: muted, fontSize: 20, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 64px", fontWeight: 500 }}>
                The fuel for the Mycelium economy. Required for node hosting, advanced identity layers, and governance weight.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap" }}>
                 {[
                   { label: "Earn", icon: <TrendingUpIcon size={24} />, desc: "Growth Nodes" },
                   { label: "Stake", icon: <Lock size={24} />, desc: "Weight Control" },
                   { label: "Utilize", icon: <Zap size={24} />, desc: "Access Keys" }
                 ].map((box, i) => (
                   <div key={i} style={{ textAlign: "center" }}>
                      <div className="card-feature" style={{ width: 64, height: 64, borderRadius: 20, color: orange, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>{box.icon}</div>
                      <h4 className="dsp" style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, color: fg }}>{box.label}</h4>
                      <p style={{ fontSize: 13, color: muted, fontWeight: 600 }}>{box.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ─── TEAM SECTION ─── */}
      <section className="sp" style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>The Founders</p>
          <h2 className="dsp" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-.04em", marginBottom: 60, lineHeight: 1.1, color: fg }}>Engineers of<br />Digital Autonomy.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {TEAM.map((dev, i) => (
              <a key={i} href={dev.github} target="_blank" rel="noopener noreferrer" className="hl nl card-feature"
                style={{ padding: "48px 40px", borderRadius: 40, display: "block", color: fg }}>
                <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
                  <div style={{ width: 80, height: 80, borderRadius: 24, background: dark ? fg : "#eee", color: bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 32, flexShrink: 0, overflow: "hidden", position: "relative" }}>
                    <img 
                      src={dev.image} 
                      alt={dev.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 2 }}
                      onError={(e) => {
                        (e.target as any).style.opacity = '0';
                      }}
                    />
                    <span style={{ position: "absolute", zIndex: 1, color: bg }}>{dev.initial}</span>
                  </div>
                  <div>
                    <p className="dsp" style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-.02em", marginBottom: 4 }}>{dev.name}</p>
                    <p style={{ color: muted, fontSize: 16, fontWeight: 500 }}>{dev.role}</p>
                  </div>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 20px", border: `1px solid ${border}`, borderRadius: 100, fontSize: 14, color: muted, fontWeight: 600 }}>
                  <Github size={18} />
                  @{dev.github.split('/').pop()}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section style={{ padding: "100px 40px", background: dark ? "#050505" : "#fafafa" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
           <h2 className="dsp" style={{ fontSize: 32, fontWeight: 800, marginBottom: 60, textAlign: "center", color: fg }}>Deep Logic</h2>
           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { q: "Is MycelX a social network?", a: "No. MycelX is a reputation protocol for text-first communication. It can power social networks, but its primary function is identity and value exchange." },
                { q: "How is it anonymous?", a: "Users utilize cryptographic keys and fractional identities. You control how much metadata you reveal to any specific community node." },
                { q: "What is Substrate?", a: "A modular blockchain framework that allows us to build a high-performance, custom-tailored chain specifically for text-first data." }
              ].map((item, i) => (
                <div key={i} className="card-feature" style={{ padding: 32, borderRadius: 24 }}>
                   <h4 className="dsp" style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", gap: 12, color: fg }}>
                      <Target size={18} color={orange} /> {item.q}
                   </h4>
                   <p style={{ color: muted, fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>{item.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "80px 40px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 60 }}>
           <div>
              <div className="dsp" style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-.04em", display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900 }}>M</div>
                <span style={{ color: fg }}>MycelX</span>
              </div>
              <p style={{ color: muted, fontSize: 15, lineHeight: 1.6, maxWidth: 300, fontWeight: 500 }}>The next generation of decentralized community architecture. Built on Substrate.</p>
           </div>
           <div>
              <h5 style={{ fontSize: 14, fontWeight: 800, color: fg, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Developers</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                 {TEAM.map((dev, i) => (
                   <a key={i} href={dev.github} style={{ color: muted, fontSize: 14, textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                      <Github size={16} /> {dev.name}
                   </a>
                 ))}
              </div>
           </div>
           <div>
              <h5 style={{ fontSize: 14, fontWeight: 800, color: fg, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Connect</h5>
              <div style={{ display: "flex", gap: 20 }}>
                 <a href="#" style={{ width: 44, height: 44, borderRadius: 12, background: surface, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", color: muted }}><Twitter size={20} /></a>
                 <a href="#" style={{ width: 44, height: 44, borderRadius: 12, background: surface, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", color: muted }}><Github size={20} /></a>
              </div>
           </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "60px auto 0", paddingTop: 40, borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <p style={{ color: muted, fontSize: 12, fontWeight: 700 }}>© 2026 MYCELX PROTOCOL · ALL RIGHTS RESERVED</p>
           <p style={{ color: muted, fontSize: 12, fontWeight: 700 }}>SECURED BY SUBSTRATE · AES-256</p>
        </div>
      </footer>
    </div>
  );
}
