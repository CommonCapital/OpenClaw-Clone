import { AuthView } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"

export const dynamicParams = false

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }))
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params

  return (
    <main className="flex min-h-screen w-full">
      {/* ── LEFT PANEL ── */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-[#080807] p-12 border-r border-[#1a1800]">

        {/* Grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,192,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(240,192,0,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          className="relative z-10"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.12em", color: "#f0c000" }}
        >
          OMNIBOT
        </div>

        {/* Center copy */}
        <div className="relative z-10 flex flex-col gap-6">
          <p
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#f0c000" }}
          >
            — YOUR EXECUTIVE ASSISTANT
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(42px, 4vw, 64px)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              color: "#f0ead0",
            }}
          >
            THE AI WITH<br />
            <span style={{ color: "#f0c000" }}>HANDS</span> THAT<br />
            ACTUALLY DO<br />
            <span
              style={{
                WebkitTextStroke: "1.5px #f0c000",
                color: "transparent",
              }}
            >
              THINGS.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              lineHeight: 1.8,
              color: "#6a6040",
              maxWidth: 360,
            }}
          >
            Clears your inbox, sends emails, chats in your messengers,
            manages your calendar — all from one loyal chat interface.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {["Inbox Zero", "Email Drafts", "Calendar", "Slack & Telegram", "File Manager"].map((f) => (
              <span
                key={f}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "#6a6040",
                  border: "1px solid #2a2500",
                  padding: "5px 12px",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stat row */}
        <div className="relative z-10 flex gap-10 border-t border-[#1a1800] pt-8">
          {[["2,400+", "Beta Users"], ["99.2%", "Task Success"], ["8.4hrs", "Saved / Week"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#f0c000", letterSpacing: "0.04em" }}>{n}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3820", letterSpacing: "0.1em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — AuthView ── */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-[#0a0900] p-6 md:p-12">
        {/* Mobile-only logo */}
        <div
          className="mb-8 lg:hidden"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.12em", color: "#f0c000" }}
        >
          OMNIBOT
        </div>

        <div className="w-full max-w-md">
          <AuthView path={path} />
        </div>

        <p
          className="mt-8"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3820", letterSpacing: "0.1em" }}
        >
          SECURED BY <span style={{ color: "#f0c000" }}>BETTER-AUTH.</span>
        </p>
      </div>
    </main>
  )
}