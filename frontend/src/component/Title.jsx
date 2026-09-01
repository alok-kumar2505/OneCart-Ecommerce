import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className="mb-4 flex flex-col items-center gap-2 text-center">
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {text1} <span className="gradient-text-gold">{text2}</span>
      </h2>
      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
    </div>
  )
}

export default Title
