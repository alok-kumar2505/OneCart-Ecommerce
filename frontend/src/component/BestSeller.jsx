import React, { useContext, useEffect, useState, useRef } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5'

function BestSeller() {
  const { products, currency } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])
  const navigate = useNavigate()
  const scrollRef = useRef(null)

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setBestSeller(bestProduct.slice(0, 10)) // show more to enable scrolling
  }, [products])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-[#F9F9F9] py-16 px-4 sm:px-8 max-w-[1440px] mx-auto relative border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div>
          <p className="text-[#8B1B1B] text-xs font-bold tracking-[0.15em] uppercase mb-2">Most Obsessed</p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-black">Trending Now</h2>
        </div>
        <button 
          onClick={() => navigate('/collection')}
          className="text-black text-xs font-bold tracking-widest uppercase hover:text-gray-600 transition-colors"
        >
          View Trending Catalog &rarr;
        </button>
      </div>

      <div className="relative">
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory hide-scrollbar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSeller.map((item, index) => (
            <div 
              key={index} 
              className="flex-none w-[85vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start group cursor-pointer bg-white" 
              onClick={() => navigate(`/productdetail/${item._id}`)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img src={item.image1} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                {/* Badges & Icons */}
                <div className="absolute top-3 left-3 bg-white px-2 py-1 shadow-sm">
                  <span className="text-[9px] font-bold tracking-widest text-black">NEW</span>
                </div>
                <button 
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-black transition-colors"
                  onClick={(e) => { e.stopPropagation(); /* Add to wishlist logic */ }}
                >
                  <FiHeart className="w-4 h-4" />
                </button>
              </div>
              
              {/* Details */}
              <div className="px-2 pb-4">
                <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">{item.category}</p>
                <h3 className="font-playfair text-lg text-black mb-2 line-clamp-2 leading-snug">{item.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-black text-sm">{currency}{item.price}</span>
                  {item.oldPrice && (
                    <>
                      <span className="text-gray-400 text-xs line-through">{currency}{item.oldPrice}</span>
                      <span className="text-[#8B1B1B] text-xs font-bold">-{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Navigation Arrows */}
        <button 
          onClick={() => scroll('right')}
          className="hidden lg:flex absolute -right-6 top-1/3 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-black hover:scale-110 transition-all z-10 border border-gray-100"
        >
          <IoChevronForwardOutline className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll('left')}
          className="hidden lg:flex absolute -left-6 top-1/3 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-black hover:scale-110 transition-all z-10 border border-gray-100"
        >
          <IoChevronBackOutline className="w-6 h-6" />
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  )
}

export default BestSeller
