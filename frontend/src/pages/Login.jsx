import React, { useState, useContext } from 'react'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { userDataContext } from '../context/UserContext'
import Loading from '../component/Loading'
import { toast } from 'react-toastify'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    setLoading(true); e.preventDefault()
    try {
      await axios.post(serverUrl + '/api/auth/login', { email, password }, { withCredentials: true })
      setLoading(false); getCurrentUser(); navigate('/'); toast.success('Welcome back!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.'); setLoading(false)
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    try {
      const res = await signInWithPopup(auth, provider)
      await axios.post(serverUrl + '/api/auth/googlelogin', { name: res.user.displayName, email: res.user.email }, { withCredentials: true })
      await getCurrentUser(); navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F9F9F9] px-4 py-12 relative">
      <div className="w-full max-w-md relative z-10">
        
        {/* Brand */}
        <div className="mb-8 flex cursor-pointer items-center justify-center gap-3" onClick={() => navigate('/')}>
          <span className="font-playfair text-3xl tracking-[0.15em] text-black">ONECART</span>
        </div>

        <div className="bg-white p-8 sm:p-10 border border-gray-200 shadow-sm relative overflow-hidden text-center">

          <h1 className="font-playfair text-2xl text-black mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500 mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-black">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full border border-gray-300 px-5 py-3.5 text-sm focus:outline-none focus:border-black transition-colors" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
              />
            </div>
            
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-black">Password</label>
              <div className="relative">
                <input 
                  type={show ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full border border-gray-300 px-5 py-3.5 pr-12 text-sm focus:outline-none focus:border-black transition-colors" 
                  required 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors">
                  {show ? <IoEye className="h-5 w-5" /> : <IoEyeOutline className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center bg-black py-4 text-xs font-bold tracking-widest uppercase text-white hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loading /> : 'Sign In'}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-[10px] tracking-widest uppercase text-gray-400">Or continue with</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Google */}
          <button
            onClick={googleLogin}
            disabled={loading}
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-white px-4 py-3.5 text-xs font-bold tracking-widest uppercase text-black hover:bg-gray-50 transition-colors disabled:opacity-70"
          >
            {loading ? <Loading /> : (
              <>
                <img src={google} alt="Google" className="h-4 w-4" />
                Google
              </>
            )}
          </button>

          <p className="mt-8 text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <span className="cursor-pointer font-bold tracking-widest uppercase text-black hover:text-gray-600 transition-colors" onClick={() => navigate('/signup')}>
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
