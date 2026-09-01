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
      className="group relative flex w-full max-w-[300px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Image */}
      <div className="relative h-[260px] w-full overflow-hidden bg-gray-50 sm:h-[280px]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick add button — appears on hover */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg">
            <FiShoppingCart className="h-3.5 w-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} className="h-3 w-3 text-amber-400" />
          ))}
          <FaStar className="h-3 w-3 text-gray-200" />
          <span className="ml-1 text-xs text-gray-400">(4.0)</span>
        </div>
        <p className="line-clamp-2 text-sm font-semibold text-gray-800 leading-snug">{name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-base font-bold text-indigo-600">
            {currency} {price}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
