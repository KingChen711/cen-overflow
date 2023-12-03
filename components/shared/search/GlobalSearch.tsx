'use client'

import { Input } from '@/components/ui/input'
import { formUrlQuery } from '@/lib/utils'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import GlobalSearchResult from './GlobalSearchResult'

function GlobalSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const globalQuery = searchParams.get('global')
  const [searchGlobal, setSearchGlobal] = useState(globalQuery || '')
  const [isOpen, setIsOpen] = useState(false)
  const searchContainerRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      // @ts-ignore
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsOpen(false)
        setSearchGlobal('')
      }
    }
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (!globalQuery) {
      setSearchGlobal('')
    }
    if (!globalQuery && isOpen) {
      setIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalQuery])

  useEffect(() => {
    const handleGlobalSearch = () => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'global',
        value: searchGlobal !== '' ? searchGlobal : null
      })
      router.push(newUrl, { scroll: false })
    }

    const timer = setTimeout(() => {
      handleGlobalSearch()
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [router, searchGlobal, searchParams])

  return (
    <div className='relative w-full max-w-[600px] max-lg:hidden' ref={searchContainerRef}>
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
        <Image src='/assets/icons/search.svg' alt='search' width={24} height={24} className='cursor-pointer' />

        <Input
          value={searchGlobal}
          onChange={(e) => {
            setSearchGlobal(e.target.value)

            setIsOpen(true)

            if (e.target.value === '' && isOpen) {
              setIsOpen(false)
            }
          }}
          type='text'
          placeholder='Search anything globally...'
          className='paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none'
        />
      </div>

      {isOpen && <GlobalSearchResult />}
    </div>
  )
}

export default GlobalSearch
