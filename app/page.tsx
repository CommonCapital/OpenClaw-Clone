'use client'
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const Y = "#f0c000";
const features = [
  {
    icon: "✉",
    title: "Inbox Zero, Always",
    desc: "Reads, sorts, and clears your inbox. Drafts replies in your voice. Unsubscribes from noise. Your inbox stays empty so your mind can too.",
  },
  {
    icon: "📨",
    title: "Sends Emails For You",
    desc: "Tell it who to write to and why. It composes, formats, and fires. Follow-ups, cold outreach, responses — all handled without you touching a keyboard.",
  },
  {
    icon: "💬",
    title: "Talks In Your Messengers",
    desc: "Slack, Telegram, WhatsApp — it converses as you. Answers questions, coordinates teams, sends updates. People think they're talking to you.",
  },
  {
    icon: "📅",
    title: "Owns Your Calendar",
    desc: "Schedules meetings, reschedules conflicts, declines the pointless ones. It negotiates times with other people's assistants so you never play scheduling tag.",
  },
  {
    icon: "📁",
    title: "Manages Your Files",
    desc: "Organizes, names, and archives documents. Finds what you need in seconds. Prepares decks and summaries before you even ask.",
  },
  {
    icon: "🔔",
    title: "Monitors & Alerts",
    desc: "Watches for what matters — keywords, replies, deadlines. Briefs you each morning. Interrupts only when something actually needs you.",
  },
];

const integrations = [
  "Gmail", "Outlook", "Slack", "Telegram", "WhatsApp",
  "Google Calendar", "Notion", "Linear", "GitHub", "Drive",
  "Jira", "HubSpot", "Zoom", "Discord", "Salesforce",
];

const steps = [
  { n: "01", title: "Connect your tools", desc: "Link your email, calendar, and messengers in under 2 minutes." },
  { n: "02", title: "Give it a task", desc: "Type naturally. 'Clear my inbox' or 'Schedule a call with John next week.'" },
  { n: "03", title: "Watch it work", desc: "OpenClaw executes in real time. You approve, delegate, or just watch." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }: any) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Ticker() {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid #2a2500", borderBottom: "1px solid #2a2500", padding: "10px 0", background: "#0c0b00" }}>
      <div style={{
        display: "flex", gap: 48, whiteSpace: "nowrap",
        animation: "ticker 28s linear infinite",
      }}>
        {[...integrations, ...integrations].map((t, i) => (
          <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#6a6040", letterSpacing: "0.08em" }}>
            <span style={{ color: Y, marginRight: 8 }}>✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "claw", text: "Good morning. You have 47 unread emails, 3 missed Slack threads, and a scheduling conflict on Thursday. Want me to handle it?" },
  ]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const router = useRouter();

  const replies = [
    "On it. Archiving newsletters, drafting replies to the 6 flagged threads, and unsubscribing from 12 senders. Done in ~40 seconds.",
    "Thursday conflict resolved. Moved your 2pm to Friday 10am. John and Sarah have both confirmed.",
    "Draft ready. Subject: 'Q4 Partnership Proposal — [Your Company]'. Want me to send or review first?",
    "Found 3 open invoices from October. Total: $14,200. Want me to send reminders to all three?",
  ];
  const [replyIdx, setReplyIdx] = useState(0);

  const send = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatInput("");
    setMessages(m => [...m, { from: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: "claw", text: replies[replyIdx % replies.length] }]);
      setReplyIdx(i => i + 1);
    }, 1400);
  };


  return (
    <div style={{ background: "#080807", minHeight: "100vh", color: "#f0ead0", fontFamily: "'Syne', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes pulse-yellow { 0%,100% { box-shadow: 0 0 0 0 rgba(240,192,0,0.25) } 50% { box-shadow: 0 0 0 10px rgba(240,192,0,0) } }
        ::selection { background: #f0c000; color: #080807; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0d0c00; } ::-webkit-scrollbar-thumb { background: #2a2500; }
        input:focus { outline: none; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: "1px solid #1c1a00", position: "sticky", top: 0, background: "rgba(8,8,7,0.92)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, letterSpacing: "0.12em", color: Y }}>
          OPENCLAW
        </div>
        <div style={{ display: "flex", gap: 36, fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6a6040", letterSpacing: "0.08em" }}>
          {["Features", "Integrations", "Pricing", "Docs"].map(l => (
            <span key={l} style={{ cursor: "pointer", transition: "color 0.2s" }}
          >{l}</span>
          ))}
        </div>
        <button style={{ background: Y, color: "#080807", border: "none", padding: "10px 24px", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.04em", transition: "opacity 0.2s" }}
          onClick={(e) => router.push("/dashboard")}
          >
          Get Early Access
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: "100px 48px 80px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: Y, letterSpacing: "0.18em", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: Y, animation: "pulse-yellow 2s infinite" }}/>
            AI EXECUTIVE ASSISTANT — NOW IN BETA
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(56px, 7vw, 92px)", lineHeight: 0.95, letterSpacing: "0.02em", marginBottom: 28 }}>
            <span style={{ color: "#f0ead0" }}>THE AI WITH</span><br/>
            <span style={{ color: Y }}>HANDS</span><br/>
            <span style={{ color: "#f0ead0" }}>THAT ACTUALLY</span><br/>
            <span style={{ WebkitTextStroke: `1.5px ${Y}`, color: "transparent" }}>DO THINGS.</span>
          </h1>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, lineHeight: 1.8, color: "#8a8060", maxWidth: 420, marginBottom: 40 }}>
            Your autonomous executive assistant. Clears your inbox, sends emails, chats in your messengers, manages your calendar — all from a single loyal chat interface.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button style={{ background: Y, color: "#080807", border: "none", padding: "16px 36px", fontFamily: "'Syne'", fontWeight: 800, fontSize: 14, cursor: "pointer", letterSpacing: "0.04em", transition: "transform 0.15s, opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              
              onClick={(e) => router.push("/dashboard")}
              >
                
              Start Free →
            </button>
            <button style={{ background: "transparent", color: "#8a8060", border: "1px solid #2a2500", padding: "16px 36px", fontFamily: "'DM Mono', monospace", fontSize: 12, cursor: "pointer", letterSpacing: "0.08em", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = Y; e.currentTarget.style.color = Y; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2500"; e.currentTarget.style.color = "#8a8060"; }}>
              Watch Demo
            </button>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 36 }}>
            {[["2,400+", "Beta Users"], ["99.2%", "Task Success"], ["8.4hrs", "Saved / Week"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: Y, letterSpacing: "0.04em" }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#5a5535", letterSpacing: "0.1em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT DEMO */}
        <div style={{ border: "1px solid #2a2500", background: "#0c0b00", display: "flex", flexDirection: "column", height: 460 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #1e1c00", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: Y, letterSpacing: "0.1em" }}>OMNIBOT</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3820", marginLeft: "auto", letterSpacing: "0.08em" }}>● ONLINE</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%",
                  background: m.from === "user" ? Y : "#141200",
                  color: m.from === "user" ? "#080807" : "#c8c09a",
                  padding: "10px 14px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  lineHeight: 1.6,
                  border: m.from === "claw" ? "1px solid #2a2500" : "none",
                }}>
                  {m.from === "claw" && <div style={{ fontFamily: "'Bebas Neue'", fontSize: 11, color: Y, letterSpacing: "0.1em", marginBottom: 4 }}>CLAW</div>}
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 5, padding: "10px 14px", background: "#141200", border: "1px solid #2a2500", width: "fit-content" }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: Y, display: "inline-block", animation: `blink 1s ${d}s infinite` }}/>
                ))}
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
          <div style={{ borderTop: "1px solid #1e1c00", display: "flex" }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Give Claw a task..."
              style={{ flex: 1, background: "transparent", border: "none", padding: "14px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#c8c09a", caretColor: Y }}
            />
            <button onClick={send} style={{ background: Y, border: "none", padding: "0 20px", cursor: "pointer", fontFamily: "'Bebas Neue'", fontSize: 14, letterSpacing: "0.1em", color: "#080807" }}>
              SEND
            </button>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <Ticker/>

      {/* FEATURES */}
      <section style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: Y, letterSpacing: "0.18em", marginBottom: 16 }}>— CAPABILITIES</div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 5vw, 68px)", letterSpacing: "0.03em", marginBottom: 64 }}>
            IT DOESN'T JUST<br/>
            <span style={{ color: Y }}>SUGGEST. IT EXECUTES.</span>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 1, background: "#1a1800" }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div style={{ background: "#080807", padding: "36px 32px", transition: "background 0.2s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.background = "#0e0d00"}
                onMouseLeave={e => e.currentTarget.style.background = "#080807"}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: 16, marginBottom: 12, color: "#f0ead0" }}>{f.title}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6a6040", lineHeight: 1.8 }}>{f.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 48px", borderTop: "1px solid #1a1800", borderBottom: "1px solid #1a1800", background: "#0a0900" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: Y, letterSpacing: "0.18em", marginBottom: 16 }}>— HOW IT WORKS</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 5vw, 68px)", letterSpacing: "0.03em", marginBottom: 64 }}>
              THREE STEPS TO<br/><span style={{ color: Y }}>FULL DELEGATION.</span>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.12}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 72, color: "#1e1c00", lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
                  <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: 18, marginBottom: 12, color: Y }}>{s.title}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6a6040", lineHeight: 1.8 }}>{s.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE QUOTE */}
      <section style={{ padding: "80px 48px", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.3, color: "#2a2600", maxWidth: 900, margin: "0 auto" }}>
            "STOP MANAGING TOOLS.{" "}
            <span style={{ color: "#f0ead0" }}>START GIVING ORDERS.</span>{" "}
            OPENCLAW HANDLES THE REST SO YOU CAN FOCUS ON{" "}
            <span style={{ color: Y }}>WHAT ONLY YOU CAN DO.</span>"
          </p>
        </FadeIn>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ padding: "80px 48px", background: "#0a0900", borderTop: "1px solid #1a1800" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: Y, letterSpacing: "0.18em", marginBottom: 16 }}>— INTEGRATIONS</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 5vw, 68px)", letterSpacing: "0.03em", marginBottom: 48 }}>
              PLUGS INTO<br/><span style={{ color: Y }}>EVERYTHING YOU USE.</span>
            </h2>
          </FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {integrations.map((t, i) => (
              <FadeIn key={t} delay={i * 0.03}>
                <div style={{ border: "1px solid #2a2500", padding: "10px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6a6040", letterSpacing: "0.08em", transition: "border-color 0.2s, color 0.2s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = Y; e.currentTarget.style.color = Y; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2500"; e.currentTarget.style.color = "#6a6040"; }}>
                  {t}
                </div>
              </FadeIn>
            ))}
            <div style={{ border: "1px dashed #2a2500", padding: "10px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#3a3820", letterSpacing: "0.08em" }}>
              + more coming
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 48px", textAlign: "center", borderTop: "1px solid #1a1800" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: Y, letterSpacing: "0.18em", marginBottom: 20 }}>— GET STARTED TODAY</div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, marginBottom: 28 }}>
            YOUR EXECUTIVE<br/>
            <span style={{ color: Y }}>ASSISTANT</span><br/>
            <span style={{ WebkitTextStroke: `1.5px #3a3400`, color: "transparent" }}>AWAITS.</span>
          </h2>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#6a6040", marginBottom: 48, maxWidth: 400, margin: "0 auto 48px" }}>
            Join 2,400+ professionals who've stopped doing their own admin work.
          </p>
          <button style={{ background: Y, color: "#080807", border: "none", padding: "20px 56px", fontFamily: "'Syne'", fontWeight: 800, fontSize: 16, cursor: "pointer", letterSpacing: "0.04em", transition: "transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            onClick={(e) => router.push("/dashboard")}>
            Start Free — No Credit Card →
          </button>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid #1a1800", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: "#2a2500", letterSpacing: "0.12em" }}>OMNIBOT</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#3a3820", letterSpacing: "0.08em" }}>
          © 2025 OPENCLAW. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}