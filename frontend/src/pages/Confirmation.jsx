import React, { useContext } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import Footer from '../component/Footer'
import { FaCheckCircle } from 'react-icons/fa'

function Confirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { currency } = useContext(shopDataContext)

  if (!state || !state.orderData) {
    return <Navigate to="/" />
  }

  const { orderData, amount, method } = state
  const { address, items } = orderData

  return (
    <div className="bg-[#F9F9F9] min-h-screen border-t border-gray-200">
      
      {/* ── Progress Bar ── */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-center gap-4 sm:gap-12 text-[10px] font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">1</span>
            <span className="hidden sm:inline">SHOPPING BAG</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">2</span>
            <span className="hidden sm:inline">SHIPPING & PAYMENT</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2 text-[#8B1B1B]">
            <span className="w-5 h-5 rounded-full bg-[#8B1B1B] text-white flex items-center justify-center">3</span>
            <span className="hidden sm:inline">CONFIRMATION</span>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-16">
        <div className="bg-white p-10 shadow-sm text-center border border-gray-200 mb-8">
          <FaCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="font-playfair text-3xl sm:text-4xl text-black mb-4">Thank You For Your Order!</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Your order has been successfully placed. We've sent a confirmation email with your order details and tracking information.
          </p>
        </div>

        <div className="bg-white p-8 shadow-sm border border-gray-200">
          <h2 className="font-playfair text-xl text-black mb-6 pb-4 border-b border-gray-200">ORDER SUMMARY</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">DELIVERY ADDRESS</p>
              <div className="text-sm text-black space-y-1">
                <p className="font-bold">{address.firstName} {address.lastName}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.pinCode}</p>
                <p>{address.country}</p>
                <p className="mt-2 text-gray-500">Phone: {address.phone}</p>
              </div>
            </div>
            
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">PAYMENT METHOD</p>
              <p className="text-sm font-bold text-black">{method}</p>
              
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mt-6 mb-2">TOTAL AMOUNT</p>
              <p className="text-xl font-bold text-[#8B1B1B]">{currency}{amount}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">ITEMS ORDERED</p>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 border border-gray-100">
                  <img src={item.image1} alt={item.name} className="w-12 h-16 object-cover bg-white" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-black line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm text-black">{currency}{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/order')} 
            className="px-8 py-4 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            View All Orders
          </button>
          <button 
            onClick={() => navigate('/collection')} 
            className="px-8 py-4 bg-white border border-black text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Confirmation
