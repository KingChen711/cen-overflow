import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import Filter from '@/components/shared/Filter'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { HomePageFilters } from '@/constants/filters'
import HomeFilters from '@/components/home/HomeFilters'
import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/shared/NoResult'
import { getQuestions, getRecommendedQuestions } from '@/lib/actions/question.action'
import Pagination from '@/components/shared/Pagination'
import { auth } from '@clerk/nextjs'

type Props = {
  searchParams: {
    q?: string
    filter?: string
    page?: string
  }
}

async function Home({ searchParams }: Props) {
  const { userId: clerkId } = auth()
  const { pageCount, questions } =
    searchParams.filter === 'recommended'
      ? await getRecommendedQuestions({
          clerkId,
          page: searchParams.page ? +searchParams.page : 1,
          searchQuery: searchParams.q
        })
      : await getQuestions({
          searchQuery: searchParams.q,
          filter: searchParams.filter,
          page: searchParams.page ? +searchParams.page : 1
        })

  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>Ask a Question</Button>
        </Link>
      </div>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions...'
          className='flex-1'
        />

        <Filter
          filters={HomePageFilters}
          className='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>

      <HomeFilters />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.length > 0 ? (
          questions.map((question) => {
            return <QuestionCard key={question._id} question={question as any} />
          })
        ) : (
          <NoResult
            title='There are no question to show'
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next
          big thing others learn from. Get involved! 💡'
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

export default Home
