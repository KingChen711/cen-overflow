'use client'

import { GlobalSearchFilters } from '@/constants/filters'
import { cn, formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function GlobalFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeActive = searchParams.get('type')

  const handleTypeClick = (type: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'type',
      value: type !== typeActive ? type : null
    })
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className='flex items-center gap-5 px-5'>
      <p className='text-dark400_light900 body-medium'>Type:</p>
      <div className='flex gap-3'>
        {GlobalSearchFilters.map((item) => {
          return (
            <button
              key={item.value}
              type='button'
              className={cn(
                'light-border-2 small-medium rounded-2xl bg-light-700 px-5 py-2 capitalize text-dark-400 dark:bg-dark-500 dark:text-light-800',
                typeActive === item.value
                  ? 'bg-primary-500 text-light-900 dark:bg-primary-500'
                  : 'bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500 dark:hover:text-primary-500'
              )}
              onClick={() => handleTypeClick(item.value)}
            >
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default GlobalFilters
