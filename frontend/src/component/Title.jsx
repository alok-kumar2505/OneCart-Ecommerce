import React from 'react'

function Title({text1 ,text2}) {
  return (
    <div className='mb-3 inline-flex items-center gap-2 text-center text-[28px] sm:text-[32px] md:text-[40px]'>
        <p className='text-blue-100'>{text1} <span className='text-[#a5faf7] '>{text2}</span></p>
      
    </div>
  )
}

export default Title
