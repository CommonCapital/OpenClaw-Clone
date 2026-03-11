import { getUserIntegrations } from '@/app/db/queries'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { Calendar, CalendarIcon, MailIcon } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const  SettingsPage = async () => {
    const session = await auth.api.getSession({
                              headers: await headers(),
                            });
    if (!session) {
                  redirect("/auth/sign-in");
                }         
    const user = session?.user;
    const userIntegrations = await getUserIntegrations(user.id)
    const gmailIntegration = userIntegrations.find(
        (integration) => integration.provider === "gmail", 
    )
    const gooogleCalendarIntegration = userIntegrations.find(
        (integration) => integration.provider === "google_calendar",
    );
    const providers = [
        {
            key: "gmail",
            name: "Gamil",
            description: "Read and Manage your inbox",
            icon: MailIcon,
            integration: gmailIntegration,
        },
        {
            key: "google_calendar",
            name: "Calendar",
            description: "Manage your schedules and never miss important events",
            icon: CalendarIcon,
            integration: gooogleCalendarIntegration,
        },

    ]
  return (
    <div className='page-wrapper'>
        <div>
        <h1 className='page-title'>Settings</h1>
        <p className='page-description'>
              Manage your integrations and preferences.
        </p>
        </div>
        <Card>
            <CardHeader>
                    <CardTitle>Google Integrations</CardTitle>
                    <CardDescription>
                        Connect your Google accounts to enable AI assistance
                    </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {providers.map((provider) => (
                    <div key={provider.key}
                    className='integration-row'
                    >
                    <div className='integration-info'>
                         <provider.icon className='integration-icon' />
                         <div>
                            <p className="font-medium text-foreground">
                                {provider.name}
                            </p>
                            <p className="status-label">
                                {provider.description}
                            </p>
                         </div>
                    </div>
                    {provider.integration ? (
                          <div className='integration-actions'>
                            <Badge 
                            className='bg-primary'
                            >
                                Connected
                            </Badge>
                          {/** <DisconnectButton provider={provider.key} />  */}  
                          </div>
                    ):(
                            <Button asChild>
                                <a href={`/api/auth/google?provider=${provider.key}`}>
                                
                                Connect</a>
                            </Button>
                    )}
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  )
}

export default SettingsPage