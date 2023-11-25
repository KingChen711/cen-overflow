import { getTimestamp } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import EditDeleteAction from '../shared/EditDeleteAction'

type Props = {
  createdAt: Date
  question: {
    _id: string
    title: string
    createdAt: Date
  }
  author: {
    clerkId: string
    name: string
  }
  _id: string
  upvotes: number
}

function AnswerCard({ question, createdAt, author, upvotes, _id }: Props) {
  const { userId: clerkId } = auth()
  const showActions = author.clerkId === clerkId

  return (
    <Link className='card-wrapper rounded-[10px] px-11 py-9' href={`/question/${question._id}/#${_id}`}>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div>
          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
            {getTimestamp(createdAt)}
          </span>
          <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>{question.title}</h3>
        </div>
        {showActions && <EditDeleteAction type='answer' itemId={_id} />}
      </div>
      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <a className='flex-center gap-1' href='/profile/user_2YItNhrEVhQ3J3dC8WbvO5l16oo'>
          <Image alt='user avatar' width={16} height={16} className='rounded-full object-contain' src='' />
          <p className='body-medium text-dark400_light700 flex items-center gap-1'>
            {author.name}
            <span className='small-regular line-clamp-1 max-sm:hidden'>• answered {getTimestamp(createdAt)}</span>
          </p>
        </a>
        <div className='flex-center gap-3'>
          <div className='flex-center flex-wrap gap-1'>
            <Image alt='like icon' width={16} height={16} className='object-contain ' src='/assets/icons/like.svg' />
            <p className='small-medium text-dark400_light800 flex items-center gap-1'>
              {upvotes}
              <span className='small-regular line-clamp-1 '> Votes</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AnswerCard
