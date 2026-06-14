'use client'

import { useState, useEffect } from "react";
import { getWaitingList } from "../actions";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "omenaid44420@gmail.com";
  const ADMIN_PASSWORD = "12345";

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials. Access denied.");
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

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)" }}>
        <div style={{ width: "100%", maxWidth: 400, padding: 40, border: "1px solid #171717", borderRadius: 24, background: "#0a0a0a" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#fff", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, margin: "0 auto 16px" }}>M</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.04em" }}>Admin Access</h1>
            <p style={{ color: "#737373", fontSize: 14, marginTop: 8 }}>Only authorized builders beyond this point.</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#737373", textTransform: "uppercase", letterSpacing: ".05em", display: "block", marginBottom: 8 }}>Email</label>
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", background: "#171717", border: "1px solid #262626", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 15 }}
                placeholder="admin@mycelx.com"
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#737373", textTransform: "uppercase", letterSpacing: ".05em", display: "block", marginBottom: 8 }}>Password</label>
              <input 
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                style={{ width: "100%", background: "#171717", border: "1px solid #262626", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 15 }}
                placeholder="••••••••"
              />
            </div>
            {error && <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center" }}>{error}</p>}
            <button type="submit" style={{ width: "100%", background: "#fff", color: "#000", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8 }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "var(--font-inter)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 64 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-.04em" }}>Dashboard</h1>
            <p style={{ color: "#737373", marginTop: 4 }}>Tracking the MycelX movement.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#737373" }}>SIGNED UP</p>
              <p style={{ fontSize: 24, fontWeight: 700 }}>{list.length}</p>
            </div>
          </div>
        </header>

        <div style={{ background: "#0a0a0a", border: "1px solid #171717", borderRadius: 24, overflow: "hidden" }}>
          <div style={{ padding: "24px 32px", borderBottom: "1px solid #171717", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>Waiting List</h2>
            <button 
              onClick={() => setIsLoggedIn(false)}
              style={{ background: "transparent", border: "1px solid #262626", color: "#737373", borderRadius: 10, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}
            >
              Sign out
            </button>
          </div>
          
          {loading ? (
            <div style={{ padding: 64, textAlign: "center", color: "#737373" }}>Loading records...</div>
          ) : list.length === 0 ? (
            <div style={{ padding: 64, textAlign: "center", color: "#737373" }}>No one has joined yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#0f0f0f", color: "#737373", fontSize: 12, textTransform: "uppercase", letterSpacing: ".05em" }}>
                    <th style={{ padding: "16px 32px", fontWeight: 600 }}>Email Address</th>
                    <th style={{ padding: "16px 32px", fontWeight: 600 }}>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #171717" }}>
                      <td style={{ padding: "16px 32px", fontSize: 15 }}>{item.email}</td>
                      <td style={{ padding: "16px 32px", fontSize: 14, color: "#737373" }}>
                        {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
