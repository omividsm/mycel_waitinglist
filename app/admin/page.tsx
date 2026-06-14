'use client'

import { useState, useEffect, useMemo } from "react";
import { getWaitingList } from "../actions";
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  ArrowLeft, 
  LogOut, 
  BarChart3,
  Activity,
  Mail,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "omenaid44420@gmail.com";
  const ADMIN_PASSWORD = "12345";

  const orange = "#FF4D00";

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Access Denied. Invalid credentials.");
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

  // Analytics Logic
  const analytics = useMemo(() => {
    if (!list.length) return { daily: [], total: 0, last24h: 0 };
    
    const now = new Date();
    const last24h = list.filter(item => {
      const d = new Date(item.timestamp);
      return (now.getTime() - d.getTime()) < (24 * 60 * 60 * 1000);
    }).length;

    // Group by day for chart (last 7 days)
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const count = list.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toDateString() === d.toDateString();
      }).length;
      return { label: dateStr, count };
    }).reverse();

    return { daily: days, total: list.length, last24h };
  }, [list]);

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)" }}>
        <div style={{ width: "100%", maxWidth: 420, padding: 48, border: "1px solid #1a1a1a", borderRadius: 32, background: "#0a0a0a", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, margin: "0 auto 24px", boxShadow: `0 0 30px ${orange}33` }}>M</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.04em" }}>Nexus Terminal</h1>
            <p style={{ color: "#737373", fontSize: 15, marginTop: 10 }}>Authentication required to access MycelX core.</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 16, padding: "14px 20px", color: "#fff", fontSize: 15, transition: "border .2s" }}
                placeholder="Admin Email"
                required
              />
            </div>
            <div>
              <input 
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 16, padding: "14px 20px", color: "#fff", fontSize: 15, transition: "border .2s" }}
                placeholder="Access Key"
                required
              />
            </div>
            {error && <div style={{ color: orange, fontSize: 14, textAlign: "center", background: `${orange}11`, padding: "10px", borderRadius: 12 }}>{error}</div>}
            <button type="submit" style={{ width: "100%", background: orange, color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", marginTop: 10, transition: "transform .2s" }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "var(--font-inter)", padding: "40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
             <div style={{ width: 44, height: 44, borderRadius: 12, background: orange, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800 }}>M</div>
             <div>
                <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.04em" }}>MycelX Command</h1>
                <p style={{ color: "#737373", fontSize: 14 }}>Real-time ecosystem intelligence.</p>
             </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "#111", border: "1px solid #222", color: "#737373", borderRadius: 14, padding: "10px 18px", fontSize: 14, cursor: "pointer", fontWeight: 600 }}
          >
            <LogOut size={16} /> Sign out
          </button>
        </header>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 48 }}>
          {[
            { label: "Total Signups", value: analytics.total, icon: <Users size={20} color={orange} />, trend: "+12%" },
            { label: "Last 24 Hours", value: analytics.last24h, icon: <TrendingUp size={20} color={orange} />, trend: "Active" },
            { label: "Network Health", value: "Optimal", icon: <Activity size={20} color={orange} />, trend: "100%" },
            { label: "Security", value: "Verified", icon: <ShieldCheck size={20} color={orange} />, trend: "AES-256" }
          ].map((stat, i) => (
            <div key={i} style={{ padding: 28, background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ padding: 10, background: `${orange}11`, borderRadius: 12 }}>{stat.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", background: "#22c55e11", padding: "4px 10px", borderRadius: 100 }}>{stat.trend}</span>
              </div>
              <p style={{ color: "#737373", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{stat.label}</p>
              <h3 style={{ fontSize: 32, fontWeight: 800 }}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Chart and Table Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32 }}>
          
          {/* Signups Flow Chart (Custom SVG) */}
          <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 32, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <BarChart3 size={20} color={orange} />
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Signup Velocity</h3>
              </div>
              <p style={{ fontSize: 13, color: "#737373" }}>Last 7 Days</p>
            </div>
            
            <div style={{ height: 240, display: "flex", alignItems: "flex-end", gap: 16, padding: "0 10px" }}>
              {analytics.daily.map((day, i) => {
                const max = Math.max(...analytics.daily.map(d => d.count), 1);
                const height = (day.count / max) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <div style={{ position: "relative", width: "100%", height: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                      <div style={{ 
                        width: "100%", 
                        height: `${height}%`, 
                        background: `linear-gradient(180deg, ${orange} 0%, ${orange}22 100%)`, 
                        borderRadius: "12px 12px 4px 4px",
                        transition: "height .6s cubic-bezier(.16,1,.3,1)"
                      }} />
                      {day.count > 0 && <span style={{ position: "absolute", top: -25, fontSize: 12, fontWeight: 700, color: orange }}>{day.count}</span>}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#525252", textTransform: "uppercase" }}>{day.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Records */}
          <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 32, padding: 32, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <Mail size={20} color={orange} />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Live Feed</h3>
            </div>
            
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {list.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: "#525252" }}>Monitoring for incoming data...</div>
              ) : (
                list.slice(-6).reverse().map((item, i) => (
                  <div key={i} style={{ padding: 16, background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{item.email.split('@')[0]}***</p>
                      <p style={{ fontSize: 12, color: "#525252" }}>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e66" }} />
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Full Table */}
        <div style={{ marginTop: 32, background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 32, overflow: "hidden" }}>
          <div style={{ padding: "24px 32px", borderBottom: "1px solid #1a1a1a" }}>
             <h3 style={{ fontSize: 18, fontWeight: 700 }}>Master Ledger</h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#0d0d0d", color: "#525252", fontSize: 12, textTransform: "uppercase", letterSpacing: ".05em" }}>
                  <th style={{ padding: "20px 32px", fontWeight: 700 }}>Entity</th>
                  <th style={{ padding: "20px 32px", fontWeight: 700 }}>Timestamp</th>
                  <th style={{ padding: "20px 32px", fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #111" }}>
                    <td style={{ padding: "20px 32px", fontSize: 14, fontWeight: 500 }}>{item.email}</td>
                    <td style={{ padding: "20px 32px", fontSize: 13, color: "#737373" }}>{new Date(item.timestamp).toLocaleString()}</td>
                    <td style={{ padding: "20px 32px" }}>
                       <span style={{ fontSize: 11, fontWeight: 700, background: `${orange}11`, color: orange, padding: "4px 10px", borderRadius: 100, textTransform: "uppercase" }}>Waitlisted</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
