import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

type Props = {
  tag: { _id: string; name: string; totalQuestions?: number; amountInteraction?: string[] }
  showCount?: boolean
  showInteraction?: boolean
}

function RenderTag({
  tag: { _id, name, totalQuestions, amountInteraction },
  showCount = false,
  showInteraction = false
}: Props) {
  return (
    <Link href={`/tags/${_id}`} className='flex items-center justify-between gap-2'>
      <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase'>
        {name}
      </Badge>
      {showCount && <p className='small-medium text-dark500_light700'>{totalQuestions}</p>}
      {showInteraction && <p className='small-medium text-dark500_light700'>{amountInteraction}</p>}
    </Link>
  )
}

export default RenderTag
