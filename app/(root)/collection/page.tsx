import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/question.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

type Props = {
  searchParams: {
    q?: string
    filter?: string
    page?: number
  }
}

async function CollectionPage({ searchParams }: Props) {
  const { userId: clerkId } = auth()

  if (!clerkId) return null

  const { pageCount, questions } = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1
  })

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Saved Question</h1>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/community'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search amazing minds here...'
          className='flex-1'
        />

        <Filter filters={QuestionFilters} className='min-h-[56px] sm:min-w-[170px]' />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.length > 0 ? (
          questions.map((question: any) => {
            return <QuestionCard key={question._id} question={question} />
          })
        ) : (
          <NoResult
            title='No Saved Questions Found'
            description='It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟'
            link='/'
            linkTitle='Explore Questions'
          />
        )}
      </div>

      {questions.length > 0 && (
        <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} totalPages={pageCount} className='mt-10' />
      )}
    </>
  )
}

export default CollectionPage
