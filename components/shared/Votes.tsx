'use client'

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { viewQuestion } from '@/lib/actions/interactive.action'
import { downvoteQuestion, toggleSaveQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { formatNumber } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = (
  | {
      type: 'question'
      hasSaved: boolean
    }
  | {
      type: 'answer'
    }
) & {
  itemId: string
  userId?: string
  upvotes: number
  downvotes: number
  hasUpvotes: boolean
  hasDownvotes: boolean
}

function Votes(props: Props) {
  const router = useRouter()
  const pathName = usePathname()
  const { type, downvotes, hasDownvotes, hasUpvotes, itemId, upvotes, userId } = props
  let hasSaved
  if (type === 'question') {
    hasSaved = props.hasSaved
  }

  const handleVote = async (action: 'downvote' | 'upvote') => {
    if (!userId) {
      return router.push('/sign-in')
      // TODO: Toast about sign-in
    }

    if (type === 'question') {
      if (action === 'upvote') {
        await upvoteQuestion({
          hasdownVoted: hasDownvotes,
          hasupVoted: hasUpvotes,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
      } else {
        await downvoteQuestion({
          hasdownVoted: hasDownvotes,
          hasupVoted: hasUpvotes,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
      }
    }

    if (type === 'answer') {
      if (action === 'upvote') {
        await upvoteAnswer({
          hasdownVoted: hasDownvotes,
          hasupVoted: hasUpvotes,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
      } else {
        await downvoteAnswer({
          hasdownVoted: hasDownvotes,
          hasupVoted: hasUpvotes,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
      }
    }
  }

  const handleSave = async () => {
    if (!userId) {
      return router.push('/sign-in')
      // TODO: Toast about sign-in
    }

    await toggleSaveQuestion({
      path: pathName,
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId)
    })
  }

  useEffect(() => {
    if (type === 'question') {
      viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined
      })
    }
  }, [itemId, userId, type])

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            alt='upvote'
            width={18}
            height={18}
            className='cursor-pointer'
            src={hasUpvotes ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}
            onClick={() => handleVote('upvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>{formatNumber(upvotes)}</p>
          </div>
        </div>
        <div className='flex-center gap-1.5'>
          <Image
            alt='downvote'
            width={18}
            height={18}
            className='cursor-pointer'
            src={hasDownvotes ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}
            onClick={() => handleVote('downvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>{formatNumber(downvotes)}</p>
          </div>
        </div>
      </div>
      {type === 'question' && (
        <Image
          alt='star'
          width={18}
          height={18}
          className='cursor-pointer'
          src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}
          onClick={handleSave}
        />
      )}
    </div>
  )
}

export default Votes
