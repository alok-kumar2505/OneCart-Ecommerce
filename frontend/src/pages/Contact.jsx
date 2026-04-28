import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='flex min-h-[100vh] w-full flex-col items-center justify-center gap-[50px] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px]'>
      <Title  text1={'CONTACT'} text2={'US'}/>
      <div className='flex w-full flex-col items-center justify-center gap-[20px] px-4 lg:flex-row'>
        <div className='flex w-full items-center justify-center lg:w-[50%] '>
          <img src={contact} alt=""  className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm'/>
        </div>
        <div className='flex w-[90%] flex-col items-start justify-center gap-[20px] mt-[20px] lg:mt-[0px] lg:w-[50%]'>
        <p className='lg:w-[80%] w-[100%] text-[white] font-bold lg:text-[18px] text-[15px]'>Our Store</p>
        <p className='lg:w-[80%] w-full text-[white] md:text-[16px] text-[13px]'>
          <p>Dharmsamaj Chowk</p>
          <p>Motihari , Bihar , India</p>
        </p>
        <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
          <p>tel: +91-9525487783</p>
          <p>Email: admin@onecart.com</p>
        </p>
        <p className='lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold'>Careers at OneCart</p>
        <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>Learn more about our teams and job openings</p>
        <button className='flex items-center justify-center rounded-md border bg-transparent px-[24px] py-[16px] text-[white] active:bg-slate-600 sm:px-[30px] sm:py-[20px]' >Explore Jobs</button>
        </div>
      </div>
      <NewLetterBox/>
      
    </div>
  )
}

export default Contact
