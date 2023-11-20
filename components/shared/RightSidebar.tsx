import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import RenderTag from './RenderTag'

const hotQuestions = [
  { _id: '1', title: 'Is it only me or the font is bolder than necessary?' },
  { _id: '2', title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?' },
  { _id: '3', title: 'Can I get the course for free?' },
  { _id: '4', title: 'Redux Toolkit Not Updating State as Expected' },
  { _id: '5', title: 'Async/Await Function Not Handling Errors Properly' }
]

const popularTags = [
  { _id: '1', name: 'javascript', totalQuestions: 21 },
  { _id: '2', name: 'react', totalQuestions: 18 },
  { _id: '3', name: 'redux', totalQuestions: 13 },
  { _id: '4', name: 'nextjs', totalQuestions: 7 },
  { _id: '5', name: 'nestjs', totalQuestions: 5 }
]

function RightSidebar () {
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] shrink-0 flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <h3 className='h3-bold text-dark200_light900 mb-7'>Top Questions</h3>

      <div className='mb-16 flex flex-col gap-6'>
        {hotQuestions.map((question) => {
          return (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className='flex items-center justify-between gap-[30px]'
            >
              <p className='text-dark500_light700 body-medium'>{question.title}</p>
              <Image
                src='/assets/icons/chevron-right.svg'
                alt='chevron right'
                width={20}
                height={20}
                className='invert-colors'
              />
            </Link>
          )
        })}
      </div>

      <h3 className='h3-bold text-dark200_light900 mb-7'>Popular Tags</h3>

      <div className='flex flex-col gap-4'>
        {popularTags.map((tag) => (
          <RenderTag key={tag._id} tag={tag} showCount />
        ))}
      </div>
    </section>
  )
}

export default RightSidebar
