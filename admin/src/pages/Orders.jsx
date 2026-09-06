import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi'
import Loading from '../component/Loading'

const statusColors = {
  'Order Placed': 'text-blue-600 bg-blue-50 border-blue-200',
  'Packing': 'text-amber-600 bg-amber-50 border-amber-200',
  'Shipped': 'text-violet-600 bg-violet-50 border-violet-200',
  'Out for delivery': 'text-pink-600 bg-pink-50 border-pink-200',
  'Delivered': 'text-emerald-600 bg-emerald-50 border-emerald-200',
}

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All') // 'All', 'Pending', 'Completed'
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) await fetchAllOrders()
    } catch (error) {
    }
  }

  useEffect(() => { fetchAllOrders() }, [])

  const pendingOrders = orders.filter(o => o.status !== 'Delivered')
  const completedOrders = orders.filter(o => o.status === 'Delivered')

  let displayedOrders = orders;
  if (filter === 'Pending') displayedOrders = pendingOrders;
  if (filter === 'Completed') displayedOrders = completedOrders;

  return (
    <div className="bg-[#F9F9F9] text-black min-h-screen">
      <Nav />
      <Sidebar />

      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10 pb-24">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="font-playfair text-2xl font-bold text-black mb-2">Order Management</h1>
            <p className="text-sm text-gray-500">Track, filter, and update customer orders.</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Orders</p>
                <p className="font-playfair text-3xl font-bold text-black">{orders.length}</p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-full">
                <FiPackage className="h-6 w-6 text-black" />
              </div>
            </div>
            
            <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Pending</p>
                <p className="font-playfair text-3xl font-bold text-amber-600">{pendingOrders.length}</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-full">
                <FiClock className="h-6 w-6 text-amber-600" />
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Completed</p>
                <p className="font-playfair text-3xl font-bold text-emerald-600">{completedOrders.length}</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-full">
                <FiCheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-px">
            {['All', 'Pending', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`pb-3 px-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  filter === tab 
                    ? 'text-black border-b-2 border-[#8B1B1B]' 
                    : 'text-gray-500 hover:text-black border-b-2 border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-md">
              <Loading className="h-12 w-12 text-[#8B1B1B]" />
            </div>
          )}
          
          {!loading && displayedOrders.length === 0 ? (
            <div className="bg-white p-16 text-center border border-gray-200 mt-10 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 mx-auto flex items-center justify-center mb-6 border border-gray-200 rounded-full">
                <FiPackage className="h-8 w-8 text-gray-400" />
              </div>
              <p className="font-playfair text-xl font-bold text-black mb-2">No {filter !== 'All' ? filter.toLowerCase() : ''} orders found</p>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">Orders will appear here once customers start checking out and their status matches.</p>
            </div>
          ) : !loading ? (
            <div className="space-y-6">
              {displayedOrders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 shadow-sm p-6 md:p-8"
                >
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
                    
                    {/* Items & Address */}
                    <div className="flex items-start gap-5 flex-1">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-gray-50 border border-gray-200 rounded-none">
                        <FiPackage className="h-6 w-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <div className="space-y-1.5 mb-4">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-sm font-bold text-black">
                              {item.name} <span className="text-[#8B1B1B] mx-1">× {item.quantity}</span>
                              <span className="ml-2 border border-gray-300 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-500 bg-white">
                                Size: {item.size}
                              </span>
                            </p>
                          ))}
                        </div>
                        <div className="p-4 bg-gray-50 border border-gray-200">
                          <p className="font-bold text-black text-sm mb-2 uppercase tracking-wide">
                            {order.address.firstName} {order.address.lastName}
                          </p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>{order.address.street}, {order.address.city}, {order.address.state}</p>
                            <p>{order.address.country} — {order.address.pinCode}</p>
                            <p className="text-black font-medium mt-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-black"></span> {order.address.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta & Status */}
                    <div className="flex flex-col gap-6 w-full xl:w-72 flex-shrink-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-xs">
                          <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Items</span>
                          <span className="font-bold text-black">{order.items.length}</span>
                        </div>
                        <div className="text-xs">
                          <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Method</span>
                          <span className="font-bold text-black uppercase">{order.paymentMethod}</span>
                        </div>
                        <div className="text-xs">
                          <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Payment</span>
                          <span className={`font-bold uppercase ${order.payment ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {order.payment ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Date</span>
                          <span className="font-bold text-black">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end border-t border-gray-200 pt-4">
                        <div className="font-playfair text-2xl font-bold text-black">
                          ₹{order.amount}
                        </div>
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => statusHandler(e, order._id)}
                            className={`appearance-none border px-4 py-2 text-[10px] font-bold uppercase tracking-widest pr-8 cursor-pointer focus:outline-none focus:border-black ${statusColors[order.status] || 'text-gray-500 border-gray-300 bg-white'}`}
                          >
                            <option value="Order Placed" className="bg-white text-black">Order Placed</option>
                            <option value="Packing" className="bg-white text-black">Packing</option>
                            <option value="Shipped" className="bg-white text-black">Shipped</option>
                            <option value="Out for delivery" className="bg-white text-black">Out for Delivery</option>
                            <option value="Delivered" className="bg-white text-black">Delivered</option>
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
          ) : null}
        </div>
      </main>
    </div>
  )
}

export default Orders
