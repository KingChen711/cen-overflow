import Profile from '@/components/forms/Profile'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

async function EditProfilePage() {
  const { userId } = auth()
  if (!userId) return null
  const user = await getUserById({ userId })

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Edit Profile</h1>
      <div className='mt-9'>
        <Profile stringifyUser={JSON.stringify(user)} />
      </div>
    </div>
  )
}

export default EditProfilePage
