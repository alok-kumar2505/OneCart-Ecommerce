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
import Loading from '../component/Loading'
import { toast } from 'react-toastify'

const inputClass =
  'w-full border border-[#E8E2D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#A09890] outline-none focus:border-[#C9A96E] transition-colors'

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
    try {
      const res = await signInWithPopup(auth, provider)
      await axios.post(serverUrl + '/api/auth/googlelogin', { name: res.user.displayName, email: res.user.email }, { withCredentials: true })
      getCurrentUser(); navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed.')
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAF8F4] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-10 flex cursor-pointer items-center justify-center gap-2.5" onClick={() => navigate('/')}>
          <img src={Logo} alt="OneCart" className="h-8 w-8 object-contain" />
          <span className="text-xl font-bold tracking-widest uppercase text-[#1A1A1A]">
            One<span className="text-[#C9A96E]">Cart</span>
          </span>
        </div>

        <div className="bg-white border border-[#E8E2D9] px-8 py-10">
          <h1 className="mb-1 text-xl font-bold tracking-wide text-[#1A1A1A]">Welcome back</h1>
          <p className="mb-8 text-xs tracking-wide text-[#6B6360]">Sign in to your OneCart account</p>

          {/* Google */}
          <button
            onClick={googleLogin}
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-[#E8E2D9] bg-white px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#1A1A1A] hover:border-[#C9A96E] hover:bg-[#FAF8F4] transition-colors"
          >
            <img src={google} alt="Google" className="h-4 w-4" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-[#E8E2D9]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#A09890]">or</span>
            <div className="flex-1 border-t border-[#E8E2D9]" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B6360]">Email</label>
              <input type="email" placeholder="you@example.com" className={inputClass} required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B6360]">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} placeholder="••••••••" className={`${inputClass} pr-11`} required onChange={(e) => setPassword(e.target.value)} value={password} />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A09890] hover:text-[#1A1A1A]">
                  {show ? <IoEye className="h-4 w-4" /> : <IoEyeOutline className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center border border-[#1A1A1A] bg-[#1A1A1A] py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-[#2D2D2D] transition-colors disabled:opacity-70"
            >
              {loading ? <Loading /> : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs tracking-wide text-[#6B6360]">
            Don't have an account?{' '}
            <span className="cursor-pointer font-bold text-[#C9A96E] hover:text-[#A8895A]" onClick={() => navigate('/signup')}>
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
