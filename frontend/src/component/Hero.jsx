import React from 'react'
import { FaCircle } from "react-icons/fa";
import Backgound from './Backgound'

function Hero({heroData,heroCount,setHeroCount}) {
  return (
    <div className='relative h-[72vh] w-full overflow-hidden sm:h-[78vh] lg:h-[100vh]'>
      <div className='absolute inset-0'>
        <Backgound heroCount={heroCount}/>
      </div>
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent' />

      <div className='absolute left-4 top-1/4 z-10 max-w-[90%] text-2xl font-semibold leading-tight text-[#88d9ee] sm:left-8 sm:max-w-[70%] sm:text-3xl md:max-w-[58%] md:text-5xl lg:left-12 lg:top-[28%] lg:max-w-[42%] lg:text-6xl'>
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      <div className='absolute bottom-8 left-4 z-10 flex items-center justify-center gap-2.5 sm:left-8 lg:left-12'>
        <FaCircle className={`w-3.5 ${heroCount=== 0 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(0)}/>
        <FaCircle className={`w-3.5 ${heroCount=== 1 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(1)}/>
        <FaCircle className={`w-3.5 ${heroCount=== 2 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(2)}/>
        <FaCircle className={`w-3.5 ${heroCount=== 3 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(3)}/>
      </div>
    </div>
  )
}

export default Hero
