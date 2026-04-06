'use client'

import React from 'react'
import RunAgentButton from './ui/RunAgentButton'
import { Badge } from '@/components/ui/badge'
import {
  ZapIcon, Clock, Activity, Timer, FileText, Mail,
  CheckCircle2, CircleIcon, ChevronRight, Sparkles,
  Inbox, PenLine, ListTodo,
} from 'lucide-react'
import { AgentRun, Integration, User } from '@/app/db/schema'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

interface Props {
  latestRun: AgentRun | null
  userIntegrations: Integration[] | []
  User: User[]
  emailsProcessed: number
  draftsCreated: number
  tasksCreated: number
}

const statusConfig = {
  running: { label: 'Running', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-400 animate-pulse' },
  success: { label: 'Success', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400' },
  failed:  { label: 'Failed',  className: 'bg-red-500/10 text-red-400 border-red-500/20',     dot: 'bg-red-400' },
}

function StatRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-white/[0.04] last:border-0">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
          <Icon className="w-3 h-3" />
        </div>
        {label}
      </div>
      <span className="text-sm font-medium text-foreground/80 font-mono tracking-tight max-w-[55%] text-right truncate">
        {value}
      </span>
    </div>
  )
}

export const Dashboard = ({ latestRun, userIntegrations, User, emailsProcessed, draftsCreated, tasksCreated }: Props) => {
  const status = latestRun?.status
  const badge = status ? statusConfig[status] : null

  const gmailConnected = userIntegrations.find((i) => i.provider === 'gmail')
  const googleCalendarConnected = userIntegrations.find((i) => i.provider === 'google_calendar')

  const onboardingSteps = [
    { name: 'Connect Gmail',           completed: !!gmailConnected,         href: '/settings', icon: Mail  },
    { name: 'Connect Google Calendar', completed: !!googleCalendarConnected, href: '/settings', icon: Clock },
  ]

  const completedCount     = onboardingSteps.filter((s) => s.completed).length
  const progressPercentage = Math.round((completedCount / onboardingSteps.length) * 100)

  const stats = [
    { label: 'Unread Emails',  value: emailsProcessed, icon: Inbox,    color: 'text-sky-400',    bg: 'bg-sky-500/10',    border: 'border-sky-500/15'    },
    { label: 'Drafts Created', value: draftsCreated,    icon: PenLine,  color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/15' },
    { label: 'Tasks Created',  value: tasksCreated,    icon: ListTodo, color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/15'  },
  ]

  return (
    <div className="min-h-screen bg-[#080810] text-foreground">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-5 py-14 space-y-6">

        {/* Header */}
        <div className="pb-4 space-y-0.5">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Control Panel</p>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground/60">Welcome back — here&apos;s what&apos;s happening with your AI agent.</p>
        </div>

        {/* ── Onboarding Card ── */}
        {!User[0]?.onboardingCompleted && (
          <div className="relative rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/[0.07] to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
            <div className="px-5 pt-5 pb-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-md bg-indigo-500/15 border border-indigo-500/20">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <h2 className="text-sm font-semibold">Get Started</h2>
                  </div>
                  <p className="text-xs text-muted-foreground/60 ml-[28px]">Complete setup to activate your AI assistant</p>
                </div>
                <span className="shrink-0 text-xs font-mono text-indigo-400/70 mt-0.5">{completedCount}/{onboardingSteps.length}</span>
              </div>
              <div className="mt-4 mb-4">
                <Progress value={progressPercentage} className="h-1 bg-white/[0.06]" />
              </div>
            </div>
            <div className="px-3 pb-3 space-y-1">
              {onboardingSteps.map((step) => {
                const Icon = step.icon
                return (
                  <Link key={step.name} href={step.href}>
                    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${step.completed ? 'opacity-50 cursor-default' : 'hover:bg-white/[0.04] cursor-pointer group'}`}>
                      {step.completed
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        : <CircleIcon   className="w-4 h-4 text-white/20 shrink-0" />}
                      <div className="flex items-center gap-2 flex-1">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                        <span className={`text-sm ${step.completed ? 'line-through text-muted-foreground/40' : 'text-foreground/80'}`}>{step.name}</span>
                      </div>
                      {!step.completed && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Agent Status Card ── */}
        <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <div className="px-5 pt-5 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/15">
                  <ZapIcon className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Agent Status</h2>
                  <p className="text-[11px] text-muted-foreground/50 mt-0.5">Subscribe to activate autonomous agent</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-[11px] font-mono px-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 inline-block" />
                Ready
              </Badge>
            </div>
          </div>
          <div className="px-5 pt-3 pb-5 space-y-3">
            <div className={`flex items-center justify-between px-3.5 py-3 rounded-xl border transition-colors ${gmailConnected ? 'bg-emerald-500/[0.04] border-emerald-500/15' : 'bg-white/[0.02] border-white/[0.06]'}`}>
              <div className="flex items-center gap-2.5">
                {gmailConnected
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  : <CircleIcon   className="w-4 h-4 text-white/20 shrink-0" />}
                <div>
                  <p className="text-sm font-medium leading-none">Gmail</p>
                  <p className="text-[11px] text-muted-foreground/50 mt-1">{gmailConnected ? 'Connected & listening' : 'Not connected'}</p>
                </div>
              </div>
              <Mail className="w-3.5 h-3.5 text-muted-foreground/30" />
            </div>
            <RunAgentButton />
          </div>
        </div>

        {/* ── Last Run Card ── */}
        <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          <div className="px-5 pt-5 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/15">
                  <Activity className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Last Agent Run</h2>
                  <p className="text-[11px] text-muted-foreground/50 mt-0.5">{latestRun ? 'Most recent activity' : 'No runs yet'}</p>
                </div>
              </div>
              {badge && (
                <Badge className={`${badge.className} border text-[11px] font-mono px-2.5`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${badge.dot}`} />
                  {badge.label}
                </Badge>
              )}
            </div>
          </div>
          <div className="px-5 pt-3 pb-5">
            {latestRun ? (
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] px-4 divide-y divide-white/[0.04]">
                <StatRow icon={Clock}    label="Started"  value={new Date(latestRun.startedAt).toLocaleString()} />
                <StatRow icon={Timer}    label="Duration" value={latestRun.durationMs ? `${latestRun.durationMs}ms` : '—'} />
                <StatRow icon={FileText} label="Summary"  value={latestRun.summary ?? '—'} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                <div className="p-3 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  <Activity className="w-5 h-5 text-muted-foreground/20" />
                </div>
                <p className="text-xs text-muted-foreground/40">No runs recorded yet.<br />Trigger the agent to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-3">Overview</p>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden px-4 py-4 flex flex-col gap-3"
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className={`w-fit p-1.5 rounded-lg border ${stat.bg} ${stat.border}`}>
                    <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>

                  <div>
                    <p className={`text-2xl font-semibold font-mono tracking-tight ${stat.value === 0 ? 'text-foreground/25' : 'text-foreground/90'}`}>
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground/50 mt-0.5 leading-tight">{stat.label}</p>
                  </div>

                  {stat.value > 0 && (
                    <span className={`text-[10px] font-mono ${stat.color} opacity-60`}>View all →</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}