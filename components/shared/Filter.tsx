import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type Props = {
  filters: { name: string; value: string }[]
  className?: string
  containerClasses?: string
}

function Filter({ filters, className, containerClasses }: Props) {
  return (
    <div className={cn('relative', containerClasses)}>
      <Select>
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
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => {
              return (
                <SelectItem key={item.value} value={item.value}>
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
