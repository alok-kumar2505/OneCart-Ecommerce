import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full border border-[#E8E2D9] bg-white p-6">
      <h3 className="mb-5 text-xs font-bold tracking-[0.25em] uppercase text-[#1A1A1A]">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-[#6B6360]">
          <span className="tracking-wide">Subtotal</span>
          <span className="font-medium text-[#1A1A1A]">{currency} {subtotal}.00</span>
        </div>
        <div className="flex justify-between text-xs text-[#6B6360]">
          <span className="tracking-wide">Shipping</span>
          <span className="font-medium text-[#1A1A1A]">{currency} {delivery_fee}</span>
        </div>
        <div className="border-t border-[#E8E2D9] pt-3 flex justify-between">
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#1A1A1A]">Total</span>
          <span className="text-lg font-bold text-[#C9A96E]">{currency} {total}</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
