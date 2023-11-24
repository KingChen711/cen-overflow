import Answer from '@/components/forms/Answer'
import AllAnswers from '@/components/shared/AllAnswers'
import Metric from '@/components/shared/Metric'
import ParseHTML from '@/components/shared/ParseHTML'
import RenderTag from '@/components/shared/RenderTag'
import Votes from '@/components/shared/Votes'
import { getQuestionById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { formatNumber, getTimestamp } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// TODO: fix width of code

type Props = {
  params: {
    id: string
  }
}

async function QuestionDetailPage({ params }: Props) {
  const result = await getQuestionById({ questionId: params.id })
  const { userId: clerkId } = auth()

  let mongoUser
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }

  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <Link href={`/profile/${result.question.author._id}`} className='flex items-center justify-start gap-1'>
            <Image src={result.question.author.picture} alt='profile' height={22} width={22} className='rounded-full' />
            <p className='paragraph-semibold text-dark300_light700'>{result.question.author.name}</p>
          </Link>
          <div className='flex justify-end'>
            <Votes
              type='question'
              itemId={JSON.stringify(result.question._id)}
              userId={mongoUser ? JSON.stringify(mongoUser._id) : undefined}
              upvotes={result.question.upvotes.length}
              downvotes={result.question.downvotes.length}
              hasUpvotes={mongoUser && result.question.upvotes.includes(mongoUser._id)}
              hasDownvotes={mongoUser && result.question.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser && mongoUser.saved.includes(result.question._id)}
            />
          </div>
        </div>
        <h2 className='h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>{result.question.title}</h2>
      </div>

      <div className='mb-8 mt-5 flex flex-wrap gap-4'>
        <Metric
          alt='clock icon'
          imgUrl='/assets/icons/clock.svg'
          title=''
          value={`asked ${getTimestamp(result.question.createdAt)}`}
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          alt='answers count'
          imgUrl='/assets/icons/message.svg'
          title='Answers'
          value={formatNumber(result.question.answers.length)}
          textStyles='small-medium text-dark400_light800'
        />

        <Metric
          alt='view count'
          imgUrl='/assets/icons/eye.svg'
          title='Views'
          value={formatNumber(result.question.views)}
          textStyles='small-medium text-dark400_light800'
        />
      </div>

      <ParseHTML data={result.question.content} />

      <div className='mt-6 flex flex-wrap gap-2'>
        {result.question.tags.map((tag: any) => {
          return <RenderTag key={tag._id} tag={tag} />
        })}
      </div>

      <AllAnswers
        questionId={JSON.stringify(result.question._id)}
        userId={mongoUser ? JSON.stringify(mongoUser._id) : undefined}
      />

      <Answer
        questionId={JSON.stringify(result.question._id)}
        authorId={mongoUser ? JSON.stringify(mongoUser._id) : undefined}
      />
    </>
  )
}

export default QuestionDetailPage
