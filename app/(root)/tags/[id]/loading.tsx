import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function TagDetailPageLoading() {
  return (
    <section>
      <Skeleton className='h-11 w-40 rounded-xl' />

      <div className='mb-12 mt-11 flex flex-wrap gap-5'>
        <Skeleton className='h-14 flex-1' />
      </div>

      <div className='flex flex-col gap-6'>
        {Array(10)
          .fill(null)
          .map((item) => {
            return <Skeleton key={item} className='h-48 w-full rounded-xl' />
          })}
      </div>
    </section>
  )
}

export default TagDetailPageLoading
