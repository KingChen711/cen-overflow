'use client'

import { Input } from '@/components/ui/input'
import { cn, formUrlQuery } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  route: string
  iconPosition: 'left' | 'right'
  imgSrc: string
  placeholder: string
  className?: string
}

function LocalSearchBar({ route, iconPosition, imgSrc, placeholder, className }: Props) {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [searchQuery, setSearchQuery] = useState(query || '')

  useEffect(() => {
    if (!query) {
      setSearchQuery('')
    }
  }, [query])

  useEffect(() => {
    const handleSearch = () => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'q',
        value: searchQuery !== '' ? searchQuery : null
      })
      router.push(newUrl, { scroll: false })
    }

    const timer = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery, pathName, router, query, searchParams])

  return (
    <div
      className={cn(
        'background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4',
        className
      )}
    >
      {iconPosition === 'left' && <Image src={imgSrc} alt='search' width={24} height={24} className='cursor-pointer' />}

      <Input
        value={searchQuery}
        type='text'
        onChange={(e) => {
          setSearchQuery(e.target.value)
        }}
        placeholder={placeholder}
        className='paragraph-regular no-focus placeholder text-dark400_light700 border-none  bg-transparent shadow-none outline-none'
      />

      {iconPosition === 'right' && (
        <Image src={imgSrc} alt='search' width={24} height={24} className='cursor-pointer' />
      )}
    </div>
  )
}

export default LocalSearchBar
