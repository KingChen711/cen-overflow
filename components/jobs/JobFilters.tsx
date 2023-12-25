'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn, formUrlQuery } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getJobFilters } from '@/lib/actions/job.action'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export function JobFilters() {
  const searchParams = useSearchParams()
  const active = searchParams.get('location')
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [jobFilters, setJobFilters] = React.useState<{ value: string; name: string }[]>([])

  React.useEffect(() => {
    const fetchJobFilters = async () => {
      const jobFilters = await getJobFilters()
      setJobFilters(jobFilters)
    }

    fetchJobFilters()
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className='body-regular light-border background-light800_dark300 text-dark500_light700 min-h-[56px] border px-5 py-2.5'
      >
        <Button variant='outline' role='combobox' aria-expanded={open} className='max-w-[210px] flex-1 justify-between'>
          <div className='flex items-center'>
            <Image
              src='/assets/icons/location.svg'
              width={18}
              height={18}
              alt='location'
              className='mr-2 shrink-0 opacity-50'
            />
            <div className='line-clamp-1'>
              {active ? jobFilters.find((jobFilter) => jobFilter.value === active)?.name : 'Select Location'}
            </div>
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-w-[210px] flex-1 p-0'>
        <Command>
          <CommandInput placeholder='Search Location' />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup>
            {jobFilters.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue: string) => {
                  const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'location',
                    value: currentValue !== active ? currentValue : null
                  })
                  router.push(newUrl, { scroll: false })
                  setOpen(false)
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', active === framework.value ? 'opacity-100' : 'opacity-0')} />
                {framework.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
