'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Card, Title, Text } from '@tremor/react'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <Title>Connected Store</Title>
            <Text>Your Shopify store status and details</Text>
          </Card>
          
          <Card>
            <Title>Active Integrations</Title>
            <Text>View and manage your connected services</Text>
          </Card>
          
          <Card>
            <Title>Quick Actions</Title>
            <Text>Common tasks and shortcuts</Text>
          </Card>
        </div>

        <Card>
          <Title>Available Integrations</Title>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Integration cards will go here */}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}