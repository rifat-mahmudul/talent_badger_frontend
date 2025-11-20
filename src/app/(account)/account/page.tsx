import React from 'react'
import ClientDashboardHeader from './_components/client-dashboard-header'
import ActiveProjects from './_components/active-projects'
import UpcomingDeadlines from './_components/upcoming-deadlines'

const ClientDashboardPage = () => {
  return (
    <div>
      <ClientDashboardHeader/>
      <ActiveProjects/>
      <UpcomingDeadlines/>
    </div>
  )
}

export default ClientDashboardPage
