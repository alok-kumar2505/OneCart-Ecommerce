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
    <div className="bg-[#F9F9F9] min-h-screen border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 py-12 sm:px-8">
        
        <div className="mb-12 border-b border-gray-200 pb-4">
          <h1 className="font-playfair text-3xl sm:text-4xl text-black">Your Shopping Bag</h1>
        </div>

        {cartData.length === 0 ? (
          <div className="bg-white rounded-none p-16 text-center border border-gray-200 shadow-sm my-10">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6 border border-gray-200">
              <FiShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <p className="font-playfair text-2xl text-black mb-3">Your bag is empty</p>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">Discover our exclusive collections and add something beautiful to your bag.</p>
            <button
              onClick={() => navigate('/collection')}
              className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold text-xs tracking-widest uppercase transition-colors"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* ── Items ── */}
            <div className="flex-1 space-y-6">
              {cartData.map((item, index) => {
                const p = products.find(prod => prod._id === item._id)
                if (!p) return null
                return (
                  <div key={index} className="bg-white flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-32 w-24 flex-shrink-0 bg-gray-100 border border-gray-200">
                      <img src={p.image1} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <p className="font-playfair text-lg text-black leading-snug line-clamp-2">{p.name}</p>
                        <button
                          onClick={() => { updateQuantity(item._id, item.size, 0); toast.info('Item removed') }}
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                          aria-label="Remove item"
                        >
                          <RiDeleteBin6Line className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm mt-1">
                        <span className="font-bold text-black text-lg">{currency}{p.price}</span>
                        <span className="bg-gray-100 border border-gray-200 px-3 py-1 text-xs font-bold text-black uppercase">{item.size}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Qty</span>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          className="border border-gray-300 h-9 w-20 px-3 text-sm font-bold text-center appearance-none focus:outline-none focus:border-black transition-colors"
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
            <div className="lg:w-[400px] flex-shrink-0">
              <div className="bg-white p-8 border border-gray-200 shadow-sm">
                <CartTotal />
                <button
                  className="mt-8 w-full bg-black hover:bg-gray-800 py-4 text-xs font-bold tracking-widest uppercase text-white transition-colors"
                  onClick={() => navigate('/placeorder')}
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-500">
                  <FiShoppingBag className="w-4 h-4 text-green-600" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
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
