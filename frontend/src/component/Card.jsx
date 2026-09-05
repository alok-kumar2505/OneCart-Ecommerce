import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price, oldPrice, category }) {
  const { currency, addtoCart, wishlist, toggleWishlist } = useContext(shopDataContext)
  const navigate = useNavigate()
  
  const inWishlist = wishlist?.includes(id)

  return (
    <div className="group cursor-pointer bg-white flex flex-col" onClick={() => navigate(`/productdetail/${id}`)}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 border border-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {/* Badges & Icons */}
        <div className="absolute top-3 left-3 bg-white px-2 py-1 shadow-sm">
          <span className="text-[9px] font-bold tracking-widest text-black">NEW</span>
        </div>
        <button 
          className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm transition-colors ${inWishlist ? 'text-[#8B1B1B]' : 'text-gray-400 hover:text-black'}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(id); }}
        >
          {inWishlist ? <FaHeart className="w-4 h-4" /> : <FiHeart className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Details */}
      <div className="px-2 pb-2 flex-1 flex flex-col">
        <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">{category || 'Category'}</p>
        <h3 className="font-playfair text-lg text-black mb-2 line-clamp-2 leading-snug">{name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-black text-sm">{currency}{price}</span>
          {oldPrice && (
            <>
              <span className="text-gray-400 text-xs line-through">{currency}{oldPrice}</span>
              <span className="text-[#8B1B1B] text-xs font-bold">-{Math.round(((oldPrice - price) / oldPrice) * 100)}%</span>
            </>
          )}
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-black border border-gray-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white border border-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#8B1B1B]"></div>
          </div>
          
          <button
            onClick={(e) => { e.stopPropagation(); addtoCart(id, 'M'); }}
            className="text-[9px] font-bold tracking-widest uppercase bg-black text-white px-3 py-1.5 hover:bg-gray-800 transition-colors"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
