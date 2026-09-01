import React from 'react'
import { FaCircle } from 'react-icons/fa'
import Backgound from './Backgound'
import { useNavigate } from 'react-router-dom'

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate()
  return (
    <div className="relative h-[72vh] w-full overflow-hidden sm:h-[78vh] lg:h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <Backgound heroCount={heroCount} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute left-6 top-1/4 z-10 max-w-[90%] sm:left-10 sm:max-w-[65%] md:max-w-[55%] lg:left-16 lg:top-[28%] lg:max-w-[44%]">
        <p className="mb-2 inline-block rounded-full bg-indigo-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          New Season
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {heroData.text1}
        </h1>
        <p className="mt-2 text-lg font-medium text-white/80 sm:text-xl">
          {heroData.text2}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => navigate('/collection')}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95"
          >
            Shop Now
          </button>
          <button
            onClick={() => navigate('/collection')}
            className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            View Collections
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-2.5 sm:left-10 lg:left-16">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setHeroCount(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              heroCount === i ? 'w-6 bg-indigo-400' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
