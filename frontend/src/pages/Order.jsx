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
    <div className="bg-[#F9F9F9] min-h-screen border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 py-12 sm:px-8">
        <div className="mb-12 border-b border-gray-200 pb-4">
          <h1 className="font-playfair text-3xl sm:text-4xl text-black">My Orders</h1>
        </div>
        
        {orderData.length === 0 ? (
          <div className="bg-white rounded-none p-16 text-center border border-gray-200 shadow-sm my-10">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6 border border-gray-200">
              <FiPackage className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-playfair text-xl text-black mb-2">No orders found</p>
            <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orderData.map((item, index) => (
              <div key={index} className="bg-white flex flex-col md:flex-row items-start justify-between gap-6 p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Info */}
                <div className="flex items-start gap-6 w-full md:w-auto">
                  <div className="h-28 w-24 flex-shrink-0 bg-gray-100 border border-gray-200">
                    <img src={item.image1} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-playfair text-xl text-black leading-snug">{item.name}</p>
                    <div className="flex items-center gap-4 text-sm mt-2">
                      <span className="font-bold text-black">₹{item.price}</span>
                      <span className="bg-gray-100 px-3 py-1 text-xs font-bold text-black">Qty: {item.quantity}</span>
                      <span className="bg-gray-100 px-3 py-1 text-xs font-bold text-black">Size: {item.size}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 font-bold tracking-widest uppercase">
                      Ordered on: <span className="text-black">{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">
                      Payment: <span className="text-black">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex w-full md:w-1/3 flex-col sm:flex-row md:flex-col items-center sm:justify-between md:items-end md:justify-center gap-4 border-t border-gray-200 md:border-none pt-6 md:pt-0">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 border border-gray-200">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-sm font-bold text-black uppercase tracking-widest">{item.status}</span>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-black font-bold text-xs tracking-widest uppercase transition-colors"
                  >
                    <FiTruck className="w-4 h-4 text-black" /> Track Order
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
