import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import Filter from '@/components/shared/Filter'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { HomePageFilters } from '@/constants/filters'
import HomeFilters from '@/components/home/HomeFilters'
import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/shared/NoResult'

const questions = [
  {
    _id: '2',
    title: 'Redux Toolkit Not Updating State as Expected',
    tags: [
      { _id: '1', name: 'javascript', totalQuestions: 21 },
      { _id: '5', name: 'nestjs', totalQuestions: 5 },
      { _id: '2', name: 'react', totalQuestions: 18 }
    ],
    author: {
      _id: '1',
      name: 'King Chen 711',
      picture:
        'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/338573851_702481094900552_4552716029295561758_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Yx3FpW5KCBoAX9zhEuE&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCICLJyUtsyEaN3czbTRtZD98W5NjuS1IqhokyoEYnNZA&oe=655F6D2C'
    },
    createdAt: new Date('2023-11-13T07:52:51+00:00'),
    upvotes: 59,
    answers: [{}, {}, {}, {}, {}, {}, {}],
    views: 3234
  },
  {
    _id: '1',
    title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?',
    tags: [
      { _id: '3', name: 'redux' },
      { _id: '4', name: 'nextjs' },
      { _id: '5', name: 'nestjs' }
    ],
    author: {
      _id: '1',
      name: 'King Chen 711',
      picture:
        'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/338573851_702481094900552_4552716029295561758_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Yx3FpW5KCBoAX9zhEuE&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCICLJyUtsyEaN3czbTRtZD98W5NjuS1IqhokyoEYnNZA&oe=655F6D2C'
    },
    createdAt: new Date('2023-10-15T07:52:51+00:00'),
    upvotes: 23,
    answers: [{}, {}, {}, {}],
    views: 347
  }
]

function Home () {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>Ask a question</Button>
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
        {questions.length > 0
          ? (
              questions.map((question) => {
                return <QuestionCard key={question._id} question={question} />
              })
            )
          : (
          <NoResult
            title='There are no question to show'
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next
          big thing others learn from. Get involved! 💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
            )}
      </div>
    </>
  )
}

export default Home
