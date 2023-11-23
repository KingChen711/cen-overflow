'use client'

import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function LeftSidebar() {
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen w-fit shrink-0 flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
      <NavContent />

      <SignedOut>
        <div className='flex flex-col gap-3'>
          <Link href='/sign-in'>
            <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3'>
              <span className='primary-text-gradient max-lg:hidden'>Log In</span>
              <Image src='/assets/icons/account.svg' alt='login' width={20} height={20} className='lg:hidden' />
            </Button>
          </Link>

          <Link href='/sign-up'>
            <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3'>
              <span className='max-lg:hidden'>Sign Up</span>
              <Image src='/assets/icons/sign-up.svg' alt='sign-up' width={20} height={20} className='lg:hidden' />
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  )
}

export default LeftSidebar

const NavContent = () => {
  const pathname = usePathname()
  return (
    <div className='flex flex-col gap-6'>
      {sidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

        return (
          <Link
            key={item.route}
            href={item.route}
            className={cn(
              isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900',
              'flex items-center justify-start gap-4 bg-transparent p-4'
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(!isActive && 'invert-colors')}
            />
            <p className={cn('max-lg:hidden', isActive ? 'base-bold' : 'base-medium')}>{item.label}</p>
          </Link>
        )
      })}
    </div>
  )
}
