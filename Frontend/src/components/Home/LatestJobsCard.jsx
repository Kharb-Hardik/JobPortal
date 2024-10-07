import React from 'react'
import {Badge} from "../ui/badge"
function LatestJobsCard() {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer '>
        <div className=''>
            <h1 className='font-medium texy-lg'>Company Name</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className="font-bold texy-lg my-2">Job Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-500 font-bold'} variant="ghost">No of Position</Badge>
            <Badge className={'text-red-500 font-bold'} variant="ghost">Type</Badge>
            <Badge className={'text-green-500 font-bold'} variant="ghost">Salary</Badge>
        </div>
    </div>
  )
}

export default LatestJobsCard