import Question from '@/components/forms/Question'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

async function AskQuestionPage() {
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  )
}

export default AskQuestionPage
