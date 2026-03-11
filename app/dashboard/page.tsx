'use client'
import React from 'react'
import RunAgentButton from './components/ui/RunAgentButton'

const DashboardPage = () => {
  return (
    <div className='page-wrapper'>
<div>
  <h1 className='page-title'>
    Dashboard
  </h1>
  <p>
    Welcome back! Here's what's hapenning with your AI Agents.
  </p>
  <RunAgentButton />
</div>
    </div>
  )
}

export default DashboardPage