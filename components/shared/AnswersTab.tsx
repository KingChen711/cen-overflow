import { getUserAnswers } from '@/lib/actions/user.action'
import React from 'react'
import AnswerCard from '../cards/AnswerCard'

type Props = {
  userId: string
}

async function AnswersTab({ userId }: Props) {
  const { answers } = await getUserAnswers({ userId: JSON.parse(userId) })
  return (
    <>
      {answers.map((answer: any) => {
        return (
          <AnswerCard
            key={answer._id}
            _id={JSON.stringify(answer._id)}
            author={answer.author}
            createdAt={answer.createdAt}
            question={answer.question}
            upvotes={answer.upvotes.length}
          />
        )
      })}
    </>
  )
}

export default AnswersTab
