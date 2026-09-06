import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { FiTruck } from 'react-icons/fi'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee
  
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  const maxDeliveryDate = new Date()
  maxDeliveryDate.setDate(maxDeliveryDate.getDate() + 7)
  
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const formattedMaxDate = maxDeliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div className="w-full">
      <h3 className="mb-6 font-playfair text-xl font-bold text-black border-b border-gray-200 pb-4 uppercase tracking-wider">
        Order Summary
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">Subtotal</span>
          <span className="font-bold text-black">{currency} {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">Shipping</span>
          <span className="font-bold text-black">
            {delivery_fee === 0 ? <span className="text-emerald-600">FREE</span> : `${currency} ${delivery_fee}`}
          </span>
        </div>
        
        {total > 0 && delivery_fee > 0 && subtotal < 1500 && (
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-right mt-1">
            Add {currency} {1500 - subtotal} more for free shipping
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
          <span className="font-bold text-black uppercase tracking-widest text-xs">Total</span>
          <span className="font-playfair text-2xl font-bold text-black">{currency} {total.toLocaleString()}</span>
        </div>

        {total > 0 && (
          <div className="mt-6 bg-gray-50 p-4 border border-gray-200 flex items-start gap-3">
            <FiTruck className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Expected Delivery</p>
              <p className="text-sm font-bold text-black">{formattedDate} - {formattedMaxDate}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTotal
