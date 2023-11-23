import TagCard from '@/components/cards/TagCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { TagFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.actions'
import React from 'react'

async function TagsPage() {
  const result = await getAllTags({})

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
        {result.tags.length > 0 ? (
          result.tags.map((tag) => {
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
    </>
  )
}

export default TagsPage
