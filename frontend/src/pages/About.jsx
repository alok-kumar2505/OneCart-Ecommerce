import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-linear-to-l from-[#141414] to-[#0c2025] pt-20'>
      <Title text1={'ABOUT'} text2={'US'}/>
      <div className='flex w-full flex-col items-center justify-center gap-5 px-4 lg:flex-row'>

        <div className='flex w-full items-center justify-center lg:w-[50%] '>
          <img src={about} alt="" className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm' />
        </div>
        <div className='flex w-[90%] flex-col items-start justify-center gap-5 mt-5 lg:mt-0 lg:w-[50%]'>
          <p className='w-full text-[13px] text-[white] md:text-[16px] lg:w-[80%]'>
            OneCart born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='w-full text-[13px] text-[white] md:text-[16px] lg:w-[80%]'>
             modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          <p className='mt-2.5 w-full text-[15px] font-bold text-[white] lg:w-[80%] lg:text-[18px]'>Our Mission</p>
          <p className='w-full text-[13px] text-[white] md:text-[16px] lg:w-[80%]'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>
      <div className='w-full flex items-center justify-center flex-col gap-2.5'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
        <div className='flex w-full flex-col items-center justify-center gap-5 px-4 py-10 lg:w-[80%] lg:flex-row'>

          <div className='flex h-auto w-full max-w-[420px] flex-col items-center justify-center gap-5 border border-gray-100 bg-[#ffffff0b] px-10 py-2.5 text-[white] backdrop-blur-[2px] lg:w-[33%]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>
           <div className='flex h-auto w-full max-w-[420px] flex-col items-center justify-center gap-5 border border-gray-100 bg-[#ffffff0b] px-10 py-2.5 text-[white] backdrop-blur-[2px] lg:w-[33%]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Convenience</b>
            <p>
             Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>
           <div className='flex h-auto w-full max-w-[420px] flex-col items-center justify-center gap-5 border border-gray-100 bg-[#ffffff0b] px-10 py-2.5 text-[white] backdrop-blur-[2px] lg:w-[33%]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Exceptional Customer Service</b>
            <p>
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>
        </div>
      </div>
      <NewLetterBox/>
      
    </div>
  )
}

export default About
