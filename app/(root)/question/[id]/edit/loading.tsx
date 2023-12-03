import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function EditQuestionPageLoading() {
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
        <div className='paragraph-semibold text-dark400_light800'>
          Question Title<span className='text-primary-500'>*</span>
        </div>
        <Skeleton className='mt-3 h-12 w-full rounded-md' />
        <p className='body-regular mb-10 mt-2.5 text-light-500'>
          Be specific and imagine you&apos;re asking a question to another person.
        </p>

        <div className='paragraph-semibold text-dark400_light800'>
          Detailed explanation of your problem?<span className='text-primary-500'>*</span>
        </div>
        <Skeleton className='mt-3 h-[350px] w-full rounded-md' />
        <p className='body-regular mb-10 mt-2.5 text-light-500'>
          Introduce the problem and expand on what you put in the title. Minimum 20 characters.
        </p>

        <div className='paragraph-semibold text-dark400_light800'>
          Tags<span className='text-primary-500'>*</span>
        </div>
        <Skeleton className='mt-3 h-12 w-full rounded-md' />
        <p className='body-regular mt-2.5 text-light-500'>
          Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
        </p>

        <Button type='submit' className='primary-gradient mt-10 w-fit !text-light-900'>
          Edit Question
        </Button>
      </div>
    </div>
  )
}

export default EditQuestionPageLoading
