import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from 'react-icons/si'
import { FiPackage } from 'react-icons/fi'

const statusColors = {
  'Order Placed': 'bg-blue-50 text-blue-700 border border-blue-100',
  'Packing': 'bg-yellow-50 text-yellow-700 border border-yellow-100',
  'Shipped': 'bg-purple-50 text-purple-700 border border-purple-100',
  'Out for delivery': 'bg-orange-50 text-orange-700 border border-orange-100',
  'Delivered': 'bg-green-50 text-green-700 border border-green-100',
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Nav />
      <Sidebar />

      <main className="ml-14 pt-16 md:ml-56">
        <div className="max-w-5xl px-6 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="mt-1 text-sm text-gray-500">{orders.length} orders total</p>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-100 py-24 text-center shadow-sm">
              <FiPackage className="mb-4 h-12 w-12 text-gray-200" />
              <p className="text-base font-semibold text-gray-600">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    {/* Order Icon + Items */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                        <SiEbox className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <div className="space-y-0.5">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-sm font-medium text-gray-800">
                              {item.name.toUpperCase()} &times; {item.quantity}
                              <span className="ml-2 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-500">
                                {item.size}
                              </span>
                            </p>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-gray-400 space-y-0.5">
                          <p className="font-medium text-gray-600">
                            {order.address.firstName} {order.address.lastName}
                          </p>
                          <p>{order.address.street}, {order.address.city}, {order.address.state}</p>
                          <p>{order.address.country} — {order.address.pinCode}</p>
                          <p>{order.address.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-start gap-6 lg:flex-col lg:items-end lg:gap-2 lg:text-right">
                      <div className="text-xs text-gray-500">
                        <span className="block text-gray-400">Items</span>
                        <span className="font-semibold text-gray-700">{order.items.length}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="block text-gray-400">Method</span>
                        <span className="font-semibold text-gray-700">{order.paymentMethod}</span>
                      </div>
                      <div className="text-xs">
                        <span className="block text-gray-400">Payment</span>
                        <span className={`font-semibold ${order.payment ? 'text-green-600' : 'text-orange-500'}`}>
                          {order.payment ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="block text-gray-400">Date</span>
                        <span className="font-semibold text-gray-700">{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm font-bold text-gray-900">₹{order.amount}</div>
                    </div>
                  </div>

                  {/* Status Selector */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => statusHandler(e, order._id)}
                      className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer transition-all"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
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
