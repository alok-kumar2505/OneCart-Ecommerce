import React, { useState, useContext } from 'react'
import Logo from '../assets/logo.png'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { userDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Registration() {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true })
      getCurrentUser()
      navigate('/')
      toast.success('Account created successfully!')
      setLoading(false)
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed.'
      toast.error(message)
      setLoading(false)
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      await axios.post(serverUrl + '/api/auth/googlelogin', { name: user.displayName, email: user.email }, { withCredentials: true })
      getCurrentUser()
      navigate('/')
      toast.success('Account created successfully!')
    } catch (error) {
      toast.error('Google sign-up failed.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div
          className="mb-8 flex cursor-pointer items-center justify-center gap-2"
          onClick={() => navigate('/')}
        >
          <img src={Logo} alt="OneCart" className="h-9 w-9 object-contain" />
          <span className="text-2xl font-bold text-gray-900">
            One<span className="text-indigo-600">Cart</span>
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white px-8 py-10 shadow-sm border border-gray-100">
          <h1 className="mb-1 text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="mb-8 text-sm text-gray-500">Join OneCart and start shopping smarter</p>

          {/* Google */}
          <button
            onClick={googleSignup}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors active:scale-[0.98]"
          >
            <img src={google} alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or sign up with email</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
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
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all pr-11"
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
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors active:scale-[0.98] disabled:opacity-70"
              disabled={loading}
            >
              {loading ? <Loading /> : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <span
              className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
              onClick={() => navigate('/login')}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
