import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiSparkles } from 'react-icons/hi'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { shopDataContext } from '../context/ShopContext'

function Hero() {
  const navigate = useNavigate()
  const { setShowSearch } = useContext(shopDataContext)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
      label: "The Quiet Luxury Collection",
      title: "AUTUMN / WINTER 2026",
      subtitle: "Minimal silhouettes engineered in Italian double-faced wool, Egyptian poplin, and supple lambskin."
    },
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      label: "Bespoke Elegance",
      title: "EVENING EDIT",
      subtitle: "Discover the latest eveningwear crafted with uncompromising attention to detail."
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      label: "Modern Essentials",
      title: "EVERYDAY REFINED",
      subtitle: "Elevate your daily uniform with our curated selection of foundational pieces."
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  const handleSearch = () => {
    setShowSearch(true)
    navigate('/collection')
  }

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-gray-100">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16 md:px-24 max-w-[1440px] mx-auto z-10 pointer-events-none">
        <div className="pointer-events-auto max-w-3xl">
          {/* Top Label */}
          <p className="text-[#C0A062] text-xs font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-sm animate-fade-in-up">
            {slides[currentSlide].label}
          </p>

          {/* Main Heading */}
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-white leading-none mb-6 drop-shadow-md transition-all duration-500 ease-in-out">
            {slides[currentSlide].title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-white text-base md:text-lg max-w-xl mb-10 font-medium drop-shadow-md transition-all duration-500 ease-in-out">
            {slides[currentSlide].subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => navigate('/collection')}
              className="bg-[#8B1B1B] hover:bg-[#6c1414] text-white px-8 py-3.5 text-xs font-bold tracking-[0.15em] uppercase transition-colors"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-md transition-colors z-20">
        <IoChevronBackOutline className="w-5 h-5" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-md transition-colors z-20">
        <IoChevronForwardOutline className="w-5 h-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, idx) => (
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
