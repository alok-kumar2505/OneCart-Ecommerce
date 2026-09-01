import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import Title from '../component/Title'
import { FiPackage, FiTruck } from 'react-icons/fi'
import Nav from '../component/Nav'
import Footer from '../component/Footer'

function Order() {
  const [orderData, setOrderData] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const response = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (response.data) {
        let allOrdersItem = []
        response.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {  }
  }

  useEffect(() => { loadOrderData() }, [])

  return (
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 pb-24 md:pb-12">
        <div className="mb-10"><Title text1="My" text2="Orders" /></div>
        
        {orderData.length === 0 ? (
          <div className="glass-panel rounded-[2.5rem] p-16 text-center border-white/10">
            <div className="w-20 h-20 bg-gradient-to-br from-obsidian-800 to-obsidian-700 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner border border-white/5">
              <FiPackage className="h-8 w-8 text-violet-400/50" />
            </div>
            <p className="font-display text-xl font-bold text-white mb-2">No orders found</p>
            <p className="text-sm text-gray-400">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orderData.map((item, index) => (
              <div key={index} className="glass-panel-interactive flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl p-6">
                
                {/* Info */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="h-24 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-obsidian-900 border border-white/5">
                    <img src={item.image1} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans font-bold text-white text-base leading-snug">{item.name}</p>
                    <div className="flex items-center gap-4">
                      <span className="font-display font-bold text-white">₹{item.price}</span>
                      <span className="bg-obsidian-800 border border-white/10 px-2.5 py-1 rounded-md text-xs font-bold text-amber-400">Qty: {item.quantity}</span>
                      <span className="bg-obsidian-800 border border-white/10 px-2.5 py-1 rounded-md text-xs font-bold text-emerald-400">Size: {item.size}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Ordered on <span className="font-medium text-gray-300">{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Payment <span className="font-medium text-gray-300 uppercase">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex w-full md:w-1/3 flex-col sm:flex-row md:flex-col items-center sm:justify-between md:items-end md:justify-center gap-4">
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-sm font-bold text-white">{item.status}</span>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs transition-colors"
                  >
                    <FiTruck className="w-4 h-4 text-violet-400" /> Track Order
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Order
