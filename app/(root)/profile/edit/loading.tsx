import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function EditProfileLoadingPage() {
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Edit Profile</h1>
      <div className='mt-9'>
        <div className='paragraph-semibold text-dark400_light800'>
          Name<span className='text-primary-500'>*</span>
        </div>
        <Skeleton className='mb-10 mt-3 h-12 w-full rounded-md' />

        <div className='paragraph-semibold text-dark400_light800'>
          Username<span className='text-primary-500'>*</span>
        </div>
        <Skeleton className='mb-10 mt-3 h-12 w-full rounded-md' />

        <div className='paragraph-semibold text-dark400_light800'>Portfolio Link</div>
        <Skeleton className='mb-10 mt-3 h-12 w-full rounded-md' />

        <div className='paragraph-semibold text-dark400_light800'>Location</div>
        <Skeleton className='mb-10 mt-3 h-12 w-full rounded-md' />

        <div className='paragraph-semibold text-dark400_light800'>Bio</div>
        <Skeleton className='mb-10 mt-3 h-28 w-full rounded-md' />

        <div className='flex justify-end'>
          <Button type='submit' className='primary-gradient w-fit !text-light-900'>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditProfileLoadingPage
