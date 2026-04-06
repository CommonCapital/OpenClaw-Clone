import React from 'react'
import { Monitoring } from './components/Monitoring'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getAgentRuns, getUnreadEmails, getUser } from '@/app/db/queries';

export default async function MonitoringPage() {
   const session = await auth.api.getSession({
                   headers: await headers(),
                 });
    
   
     const userId = session?.user.id;
     const User = await getUser(userId!)

      const {emailsProcessed, draftsCreated, tasksCreated} = await getUnreadEmails(userId!)
      const runs = await getAgentRuns(userId!)
      const processedEmails = [];
      for (const run of runs) {
        const log = run.actionLog ?? [];
        for (const entry of log) {
            if (entry.emailId ) {
                processedEmails.push({
                    ...entry,
                    processedAt: run.startedAt,
                })
            }
        }
      }
      const highPriority = processedEmails.filter((email) => email.priority === 'high').length;
      const totalTasks = processedEmails.reduce((acc, email) => acc + (email.taskCreated ?? 0), 0);


   
      const totalProcessed = processedEmails.length;

      

  return (
    <Monitoring processedEmails={processedEmails} highPriority={highPriority} totalProcessed={totalProcessed} draftsCreated={draftsCreated} totalTasks={totalTasks} />
  )
}
