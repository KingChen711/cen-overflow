import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function QuestionDetailPageLoading() {
  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <Skeleton className='mr-1 h-7 w-7 rounded-full' />
            <Skeleton className='h-9 w-48' />
          </div>
          <div className='flex justify-end'>
            <Skeleton className='h-9 w-52' />
          </div>
        </div>
        <Skeleton className='mt-4 h-12 w-full' />
      </div>

      <Skeleton className='mt-4 h-5 max-w-[400px]' />

      <Skeleton className='mt-8 h-screen w-full' />
    </>
  )
}

export default QuestionDetailPageLoading
