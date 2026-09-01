import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiShoppingBag } from 'react-icons/fi'
import CartTotal from '../component/CartTotal'
import { toast } from 'react-toastify'
import Footer from '../component/Footer'
import Nav from '../component/Nav'

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
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 pb-24 md:pb-12">
        <div className="mb-12"><Title text1="Your" text2="Shopping Bag" /></div>

        {cartData.length === 0 ? (
          <div className="glass-panel rounded-[2.5rem] p-16 text-center border-white/10 my-10">
            <div className="w-24 h-24 bg-gradient-to-br from-obsidian-800 to-obsidian-700 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner border border-white/5">
              <FiShoppingBag className="h-10 w-10 text-amber-500/50" />
            </div>
            <p className="font-display text-2xl font-bold text-white mb-3">Your bag is empty</p>
            <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">Discover our exclusive collections and add something beautiful to your bag.</p>
            <button
              onClick={() => navigate('/collection')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02]"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* ── Items ── */}
            <div className="flex-1 space-y-4">
              {cartData.map((item, index) => {
                const p = products.find(prod => prod._id === item._id)
                if (!p) return null
                return (
                  <div key={index} className="glass-panel-interactive flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-2xl p-4">
                    <div className="relative h-28 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-obsidian-900 border border-white/5">
                      <img src={p.image1} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <p className="font-sans font-bold text-white text-base leading-snug line-clamp-2">{p.name}</p>
                        <button
                          onClick={() => { updateQuantity(item._id, item.size, 0); toast.info('Item removed') }}
                          className="p-2 text-gray-500 hover:text-pink-500 hover:bg-white/5 rounded-xl transition-colors"
                          aria-label="Remove item"
                        >
                          <RiDeleteBin6Line className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-display font-extrabold text-white text-lg">{currency}{p.price}</span>
                        <span className="bg-obsidian-800 border border-white/10 px-2.5 py-1 rounded-md text-xs font-bold text-amber-400">{item.size}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Qty</span>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          className="glass-input h-9 w-20 rounded-lg px-3 text-sm font-bold text-center appearance-none"
                          onChange={(e) =>
                            e.target.value !== '' && e.target.value !== '0'
                              ? updateQuantity(item._id, item.size, Number(e.target.value))
                              : null
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Summary ── */}
            <div className="lg:w-80 flex-shrink-0">
              <CartTotal />
              <button
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-500 to-gold-400 py-4.5 text-sm font-extrabold uppercase text-obsidian-950 shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-transform"
                onClick={() => navigate('/placeorder')}
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <FiShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Secure SSL encrypted checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
