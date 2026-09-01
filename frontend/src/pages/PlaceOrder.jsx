import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import Footer from '../component/Footer'

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '', pinCode: '', country: '', phone: ''
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData(d => ({ ...d, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, currency: order.currency,
      name: 'Order Payment', description: 'Order Payment',
      order_id: order.id, receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) { navigate('/order'); setCartItem({}) }
      },
    }
    new window.Razorpay(options).open()
  }

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const info = structuredClone(products.find(p => p._id === items))
            if (info) { info.size = item; info.quantity = cartItem[items][item]; orderItems.push(info) }
          }
        }
      }
      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee }

      if (method === 'cod') {
        const result = await axios.post(serverUrl + '/api/order/placeorder', orderData, { withCredentials: true })
        if (result.data) { setCartItem({}); toast.success('Order Placed!'); navigate('/order') }
        else toast.error('Order failed')
      } else if (method === 'razorpay') {
        const result = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true })
        if (result.data) { initPay(result.data); toast.success('Order Placed!') }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24 md:pb-8">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Title text1="CHECKOUT" text2="" />
        </div>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ── Delivery Info ── */}
            <div className="flex-1">
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <h2 className="mb-5 text-base font-bold text-gray-900">Delivery Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-600">First Name</label>
                      <input type="text" name="firstName" placeholder="John" className={inputClass} required onChange={onChange} value={formData.firstName} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-600">Last Name</label>
                      <input type="text" name="lastName" placeholder="Doe" className={inputClass} required onChange={onChange} value={formData.lastName} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Email</label>
                    <input type="email" name="email" placeholder="you@example.com" className={inputClass} required onChange={onChange} value={formData.email} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Street Address</label>
                    <input type="text" name="street" placeholder="123 Main Street" className={inputClass} required onChange={onChange} value={formData.street} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-600">City</label>
                      <input type="text" name="city" placeholder="City" className={inputClass} required onChange={onChange} value={formData.city} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-600">State</label>
                      <input type="text" name="state" placeholder="State" className={inputClass} required onChange={onChange} value={formData.state} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-600">Pin Code</label>
                      <input type="text" name="pinCode" placeholder="000000" className={inputClass} required onChange={onChange} value={formData.pinCode} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-600">Country</label>
                      <input type="text" name="country" placeholder="India" className={inputClass} required onChange={onChange} value={formData.country} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Phone</label>
                    <input type="text" name="phone" placeholder="+91 XXXXX XXXXX" className={inputClass} required onChange={onChange} value={formData.phone} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Order Summary & Payment ── */}
            <div className="lg:w-80 space-y-4">
              <CartTotal />

              {/* Payment Method */}
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                <h2 className="mb-4 text-sm font-bold text-gray-900">Payment Method</h2>
                <div className="space-y-3">
                  {/* Razorpay */}
                  <button
                    type="button"
                    onClick={() => setMethod('razorpay')}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                      method === 'razorpay' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`h-4 w-4 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                      method === 'razorpay' ? 'border-indigo-600' : 'border-gray-300'
                    }`}>
                      {method === 'razorpay' && <div className="h-2 w-2 rounded-full bg-indigo-600" />}
                    </div>
                    <img src={razorpay} alt="Razorpay" className="h-6 object-contain" />
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setMethod('cod')}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                      method === 'cod' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`h-4 w-4 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                      method === 'cod' ? 'border-indigo-600' : 'border-gray-300'
                    }`}>
                      {method === 'cod' && <div className="h-2 w-2 rounded-full bg-indigo-600" />}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Cash on Delivery</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? <Loading /> : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default PlaceOrder
