import RenderTag from '@/components/shared/RenderTag'
import { Button } from '@/components/ui/button'
import { getUserInfo } from '@/lib/actions/user.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import { SignedIn, auth } from '@clerk/nextjs'
import ProfileLink from '@/components/shared/ProfileLink'
import Stats from '@/components/shared/Stats'
import QuestionsTab from '@/components/shared/QuestionsTab'
import AnswersTab from '@/components/shared/AnswersTab'

type Props = {
  params: {
    id: string
  }
}

async function ProfilePage({ params }: Props) {
  const { id: userId } = params
  const { totalAnswers, totalQuestions, user } = await getUserInfo({ userId })
  const { userId: clerkId } = auth()

  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className='flex flex-col items-start gap-4 lg:flex-row'>
          <Image alt='user avatar' width={140} height={140} className='rounded-full object-cover' src={user.picture} />
          <div className='mt-3'>
            <h2 className='h2-bold text-dark100_light900'>{user.name}</h2>
            <p className='paragraph-regular text-dark200_light800'>@{user.username}</p>
            <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
              {user.portfolioWebsite && (
                <ProfileLink href={user.portfolioWebsite} imgUrl='/assets/icons/link.svg' title='Portfolio' />
              )}
              {user.location && <ProfileLink imgUrl='/assets/icons/location.svg' title={user.location} />}
              <ProfileLink imgUrl='/assets/icons/calendar.svg' title={`Joined ${formatDate(user.joinedAt)}`} />
            </div>
            {user.bio && <p className='paragraph-regular text-dark400_light800 mt-8'>{user.bio}</p>}
          </div>
        </div>
        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <SignedIn>
            {user.clerkId === clerkId && (
              <Link href='/profile/edit'>
                <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3'>
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats totalAnswers={totalAnswers} totalQuestions={totalQuestions} />

      <div className='mt-10 flex gap-10'>
        <Tabs defaultValue='top-posts' className='flex-1'>
          <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger className='tab' value='top-posts'>
              <QuestionsTab />
            </TabsTrigger>
            <TabsTrigger className='tab' value='answers'>
              <AnswersTab />
            </TabsTrigger>
          </TabsList>
          <TabsContent value='top-posts'>Some posts</TabsContent>
          <TabsContent value='answers'>Some answers</TabsContent>
        </Tabs>
        <div className='flex min-w-[278px] flex-col max-lg:hidden'>
          <h3 className='h3-bold text-dark200_light900'>Top Tags</h3>
          <div className='mt-7 flex flex-col gap-4'>
            <RenderTag tag={{ _id: '1', name: 'nextjs', totalQuestions: 5 }} showCount />
            <RenderTag tag={{ _id: '3', name: 'java', totalQuestions: 7 }} showCount />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
