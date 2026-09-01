import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiPackage } from 'react-icons/fi'

const statusColors = {
  'Order Placed': 'text-blue-400 bg-blue-400/10 border-blue-500/20',
  'Packing': 'text-amber-400 bg-amber-400/10 border-amber-500/20',
  'Shipped': 'text-violet-400 bg-violet-400/10 border-violet-500/20',
  'Out for delivery': 'text-pink-400 bg-pink-400/10 border-pink-500/20',
  'Delivered': 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
}

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) await fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchAllOrders() }, [])

  return (
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
      <Nav />
      <Sidebar />

      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10 pb-24">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-white mb-2">Order Management</h1>
            <p className="text-sm text-gray-400">Track and update {orders.length} orders.</p>
          </div>

          {orders.length === 0 ? (
            <div className="glass-panel rounded-[2.5rem] p-16 text-center border-white/10 mt-10">
              <div className="w-20 h-20 bg-gradient-to-br from-obsidian-800 to-obsidian-700 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner border border-white/5">
                <FiPackage className="h-8 w-8 text-amber-500/50" />
              </div>
              <p className="font-display text-xl font-bold text-white mb-2">No orders yet</p>
              <p className="text-sm text-gray-400 max-w-sm mx-auto">Orders will appear here once customers start checking out.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-3xl border-white/10 p-6 md:p-8"
                >
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
                    
                    {/* Items & Address */}
                    <div className="flex items-start gap-5 flex-1">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-obsidian-900 border border-white/5">
                        <FiPackage className="h-6 w-6 text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <div className="space-y-1.5 mb-4">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-sm font-bold text-white">
                              {item.name} <span className="text-amber-500 mx-1">× {item.quantity}</span>
                              <span className="ml-2 rounded-md bg-obsidian-800 border border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-400">
                                Size: {item.size}
                              </span>
                            </p>
                          ))}
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <p className="font-bold text-white text-sm mb-2 uppercase tracking-wide">
                            {order.address.firstName} {order.address.lastName}
                          </p>
                          <div className="text-xs text-gray-400 space-y-1">
                            <p>{order.address.street}, {order.address.city}, {order.address.state}</p>
                            <p>{order.address.country} — {order.address.pinCode}</p>
                            <p className="text-gray-300 font-medium mt-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-violet-500"></span> {order.address.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta & Status */}
                    <div className="flex flex-col gap-6 w-full xl:w-72 flex-shrink-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-xs">
                          <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Items</span>
                          <span className="font-bold text-white">{order.items.length}</span>
                        </div>
                        <div className="text-xs">
                          <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Method</span>
                          <span className="font-bold text-white uppercase">{order.paymentMethod}</span>
                        </div>
                        <div className="text-xs">
                          <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Payment</span>
                          <span className={`font-bold uppercase ${order.payment ? 'text-emerald-400' : 'text-amber-500'}`}>
                            {order.payment ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Date</span>
                          <span className="font-bold text-white">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end border-t border-white/10 pt-4">
                        <div className="font-display text-2xl font-bold text-white">
                          ₹{order.amount}
                        </div>
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => statusHandler(e, order._id)}
                            className={`appearance-none glass-input rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider pr-8 cursor-pointer border ${statusColors[order.status] || 'text-gray-300 border-white/10 bg-white/5'}`}
                          >
                            <option value="Order Placed" className="bg-obsidian-900 text-white">Order Placed</option>
                            <option value="Packing" className="bg-obsidian-900 text-white">Packing</option>
                            <option value="Shipped" className="bg-obsidian-900 text-white">Shipped</option>
                            <option value="Out for delivery" className="bg-obsidian-900 text-white">Out for Delivery</option>
                            <option value="Delivered" className="bg-obsidian-900 text-white">Delivered</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Orders
