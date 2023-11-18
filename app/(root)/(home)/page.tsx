import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

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
        <LocalSearchBar route="/" iconPosition="left" imgSrc="/assets/icons/search.svg" placeholder='Search for questions...' className="flex-1" /> Filters
      </div>
    </>
  )
}

export default Home
