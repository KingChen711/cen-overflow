'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
  route: string
  iconPosition: 'left' | 'right'
  imgSrc: string
  placeholder: string
  className?: string
}

function LocalSearchBar ({ route, iconPosition, imgSrc, placeholder, className }: Props) {
  return (
    <div
      className={cn(
        'background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4',
        className
      )}
    >
      {iconPosition === 'left' && <Image src={imgSrc} alt='search' width={24} height={24} className='cursor-pointer' />}

      <Input
        type='text'
        placeholder={placeholder}
        className='paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none'
      />

      {iconPosition === 'right' && (
        <Image src={imgSrc} alt='search' width={24} height={24} className='cursor-pointer' />
      )}
    </div>
  )
}

export default LocalSearchBar
