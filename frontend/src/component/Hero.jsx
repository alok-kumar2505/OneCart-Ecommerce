import React, { useContext } from 'react'
import Backgound from './Backgound'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { IoSearchOutline } from 'react-icons/io5'

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate()
  const { search, setSearch, setShowSearch } = useContext(shopDataContext)

  const handleSearch = () => {
    setShowSearch(true)
    navigate('/collection')
  }

  return (
    <div className="relative h-[72vh] w-full overflow-hidden sm:h-[80vh] lg:h-[85vh]">
      <div className="absolute inset-0">
        <Backgound heroCount={heroCount} />
      </div>
      
      {/* Dark Obsidian Overlay for Luxury Glassmorphic Design */}
      <div className="absolute inset-0 bg-obsidian-950/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center z-10 mt-10">
        
        {/* Tag */}
        <div className="inline-block px-4 py-1.5 rounded-full glass-panel border-amber-500/40 mb-6 animate-fade-in">
          <span className="text-xs font-bold tracking-[0.25em] uppercase gradient-text-gold">
            New Season Arrival
          </span>
        </div>

        {/* Headline (font-display: Space Grotesk) */}
        <h1 className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in [animation-delay:100ms]">
          {heroData.text1}
        </h1>
        
        {/* Subheadline (font-sans: Plus Jakarta Sans) */}
        <p className="mt-6 max-w-2xl text-base font-medium text-gray-300 sm:text-lg animate-fade-in [animation-delay:200ms]">
          {heroData.text2}
        </p>

        {/* ── Hero Intent Search Box Blueprint ── */}
        <div className="w-full max-w-2xl mx-auto relative mt-10 animate-fade-in [animation-delay:300ms]">
          <div className="relative glass-panel rounded-2xl p-2.5 shadow-2xl border-white/15 focus-within:border-violet-500/60 focus-within:ring-4 focus-within:ring-violet-500/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <IoSearchOutline className="w-6 h-6 text-violet-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search exclusive collections..."
                className="w-full bg-transparent text-white placeholder-gray-500 text-base focus:outline-none py-2"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white font-bold text-sm shadow-lg shadow-violet-600/25 hover:scale-[1.02] transition-transform flex-shrink-0"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center gap-4 animate-fade-in [animation-delay:400ms]">
          <button
            onClick={() => navigate('/collection')}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-bold text-sm transition-all shadow-lg"
          >
            Explore All
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 glass-panel px-4 py-2 rounded-full">
        {[0, 1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => setHeroCount(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              heroCount === i ? 'w-6 bg-gradient-to-r from-violet-500 to-pink-500' : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
