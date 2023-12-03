import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { getQuestionsByTagIdParams } from '@/lib/actions/tag.actions'
import React from 'react'

type Props = {
  params: {
    id: string
  }
  searchParams: {
    q?: string
    page?: number
  }
}

async function TagDetailPage({ params, searchParams }: Props) {
  const { id: tagId } = params
  const { tag, questions, pageCount } = await getQuestionsByTagIdParams({
    tagId,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1
  })

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>{tag.name}</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route={`/tags/${tagId}`}
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search tag questions...'
          className='flex-1'
        />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.length > 0 ? (
          questions.map((question) => {
            return <QuestionCard key={question._id} question={question as any} />
          })
        ) : (
          <NoResult
            title='No Questions Found for the tag'
            description='😔 Oops! It seems there are no questions related to [Tag Name] at the moment. Dont let that discourage you! Be the first to start a discussion about this tag by asking a question. 🚀'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>

      {questions.length > 0 && (
        <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} totalPages={pageCount} className='mt-10' />
      )}
    </>
  )
}

export default TagDetailPage
