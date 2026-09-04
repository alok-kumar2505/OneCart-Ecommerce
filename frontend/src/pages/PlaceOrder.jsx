import React, { useContext, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import Footer from '../component/Footer'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import { IoLocationOutline, IoLockClosedOutline } from 'react-icons/io5'
import { FiGift } from 'react-icons/fi'
import { BsCashCoin, BsCreditCard } from 'react-icons/bs'
import { LuShieldCheck } from 'react-icons/lu'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const { navigate, cartItem, setCartItem, getCartAmount, delivery_fee, products, currency } = useContext(shopDataContext)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '108 Embassy Chambers, Bandra West', city: 'Mumbai', state: 'Maharashtra', pinCode: '400050', country: 'India', phone: '+91 98200 12345'
  })
  const { serverUrl } = useContext(authDataContext)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // Mocking submission for UI
    toast.success('Order placed successfully!')
    setCartItem({})
    navigate('/')
  }

  // Get cart items for summary
  const getCartItems = () => {
    let items = []
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        if (cartItem[itemId][size] > 0) {
          const product = products.find(p => p._id === itemId)
          if (product) items.push({ ...product, size, qty: cartItem[itemId][size] })
        }
      }
    }
    return items
  }
  
  const bagItems = getCartItems()
  const subtotal = getCartAmount()

  const InputField = ({ name, placeholder, label, type = 'text', width = 'w-full' }) => (
    <div className={`flex flex-col ${width}`}>
      <label className="text-[10px] font-bold tracking-widest uppercase text-black mb-2">{label}</label>
      <input
        required
        type={type}
        name={name}
        onChange={handleChange}
        value={formData[name]}
        className="border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
        placeholder={placeholder}
      />
    </div>
  )

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
          <div className="flex items-center gap-2 text-[#8B1B1B]">
            <span className="w-5 h-5 rounded-full bg-[#8B1B1B] text-white flex items-center justify-center">2</span>
            <span className="hidden sm:inline">SHIPPING & PAYMENT</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">3</span>
            <span className="hidden sm:inline">CONFIRMATION</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* ── Left Column: Forms ── */}
        <form onSubmit={onSubmitHandler} className="flex-1 w-full flex flex-col gap-8">
          
          {/* Deliver To Address */}
          <div className="bg-white p-8 shadow-sm">
            <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-200">
              <h2 className="flex items-center gap-2 font-playfair text-xl text-black">
                <IoLocationOutline className="text-[#8B1B1B]" /> 1. DELIVER TO ADDRESS
              </h2>
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">REQUIRED</span>
            </div>
            
            <div className="space-y-6">
              <InputField name="street" label="Street Address & Apartment" />
              <div className="flex flex-col sm:flex-row gap-6">
                <InputField name="city" label="City" />
                <InputField name="state" label="State" />
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <InputField name="pinCode" label="Pincode / Postal Code" />
                <InputField name="phone" label="Phone Number for Delivery SMS" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-8 shadow-sm">
            <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-200">
              <h2 className="flex items-center gap-2 font-playfair text-xl text-black">
                <IoLockClosedOutline className="text-[#8B1B1B]" /> 2. PAYMENT METHOD
              </h2>
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">SECURE CHECKOUT</span>
            </div>
            
            <div className="space-y-4">
              {/* COD Option */}
              <div 
                onClick={() => setMethod('cod')}
                className={`flex items-center justify-between p-6 border-2 cursor-pointer transition-colors ${
                  method === 'cod' ? 'border-[#8B1B1B] bg-[#8B1B1B]/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${method === 'cod' ? 'bg-[#8B1B1B] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <BsCashCoin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${method === 'cod' ? 'text-black' : 'text-gray-700'}`}>Cash On Delivery (COD)</h3>
                    <p className="text-xs text-gray-500 mt-1">Pay via Cash or UPI when your shipment arrives</p>
                  </div>
                </div>
                {method === 'cod' ? <FaCheckCircle className="text-[#8B1B1B] w-5 h-5" /> : <FaRegCircle className="text-gray-300 w-5 h-5" />}
              </div>

              {/* Online Payment Option */}
              <div 
                onClick={() => setMethod('razorpay')}
                className={`flex items-center justify-between p-6 border-2 cursor-pointer transition-colors ${
                  method === 'razorpay' ? 'border-[#8B1B1B] bg-[#8B1B1B]/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${method === 'razorpay' ? 'bg-[#8B1B1B] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <BsCreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${method === 'razorpay' ? 'text-black' : 'text-gray-700'}`}>Online Payment (Razorpay Secure)</h3>
                    <p className="text-xs text-gray-500 mt-1">UPI, Credit/Debit Cards, NetBanking, Wallets</p>
                  </div>
                </div>
                {method === 'razorpay' ? <FaCheckCircle className="text-[#8B1B1B] w-5 h-5" /> : <FaRegCircle className="text-gray-300 w-5 h-5" />}
              </div>
            </div>

            {/* Gift Packaging Checkbox */}
            <div className="mt-6 bg-gray-50 p-4 flex items-center gap-3 border border-gray-200">
              <input type="checkbox" className="w-4 h-4 accent-black" id="gift" defaultChecked />
              <label htmlFor="gift" className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase cursor-pointer select-none text-black">
                <FiGift className="w-4 h-4 text-gray-500" /> Complimentary Velora Luxury Gift Packaging
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B1B1B] hover:bg-[#6c1414] text-white text-xs font-bold tracking-widest uppercase py-5 transition-colors"
          >
            Confirm {method === 'cod' ? 'Cash on Delivery' : 'Online'} Order ({currency}{subtotal})
          </button>
        </form>

        {/* ── Right Column: Order Summary ── */}
        <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col gap-6">
          
          {/* Banner */}
          <div className="relative h-48 bg-gray-900 flex flex-col justify-center px-8">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" alt="Velora" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="relative z-10">
              <p className="text-[#C0A062] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 mb-2">
                <HiSparkles className="w-3 h-3" /> VELORA HAUTE COUTURE
              </p>
              <h3 className="font-playfair text-2xl text-white mb-2">Timeless Refinement</h3>
              <p className="text-white text-xs">Complimentary express insured delivery on all orders.</p>
            </div>
          </div>

          {/* Bag Summary */}
          <div className="bg-white p-8 shadow-sm">
            <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-200">
              <h2 className="font-playfair text-xl text-black">BAG SUMMARY</h2>
              <span className="text-[10px] font-bold text-black tracking-widest uppercase px-2 py-1 bg-gray-100">{bagItems.length} ITEM</span>
            </div>

            <div className="space-y-6 mb-8">
              {bagItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <img src={item.image1} alt={item.name} className="w-16 h-20 object-cover bg-gray-100" />
                  <div>
                    <h4 className="font-bold text-sm text-black line-clamp-2 leading-tight mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">Size: {item.size} | Qty: {item.qty}</p>
                    <p className="font-bold text-sm text-black">{currency}{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="flex mb-8">
              <input type="text" placeholder="PROMO CODE (E.G. VELORA15)" className="flex-1 border border-gray-300 border-r-0 px-4 text-xs tracking-widest uppercase focus:outline-none" />
              <button className="bg-gray-100 border border-gray-300 text-black text-[10px] font-bold tracking-widest uppercase px-6 py-3 hover:bg-gray-200 transition-colors">APPLY</button>
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-black">{currency}{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Express Shipping</span>
                <span className="font-bold text-[#10B981] tracking-widest text-[10px] uppercase">COMPLIMENTARY</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-bold text-black mb-8">
              <span>Grand Total</span>
              <span>{currency}{subtotal}</span>
            </div>

            <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-gray-500 tracking-widest uppercase">
              <span className="flex items-center gap-1"><LuShieldCheck className="text-green-600 w-4 h-4" /> 256-Bit SSL Encrypted</span>
              <span className="flex items-center gap-1">• 100% Authentic Guaranteed</span>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default PlaceOrder
