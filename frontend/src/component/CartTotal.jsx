import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full glass-panel rounded-2xl p-6">
      <h3 className="mb-6 font-display text-lg font-bold text-white border-b border-white/10 pb-4">
        Order Summary
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-bold text-white">{currency} {subtotal}.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Shipping</span>
          <span className="font-bold text-white">{currency} {delivery_fee}</span>
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between items-center">
          <span className="font-display font-bold text-white">Total</span>
          <span className="font-display text-xl font-extrabold gradient-text-gold">{currency} {total}</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
