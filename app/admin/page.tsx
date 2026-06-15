'use client'

import { useState, useEffect, useMemo } from "react";
import { getWaitingList, pushAlert, getAlerts } from "../actions";
import { 
  Users, 
  TrendingUp, 
  LogOut, 
  Activity, 
  Mail, 
  ShieldCheck, 
  Sun, 
  Moon, 
  LayoutDashboard, 
  Settings, 
  Bell, 
  Search, 
  MoreHorizontal, 
  ArrowUpRight, 
  Menu, 
  X,
  Send,
  Zap,
  Globe,
  Database,
  Cpu
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const DEVELOPERS = [
  { name: "Pope", handle: "omividsm", streak: "342 Days", skills: "Rust, Substrate, TypeScript", img: "https://github.com/omividsm.png" },
  { name: "Sanskar Jain", handle: "sanskarjain09", streak: "218 Days", skills: "Go, Next.js, Solidity", img: "https://github.com/sanskarjain09.png" }
];

export default function AdminDashboard() {
  const [dark, setDark] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [newAlert, setNewAlert] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const ADMIN_EMAIL = "omenaid44420@gmail.com";
  const ADMIN_PASSWORD = "12345";
  const orange = "#FF4D00";
  
  const bg      = dark ? "#000000" : "#ffffff";
  const fg      = dark ? "#ffffff" : "#000000";
  const surface = dark ? "#09090b" : "#f8f9fa";
  const border  = dark ? "#1c1c1f" : "#e5e7eb";
  const muted   = dark ? "#a1a1aa" : "#64748b";

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Unauthorized access attempt.");
    }
  }

  useEffect(() => {
    setIsClient(true);
    if (isLoggedIn) {
      Promise.all([getWaitingList(), getAlerts()]).then(([waitlist, alertsData]) => {
        setList(waitlist);
        setAlerts(alertsData);
        setLoading(false);
      });
    }
    
    if (!isLoggedIn) {
      const interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % DEVELOPERS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const filteredList = useMemo(() => {
    return list.filter(item => 
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [list, searchQuery]);

  const analytics = useMemo(() => {
    if (!list.length) return { daily: [], total: 0 };
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString('en-US', { weekday: 'short' });
      const count = list.filter(item => new Date(item.timestamp).toDateString() === d.toDateString()).length;
      return { name: label, signups: count };
    }).reverse();
    return { daily: days, total: list.length };
  }, [list]);

  async function handlePushAlert() {
    if (!newAlert.trim()) return;
    const res = await pushAlert(newAlert);
    if (res.success) {
      setNewAlert("");
      getAlerts().then(setAlerts);
    }
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", fontFamily: "var(--font-inter)" }}>
        <style jsx>{`
          @media (max-width: 1024px) {
            .visual-side { display: none !important; }
          }
        `}</style>

        {/* Left Side: Login Form */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
          <div style={{ width: "100%", maxWidth: 360 }}>
             <div style={{ marginBottom: 60 }}>
                <div style={{ width: 44, height: 44, background: orange, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, marginBottom: 24 }}>M</div>
                <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, letterSpacing: "-.04em" }}>Protocol Access</h1>
                <p style={{ color: "#737373", fontSize: 15, marginTop: 10 }}>Provide credentials to enter the Nexus.</p>
             </div>
             <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ position: "relative" }}>
                   <input 
                     type="email" value={email} onChange={e => setEmail(e.target.value)}
                     placeholder="Entity Address" required
                     style={{ 
                       width: "100%", background: "transparent", border: "none", 
                       borderBottom: `1px solid #222`, padding: "12px 0", 
                       color: "#fff", fontSize: 15, caretColor: orange
                     }}
                   />
                </div>
                <div style={{ position: "relative" }}>
                   <input 
                     type="password" value={password} onChange={e => setPassword(e.target.value)}
                     placeholder="Access Key" required
                     style={{ 
                       width: "100%", background: "transparent", border: "none", 
                       borderBottom: `1px solid #222`, padding: "12px 0", 
                       color: "#fff", fontSize: 15, caretColor: orange
                     }}
                   />
                </div>
                {error && <p style={{ color: orange, fontSize: 13, textAlign: "center" }}>{error}</p>}
                <button style={{ width: "100%", background: "#fff", color: "#000", border: "none", padding: "14px", borderRadius: 100, fontWeight: 800, cursor: "pointer", marginTop: 16, fontSize: 15 }}>Unlock Terminal</button>
             </form>
          </div>
        </div>
        
        {/* Right Side: Carousel */}
        <div className="visual-side" style={{ flex: 1.5, background: "#050505", borderLeft: "1px solid #111", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: 80 }}>
           <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
           
           <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440 }}>
              <div>
                 <div style={{ background: "#0a0a0a", border: "1px solid #1c1c1f", borderRadius: 32, padding: 48, boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                       <img 
                         src={DEVELOPERS[carouselIndex].img} 
                         style={{ width: 80, height: 80, borderRadius: 24, objectFit: "cover", background: "#111" }} 
                       />
                       <div>
                          <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>{DEVELOPERS[carouselIndex].name}</h3>
                          <p style={{ color: orange, fontWeight: 700, fontSize: 14 }}>@{DEVELOPERS[carouselIndex].handle}</p>
                       </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                       <div style={{ padding: "12px 20px", background: "#111", borderRadius: 16 }}>
                          <p style={{ color: "#555", fontSize: 11, fontWeight: 800, textTransform: "uppercase", marginBottom: 4 }}>Commit Streak</p>
                          <p style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>{DEVELOPERS[carouselIndex].streak}</p>
                       </div>
                       <div style={{ padding: "12px 20px", background: "#111", borderRadius: 16 }}>
                          <p style={{ color: "#555", fontSize: 11, fontWeight: 800, textTransform: "uppercase", marginBottom: 4 }}>Core Stack</p>
                          <p style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{DEVELOPERS[carouselIndex].skills}</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
                 {DEVELOPERS.map((_, i) => (
                   <div key={i} style={{ width: i === carouselIndex ? 24 : 8, height: 8, borderRadius: 10, background: i === carouselIndex ? orange : "#222", transition: "all 0.3s" }} />
                 ))}
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bg, color: fg, minHeight: "100vh", transition: "all 0.3s ease", fontFamily: "var(--font-inter)", overflow: "hidden" }}>
      <style jsx global>{`
        @media (max-width: 1024px) {
           .sidebar { position: fixed !important; left: -280px; z-index: 1000; transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
           .sidebar.open { left: 0 !important; box-shadow: 0 0 100px rgba(0,0,0,0.5); }
           .mobile-toggle { display: block !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ 
          width: 280, borderRight: `1px solid ${border}`, padding: "32px 24px", display: "flex", 
          flexDirection: "column", gap: 40, background: bg, height: "100vh", position: "relative"
        }}>
           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                 <div style={{ width: 32, height: 32, background: orange, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900 }}>M</div>
                 <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-.02em" }}>Nexus Core</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="mobile-toggle" style={{ display: 'none', background: 'transparent', border: 'none', color: fg }}><X size={20}/></button>
           </div>

           <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { name: "Overview", icon: <LayoutDashboard size={18} /> },
                { name: "Entities", icon: <Users size={18} /> },
                { name: "Alerts", icon: <Bell size={18} /> },
                { name: "Settings", icon: <Settings size={18} /> }
              ].map((item) => (
                <button key={item.name} onClick={() => { setActiveTab(item.name); setSidebarOpen(false); }} style={{ 
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12,
                  background: activeTab === item.name ? (dark ? "#1c1c1f" : "#f1f5f9") : "transparent",
                  color: activeTab === item.name ? fg : muted, cursor: "pointer", fontWeight: 700, fontSize: 14,
                  border: "none", width: "100%", textAlign: "left", transition: "all 0.2s"
                }}>
                  {item.icon} {item.name}
                </button>
              ))}
           </nav>

           <div style={{ marginTop: "auto" }}>
              <div style={{ padding: 16, background: surface, border: `1px solid ${border}`, borderRadius: 16, marginBottom: 24 }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900 }}>A</div>
                    <div style={{ overflow: "hidden" }}>
                       <p style={{ fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{ADMIN_EMAIL}</p>
                       <p style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>Root Admin</p>
                    </div>
                 </div>
              </div>
              <button onClick={() => setDark(!dark)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: `1px solid ${border}`, background: "transparent", color: fg, cursor: "pointer", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>
                {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? "Light Protocol" : "Deep Protocol"}
              </button>
              <button onClick={() => setIsLoggedIn(false)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: "none", background: `${orange}11`, color: orange, cursor: "pointer", fontWeight: 800, fontSize: 13 }}>
                <LogOut size={16} /> Terminate Session
              </button>
           </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "clamp(24px, 5vw, 40px)", overflowY: "auto", height: "100vh" }}>
           <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                 <button onClick={() => setSidebarOpen(true)} className="mobile-toggle" style={{ display: 'none', background: surface, border: `1px solid ${border}`, padding: 10, borderRadius: 10, color: fg }}><Menu size={20}/></button>
                 <div>
                    <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, letterSpacing: "-.03em" }}>{activeTab}</h2>
                    <p style={{ color: muted, fontSize: 15, fontWeight: 500 }}>System Management Terminal</p>
                 </div>
              </div>
              <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 320 }}>
                 <div style={{ position: "relative", width: "100%" }}>
                    <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: muted }} />
                    <input 
                      type="text" placeholder="Search database..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      style={{ background: surface, border: `1px solid ${border}`, padding: "12px 16px 12px 44px", borderRadius: 12, width: "100%", color: fg, fontSize: 14, fontWeight: 500 }} 
                    />
                 </div>
              </div>
           </header>

           {activeTab === "Overview" && (
             <div className="reveal active">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 40 }}>
                   {[
                     { label: "Network Entities", value: analytics.total, icon: <Users size={20} /> },
                     { label: "Growth Rate", value: "+14.5%", icon: <TrendingUp size={20} /> },
                     { label: "Uptime", value: "99.99%", icon: <Activity size={20} /> },
                     { label: "Encrypted", value: "AES-256", icon: <ShieldCheck size={20} /> }
                   ].map((stat, i) => (
                     <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: 28 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                           <span style={{ color: muted, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</span>
                           <div style={{ color: orange }}>{stat.icon}</div>
                        </div>
                        <h3 style={{ fontSize: 32, fontWeight: 900 }}>{stat.value}</h3>
                     </div>
                   ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
                   <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 24, padding: "clamp(20px, 4vw, 32px)" }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 32 }}>Signup Velocity</h3>
                      <div style={{ height: 350, width: "100%" }}>
                         {isClient && (
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={analytics.daily}>
                                 <defs>
                                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor={orange} stopOpacity={0.3}/>
                                       <stop offset="95%" stopColor={orange} stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={dark ? "#1c1c1f" : "#e2e8f0"} />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: muted, fontSize: 12}} dy={10} />
                                 <YAxis axisLine={false} tickLine={false} tick={{fill: muted, fontSize: 12}} />
                                 <Tooltip contentStyle={{ background: dark ? "#000" : "#fff", border: `1px solid ${border}`, borderRadius: 12 }} />
                                 <Area type="monotone" dataKey="signups" stroke={orange} strokeWidth={3} fill="url(#colorSignups)" />
                              </AreaChart>
                           </ResponsiveContainer>
                         )}
                      </div>
                   </div>

                   <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 24, padding: 32 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>System Health</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                         {[
                           { name: "Protocol Core", status: "Operational", color: "#10b981" },
                           { name: "Substrate Node", status: "Operational", color: "#10b981" },
                           { name: "Oracle Sync", status: "Operational", color: "#10b981" },
                           { name: "Identity Layer", status: "Under Load", color: "#f59e0b" }
                         ].map(sys => (
                           <div key={sys.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontWeight: 600, fontSize: 14 }}>{sys.name}</span>
                              <span style={{ fontSize: 11, fontWeight: 900, color: sys.color, background: `${sys.color}11`, padding: "4px 12px", borderRadius: 100 }}>{sys.status}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === "Entities" && (
             <div className="reveal active">
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 24, overflowX: "auto" }}>
                   <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 600 }}>
                      <thead>
                         <tr style={{ borderBottom: `1px solid ${border}`, background: dark ? "#0c0c0e" : "#f1f5f9" }}>
                            <th style={{ padding: "20px 32px", fontSize: 12, fontWeight: 800, color: muted, textTransform: "uppercase" }}>Entity Identity</th>
                            <th style={{ padding: "20px 32px", fontSize: 12, fontWeight: 800, color: muted, textTransform: "uppercase" }}>Registry Date</th>
                            <th style={{ padding: "20px 32px", fontSize: 12, fontWeight: 800, color: muted, textTransform: "uppercase" }}>Auth Status</th>
                         </tr>
                      </thead>
                      <tbody>
                         {filteredList.map((item, i) => (
                           <tr key={i} style={{ borderBottom: `1px solid ${border}` }}>
                              <td style={{ padding: "20px 32px", fontSize: 15, fontWeight: 700 }}>{item.email}</td>
                              <td style={{ padding: "20px 32px", fontSize: 14, color: muted }}>{new Date(item.timestamp).toLocaleString()}</td>
                              <td style={{ padding: "20px 32px" }}>
                                 <span style={{ padding: "6px 14px", borderRadius: 100, background: "#10b98111", color: "#10b981", fontSize: 11, fontWeight: 900, textTransform: "uppercase" }}>Registered</span>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
           )}

           {activeTab === "Alerts" && (
             <div className="reveal active" style={{ maxWidth: 700 }}>
                <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 24, padding: "clamp(20px, 4vw, 40px)", marginBottom: 32 }}>
                   <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Broadcast Update</h3>
                   <p style={{ color: muted, marginBottom: 32 }}>Broadcast updates to the global MycelX home terminal.</p>
                   <textarea 
                     value={newAlert} onChange={e => setNewAlert(e.target.value)}
                     placeholder="State the protocol update..." 
                     style={{ width: "100%", height: 120, background: "#0a0a0a", border: `1px solid ${border}`, borderRadius: 16, padding: 20, color: "#fff", fontSize: 15, marginBottom: 20, resize: "none", caretColor: orange }}
                   />
                   <button onClick={handlePushAlert} style={{ display: "flex", alignItems: "center", gap: 10, background: orange, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 14, fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
                      Broadcast <Send size={18} />
                   </button>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>System History</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                   {alerts.map((alert) => (
                     <div key={alert.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: 24 }}>
                        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12, fontWeight: 500 }}>{alert.content}</p>
                        <p style={{ fontSize: 11, color: muted, fontWeight: 800 }}>{new Date(alert.timestamp).toLocaleString()}</p>
                     </div>
                   ))}
                </div>
             </div>
           )}

        </main>
      </div>
    </div>
  );
}
