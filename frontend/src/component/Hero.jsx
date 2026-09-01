import React from 'react'
import Backgound from './Backgound'
import { useNavigate } from 'react-router-dom'

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate()
  return (
    <div className="relative h-[72vh] w-full overflow-hidden sm:h-[80vh] lg:h-screen">
      <div className="absolute inset-0">
        <Backgound heroCount={heroCount} />
      </div>
      {/* Dark overlay — heavier for luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute left-6 top-1/4 z-10 max-w-[90%] sm:left-10 sm:max-w-[65%] md:max-w-[52%] lg:left-16 lg:top-[28%] lg:max-w-[42%]">
        {/* Tag */}
        <p className="mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-[#C9A96E]">
          New Season
        </p>
        <h1 className="text-3xl font-bold leading-tight tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {heroData.text1}
        </h1>
        <p className="mt-3 text-base font-light tracking-wide text-white/70 sm:text-lg">
          {heroData.text2}
        </p>
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/collection')}
            className="border border-[#C9A96E] bg-[#C9A96E] px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1A1A] transition-all hover:bg-[#A8895A] hover:border-[#A8895A] active:scale-95"
          >
            Shop Now
          </button>
          <button
            onClick={() => navigate('/collection')}
            className="border border-white/50 px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-white transition-all hover:border-white hover:bg-white/10"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-3 sm:left-10 lg:left-16">
        {[0, 1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => setHeroCount(i)}
            className={`h-px transition-all duration-500 ${
              heroCount === i ? 'w-8 bg-[#C9A96E]' : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
