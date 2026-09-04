import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiSparkles } from 'react-icons/hi'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { shopDataContext } from '../context/ShopContext'

function Hero() {
  const navigate = useNavigate()
  const { setShowSearch } = useContext(shopDataContext)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Use a placeholder high-quality fashion image for the background
  const bgImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"

  const handleSearch = () => {
    setShowSearch(true)
    navigate('/collection')
  }

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16 md:px-24 max-w-[1440px] mx-auto z-10">
        
        {/* Top Label */}
        <p className="text-[#C0A062] text-xs font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-sm">
          The Quiet Luxury Collection
        </p>

        {/* Main Heading */}
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-white leading-none mb-6 drop-shadow-md">
          AUTUMN / WINTER 2026
        </h1>
        
        {/* Subtitle */}
        <p className="text-white text-base md:text-lg max-w-xl mb-10 font-medium drop-shadow-md">
          Minimal silhouettes engineered in Italian double-faced wool, Egyptian poplin, and supple lambskin.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => navigate('/collection')}
            className="bg-[#8B1B1B] hover:bg-[#6c1414] text-white px-8 py-3.5 text-xs font-bold tracking-[0.15em] uppercase transition-colors"
          >
            Explore Collection
          </button>
          
          <button 
            onClick={handleSearch}
            className="flex items-center gap-2 bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3.5 text-xs font-bold tracking-[0.15em] uppercase transition-colors backdrop-blur-sm"
          >
            <HiSparkles className="h-4 w-4" />
            Style with AI
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-md transition-colors z-20">
        <IoChevronBackOutline className="w-5 h-5" />
      </button>
      <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-md transition-colors z-20">
        <IoChevronForwardOutline className="w-5 h-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {[0, 1, 2].map((idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-[#8B1B1B] w-6' : 'bg-white/70 hover:bg-white'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom Marquee Banner */}
      <div className="absolute bottom-0 w-full bg-[#111111] border-t border-[#333] py-2 z-20">
        <div className="marquee-container">
          <div className="marquee-content text-[#C0A062] text-[10px] font-bold tracking-[0.2em] uppercase flex whitespace-nowrap">
            <span className="mx-4">+ BESPOKE HAUTE COUTURE TAILORING</span>
            <span className="mx-4">+ 100% ETHICAL EGYPTIAN POPLIN & ITALIAN LEATHER</span>
            <span className="mx-4">+ COMPLIMENTARY 14-DAY RETURNS PRIVILEGE</span>
            <span className="mx-4">+ BESPOKE HAUTE COUTURE TAILORING</span>
            <span className="mx-4">+ 100% ETHICAL EGYPTIAN POPLIN & ITALIAN LEATHER</span>
            <span className="mx-4">+ COMPLIMENTARY 14-DAY RETURNS PRIVILEGE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
