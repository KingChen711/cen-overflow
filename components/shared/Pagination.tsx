'use client'

import ReactPaginate from 'react-paginate'
import { cn, formUrlQuery } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

type PaginateProps = {
  totalPages: number
  pageNumber: number
  className?: string
}

const Pagination = ({ totalPages, className, pageNumber }: PaginateProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const paginate = ({ selected }: { selected: number }) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: (selected + 1).toString()
    })

    router.push(newUrl)
  }

  return (
    <ReactPaginate
      forcePage={pageNumber - 1}
      onPageChange={paginate}
      pageCount={totalPages}
      breakClassName={buttonVariants({ variant: 'ghost' })}
      previousLabel={'Prev'}
      nextLabel={'Next'}
      containerClassName={cn('flex justify-center gap-2 join', className)}
      pageLinkClassName={buttonVariants({ variant: 'outline' })}
      previousLinkClassName={cn(buttonVariants({ variant: 'link' }), 'dark:text-white')}
      nextLinkClassName={cn(buttonVariants({ variant: 'link' }), 'dark:text-white')}
      activeLinkClassName={cn(buttonVariants(), 'primary-gradient min-h-[46px] px-4 py-3 !text-light-900')}
    />
  )
}

export default Pagination
