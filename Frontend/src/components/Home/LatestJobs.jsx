import React from 'react'
import LatestJobsCard from './LatestJobsCard'

const Jobs=[1,2,3,4,5,6,7,8]

function LatestJobs() {
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='font-bold text-4xl'><span className='text-[#6A38C2]'>Latest & Top</span> Jobs</h1>
        <div className='grid grid-cols-3 gap-4 my-5'>
            {
                Jobs.slice(0,6).map((job,index)=><LatestJobsCard />)
            }
        </div>
    </div>
  )
}

export default LatestJobs