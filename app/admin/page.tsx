'use client'

import { useState, useEffect, useMemo } from "react";
import { getWaitingList } from "../actions";
import { 
  Users, 
  TrendingUp, 
  LogOut, 
  BarChart3,
  Activity,
  Mail,
  ShieldCheck,
  Sun,
  Moon,
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function AdminDashboard() {
  const [dark, setDark] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "omenaid44420@gmail.com";
  const ADMIN_PASSWORD = "12345";

  const orange = "#FF4D00";
  
  // Theme derived values
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
    if (isLoggedIn) {
      getWaitingList().then(data => {
        setList(data);
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  const analytics = useMemo(() => {
    if (!list.length) return { daily: [], total: 0, growth: 0 };
    
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString('en-US', { weekday: 'short' });
      const count = list.filter(item => new Date(item.timestamp).toDateString() === d.toDateString()).length;
      return { name: label, signups: count };
    }).reverse();

    return { daily: days, total: list.length, growth: 14.5 };
  }, [list]);

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 400, background: "#09090b", border: "1px solid #1c1c1f", borderRadius: 16, padding: 40 }}>
           <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ width: 48, height: 48, background: orange, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#fff", fontWeight: 900 }}>M</div>
              <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>Admin Login</h1>
              <p style={{ color: "#a1a1aa", fontSize: 14, marginTop: 8 }}>Access the MycelX Nexus Dashboard</p>
           </div>
           <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email" required
                style={{ width: "100%", background: "#111", border: "1px solid #222", padding: "12px 16px", borderRadius: 8, color: "#fff" }}
              />
              <input 
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password" required
                style={{ width: "100%", background: "#111", border: "1px solid #222", padding: "12px 16px", borderRadius: 8, color: "#fff" }}
              />
              {error && <p style={{ color: orange, fontSize: 12, textAlign: "center" }}>{error}</p>}
              <button style={{ width: "100%", background: "#fff", color: "#000", border: "none", padding: "14px", borderRadius: 8, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>Sign in</button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bg, color: fg, minHeight: "100vh", transition: "all 0.3s ease", fontFamily: "var(--font-inter)" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        
        {/* Sidebar */}
        <aside style={{ width: 260, borderRight: `1px solid ${border}`, padding: "24px", display: "flex", flexDirection: "column", gap: 32 }}>
           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, background: orange, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900 }}>M</div>
              <span style={{ fontWeight: 700, fontSize: 18 }}>MycelX Admin</span>
           </div>

           <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { name: "Overview", icon: <LayoutDashboard size={18} />, active: true },
                { name: "Entities", icon: <Users size={18} /> },
                { name: "Network", icon: <Activity size={18} /> },
                { name: "Alerts", icon: <Bell size={18} /> },
                { name: "System", icon: <Settings size={18} /> }
              ].map((item, i) => (
                <div key={i} style={{ 
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 10,
                  background: item.active ? (dark ? "#1c1c1f" : "#f1f5f9") : "transparent",
                  color: item.active ? fg : muted, cursor: "pointer", fontWeight: 600, fontSize: 14
                }}>
                  {item.icon} {item.name}
                </div>
              ))}
           </nav>

           <div style={{ marginTop: "auto" }}>
              <button 
                onClick={() => setDark(!dark)}
                style={{ 
                  width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 10,
                  border: `1px solid ${border}`, background: "transparent", color: fg, cursor: "pointer", fontWeight: 600, fontSize: 14, marginBottom: 12
                }}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />} {dark ? "Light Mode" : "Dark Mode"}
              </button>
              <button 
                onClick={() => setIsLoggedIn(false)}
                style={{ 
                  width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 10,
                  border: "none", background: `${orange}11`, color: orange, cursor: "pointer", fontWeight: 700, fontSize: 14
                }}
              >
                <LogOut size={18} /> Sign out
              </button>
           </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
           
           {/* Top Bar */}
           <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
              <div>
                 <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-.02em" }}>Command Center</h2>
                 <p style={{ color: muted, marginTop: 4 }}>Monitoring global community growth.</p>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                 <div style={{ position: "relative" }}>
                    <Search size={18} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: muted }} />
                    <input 
                      type="text" placeholder="Search entities..." 
                      style={{ background: surface, border: `1px solid ${border}`, padding: "10px 16px 10px 40px", borderRadius: 10, width: 280, color: fg, fontSize: 14 }} 
                    />
                 </div>
              </div>
           </header>

           {/* Dashboard Grid */}
           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 32 }}>
              {[
                { label: "Total Signups", value: analytics.total, icon: <Users size={20} />, up: true },
                { label: "Conversion Rate", value: "24.2%", icon: <TrendingUp size={20} />, up: true },
                { label: "Active Nodes", value: "1,204", icon: <Activity size={20} />, up: true },
                { label: "System Uptime", value: "99.9%", icon: <ShieldCheck size={20} />, up: true }
              ].map((stat, i) => (
                <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ color: muted, fontSize: 13, fontWeight: 600 }}>{stat.label}</span>
                      <div style={{ color: muted }}>{stat.icon}</div>
                   </div>
                   <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 24, fontWeight: 800 }}>{stat.value}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center" }}>
                        <ArrowUpRight size={14} /> +12%
                      </span>
                   </div>
                </div>
              ))}
           </div>

           {/* Visual Analysis */}
           <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 32 }}>
              
              {/* Main Chart */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 32 }}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>Signup Velocity</h3>
                    <div style={{ display: "flex", gap: 8 }}>
                       {['Day', 'Week', 'Month'].map(t => (
                         <span key={t} style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 6, background: t === 'Week' ? (dark ? "#fff" : "#000") : "transparent", color: t === 'Week' ? (dark ? "#000" : "#fff") : muted, cursor: "pointer" }}>{t}</span>
                       ))}
                    </div>
                 </div>
                 <div style={{ height: 350, width: "100%" }}>
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
                          <Tooltip 
                             contentStyle={{ background: dark ? "#000" : "#fff", border: `1px solid ${border}`, borderRadius: 8 }}
                             itemStyle={{ color: orange, fontWeight: 700 }}
                          />
                          <Area type="monotone" dataKey="signups" stroke={orange} strokeWidth={3} fillOpacity={1} fill="url(#colorSignups)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Live Activity Feed */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 32, display: "flex", flexDirection: "column" }}>
                 <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Recent Activity</h3>
                 <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                    {list.slice(-5).reverse().map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                         <div style={{ width: 40, height: 40, background: dark ? "#1c1c1f" : "#fff", border: `1px solid ${border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Mail size={16} color={orange} />
                         </div>
                         <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 700 }}>{item.email.split('@')[0]}*** joined</p>
                            <p style={{ fontSize: 12, color: muted }}>{new Date(item.timestamp).toLocaleTimeString()}</p>
                         </div>
                         <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                      </div>
                    ))}
                 </div>
                 <button style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: fg, fontSize: 13, fontWeight: 700, marginTop: "auto", cursor: "pointer" }}>
                    View All Logs
                 </button>
              </div>
           </div>

           {/* Data Table */}
           <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                 <thead>
                    <tr style={{ borderBottom: `1px solid ${border}`, background: dark ? "#0c0c0e" : "#f1f5f9" }}>
                       <th style={{ padding: "16px 24px", fontSize: 13, fontWeight: 700, color: muted }}>Entity Address</th>
                       <th style={{ padding: "16px 24px", fontSize: 13, fontWeight: 700, color: muted }}>Protocol Entry</th>
                       <th style={{ padding: "16px 24px", fontSize: 13, fontWeight: 700, color: muted }}>Network Status</th>
                       <th style={{ padding: "16px 24px" }}></th>
                    </tr>
                 </thead>
                 <tbody>
                    {list.map((item, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${border}` }}>
                         <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 600 }}>{item.email}</td>
                         <td style={{ padding: "16px 24px", fontSize: 14, color: muted }}>{new Date(item.timestamp).toLocaleString()}</td>
                         <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: 100, background: "#10b98111", color: "#10b981", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Verified</span>
                         </td>
                         <td style={{ padding: "16px 24px", textAlign: "right" }}>
                            <MoreHorizontal size={18} color={muted} style={{ cursor: "pointer" }} />
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>

        </main>
      </div>
    </div>
  );
}
