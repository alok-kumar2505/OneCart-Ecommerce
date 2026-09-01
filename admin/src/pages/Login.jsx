import React, { useState, useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { HiSparkles } from 'react-icons/hi'
import { IoEyeOutline, IoEye } from 'react-icons/io5'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const { serverUrl, getAdminUser } = useContext(authDataContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const response = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
      if (response.data) { toast.success('Login Successful'); await getAdminUser(); navigate('/') }
      else { toast.error('Login Failed') }
    } catch (error) { toast.error(error.response?.data?.message || 'Error occurred.') }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-obsidian-950 text-gray-200 px-4 py-12 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-pink-500 to-amber-500 p-0.5 shadow-lg mb-4">
            <div className="w-full h-full bg-obsidian-950 rounded-[14px] flex items-center justify-center">
              <HiSparkles className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-wide uppercase text-white">
            One<span className="text-amber-500">Cart</span>
          </span>
          <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mt-1">Admin Panel</span>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900/80 to-obsidian-950/90 -z-10" />

          <h1 className="font-display text-xl font-bold text-white mb-8 text-center">Secure Admin Login</h1>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Admin Email</label>
              <input 
                type="email" 
                placeholder="admin@onecart.com" 
                className="glass-input w-full rounded-xl px-5 py-3.5 text-sm" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
              />
            </div>
            
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
              <div className="relative">
                <input 
                  type={show ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="glass-input w-full rounded-xl px-5 py-3.5 pr-12 text-sm" 
                  required 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {show ? <IoEye className="h-5 w-5" /> : <IoEyeOutline className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loading /> : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
