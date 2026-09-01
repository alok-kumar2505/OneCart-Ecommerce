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
        if (cartItem[items][item] > 0) tempData.push({ _id: items, size: item, quantity: cartItem[items][item] })
      }
    }
    setCartData(tempData)
  }, [cartItem])

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-16 pb-24 md:pb-8">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 text-center"><Title text1="YOUR" text2="CART" /></div>

        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-[#E8E2D9] bg-white">
            <FiShoppingBag className="mb-5 h-14 w-14 text-[#E8D5B0]" />
            <p className="text-sm font-bold tracking-widest uppercase text-[#1A1A1A]">Your cart is empty</p>
            <p className="mt-2 text-xs tracking-wide text-[#6B6360]">Discover our collections and add something beautiful.</p>
            <button
              onClick={() => navigate('/collection')}
              className="mt-6 border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-[#2D2D2D] transition-colors"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ── Items ── */}
            <div className="flex-1 space-y-3">
              {cartData.map((item, index) => {
                const p = products.find(prod => prod._id === item._id)
                if (!p) return null
                return (
                  <div key={index} className="flex items-start gap-4 bg-white border border-[#E8E2D9] p-4">
                    <img src={p.image1} alt={p.name} className="h-24 w-24 flex-shrink-0 object-cover" />
                    <div className="flex flex-1 flex-col gap-2">
                      <p className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2">{p.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#C9A96E]">{currency} {p.price}</span>
                        <span className="border border-[#E8E2D9] px-2 py-0.5 text-xs text-[#6B6360]">{item.size}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] tracking-wide uppercase text-[#6B6360]">Qty</span>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          className="h-8 w-16 border border-[#E8E2D9] bg-[#FAF8F4] px-2 text-sm font-medium text-[#1A1A1A] outline-none focus:border-[#C9A96E] text-center transition-colors"
                          onChange={(e) =>
                            e.target.value !== '' && e.target.value !== '0'
                              ? updateQuantity(item._id, item.size, Number(e.target.value))
                              : null
                          }
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => { updateQuantity(item._id, item.size, 0); toast.info('Item removed') }}
                      className="p-2 text-[#A09890] hover:text-[#1A1A1A] transition-colors"
                    >
                      <RiDeleteBin6Line className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* ── Summary ── */}
            <div className="lg:w-72">
              <CartTotal />
              <button
                className="mt-3 w-full border border-[#1A1A1A] bg-[#1A1A1A] py-4 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-[#2D2D2D] transition-colors"
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
