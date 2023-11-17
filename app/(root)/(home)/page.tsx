import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Home () {
  return (
    <div>
      Homepage
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}

export default Home
