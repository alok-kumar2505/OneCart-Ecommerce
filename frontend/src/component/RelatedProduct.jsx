import React, { useContext, useEffect, useState, useRef } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'
import { HiSparkles } from 'react-icons/hi'
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5'

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(shopDataContext)
  const [related, setRelated] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (products.length > 0) {
      let productscopy = products.slice()
      productscopy = productscopy.filter((item) => category === item.category)
      productscopy = productscopy.filter((item) => subCategory === item.subCategory)
      productscopy = productscopy.filter((item) => currentProductId !== item._id) // exclude current product
      setRelated(productscopy.slice(0, 10))
    }
  }, [products, category, subCategory, currentProductId])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  if (related.length === 0) return null

  return (
    <div className="bg-[#F9F9F9] border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto py-20 px-4 sm:px-8 relative">
        <div className="mb-12">
          <p className="text-[#8B1B1B] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
            SIMILAR ITEMS
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl text-black mb-4">Complete This Look</h2>
          <p className="text-gray-500 text-sm max-w-3xl leading-relaxed">
            To complete this look, we recommend pairing the featured item with tailored minimalist complementary pieces.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory hide-scrollbar" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {related.map((item, index) => (
              <div key={index} className="flex-none w-[85vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start">
                <Card 
                  id={item._id} 
                  name={item.name} 
                  price={item.price} 
                  image={item.image1} 
                  category={item.category}
                  oldPrice={item.oldPrice || Math.round(item.price * 1.2)} 
                />
              </div>
            ))}
          </div>
          
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
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  )
}

export default RelatedProduct
