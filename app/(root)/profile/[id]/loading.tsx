import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import React from 'react'

function ProfilePageLoading() {
  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className='flex flex-col items-start gap-4 lg:flex-row'>
          <Skeleton className='h-[140px] w-[140px] rounded-full object-cover' />
          <div className='flex flex-col'>
            <div className='mt-3 flex gap-4'>
              <Skeleton className='h-8 w-32' />
              <Skeleton className='h-8 w-32' />
            </div>
            <div className='mt-3 flex gap-4'>
              <Skeleton className='h-8 w-32' />
              <Skeleton className='h-8 w-32' />
            </div>
            <Skeleton className='mt-3 h-8 w-full' />
          </div>
        </div>
        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3'>
            Edit Profile
          </Button>
        </div>
      </div>

      <div className='mt-10'>
        <h4 className='h3-semibold text-dark200_light900'>Stats</h4>
        <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
          <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
            <div>
              <Skeleton className='mb-2 h-6 w-full' />
              <p className='body-medium text-dark400_light700'>Questions</p>
            </div>
            <div>
              <Skeleton className='mb-2 h-6 w-full' />
              <p className='body-medium text-dark400_light700'>Answers</p>
            </div>
          </div>

          <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
            <Image alt='Gold Badges' width={40} height={50} src='/assets/icons/gold-medal.svg' />
            <div>
              <Skeleton className='mb-2 h-6 w-full' />
              <p className='body-medium text-dark400_light700'>Gold Badges</p>
            </div>
          </div>
          <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
            <Image alt='Silver Badges' width={40} height={50} src='/assets/icons/silver-medal.svg' />
            <div>
              <Skeleton className='mb-2 h-6 w-full' />
              <p className='body-medium text-dark400_light700'>Silver Badges</p>
            </div>
          </div>
          <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
            <Image alt='Bronze Badges' width={40} height={50} src='/assets/icons/bronze-medal.svg' />
            <div>
              <Skeleton className='mb-2 h-6 w-full' />
              <p className='body-medium text-dark400_light700'>Bronze Badges</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-10 flex gap-10'>
        <Tabs defaultValue='top-posts' className='flex-1'>
          <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger className='tab' value='top-posts'>
              Top Posts
            </TabsTrigger>
            <TabsTrigger className='tab' value='answers'>
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value='top-posts' className='mt-5 flex w-full flex-col gap-6'>
            {Array(3)
              .fill(null)
              .map((item) => {
                return <Skeleton key={item} className='h-48 w-full rounded-xl' />
              })}
          </TabsContent>
          <TabsContent value='answers' className='flex w-full flex-col gap-6'>
            {Array(3)
              .fill(null)
              .map((item) => {
                return <Skeleton key={item} className='h-48 w-full rounded-xl' />
              })}
          </TabsContent>
        </Tabs>
        <div className='flex min-w-[278px] flex-col max-lg:hidden'>
          <h3 className='h3-bold text-dark200_light900'>Top Tags</h3>
          <div className='mt-7 flex flex-col gap-4'>
            {Array(5)
              .fill(null)
              .map((item) => {
                return (
                  <div key={item} className='flex items-center justify-between gap-2'>
                    <Skeleton className='h-8 w-20' />
                    <Skeleton className='h-8 w-8' />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePageLoading
