import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/question.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

type Props = {
  searchParams: {
    q?: string
    filter?: string
  }
}

async function CollectionPage({ searchParams }: Props) {
  const { userId: clerkId } = auth()

  if (!clerkId) return null

  const savedQuestions = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams?.q,
    filter: searchParams?.filter
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
        {savedQuestions.length > 0 ? (
          savedQuestions.map((question: any) => {
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
    </>
  )
}

export default CollectionPage
