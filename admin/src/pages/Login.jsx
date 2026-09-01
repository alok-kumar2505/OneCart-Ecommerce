import React, { useState, useContext } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from 'react-icons/io5'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiShield } from 'react-icons/fi'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const AdminLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
      toast.success('Welcome, Admin!')
      getAdmin()
      navigate('/')
      setLoading(false)
    } catch (error) {
      toast.error('Invalid admin credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <img src={logo} alt="OneCart" className="h-9 w-9 object-contain" />
          <span className="text-2xl font-bold text-gray-900">
            One<span className="text-indigo-600">Cart</span>
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white border border-gray-100 px-8 py-10 shadow-sm">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
              <FiShield className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin Sign In</h1>
            <p className="text-sm text-gray-500">Restricted access — authorised personnel only</p>
          </div>

          <form onSubmit={AdminLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="admin@onecart.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShow(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show ? <IoEye className="h-5 w-5" /> : <IoEyeOutline className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
