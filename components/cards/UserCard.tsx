import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from '../shared/RenderTag'
import { Badge } from '../ui/badge'
import { getTopInteractedTags } from '@/lib/actions/tag.actions'

type Props = {
  user: {
    _id: string
    clerkId: string
    name: string
    picture: string
    username: string
  }
}

async function UserCard({ user: { _id, name, picture, username } }: Props) {
  const interactedTags = await getTopInteractedTags({ userId: _id })

  return (
    <Link href={`/profile/${_id}`} className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'>
      <article className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 '>
        <Image alt='user avatar' src={picture} className='rounded-full' width={100} height={100} />

        <div className='mt-4 text-center'>
          <h3 className='h3-bold text-dark200_light900 line-clamp-1'>{name}</h3>
          <p className='body-regular text-dark500_light500 mt-2'>@{username}</p>
        </div>

        <div className='mt-5'>
          <div className='flex items-center gap-2'>
            {interactedTags.length > 0 ? (
              interactedTags.map((tag) => {
                return <RenderTag key={tag._id} tag={tag} />
              })
            ) : (
              <div className='flex items-center justify-between gap-2'>
                <Badge className='subtle-medium background-light800_dark300 text-light400_light500 cursor-default rounded-md border-none px-4 py-2 uppercase'>
                  NO TAGS YET
                </Badge>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default UserCard
