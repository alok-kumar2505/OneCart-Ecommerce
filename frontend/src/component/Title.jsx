import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className="mb-3 flex flex-col items-center gap-1 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
        {text1} <span className="text-indigo-600">{text2}</span>
      </h2>
      <div className="mt-1 h-1 w-12 rounded-full bg-indigo-500" />
    </div>
  )
}

export default Title
