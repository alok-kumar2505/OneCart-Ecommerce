import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext)
  const navigate = useNavigate()

  return (
    <div 
      className="glass-panel-interactive rounded-2xl overflow-hidden flex flex-col justify-between group relative cursor-pointer"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Floating Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-bold tracking-wider">
            Premium
          </span>
        </div>
      </div>
      
      {/* Content Details */}
      <div className="p-4 space-y-3">
        <h3 className="font-sans font-bold text-white text-base truncate">{name}</h3>
        
        <div className="flex items-baseline gap-2">
          <span className="font-display font-extrabold text-white text-lg">{currency}{price}</span>
        </div>
        
        {/* Action Button */}
        <button 
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-violet-600/20 group-hover:from-violet-500 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default Card
