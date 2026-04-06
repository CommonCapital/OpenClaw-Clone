'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircleIcon, FileTextIcon, ListTodoIcon, MailIcon } from 'lucide-react'
import React from 'react'
interface MonitoringProps {
    highPriority: number
  draftsCreated: number
  totalProcessed: number
  totalTasks: number
  processedEmails: any[]
}
export const Monitoring = ({ highPriority, totalProcessed, draftsCreated, totalTasks, processedEmails }: MonitoringProps) => {
  return (
    <div className="">
     <div>
        <h1 className=''>
            Monitoring
        </h1>
        <p>Emails processed by your AI agent with AI's analysis.</p>
     </div>
     <div>
        {[
            {
                label: "Processed", value: totalProcessed, icon: MailIcon
            },
            {
                label: "High Priority", value: highPriority, icon: AlertCircleIcon,
            },
            {
                label: "Drafts Created", value: draftsCreated, icon: FileTextIcon,
            },
            {
                label: "Tasks Created", value: totalTasks, icon: ListTodoIcon,
            },
        ].map(({label, value, icon: Icon}) => (
            <Card key={label}>
                <CardHeader>
                    <Icon className="h-6 w-6" />
                    <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{value}</p>
                </CardContent>
            </Card>
        ))}
     </div>
     <div>
        {processedEmails?.map((email) => (
            <div key={email.id}>
                <p>{email.subject}</p>
                <p>{email.sender}</p>
            </div>
        ))}
     </div>
    </div>
  )
}