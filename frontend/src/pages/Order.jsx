import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiPackage, FiRefreshCw } from 'react-icons/fi'
import Footer from '../component/Footer'

const statusColors = {
  'Order Placed': 'bg-blue-50 text-blue-700',
  'Packing': 'bg-yellow-50 text-yellow-700',
  'Shipped': 'bg-purple-50 text-purple-700',
  'Out for delivery': 'bg-orange-50 text-orange-700',
  'Delivered': 'bg-green-50 text-green-700',
}

function Order() {
  const [orderData, setOrderData] = useState([])
  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        const allItems = []
        result.data.forEach(order => {
          order.items.forEach(item => {
            allItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            })
          })
        })
        setOrderData(allItems.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { loadOrderData() }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24 md:pb-8">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Title text1="MY" text2="ORDERS" />
        </div>

        {orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiPackage className="mb-5 h-16 w-16 text-gray-200" />
            <p className="text-xl font-semibold text-gray-700">No orders yet</p>
            <p className="mt-2 text-sm text-gray-500">Your completed orders will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderData.map((item, index) => (
              <div key={index} className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 shadow-sm p-4 sm:p-5">
                {/* Image */}
                <img
                  src={item.image1}
                  alt={item.name}
                  className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                />

                {/* Info */}
                <div className="flex flex-1 flex-col gap-1.5">
                  <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span>{currency} {item.price}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Size: {item.size}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                    <span>Date: {new Date(item.date).toDateString()}</span>
                    <span>Payment: {item.paymentMethod}</span>
                    <span className={item.payment ? 'text-green-600 font-medium' : 'text-orange-500 font-medium'}>
                      {item.payment ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Status + Track */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[item.status] || 'bg-gray-100 text-gray-600'}`}>
                    {item.status}
                  </span>
                  <button
                    onClick={loadOrderData}
                    className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                  >
                    <FiRefreshCw className="h-3 w-3" /> Track
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
