'use client'

import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '@/lib/validations'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { updateUser } from '@/lib/actions/user.action'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  stringifyUser: string
}

function Profile({ stringifyUser }: Props) {
  const parsedUser = JSON.parse(stringifyUser)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathName = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: parsedUser?.username || '',
      bio: parsedUser?.bio || '',
      location: parsedUser?.location || '',
      name: parsedUser?.name || '',
      portfolioLink: parsedUser?.portfolioWebsite || ''
    }
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSubmitting(true)
    try {
      await updateUser({
        clerkId: parsedUser.clerkId,
        path: pathName,
        updateData: {
          name: values.name,
          username: values.username,
          bio: values.bio,
          location: values.location,
          portfolioWebsite: values.portfolioLink
        }
      })

      router.back()
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-9 flex w-full flex-col gap-9'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Name <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Your Name'
                  {...field}
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                />
              </FormControl>
              <FormMessage className='text-sm font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Username <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Your username'
                  {...field}
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                />
              </FormControl>
              <FormMessage className='text-sm font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='portfolioLink'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Portfolio Link</FormLabel>
              <FormControl>
                <Input
                  type='url'
                  placeholder='Your Portfolio link'
                  {...field}
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                />
              </FormControl>
              <FormMessage className='text-sm font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder='Where do you live?'
                  {...field}
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                />
              </FormControl>
              <FormMessage className='text-sm font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark400_light800'>Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="What's special about you?"
                  {...field}
                  className='no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border'
                />
              </FormControl>
              <FormMessage className='text-sm font-medium text-red-500 dark:text-red-900' />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type='submit' className='primary-gradient w-fit !text-light-900' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Profile
