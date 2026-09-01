import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className="mb-3 flex flex-col items-center gap-2 text-center">
      <h2 className="text-2xl font-bold tracking-widest text-[#1A1A1A] uppercase sm:text-3xl md:text-4xl">
        {text1} <span className="text-[#C9A96E]">{text2}</span>
      </h2>
      <div className="h-px w-16 bg-[#C9A96E]" />
    </div>
  )
}

export default Title
