import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CalendarIcon, MailIcon } from 'lucide-react'
import React from 'react'

const SettingsPage = () => {
    const providers = [
        {
            key: "gmail",
            name: "Gamil",
            description: "Read and Manage your inbox",
            icon: MailIcon,
        },
        {
            key: "calendar",
            name: "Calendar",
            description: "Manage your schedules and never miss important events",
            icon: CalendarIcon
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
                            
                         </div>
                    </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  )
}

export default SettingsPage