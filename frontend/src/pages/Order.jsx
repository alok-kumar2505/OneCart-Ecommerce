import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import Title from '../component/Title'
import { FiPackage, FiTruck, FiCheck } from 'react-icons/fi'
import Nav from '../component/Nav'
import Footer from '../component/Footer'
import Loading from '../component/Loading'

const OrderTimeline = ({ currentStatus }) => {
  const statuses = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];
  
  // Handle edge cases where status might not exactly match (case sensitivity)
  const normalizedCurrent = currentStatus ? currentStatus.toLowerCase() : '';
  const currentIndex = statuses.findIndex(s => s.toLowerCase() === normalizedCurrent);
  // Default to 0 if not found
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full mt-8 mb-4 px-2 sm:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative gap-6 sm:gap-0">
        
        {/* Background line (Horizontal for sm+, hidden on mobile) */}
        <div className="hidden sm:block absolute left-4 right-4 top-3 h-0.5 bg-gray-200"></div>
        {/* Progress line (Horizontal for sm+, hidden on mobile) */}
        <div 
          className="hidden sm:block absolute left-4 top-3 h-0.5 bg-black transition-all duration-500" 
          style={{ width: `calc(${activeIndex > 0 ? (activeIndex / (statuses.length - 1)) * 100 : 0}% - 2rem)` }}
        ></div>

        {/* Vertical line (Mobile only) */}
        <div className="sm:hidden absolute left-3.5 top-4 bottom-4 w-0.5 bg-gray-200"></div>
        <div 
          className="sm:hidden absolute left-3.5 top-4 w-0.5 bg-black transition-all duration-500" 
          style={{ height: `calc(${activeIndex > 0 ? (activeIndex / (statuses.length - 1)) * 100 : 0}% - 2rem)` }}
        ></div>

        {statuses.map((status, index) => {
          const isCompleted = index <= activeIndex;
          const isCurrent = index === activeIndex;
          
          return (
            <div key={status} className="relative z-10 flex flex-row sm:flex-col items-center gap-4 sm:gap-2">
              <div className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center bg-white transition-colors duration-300
                ${isCompleted ? 'border-black text-black' : 'border-gray-300 text-transparent'} 
                ${isCurrent ? 'ring-4 ring-gray-100' : ''}`}
              >
                {isCompleted && <FiCheck className="w-3.5 h-3.5 sm:w-3 sm:h-3" />}
              </div>
              <span className={`text-[10px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-black' : 'text-gray-400'} sm:absolute sm:top-8 sm:w-24 sm:text-center sm:-ml-9`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function Order() {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
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
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadOrderData() }, [])

  return (
    <div className="bg-[#F9F9F9] min-h-screen border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 py-12 sm:px-8">
        <div className="mb-12 border-b border-gray-200 pb-4">
          <h1 className="font-playfair text-3xl sm:text-4xl text-black">My Orders</h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loading />
          </div>
        ) : orderData.length === 0 ? (
          <div className="bg-white rounded-none p-16 text-center border border-gray-200 shadow-sm my-10">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6 border border-gray-200">
              <FiPackage className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-playfair text-xl text-black mb-2">No orders found</p>
            <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orderData.map((item, index) => (
              <div key={index} className="bg-white flex flex-col p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 w-full">
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

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-center w-full md:w-auto mt-4 md:mt-0">
                    <button
                      onClick={loadOrderData}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-black font-bold text-[10px] tracking-widest uppercase transition-colors w-full md:w-auto"
                    >
                      <FiTruck className="w-4 h-4 text-black" /> Track Order
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                  <OrderTimeline currentStatus={item.status} />
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
