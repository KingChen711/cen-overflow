'use client'

import { downVoteAnswer, upVoteAnswer } from '@/lib/actions/answer.action'
import { downVoteQuestion, toggleSaveQuestion, upVoteQuestion } from '@/lib/actions/question.action'
import { formatNumber } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from '../ui/use-toast'

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
  upVotes: number
  downVotes: number
  hasUpVotes: boolean
  hasDownVotes: boolean
}

function Votes(props: Props) {
  const router = useRouter()
  const pathName = usePathname()
  const { type, downVotes, hasDownVotes, hasUpVotes, itemId, upVotes, userId } = props
  let hasSaved = false
  if (type === 'question') {
    hasSaved = props.hasSaved
  }

  const handleVote = async (action: 'downVote' | 'upVote') => {
    if (!userId) {
      toast({
        title: 'Please log in',
        description: 'You must be logged in to perform this action'
      })
      return router.push('/sign-in')
    }

    if (type === 'question') {
      if (action === 'upVote') {
        await upVoteQuestion({
          hasDownVoted: hasDownVotes,
          hasUpVoted: hasUpVotes,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
        return toast({
          title: `Up vote ${!hasUpVotes ? 'Successfully' : 'Removed'}`,
          variant: !hasUpVotes ? 'default' : 'destructive'
        })
      } else {
        await downVoteQuestion({
          hasDownVoted: hasDownVotes,
          hasUpVoted: hasUpVotes,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
        return toast({
          title: `Down vote ${!hasDownVotes ? 'Successfully' : 'Removed'}`,
          variant: !hasDownVotes ? 'default' : 'destructive'
        })
      }
    }

    if (type === 'answer') {
      if (action === 'upVote') {
        await upVoteAnswer({
          hasDownVoted: hasDownVotes,
          hasUpVoted: hasUpVotes,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
        return toast({
          title: `Up vote ${!hasUpVotes ? 'Successfully' : 'Removed'}`,
          variant: !hasUpVotes ? 'default' : 'destructive'
        })
      } else {
        await downVoteAnswer({
          hasDownVoted: hasDownVotes,
          hasUpVoted: hasUpVotes,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathName
        })
        return toast({
          title: `Down vote ${!hasDownVotes ? 'Successfully' : 'Removed'}`,
          variant: !hasDownVotes ? 'default' : 'destructive'
        })
      }
    }
  }

  const handleSave = async () => {
    if (!userId) {
      toast({
        title: 'Please log in',
        description: 'You must be logged in to perform this action'
      })
      return router.push('/sign-in')
    }

    await toggleSaveQuestion({
      path: pathName,
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId)
    })
    return toast({
      title: `Question ${!hasSaved ? 'saved in' : 'removed from'} your collection`,
      variant: !hasSaved ? 'default' : 'destructive'
    })
  }

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            alt='upVote'
            width={18}
            height={18}
            className='cursor-pointer'
            src={hasUpVotes ? '/assets/icons/upVoted.svg' : '/assets/icons/upVote.svg'}
            onClick={() => handleVote('upVote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>{formatNumber(upVotes)}</p>
          </div>
        </div>
        <div className='flex-center gap-1.5'>
          <Image
            alt='downVote'
            width={18}
            height={18}
            className='cursor-pointer'
            src={hasDownVotes ? '/assets/icons/downVoted.svg' : '/assets/icons/downVote.svg'}
            onClick={() => handleVote('downVote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>{formatNumber(downVotes)}</p>
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
