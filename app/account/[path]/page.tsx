import { AccountView } from "@daveyplate/better-auth-ui"
import { accountViewPaths } from "@daveyplate/better-auth-ui/server"
import Link from "next/link"
import { redirect } from "next/navigation"


export const dynamicParams = false

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }))
}

export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params

  return (
    <main className="flex min-h-screen w-full bg-[#080807]">

      {/* ── LEFT SIDEBAR ── */}
      <aside className="relative hidden lg:flex lg:w-64 xl:w-72 flex-col justify-between overflow-hidden bg-[#080807] border-r border-[#1a1800] p-8 shrink-0">

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
          className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(240,192,0,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 24,
              letterSpacing: "0.12em",
              color: "#f0c000",
            }}
           
          >
            <Link href="/dashboard">OMNIBOT</Link>
           
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "#3a3820",
              marginTop: 4,
            }}
          >
            ACCOUNT SETTINGS
          </div>
        </div>

        {/* Nav links */}
        <nav className="relative z-10 flex flex-col gap-1">
          {[
            { label: "Profile", icon: "◈", active: path === "settings" },
            { label: "Security", icon: "◉", active: path === "security" },
           
          ].map(({ label, icon, active }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.08em",
                color: active ? "#f0c000" : "#4a4530",
                borderLeft: active ? "2px solid #f0c000" : "2px solid transparent",
                background: active ? "rgba(240,192,0,0.05)" : "transparent",
                transition: "color 0.2s, background 0.2s",
                cursor: "default",
              }}
            >
              <span style={{ fontSize: 14 }}>{icon}</span>
              {label.toUpperCase()}
            </div>
          ))}
        </nav>

        {/* Bottom stats */}
        <div className="relative z-10 flex flex-col gap-4 border-t border-[#1a1800] pt-6">
          {[["2,400+", "Beta Users"], ["8.4hrs", "Saved / Week"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#f0c000", letterSpacing: "0.04em" }}>{n}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3820", letterSpacing: "0.1em" }}>{l}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 flex-col min-h-screen">

        {/* Top bar */}
        <header
          className="flex items-center justify-between px-8 py-5 border-b border-[#1a1800] bg-[#0a0900]"
          style={{ backdropFilter: "blur(12px)" }}
        >
          {/* Mobile logo */}
          <div
            className="lg:hidden"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              letterSpacing: "0.12em",
              color: "#f0c000",
            }}
          >
            OMNIBOT
          </div>

          {/* Page title */}
          <div
            className="hidden lg:block"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "#3a3820",
            }}
          >
            /{path.toUpperCase()}
          </div>

          {/* Right badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.12em",
              color: "#3a3820",
              border: "1px solid #1a1800",
              padding: "6px 12px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#f0c000",
                display: "inline-block",
                boxShadow: "0 0 6px rgba(240,192,0,0.5)",
              }}
            />
            ACTIVE SESSION
          </div>
        </header>

        {/* AccountView */}
        <div className="flex flex-1 flex-col items-center justify-start p-6 md:p-10 bg-[#0a0900]">
          <div className="w-full max-w-2xl">
            <AccountView path={path} />
          </div>
        </div>

        {/* Footer */}
        <footer
          className="px-8 py-4 border-t border-[#1a1800] bg-[#080807]"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#3a3820",
            letterSpacing: "0.1em",
          }}
        >
          SECURED BY <span style={{ color: "#f0c000" }}>BETTER-AUTH.</span>
        </footer>
      </div>
    </main>
  )
}