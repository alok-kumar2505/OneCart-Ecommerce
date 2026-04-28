import React from 'react'
import logo from "../assets/logo.png"
function Footer() {
  return (
    <div className='mb-[77px] w-full md:mb-0'>
        <div className='flex w-full flex-col items-start justify-center gap-[24px] bg-[#dbfcfcec] px-4 py-8 md:flex-row md:items-start md:justify-center md:px-[50px]'>
            <div className='flex w-full flex-col items-start justify-center gap-[5px] md:w-[30%]'>
                <div className='mt-[10px] flex items-start justify-start gap-[5px] md:mt-[20px] lg:mt-[40px]'>
                    <img src={logo} alt=""  className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]'/>
                    <p className='text-[19px] md:text-[20px] text-[black] '>OneCart</p>
            
                </div>
                <p className='hidden text-[15px] text-[#1e2223] md:block'>OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.</p>
                    <p className='flex text-[15px] text-[#1e2223] md:hidden'>Fast. Easy. Reliable. OneCart Shopping</p>

                
            </div>
            <div className='flex w-full flex-col items-start justify-center text-left md:w-[25%] md:items-center md:text-center'>
                    <div className='mt-[10px] flex items-center justify-center gap-[5px] md:mt-[20px] lg:mt-[40px]'>
                        <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans '>COMPANY</p>

                    </div>
                    <ul className='space-y-1'>
                         <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>
                        <li className='text-[15px] text-[#1e2223] cursor-pointer '>About us</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
                        <li className='text-[15px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                <div className='flex w-full flex-col items-start justify-center text-left md:w-[25%] md:items-center md:text-center'>
                     <div className='mt-[10px] flex items-center justify-center gap-[5px] md:mt-[20px] lg:mt-[40px]'>
                        <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans '>GET IN TOUCH</p>

                    </div>
                     <ul className='space-y-1'>
                         <li className='text-[15px] text-[#1e2223] '>+91-9525487783</li>
                        <li className='text-[15px] text-[#1e2223] '>contact@onecart.com</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block'>+1-123-456-7890</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block'>admin@onecart.com</li>
                    </ul>
                </div>

        </div>
        <div className='h-[1px] w-full bg-slate-400'></div>
        <div className='flex min-h-[5vh] w-full items-center justify-center bg-[#dbfcfcec] px-4 py-3 text-center text-[13px] sm:text-[14px]'>Copyright 2025@onecart.com-All Rights Reserved</div>
      
    </div>
  )
}

export default Footer
