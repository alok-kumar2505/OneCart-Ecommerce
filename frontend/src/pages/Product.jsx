import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
  <div className='flex min-h-[100vh] w-full flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] px-3 py-[20px] sm:px-4 lg:px-6'>

    <div className='flex min-h-[70px] w-full flex-col items-center justify-center gap-[10px]'>
            <LatestCollection/>
        </div>
    <div className='flex min-h-[70px] w-full flex-col items-center justify-center gap-[10px]'>
            <BestSeller/>
        </div>
      
    </div>
  )
}

export default Product
