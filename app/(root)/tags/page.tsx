import TagCard from '@/components/cards/TagCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { TagFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.actions'
import React from 'react'

type Props = {
  searchParams: {
    q?: string
    filter?: string
    page?: number
  }
}

async function TagsPage({ searchParams }: Props) {
  const { pageCount, tags } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1
  })

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Tags</h1>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/tags'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search amazing minds here...'
          className='flex-1'
        />

        <Filter filters={TagFilters} className='min-h-[56px] sm:min-w-[170px]' />
      </div>

      <section className='mt-12 flex w-full flex-wrap gap-4'>
        {tags.length > 0 ? (
          tags.map((tag) => {
            return <TagCard key={tag._id} tag={tag} />
          })
        ) : (
          <NoResult
            linkTitle='Ask a Question'
            title='No Tags Found'
            link='/ask-question'
            description='t looks like there are no tags available at the moment. 😕 Be a trendsetter by asking a question and creating a tag that best represents your topic of interest. 🚀'
          />
        )}
      </section>

      {tags.length > 0 && (
        <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} totalPages={pageCount} className='mt-10' />
      )}
    </>
  )
}

export default TagsPage
