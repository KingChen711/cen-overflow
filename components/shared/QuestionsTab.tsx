import React from 'react'
import QuestionCard from '../cards/QuestionCard'
import { getUserQuestions } from '@/lib/actions/user.action'

type Props = {
  userId: string
}

async function QuestionsTab({ userId }: Props) {
  const { questions } = await getUserQuestions({ userId: JSON.parse(userId) })
  return (
    <>
      {questions.map((question) => {
        return <QuestionCard key={question._id} question={question as any} />
      })}
    </>
  )
}

export default QuestionsTab
