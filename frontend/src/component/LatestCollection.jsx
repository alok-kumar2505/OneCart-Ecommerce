import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'

function LatestCollection() {
  const { products, currency } = useContext(shopDataContext)
  const [latestProduct, setLatestProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLatestProducts(products.slice(0, 4))
  }, [products])

  return (
    <div className="bg-[#F9F9F9] py-16 px-4 sm:px-8 max-w-[1440px] mx-auto border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div>
          <p className="text-[#8B1B1B] text-xs font-bold tracking-[0.15em] uppercase mb-2">New In Store</p>
          <h2 className="font-playfair text-4xl sm:text-5xl text-black">New Arrivals</h2>
        </div>
        <button 
          onClick={() => navigate('/collection')}
          className="text-black text-xs font-bold tracking-widest uppercase hover:text-gray-600 transition-colors"
        >
          View All New Arrivals &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestProduct.map((item, index) => (
          <div key={index} className="group cursor-pointer bg-white" onClick={() => navigate(`/productdetail/${item._id}`)}>
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
            <div className="px-2">
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
              
              {/* Color Swatches (Placeholder) */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B1B1B]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
