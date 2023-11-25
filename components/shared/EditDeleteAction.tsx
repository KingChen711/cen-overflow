'use client'

import { deleteAnswer } from '@/lib/actions/answer.action'
import { deleteQuestion } from '@/lib/actions/question.action'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  itemId: string
  type: 'question' | 'answer'
}

function EditDeleteAction({ itemId, type }: Props) {
  const router = useRouter()
  const pathName = usePathname()

  const handleEditItem = async () => {
    router.push(`/question/${JSON.parse(itemId)}/edit`)
  }
  const handleDeleteItem = async () => {
    if (type === 'question') {
      await deleteQuestion({ path: pathName, questionId: JSON.parse(itemId) })
    }
    if (type === 'answer') {
      await deleteAnswer({ path: pathName, answerId: JSON.parse(itemId) })
    }
  }

  return (
    <div className='flex items-center justify-end gap-3 max-sm:w-full'>
      {type === 'question' && (
        <Image
          alt='edit'
          width={14}
          height={14}
          className='cursor-pointer object-contain'
          src='/assets/icons/edit.svg'
          onClick={handleEditItem}
        />
      )}
      <Image
        alt='trash'
        width={14}
        height={14}
        className='cursor-pointer object-contain'
        src='/assets/icons/trash.svg'
        onClick={handleDeleteItem}
      />
    </div>
  )
}

export default EditDeleteAction
