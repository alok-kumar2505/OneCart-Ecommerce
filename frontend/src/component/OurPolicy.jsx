import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='flex min-h-screen w-screen flex-col items-center justify-start gap-8 bg-linear-to-l from-[#141414] to-[#0c2025] px-4 py-10 md:min-h-[70vh] md:gap-12'>
        <div className='w-full text-center '>
            <Title text1={"OUR"} text2={"POLICY"}/>
            <p className='m-auto w-full px-2.5 text-[13px] text-blue-100 md:text-[20px]'>Customer-Friendly Policies – Committed to Your Satisfaction and Safety.</p>
        </div>
      <div className='grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
        <div className='mx-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-2.5 text-center'>
        <RiExchangeFundsLine  className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]'/>
        <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>Easy Exchange Policy</p>
        <p className='font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center'>Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.</p>

        </div>
        <div className='mx-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-2.5 text-center'>
        <TbRosetteDiscountCheckFilled  className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]'/>
        <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>7 Days Return Policy</p>
        <p className='font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center'>Shop with Confidence – 7 Days Easy Return Guarantee.</p>

        </div>
        <div className='mx-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-2.5 text-center'>
        <BiSupport  className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]'/>
        <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>Best Customer Support</p>
        <p className='font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center'>Trusted Customer Support – Your Satisfaction Is Our Priority.</p>

        </div>
      </div>
    </div>
  )
}

export default OurPolicy
