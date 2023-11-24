import React from 'react'
import RenderTag from '../shared/RenderTag'
import Link from 'next/link'
import Metric from '../shared/Metric'
import { formatNumber, getTimestamp } from '@/lib/utils'

type Props = {
  question: {
    _id: string
    title: string
    tags: {
      _id: string
      name: string
    }[]
    author: {
      _id: string
      name: string
      picture: string
    }
    createdAt: Date
    upvotes: Array<object>
    answers: Array<object>
    views: number
  }
}

function QuestionCard({ question }: Props) {
  return (
    <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div>
          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
            {getTimestamp(question.createdAt)}
          </span>
          <Link href={`/question/${question._id}`}>
            <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>{question.title}</h3>
          </Link>
        </div>
      </div>

      <div className='mt-3.5 flex flex-wrap gap-2'>
        {question.tags.map((tag) => {
          return <RenderTag key={tag._id} tag={tag} />
        })}
      </div>

      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric
          alt='avatar user'
          imgUrl={question.author.picture}
          title={`• asked ${getTimestamp(question.createdAt)}`}
          value={question.author.name}
          textStyles='body-medium text-dark400_light700'
          href={`/profile/${question.author._id}`}
          isAuthor
        />

        <div className='flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start'>
          <Metric
            alt='like count'
            imgUrl='/assets/icons/like.svg'
            title='Votes'
            value={formatNumber(question.upvotes.length)}
            textStyles='small-medium text-dark400_light800'
          />
          <Metric
            alt='answers count'
            imgUrl='/assets/icons/message.svg'
            title='Answers'
            value={formatNumber(question.answers.length)}
            textStyles='small-medium text-dark400_light800'
          />

          <Metric
            alt='view count'
            imgUrl='/assets/icons/eye.svg'
            title='Views'
            value={formatNumber(question.views)}
            textStyles='small-medium text-dark400_light800'
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
