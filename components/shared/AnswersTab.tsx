import { getUserAnswers } from '@/lib/actions/user.action'
import React from 'react'
import AnswerCard from '../cards/AnswerCard'
import Pagination from './Pagination'

type Props = {
  userId: string
  searchParams: {
    page?: number
  }
}

async function AnswersTab({ userId, searchParams }: Props) {
  const { answers, pageCount } = await getUserAnswers({
    userId: JSON.parse(userId),
    page: searchParams.page ? +searchParams.page : 1
  })
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
            upVotes={answer.upVotes.length}
          />
        )
      })}

      {answers.length > 0 && (
        <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} totalPages={pageCount} className='mt-10' />
      )}
    </>
  )
}

export default AnswersTab
