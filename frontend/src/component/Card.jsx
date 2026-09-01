import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  return (
    <div
      className="group relative flex w-full max-w-[300px] cursor-pointer flex-col overflow-hidden bg-white border border-[#E8E2D9] transition-all duration-300 hover:border-[#C9A96E] hover:shadow-[0_4px_24px_rgba(201,169,110,0.12)]"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Image */}
      <div className="relative h-[260px] w-full overflow-hidden bg-[#FAF8F4] sm:h-[280px]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick View — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-[#1A1A1A]/90 py-2.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-[#C9A96E]">
            <FiShoppingCart className="h-3.5 w-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[...Array(4)].map((_, i) => <FaStar key={i} className="h-2.5 w-2.5 text-[#C9A96E]" />)}
          <FaStar className="h-2.5 w-2.5 text-[#E8E2D9]" />
        </div>
        <p className="line-clamp-2 text-sm font-medium text-[#1A1A1A] leading-snug">{name}</p>
        <p className="text-sm font-bold tracking-wide text-[#C9A96E]">{currency} {price}</p>
      </div>
    </div>
  )
}

export default Card
