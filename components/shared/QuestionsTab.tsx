import React from 'react'
import QuestionCard from '../cards/QuestionCard'
import { getUserQuestions } from '@/lib/actions/user.action'
import Pagination from './Pagination'

type Props = {
  userId: string
  searchParams: {
    page?: number
  }
}

async function QuestionsTab({ userId, searchParams }: Props) {
  const { questions, pageCount } = await getUserQuestions({
    userId: JSON.parse(userId),
    page: searchParams.page ? +searchParams.page : 1
  })
  return (
    <>
      {questions.map((question) => {
        return <QuestionCard key={question._id} question={question as any} />
      })}

      {questions.length > 0 && (
        <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} totalPages={pageCount} className='mt-10' />
      )}
    </>
  )
}

export default QuestionsTab
