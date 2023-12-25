import JobCard from '@/components/cards/JobCard'
import { JobFilters } from '@/components/jobs/JobFilters'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { getAllJobs } from '@/lib/actions/job.action'

type Props = {
  searchParams: {
    q?: string
    location?: string
    page?: number
  }
}

async function JobsPage({ searchParams }: Props) {
  const { jobs } = await getAllJobs({
    searchQuery: searchParams.q,
    filter: searchParams.location,
    page: searchParams.page ? +searchParams.page : 1
  })

  const pageCount = 1

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Jobs</h1>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/jobs'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Job Title, Company, or Keywords...'
          className='flex-1'
        />

        <JobFilters />
      </div>

      <section className='light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9'>
        {jobs.length > 0 ? (
          jobs.map((job: any) => {
            return <JobCard key={job._id} job={job} />
          })
        ) : (
          <NoResult
            title='No Jobs Found'
            description="Oops! We couldn't find any 🛠️ jobs at the moment. Please try again later. 🔄"
          />
        )}
      </section>

      {jobs.length > 0 && (
        <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} totalPages={pageCount} className='mt-10' />
      )}
    </>
  )
}

export default JobsPage
