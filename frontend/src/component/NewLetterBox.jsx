import React from 'react'

function NewLetterBox() {
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
  return (
    <div className='flex min-h-[34vh] w-full flex-col items-center justify-center gap-[10px] bg-gradient-to-l from-[#141414] to-[#0c2025] px-4 py-[30px] text-center'>
      <p className='px-[20px] text-[20px] font-semibold text-[#a5faf7] md:text-[30px]'>Subscribe now & get 20% off</p>
      <p className='px-[20px] text-[14px] font-semibold text-blue-100 md:text-[18px]'>Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.</p>
      <form action="" onSubmit={handleSubmit} className='mt-[20px] flex w-full max-w-[900px] flex-col items-center justify-center gap-[14px] px-[10px] sm:flex-row sm:gap-[20px]'>
        <input type="text" placeholder='Enter Your Email' className='h-[44px] w-full rounded-lg bg-slate-300 px-[20px] text-[15px] shadow-sm shadow-black placeholder:text-[black] sm:flex-1' required />
        <button type='submit' className='flex items-center justify-center gap-[20px] rounded-lg border-[1px] border-[#80808049] bg-[#2e3030c9] px-[18px] py-[12px] text-[15px] text-white shadow-sm shadow-black hover:bg-slate-500 md:px-[30px] md:text-[16px]'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewLetterBox
