import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import RenderTag from './RenderTag'
import { getHotQuestions } from '@/lib/actions/question.action'
import { getTopPopularTags } from '@/lib/actions/tag.actions'

async function RightSidebar() {
  const { questions: hotQuestions } = await getHotQuestions()
  const { questions: popularTags } = await getTopPopularTags()
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] shrink-0 flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <h3 className='h3-bold text-dark200_light900 mb-7'>Top Questions</h3>

      <div className='mb-16 flex flex-col gap-6'>
        {hotQuestions.map((question) => {
          return (
            <Link
              href={`/question/${question._id}`}
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
