import Question from '@/components/forms/Question'
import { getQuestionById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

async function EditQuestionPage({ params }: Props) {
  const { id: questionId } = params
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })
  const { question } = await getQuestionById({ questionId })

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
        <Question
          stringifyQuestion={JSON.stringify(question)}
          mongoUserId={JSON.stringify(mongoUser._id)}
          type='edit'
        />
      </div>
    </div>
  )
}

export default EditQuestionPage
