'use client'

import { useState, useEffect, useMemo } from "react";
import { joinWaitingList, getWaitingList, getAlerts } from "./actions";
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
  Moon,
  Trophy,
  Terminal,
  Menu,
  X,
  CheckCircle2,
  Bell,
  Cpu,
  Database,
  Search,
  Code,
  Globe
} from "lucide-react";

// Custom SVG Icons to avoid naming issues and build errors
const GithubIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const TwitterIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const FEATURES = [
  {
    title: "Pure Intelligence",
    body: "Focus on thoughts, not visuals. Text-first interaction ensures that ideas remain the primary currency of your community.",
    tag: "TEXT-FIRST"
  },
  {
    title: "Fractal Identity",
    body: "Navigate between public, anonymous, and burner modes. Each layer maintains its own reputation and impact.",
    tag: "FRACTIONAL"
  },
  {
    title: "Economic Layer",
    body: "A native Substrate-based token economy. Earn rewards for value creation. Built-in liquidity from day zero.",
    tag: "SUBSTRATE"
  }
];

const TECH_STACK = [
  { name: "Rust", icon: <Code size={20} />, desc: "Primary logic for safety and speed." },
  { name: "Substrate", icon: <Database size={20} />, desc: "Modular blockchain framework." },
  { name: "Polkadot", icon: <Globe size={20} />, desc: "Cross-chain interoperability layer." },
  { name: "Wasm", icon: <Cpu size={20} />, desc: "High-performance smart execution." }
];

const ROADMAP = [
  { step: "01", title: "Genesis Phase", status: "Active", desc: "Private waitlist and initial protocol architecture on Substrate." },
  { step: "02", title: "Nexus Alpha", status: "Q3 2026", desc: "Release of text-first engine and anonymous identity layers." },
  { step: "03", title: "Economic Mint", status: "Q4 2026", desc: "Native token integration and community liquidity pools." }
];

const TEAM = [
  { 
    name: "Pope", 
    handle: "omividsm",
    role: "Co-Founder · Lead Engineer", 
    github: "https://github.com/omividsm", 
    image: "https://github.com/omividsm.png",
    skills: ["Rust", "Substrate", "React", "TypeScript"],
    streak: "342 Days",
    initial: "P",
    stats: { comments: 42, retweets: 128, likes: 892 }
  },
  { 
    name: "Sanskar Jain", 
    handle: "sanskarjain09",
    role: "Co-Founder · Core Architect", 
    github: "https://github.com/sanskarjain09", 
    image: "https://github.com/sanskarjain09.png",
    skills: ["Solidity", "Go", "Next.js", "GraphQL"],
    streak: "218 Days",
    initial: "J",
    stats: { comments: 38, retweets: 94, likes: 756 }
  }
];

const TASKS = [
  { id: 1, title: "Protocol Contribution", reward: "250 $MYC", icon: <Code size={20} />, desc: "Submit a pull request to our core Substrate repository." },
  { id: 2, title: "Security Audit", reward: "500 $MYC", icon: <Shield size={20} />, desc: "Identify and document potential identity layer vulnerabilities." },
  { id: 3, title: "Market Growth", reward: "150 $MYC", icon: <TrendingUpIcon size={20} />, desc: "Onboard 5 verified developers to the waitlist." }
];

const VerifiedBadge = () => (
  <svg viewBox="0 0 24 24" aria-label="Verified account" width="18" height="18" fill="#FF4D00">
    <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6a3.731 3.731 0 00.148-1.04c0-2.07-1.29-3.75-2.88-3.75-.41 0-.8.11-1.15.3-.65-1.27-2.02-2.14-3.6-2.14-1.58 0-2.95.87-3.6 2.14-.35-.19-.74-.3-1.15-.3-1.59 0-2.88 1.68-2.88 3.75 0 .36.05.7.148 1.04-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6a3.731 3.731 0 00-.148 1.04c0 2.07 1.29 3.75 2.88 3.75.41 0 .8-.11 1.15-.3.65 1.27 2.02 2.14 3.6 2.14 1.58 0 2.95-.87 3.6-2.14.35.19.74.3 1.15.3 1.59 0 2.88-1.68 2.88-3.75 0-.36-.05-.7-.148-1.04 1.273-.65 2.148-2.02 2.148-3.6zm-10.49 4.21L8.33 13l1.45-1.46 2.22 2.21 4.66-4.66 1.45 1.45-6.1 6.17z"></path></g>
  </svg>
);

export default function MycelXWaitlist() {
  const [dark, setDark] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(847);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    getWaitingList().then(list => setCount(847 + (list?.length || 0)));
    getAlerts().then(setAlerts);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const orange = "#FF4D00";
  const bg = dark ? "#000000" : "#ffffff";
  const fg = dark ? "#ffffff" : "#000000";
  const muted = dark ? "#737373" : "#737373";
  const surface = dark ? "#0a0a0a" : "#fafafa";
  const border = dark ? "#171717" : "#e5e5e5";

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
      
      {/* Scroll Progress Bar */}
      <div style={{ 
        position: "fixed", top: 0, left: 0, height: "2px", 
        width: `${scrollProgress}%`, background: orange, 
        zIndex: 1100, transition: "width 0.1s linear" 
      }} />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --font-display: 'Space Grotesk', sans-serif;
          --font-inter: 'Inter', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; outline: none; }
        
        html { scroll-behavior: smooth; }
        .dsp { font-family: var(--font-display); }
        .font-inter { font-family: var(--font-inter); }

        /* Orb Animations */
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }

        @keyframes orbRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes resonance {
          0% { stroke-dashoffset: 0; stroke-width: 1px; opacity: 0.5; }
          50% { stroke-dashoffset: 100; stroke-width: 3px; opacity: 1; }
          100% { stroke-dashoffset: 200; stroke-width: 1px; opacity: 0.5; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          filter: blur(10px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .stagger-container.active > * { opacity: 1; transform: translateY(0); }
        .stagger-container > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stagger-container > *:nth-child(1) { transition-delay: 0.1s; }
        .stagger-container > *:nth-child(2) { transition-delay: 0.2s; }
        .stagger-container > *:nth-child(3) { transition-delay: 0.3s; }

        .btn-premium {
          background: ${orange};
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 100px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px ${orange}33;
          white-space: nowrap;
        }

        .btn-premium:hover { transform: translateY(-2px); box-shadow: 0 12px 30px ${orange}55; }
        .btn-premium:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .card-feature {
          transition: all 0.4s;
          cursor: default;
          background: ${surface};
          border: 1px solid ${border};
        }
        
        .card-feature:hover {
          border-color: ${orange}66 !important;
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .faq-stack {
          position: relative;
          min-height: 400px;
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          position: absolute;
          width: 100%;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .faq-item:nth-child(1) { top: 0; z-index: 3; }
        .faq-item:nth-child(2) { top: 60px; z-index: 2; transform: scale(0.98); opacity: 0.9; }
        .faq-item:nth-child(3) { top: 120px; z-index: 1; transform: scale(0.96); opacity: 0.8; }

        .faq-stack:hover .faq-item:nth-child(1) { transform: translateY(-40px); }
        .faq-stack:hover .faq-item:nth-child(2) { transform: translateY(140px) scale(1); opacity: 1; }
        .faq-stack:hover .faq-item:nth-child(3) { transform: translateY(320px) scale(1); opacity: 1; }

        @keyframes successPop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .success-anim { animation: successPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

        @media (max-width: 768px) {
          .hhl { font-size: 40px !important; }
          .sp { padding: 80px 20px !important; }
          .hide-mobile { display: none !important; }
          .reveal-mobile { display: block !important; }
          .grid-stack { flex-direction: column !important; gap: 16px !important; }
          .faq-stack { height: auto; min-height: 0; display: flex; flex-direction: column; gap: 20px; }
          .faq-item { position: relative; top: 0 !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ─── NAVIGATION ─── */}
      <nav style={{ 
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, 
        transition: "all 0.4s",
        padding: scrolled ? "12px 0" : "24px 0",
        background: scrolled ? (dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)") : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="dsp" style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-.04em", display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/assets/IMG-20260610-WA0065.jpg" style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover" }} />
            <span style={{ color: fg }}>MycelX</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
               <a href="#features" style={{ fontSize: 13, fontWeight: 700, color: muted, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>Features</a>
               <a href="#tasks" style={{ fontSize: 13, fontWeight: 700, color: muted, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>Earn</a>
               <a href="#roadmap" style={{ fontSize: 13, fontWeight: 700, color: muted, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>Roadmap</a>
            </div>
            
            <button onClick={() => setDark(!dark)} style={{ 
              background: dark ? "#111" : "#f5f5f5", 
              border: `1px solid ${border}`,
              padding: "8px 12px", borderRadius: 100, 
              display: "flex", alignItems: "center", gap: 8,
              cursor: "pointer", color: fg, fontSize: 11, fontWeight: 800
            }}>
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button className="btn-premium hide-mobile" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Join Access
            </button>

            <button className="reveal-mobile" onClick={() => setMobileMenu(!mobileMenu)} style={{ display: "none", background: "transparent", border: "none", color: fg, cursor: "pointer" }}>
               {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: bg, borderBottom: `1px solid ${border}`, padding: "24px", display: "flex", flexDirection: "column", gap: 20, zIndex: 1000 }}>
             <a href="#features" onClick={() => setMobileMenu(false)} style={{ fontSize: 14, fontWeight: 700, color: fg, textDecoration: "none" }}>Features</a>
             <a href="#tasks" onClick={() => setMobileMenu(false)} style={{ fontSize: 14, fontWeight: 700, color: fg, textDecoration: "none" }}>Earn $MYC</a>
             <a href="#roadmap" onClick={() => setMobileMenu(false)} style={{ fontSize: 14, fontWeight: 700, color: fg, textDecoration: "none" }}>Roadmap</a>
             <button className="btn-premium" style={{ width: "100%", justifyContent: "center" }} onClick={() => { setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Join Waitlist</button>
          </div>
        )}
      </nav>

      {/* ─── ALERTS SYSTEM ─── */}
      {alerts.length > 0 && (
        <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 999, width: "100%", maxWidth: 600, padding: "0 24px" }}>
           <div style={{ background: orange, color: "#fff", padding: "12px 24px", borderRadius: 100, display: "flex", alignItems: "center", gap: 12, boxShadow: `0 10px 30px ${orange}44` }}>
              <Bell size={18} fill="#fff" />
              <p style={{ fontSize: 13, fontWeight: 800, flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{alerts[0].content}</p>
              <button onClick={() => setAlerts([])} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} /></button>
           </div>
        </div>
      )}

      {/* ─── HERO SECTION ─── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 100 }}>
        
        {/* Resonating Orb Background */}
        <div style={{ 
          position: "absolute", inset: 0, pointerEvents: "none", 
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.2s ease-out"
        }}>
          <div style={{ position: "relative", width: "800px", height: "800px" }}>
            <div style={{
              position: "absolute", inset: "25%",
              background: `radial-gradient(circle, ${orange} 0%, transparent 70%)`,
              filter: "blur(60px)",
              opacity: dark ? 0.3 : 0.2,
              animation: "orbPulse 8s infinite ease-in-out"
            }} />
            
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" style={{ animation: "orbRotate 60s infinite linear" }}>
              <defs>
                <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={orange} />
                  <stop offset="50%" stopColor="#FFCC00" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              
              {[...Array(6)].map((_, i) => (
                <circle
                  key={i}
                  cx="500" cy="500"
                  r={120 + i * 70}
                  fill="none"
                  stroke="url(#orbGrad)"
                  strokeWidth="1"
                  strokeDasharray={i % 2 === 0 ? "1, 20" : "10, 30"}
                  opacity={0.4 - i * 0.05}
                  style={{
                    animation: `resonance ${6 + i * 4}s infinite linear`,
                    transformOrigin: "center"
                  } as any}
                />
              ))}
            </svg>
          </div>
        </div>

        <div style={{ position: "absolute", inset: 0, opacity: dark ? 0.03 : 0.05, backgroundImage: `linear-gradient(${fg} 1px,transparent 1px),linear-gradient(90deg,${fg} 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900, padding: "0 24px" }}>
          <h1 className="hhl dsp reveal active" style={{ fontSize: "clamp(48px, 10vw, 108px)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-.06em", marginBottom: 32 }}>
            Sovereign Thought.<br />
            <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundImage: `linear-gradient(135deg, ${fg} 0%, ${orange} 100%)` }}>
              Decentralized.
            </span>
          </h1>

          <p className="reveal active" style={{ fontSize: "clamp(17px, 2vw, 20px)", color: muted, maxWidth: 660, margin: "0 auto 48px", lineHeight: 1.6, fontWeight: 500 }}>
            MycelX is a reputation-driven communication protocol. Built on Substrate to eliminate visual noise and empower pure, anonymous intelligence.
          </p>

          <div className="reveal active" style={{ maxWidth: 500, margin: "0 auto" }}>
            {!submitted ? (
              <div style={{ position: "relative" }}>
                 <div className="grid-stack" style={{ display: "flex", background: dark ? "#0a0a0a" : "#fff", border: `1px solid ${border}`, borderRadius: 24, padding: "8px", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.05)" }}>
                    <input 
                      type="email" placeholder="Connect email..." value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleJoin()}
                      disabled={loading}
                      style={{ flex: 1, background: "transparent", border: "none", color: fg, fontSize: 16, padding: "12px 24px", fontWeight: 500 }}
                    />
                    <button className="btn-premium" onClick={handleJoin} disabled={loading || !email} style={{ height: 50, justifyContent: "center" }}>
                      {loading ? "Joining..." : "Get Access"} <ArrowRight size={18} />
                    </button>
                 </div>
                 <p style={{ fontSize: 13, color: muted, marginTop: 16, fontWeight: 600 }}>
                    <Users size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> <span style={{ color: fg }}>{count.toLocaleString()}</span> thinkers currently waitlisted.
                 </p>
              </div>
            ) : (
              <div className="success-anim" style={{ display: "flex", alignItems: "center", gap: 20, padding: "28px", border: `1px solid ${orange}33`, borderRadius: 28, background: `${orange}08`, textAlign: "left" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, boxShadow: `0 10px 20px ${orange}44` }}>
                   <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: fg }}>Access Logged.</h3>
                  <p style={{ color: muted, fontSize: 15, fontWeight: 500 }}>The network will notify you upon activation.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", color: muted }}>
           <ChevronDown size={20} className="animate-bounce" />
        </div>
      </section>

      {/* ─── TECH STACK SECTION ─── */}
      <section className="sp reveal" style={{ padding: "120px 40px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
           <div style={{ textAlign: "center", marginBottom: 80 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Architecture</p>
              <h2 className="dsp" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: fg }}>Core Protocol Stack</h2>
           </div>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className="card-feature" style={{ padding: "32px", borderRadius: 24, textAlign: "center" }}>
                   <div style={{ color: orange, marginBottom: 16, display: "flex", justifyContent: "center" }}>{tech.icon}</div>
                   <h4 className="dsp" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{tech.name}</h4>
                   <p style={{ color: muted, fontSize: 14, fontWeight: 500 }}>{tech.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section id="features" className="sp" style={{ padding: "160px 40px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 120 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>Capabilities</p>
            <h2 className="dsp" style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, lineHeight: 1.1, color: fg }}>Living Infrastructure.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }} className="stagger-container reveal">
            {FEATURES.map((f, i) => (
              <div key={i} className="card-feature" style={{ padding: 60, borderRadius: 56, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ height: 140, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <svg width="100%" height="100%" viewBox="0 0 200 200">
                      {i === 0 && (
                        <g>
                          <circle cx="100" cy="100" r="10" fill={orange} />
                          {[...Array(8)].map((_, j) => (
                            <path key={j} d="M100,60 L100,90" stroke={orange} strokeWidth="1" strokeDasharray="5,5" transform={`rotate(${j * 45} 100 100)`} />
                          ))}
                        </g>
                      )}
                      {i === 1 && (
                        <g transform="rotate(45 100 100)">
                          <rect x="75" y="75" width="50" height="50" stroke={orange} strokeWidth="1" fill="none" />
                          <circle cx="75" cy="75" r="5" fill={orange} />
                          <circle cx="125" cy="125" r="5" fill={orange} />
                        </g>
                      )}
                      {i === 2 && (
                        <circle cx="100" cy="100" r="40" stroke={orange} strokeWidth="1" fill="none" strokeDasharray="10,10" style={{ animation: "orbRotate 10s infinite linear", transformOrigin: "center" }} />
                      )}
                   </svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: muted, background: dark ? "#111" : "#eee", padding: "6px 16px", borderRadius: 100, letterSpacing: "0.05em", width: "fit-content", marginBottom: 16 }}>{f.tag}</div>
                  <h3 className="dsp" style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: fg }}>{f.title}</h3>
                  <p style={{ color: muted, fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EARN SECTION (TASKS) ─── */}
      <section id="tasks" className="sp reveal" style={{ padding: "140px 40px", background: dark ? "#050505" : "#fafafa", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 64, alignItems: "center" }}>
             <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", background: `${orange}11`, border: `1px solid ${orange}33`, borderRadius: 100, marginBottom: 24 }}>
                   <Trophy size={16} color={orange} />
                   <span style={{ fontSize: 12, fontWeight: 800, color: orange, textTransform: "uppercase" }}>Freelance Rewards</span>
                </div>
                <h2 className="dsp" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24, color: fg }}>Build MycelX.<br />Earn Tokens.</h2>
                <p style={{ color: muted, fontSize: 18, lineHeight: 1.7, fontWeight: 500, marginBottom: 32 }}>We're looking for high-IQ builders to scale the protocol. Complete technical tasks and receive direct token allocations.</p>
                <button className="btn-premium" style={{ padding: "16px 32px" }}>
                   Quest Terminal <Terminal size={18} />
                </button>
             </div>

             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {TASKS.map((task) => (
                  <div key={task.id} className="card-feature" style={{ padding: "24px 32px", borderRadius: 24, display: "flex", alignItems: "center", gap: 24 }}>
                     <div style={{ width: 48, height: 48, borderRadius: 12, background: `${orange}11`, color: orange, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {task.icon}
                     </div>
                     <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                           <h4 style={{ fontWeight: 800, fontSize: 16 }}>{task.title}</h4>
                           <span style={{ fontSize: 13, fontWeight: 900, color: orange }}>{task.reward}</span>
                        </div>
                        <p style={{ fontSize: 14, color: muted, fontWeight: 500 }}>{task.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ─── ROADMAP SECTION ─── */}
      <section id="roadmap" className="sp reveal" style={{ padding: "120px 40px", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
           <div style={{ textAlign: "center", marginBottom: 80 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>System Lifecycle</p>
              <h2 className="dsp" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: fg }}>Operational Roadmap</h2>
           </div>
           
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }} className="stagger-container reveal">
              {ROADMAP.map((item, i) => (
                <div key={i} style={{ position: "relative" }}>
                   <div style={{ fontSize: 84, fontWeight: 900, color: dark ? "#111" : "#eee", position: "absolute", top: -60, left: 0, zIndex: 0 }}>{item.step}</div>
                   <div style={{ position: "relative", zIndex: 1, padding: "40px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                         <h3 className="dsp" style={{ fontSize: 26, fontWeight: 800, color: fg }}>{item.title}</h3>
                         <span style={{ fontSize: 11, fontWeight: 900, background: item.status === "Active" ? `${orange}22` : (dark ? "#111" : "#eee"), color: item.status === "Active" ? orange : muted, padding: "6px 14px", borderRadius: 100 }}>{item.status}</span>
                      </div>
                      <p style={{ color: muted, fontSize: 17, lineHeight: 1.7, fontWeight: 500 }}>{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── TEAM SECTION ─── */}
      <section className="sp reveal" style={{ padding: "140px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: orange, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Founders</p>
            <h2 className="dsp" style={{ fontWeight: 800, fontSize: "clamp(32px, 6vw, 56px)", letterSpacing: "-.04em", lineHeight: 1.1, color: fg }}>The Architects.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 32 }} className="stagger-container reveal">
            {TEAM.map((dev, i) => (
              <div key={i} className="card-feature" style={{ padding: "32px", borderRadius: 28, display: "block", color: fg, position: "relative" }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: dark ? "#222" : "#eee", flexShrink: 0, overflow: "hidden" }}>
                    <img src={dev.image} alt={dev.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: 16 }}>{dev.name}</span>
                      <VerifiedBadge />
                      <span style={{ color: muted, fontSize: 15 }}>@{dev.handle} · 2h</span>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 16, fontWeight: 500 }}>
                      Scaling the community layer with {dev.skills.join(", ")}. MycelX is the future of text-first sovereignty.
                    </p>
                    <div style={{ background: dark ? "#0a0a0a" : "#fafafa", border: `1px solid ${border}`, borderRadius: 16, padding: 16, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                       <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {dev.skills.slice(0, 3).map(skill => (
                            <span key={skill} style={{ fontSize: 12, fontWeight: 700, color: orange }}>#{skill}</span>
                          ))}
                       </div>
                       <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: 10, fontWeight: 800, color: muted, textTransform: "uppercase" }}>Commit Streak</p>
                          <p style={{ fontSize: 14, fontWeight: 900, color: fg }}>{dev.streak}</p>
                       </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: muted, paddingRight: 20 }}>
                       <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MessageSquare size={16} /> <span style={{ fontSize: 13 }}>{dev.stats.comments}</span></div>
                       <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Layers size={16} /> <span style={{ fontSize: 13 }}>{dev.stats.retweets}</span></div>
                       <div style={{ display: "flex", alignItems: "center", gap: 6, color: orange }}><Target size={16} fill={orange} /> <span style={{ fontSize: 13 }}>{dev.stats.likes}</span></div>
                       <div style={{ display: "flex", alignItems: "center", gap: 6 }}><TwitterIcon size={16} /></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION (STACKED) ─── */}
      <section className="reveal" style={{ padding: "120px 40px", background: dark ? "#050505" : "#fafafa" }}>
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
           <h2 className="dsp" style={{ fontSize: 36, fontWeight: 800, marginBottom: 80, textAlign: "center", color: fg }}>Deep Logic</h2>
           
           <div className="faq-stack stagger-container reveal">
              {[
                { q: "Is MycelX a social network?", a: "No. MycelX is a reputation protocol for text-first communication. It can power social networks, but its primary function is identity and value exchange." },
                { q: "How is it anonymous?", a: "Users utilize cryptographic keys and fractional identities. You control how much metadata you reveal to any specific community node." },
                { q: "What is Substrate?", a: "A modular blockchain framework that allows us to build a high-performance, custom-tailored chain specifically for text-first data." }
              ].map((item, i) => (
                <div key={i} className="faq-item card-feature" style={{ padding: 40, borderRadius: 32, minHeight: "200px" }}>
                   <h4 className="dsp" style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", gap: 16, color: fg }}>
                      <Target size={20} color={orange} /> {item.q}
                   </h4>
                   <p style={{ color: muted, fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>{item.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "100px 40px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 64 }}>
           <div>
              <div className="dsp" style={{ fontWeight: 800, fontSize: 28, letterSpacing: "-.04em", display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <img src="/assets/IMG-20260610-WA0065.jpg" style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }} />
                <span style={{ color: fg }}>MycelX</span>
              </div>
              <p style={{ color: muted, fontSize: 16, lineHeight: 1.7, maxWidth: 320, fontWeight: 500 }}>The next generation of decentralized community architecture. Built on Substrate.</p>
           </div>
           <div>
              <h5 style={{ fontSize: 14, fontWeight: 800, color: fg, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>Architects</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                 {TEAM.map((dev, i) => (
                   <a key={i} href={dev.github} style={{ color: muted, fontSize: 15, textDecoration: "none", fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
                      <GithubIcon size={18} /> {dev.name}
                   </a>
                 ))}
              </div>
           </div>
           <div>
              <h5 style={{ fontSize: 14, fontWeight: 800, color: fg, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>Connect</h5>
              <div style={{ display: "flex", gap: 24 }}>
                 <a href="#" style={{ width: 52, height: 52, borderRadius: 16, background: surface, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", color: muted, transition: "all 0.3s" }} className="card-feature"><TwitterIcon size={24} /></a>
                 <a href="#" style={{ width: 52, height: 52, borderRadius: 16, background: surface, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", color: muted, transition: "all 0.3s" }} className="card-feature"><GithubIcon size={24} /></a>
              </div>
           </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "60px auto 0", paddingTop: 40, borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
           <p style={{ color: muted, fontSize: 12, fontWeight: 800 }}>© 2026 MYCELX PROTOCOL · ALL RIGHTS RESERVED</p>
           <p style={{ color: muted, fontSize: 12, fontWeight: 800 }}>SECURED BY SUBSTRATE · AES-256</p>
        </div>
      </footer>
    </div>
  );
}
