import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { shopDataContext } from '../context/ShopContext'
import stripe from '../assets/stripe.png'
import razorpay from '../assets/razorpay.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import Loading from '../component/Loading'
import Footer from '../component/Footer'
import Nav from '../component/Nav'
import { FiCreditCard, FiDollarSign } from 'react-icons/fi'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const { navigate, cartItem, setCartItem, getCartAmount, delivery_fee, products, showSearch } = useContext(shopDataContext)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '', state: '', pinCode: '', country: '', phone: ''
  })
  const { serverUrl } = useContext(authDataContext)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(p => p._id === items))
            if (itemInfo) { itemInfo.size = item; itemInfo.quantity = cartItem[items][item]; orderItems.push(itemInfo) }
          }
        }
      }

      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee }

      if (method === 'cod') {
        const response = await axios.post(serverUrl + '/api/order/place', orderData, { withCredentials: true })
        if (response.data) { setCartItem({}); navigate('/order'); toast.success('Order placed successfully!') }
        else { toast.error('Failed to place order') }
      } else {
        toast.info('Payment integration not active in this demo.')
      }
    } catch (error) { toast.error('An error occurred.') }
    setLoading(false)
  }

  const InputField = ({ name, placeholder, type = 'text', width = 'w-full' }) => (
    <input
      required
      type={type}
      name={name}
      onChange={handleChange}
      value={formData[name]}
      className={`glass-input rounded-xl px-5 py-3.5 text-sm ${width}`}
      placeholder={placeholder}
    />
  )

  return (
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
      <Nav />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 pb-24 md:pb-12">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-10 lg:flex-row">
          
          {/* ── Left: Shipping Details ── */}
          <div className="flex-1">
            <div className="mb-8 sm:text-left text-center">
              <Title text1="Delivery" text2="Information" />
            </div>
            
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5 border-white/10">
              <div className="flex gap-5">
                <InputField name="firstName" placeholder="First name" />
                <InputField name="lastName" placeholder="Last name" />
              </div>
              <InputField name="email" type="email" placeholder="Email address" />
              <InputField name="street" placeholder="Street address" />
              <div className="flex gap-5">
                <InputField name="city" placeholder="City" />
                <InputField name="state" placeholder="State / Province" />
              </div>
              <div className="flex gap-5">
                <InputField name="pinCode" type="number" placeholder="Zip / Postal code" />
                <InputField name="country" placeholder="Country" />
              </div>
              <InputField name="phone" type="number" placeholder="Phone number" />
            </div>
          </div>

          {/* ── Right: Order & Payment ── */}
          <div className="lg:w-[400px]">
            <CartTotal />

            <div className="mt-10">
              <div className="mb-6"><Title text1="Payment" text2="Method" /></div>
              
              <div className="flex flex-col gap-4">
                {[
                  { id: 'stripe', icon: stripe, type: 'img' },
                  { id: 'razorpay', icon: razorpay, type: 'img' },
                  { id: 'cod', label: 'Cash on Delivery', icon: FiDollarSign, type: 'icon' },
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setMethod(opt.id)}
                    className={`glass-panel-interactive cursor-pointer flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 ${
                      method === opt.id ? 'border-violet-500 bg-obsidian-800 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : 'border-white/5'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${method === opt.id ? 'border-violet-500' : 'border-gray-600'}`}>
                      {method === opt.id && <div className="h-2 w-2 rounded-full bg-violet-500" />}
                    </div>
                    {opt.type === 'img' ? (
                      <img src={opt.icon} alt={opt.id} className="h-6 object-contain" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <opt.icon className={`h-5 w-5 ${method === opt.id ? 'text-amber-400' : 'text-gray-400'}`} />
                        <span className={`font-bold text-sm ${method === opt.id ? 'text-white' : 'text-gray-400'}`}>{opt.label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-10 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4.5 text-sm font-extrabold uppercase text-white shadow-xl shadow-violet-600/30 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex justify-center"
            >
              {loading ? <Loading /> : 'Place Order Securely'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default PlaceOrder
