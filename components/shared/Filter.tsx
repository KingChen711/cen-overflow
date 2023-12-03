'use client'

import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn, formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  filters: { name: string; value: string }[]
  className?: string
  containerClasses?: string
}

function Filter({ filters, className, containerClasses }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <div className={cn('relative', containerClasses)}>
      <Select
        value={searchParams.get('filter') || ''}
        onValueChange={(value: string) => {
          const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'filter',
            value
          })
          router.push(newUrl, { scroll: false })
        }}
      >
        <SelectTrigger
          className={cn(
            'body-regular light-border background-light800_dark300 text-dark500_light700 min-h-[56px] border px-5 py-2.5',
            className
          )}
        >
          <div className='line-clamp-1'>
            <SelectValue placeholder='Select a Filter' />
          </div>
        </SelectTrigger>
        <SelectContent className='text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300'>
          <SelectGroup>
            {filters.map((item) => {
              return (
                <SelectItem
                  className='cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400'
                  key={item.value}
                  value={item.value}
                >
                  {item.name}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filter
