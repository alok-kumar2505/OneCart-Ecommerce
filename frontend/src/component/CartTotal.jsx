import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{currency} {subtotal}.00</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping Fee</span>
          <span className="font-medium text-gray-900">{currency} {delivery_fee}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-indigo-600 text-lg">{currency} {total}</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
