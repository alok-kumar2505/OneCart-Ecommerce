import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiShoppingBag } from 'react-icons/fi'
import CartTotal from '../component/CartTotal'
import { toast } from 'react-toastify'
import Footer from '../component/Footer'

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({ _id: items, size: item, quantity: cartItem[items][item] })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24 md:pb-8">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Title text1="YOUR" text2="CART" />
        </div>

        {cartData.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiShoppingBag className="mb-5 h-16 w-16 text-gray-200" />
            <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
            <p className="mt-2 text-sm text-gray-500">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => navigate('/collection')}
              className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ── Cart Items ── */}
            <div className="flex-1 space-y-4">
              {cartData.map((item, index) => {
                const productData = products.find(p => p._id === item._id)
                if (!productData) return null
                return (
                  <div key={index} className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                    {/* Image */}
                    <img
                      src={productData.image1}
                      alt={productData.name}
                      className="h-24 w-24 flex-shrink-0 rounded-xl object-cover"
                    />
                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-2">
                      <p className="font-semibold text-gray-900 leading-snug line-clamp-2">{productData.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-indigo-600">{currency} {productData.price}</span>
                        <span className="rounded-lg bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{item.size}</span>
                      </div>
                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-1">
                        <label className="text-xs text-gray-500">Qty</label>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          className="h-8 w-16 rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm font-medium text-gray-800 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 text-center"
                          onChange={(e) =>
                            e.target.value !== '' && e.target.value !== '0'
                              ? updateQuantity(item._id, item.size, Number(e.target.value))
                              : null
                          }
                        />
                      </div>
                    </div>
                    {/* Delete */}
                    <button
                      onClick={() => { updateQuantity(item._id, item.size, 0); toast.info('Item removed from cart') }}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <RiDeleteBin6Line className="h-5 w-5" />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* ── Order Summary ── */}
            <div className="lg:w-80">
              <CartTotal />
              <button
                className="mt-4 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors active:scale-[0.98]"
                onClick={() => navigate('/placeorder')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
