import React, { useState, useContext } from 'react'
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
import { HiSparkles } from 'react-icons/hi'

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
    setLoading(true); e.preventDefault()
    try {
      await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true })
      getCurrentUser(); navigate('/'); toast.success('Account created!'); setLoading(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.'); setLoading(false)
    }
  }

  const googleSignup = async () => {
    setLoading(true)
    try {
      const res = await signInWithPopup(auth, provider)
      await axios.post(serverUrl + '/api/auth/googlelogin', { name: res.user.displayName, email: res.user.email }, { withCredentials: true })
      await getCurrentUser(); navigate('/'); toast.success('Account created!')
    } catch (error) { toast.error('Google sign-up failed.') }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-obsidian-950 text-gray-200 px-4 py-12 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex cursor-pointer items-center justify-center gap-3" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-pink-500 to-amber-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
              <HiSparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-wide uppercase text-white">
            One<span className="text-amber-500">Cart</span>
          </span>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900/80 to-obsidian-950/90 -z-10" />

          <h1 className="font-display text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-sm text-gray-400 mb-8">Join the exclusive world of OneCart</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
              <input type="text" placeholder="Your name" className="glass-input w-full rounded-xl px-5 py-3.5 text-sm" required onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
              <input type="email" placeholder="you@example.com" className="glass-input w-full rounded-xl px-5 py-3.5 text-sm" required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} placeholder="••••••••" className="glass-input w-full rounded-xl px-5 py-3.5 pr-12 text-sm" required onChange={(e) => setPassword(e.target.value)} value={password} />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {show ? <IoEye className="h-5 w-5" /> : <IoEyeOutline className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100">
              {loading ? <Loading /> : 'Create Account'}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-[10px] tracking-widest uppercase text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <button 
            onClick={googleSignup} 
            disabled={loading}
            type="button" 
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors disabled:opacity-70"
          >
            {loading ? <Loading /> : (
              <>
                <img src={google} alt="Google" className="h-5 w-5" /> Google
              </>
            )}
          </button>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <span className="cursor-pointer font-bold text-amber-500 hover:text-amber-400 transition-colors" onClick={() => navigate('/login')}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
