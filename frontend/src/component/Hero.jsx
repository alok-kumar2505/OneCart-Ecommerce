import React from 'react'
import { FaCircle } from "react-icons/fa";

function Hero({heroData,heroCount,setHeroCount}) {
  return (
  <div className='relative min-h-screen w-full overflow-hidden' >
    <div className='absolute left-4 top-20 max-w-[90%] text-2xl font-semibold leading-tight text-[#88d9ee] sm:left-8 sm:top-24 sm:text-3xl md:max-w-[60%] md:text-5xl lg:left-10 lg:top-32 lg:max-w-[40%] lg:text-6xl'>
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>
        </div>
    <div className='absolute left-4 top-40 flex items-center justify-center gap-2.5 sm:left-8 sm:top-44 md:top-52 lg:left-10 lg:top-60'>
        <FaCircle className={`w-3.5 ${heroCount=== 0 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(0)}/>
        <FaCircle className={`w-3.5 ${heroCount=== 1 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(1)}/>
        <FaCircle className={`w-3.5 ${heroCount=== 2 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(2)}/>
        <FaCircle className={`w-3.5 ${heroCount=== 3 ?"fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(3)}/>
        </div>
      
    </div>
  )
}

export default Hero
