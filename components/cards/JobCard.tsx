'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  job: {
    job_city?: string
    job_state?: string
    job_country: string
    employer_logo?: string
    job_title?: string
    job_description?: string
    job_apply_link?: string
    employer_website?: string
    job_employment_type: string
  }
}

function JobCard({ job }: Props) {
  const jobLocation = `${job.job_city ? job.job_city + ', ' : ''}${job.job_state ? job.job_state + ', ' : ''}${
    job.job_country
  }`

  return (
    <section className='background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8'>
      <div className='flex w-full justify-end sm:hidden'>
        <div className='background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5'>
          <Image
            alt='country symbol'
            loading='lazy'
            width={16}
            height={16}
            className='rounded-full'
            src='/_next/image?url=https%3A%2F%2Fflagsapi.com%2FVN%2Fflat%2F64.png&amp;w=32&amp;q=75'
          />
          <p className='body-medium text-dark400_light700'>{jobLocation}</p>
        </div>
      </div>

      <div className='flex items-center gap-6'>
        <Link className='background-light800_dark400 relative h-16 w-16 rounded-xl' href={job?.employer_website || '#'}>
          <Image
            alt='company logo'
            className='h-full w-full object-contain p-2'
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              left: '0',
              top: '0',
              right: '0',
              bottom: '0',
              color: 'transparent'
            }}
            sizes='100vw'
            fill
            src={job?.employer_logo ? job?.employer_logo : '/assets/images/site-logo.svg'}
          />
        </Link>
      </div>

      <div className='w-full'>
        <div className='flex-between flex-wrap gap-2'>
          <p className='base-semibold text-dark200_light900'>{job?.job_title || ''}</p>
          <div className='hidden sm:flex'>
            <div className='background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5'>
              <Image
                alt='country symbol'
                loading='lazy'
                width={16}
                height={16}
                className='rounded-full'
                src='/_next/image?url=https%3A%2F%2Fflagsapi.com%2FVN%2Fflat%2F64.png&amp;w=32&amp;q=75'
              />
              <p className='body-medium text-dark400_light700'>{jobLocation}</p>
            </div>
          </div>
        </div>

        <p className='body-regular text-dark500_light700  mt-2 line-clamp-2'>{job?.job_description || ''}</p>

        <div className='flex-between mt-8 flex-wrap gap-6'>
          <div className='flex flex-wrap items-center gap-6'>
            <div className='flex items-center gap-2'>
              <Image alt='clock' width={20} height={20} src='/assets/icons/clock-2.svg' />
              <p className='body-medium text-light-500'>{job.job_employment_type}</p>
            </div>
            <div className='flex items-center gap-2'>
              <Image alt='dollar symbol' width={20} height={20} src='/assets/icons/currency-dollar-circle.svg' />
              <p className='body-medium text-light-500'>Not disclosed</p>
            </div>
          </div>
          <a target='_blank' className='flex items-center gap-2' href={job?.job_apply_link || '#'}>
            <p className='body-semibold primary-text-gradient'>View job</p>
            <Image alt='arrow up right' width={20} height={20} src='/assets/icons/arrow-up-right.svg' />
          </a>
        </div>
      </div>
    </section>
  )
}

export default JobCard
