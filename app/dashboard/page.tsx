
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

import { Dashboard } from './components/Dashboard'
import { getLatestAgentRun, getUnreadEmails, getUser, getUserIntegrations } from '../db/queries';

 const DashboardPage = async () => {
  const session = await auth.api.getSession({
                headers: await headers(),
              });
 

  const userId = session?.user.id;
  const latestRun = await getLatestAgentRun(userId!)
  const userIntegrations = await getUserIntegrations(userId!)
  const User = await getUser(userId!)
  const {emailsProcessed, draftsCreated, tasksCreated} = await getUnreadEmails(userId!)

  return (
   <Dashboard emailsProcessed={emailsProcessed} draftsCreated={draftsCreated} tasksCreated={tasksCreated} User={User} latestRun={latestRun} userIntegrations={userIntegrations}/>
  )
}

export default DashboardPage