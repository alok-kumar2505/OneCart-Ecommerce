import React from 'react'

function Loading({ className }) {
  return (
   <div className={`animate-spin border-4 border-current border-t-transparent rounded-full ${className || 'h-8 w-8'}`}></div>
  )
}

export default Loading
