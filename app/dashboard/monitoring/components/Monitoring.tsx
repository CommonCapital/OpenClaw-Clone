'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertCircleIcon,
  FileTextIcon,
  ListTodoIcon,
  MailIcon,
  ClockIcon,
} from 'lucide-react'
import React from 'react'

interface MonitoringProps {
  highPriority: number
  draftsCreated: number
  totalProcessed: number
  totalTasks: number
  processedEmails: any[]
}

const stats = (totalProcessed: number, highPriority: number, draftsCreated: number, totalTasks: number) => [
  { label: 'Processed',     value: totalProcessed, icon: MailIcon,          color: 'text-blue-400',   bg: 'bg-blue-400/10'   },
  { label: 'High Priority', value: highPriority,   icon: AlertCircleIcon,   color: 'text-rose-400',   bg: 'bg-rose-400/10'   },
  { label: 'Drafts Created',value: draftsCreated,  icon: FileTextIcon,      color: 'text-amber-400',  bg: 'bg-amber-400/10'  },
  { label: 'Tasks Created', value: totalTasks,     icon: ListTodoIcon,      color: 'text-emerald-400',bg: 'bg-emerald-400/10'},
]

export const Monitoring = ({
  highPriority,
  totalProcessed,
  draftsCreated,
  totalTasks,
  processedEmails,
}: MonitoringProps) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Monitoring</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Emails processed by your AI agent with AI's analysis.
          </p>
        </div>
        <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10 gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Agent active
        </Badge>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats(totalProcessed, highPriority, draftsCreated, totalTasks).map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                {label}
              </CardTitle>
              <div className={`p-1.5 rounded-md ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Email List */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Processed Emails
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {processedEmails?.length > 0 ? (
            <ul className="divide-y divide-zinc-800">
              {processedEmails.map((email) => (
                <li
                  key={email.id}
                  className="flex items-start justify-between px-6 py-4 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 p-1.5 rounded-md bg-zinc-800">
                      <MailIcon className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{email.subject}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{email.sender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    {email.priority === 'high' && (
                      <Badge className="bg-rose-400/10 text-rose-400 border-rose-400/20 text-[10px]">
                        High
                      </Badge>
                    )}
                    {email.receivedAt && (
                      <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                        <ClockIcon className="h-3 w-3" />
                        {new Date(email.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-600">
              <MailIcon className="h-8 w-8 mb-3" />
              <p className="text-sm">No emails processed yet</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}