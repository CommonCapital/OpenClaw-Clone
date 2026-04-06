"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useState } from "react";

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/monitoring",
    label: "Monitoring",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polyline points="1,11 4,7 7,9 10,4 13,6 15,3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
        <circle cx="15" cy="3" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside
      className="relative hidden lg:flex flex-col justify-between h-screen w-60 xl:w-64 shrink-0 overflow-hidden border-r border-[#1a1800] bg-[#080807]"
      style={{ position: "sticky", top: 0 }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,192,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(240,192,0,0.07) 0%, transparent 70%)" }}
      />

      {/* TOP — Logo */}
      <div className="relative z-10">
        <div className="px-6 py-6 border-b border-[#1a1800]">
          <Link href="/dashboard" className="block no-underline">
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26,
                letterSpacing: "0.12em",
                color: "#f0c000",
                lineHeight: 1,
              }}
            >
              OMNIBOT
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.16em",
                color: "#3a3820",
                marginTop: 3,
              }}
            >
              EXECUTIVE ASSISTANT
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 pt-5">
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "#2e2c18",
              padding: "0 10px",
              marginBottom: 6,
            }}
          >
            NAVIGATION
          </div>
          {navLinks.map(({ href, label, icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className="no-underline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: active ? "#f0c000" : "#4a4530",
                  borderLeft: active ? "2px solid #f0c000" : "2px solid transparent",
                  background: active ? "rgba(240,192,0,0.05)" : "transparent",
                  transition: "color 0.2s, background 0.2s, border-color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#8a7a40";
                    e.currentTarget.style.background = "rgba(240,192,0,0.02)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#4a4530";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span style={{ opacity: active ? 1 : 0.5 }}>{icon}</span>
                {label.toUpperCase()}
                {active && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#f0c000",
                      boxShadow: "0 0 6px rgba(240,192,0,0.6)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM — User button */}
      <div className="relative z-10 border-t border-[#1a1800] px-4 py-5">
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "#2e2c18",
            marginBottom: 10,
            paddingLeft: 2,
          }}
        >
          ACCOUNT
        </div>
        <UserButton />
      </div>
    </aside>
  );
}