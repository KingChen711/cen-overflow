import { getAnswers } from '@/lib/actions/answer.action'
import React from 'react'
import Filter from './Filter'
import { AnswerFilters } from '@/constants/filters'
import Link from 'next/link'
import Image from 'next/image'
import { getTimestamp } from '@/lib/utils'
import ParseHTML from './ParseHTML'
import Votes from './Votes'
import Pagination from './Pagination'

type Props = {
  questionId: string
  userId?: string
  page: number
  filter?: string
}

async function AllAnswers({ questionId, userId, page, filter }: Props) {
  const { answers, answersCount, pageCount } = await getAnswers({
    questionId: JSON.parse(questionId),
    page,
    sortBy: filter
  })

  return (
    <div className='mb-6 mt-11'>
      <div className='flex items-center justify-between'>
        <h3 className='primary-text-gradient'>{answersCount} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {answers.map((answer) => {
          return (
            <article key={answer._id} className='light-border border-b py-10'>
              <div className='flex items-center justify-between'>
                {/* SPAN ID */}
                <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className='flex flex-1 items-start gap-1 sm:items-center'
                  >
                    <Image
                      src={answer.author.picture}
                      width={18}
                      height={18}
                      alt='profile'
                      className='rounded-full object-cover max-sm:mt-0.5'
                    />
                    <div className='flex flex-col sm:flex-row sm:items-center'>
                      <p className='body-semibold text-dark300_light700'>{answer.author.name}</p>

                      <p className='small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1'>
                        <span className='max-sm:hidden'> •</span>answered {getTimestamp(answer.createdAt)}
                      </p>
                    </div>
                  </Link>

                  <div className='flex justify-end'>
                    <Votes
                      type='answer'
                      itemId={JSON.stringify(answer._id)}
                      userId={userId}
                      upVotes={answer.upVotes.length}
                      downVotes={answer.downVotes.length}
                      hasUpVotes={userId && answer.upVotes.includes(JSON.parse(userId))}
                      hasDownVotes={userId && answer.downVotes.includes(JSON.parse(userId))}
                    />
                  </div>
                </div>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          )
        })}
        {answers.length > 0 && <Pagination pageNumber={page} totalPages={pageCount} className='mt-10' />}
      </div>
    </div>
  )
}

export default AllAnswers
