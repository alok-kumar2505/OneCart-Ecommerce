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
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F9F9F9] px-4 py-12">
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex flex-col items-center justify-center">
          <span className="font-playfair text-3xl font-bold tracking-[0.15em] text-black">
            ONECART
          </span>
          <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mt-2">Admin Panel</span>
        </div>

        <div className="bg-white rounded-none p-8 sm:p-10 border border-gray-200 shadow-sm">
          <h1 className="font-playfair text-2xl font-bold text-black mb-8 text-center">Secure Login</h1>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-black">Admin Email</label>
              <input 
                type="email" 
                placeholder="admin@onecart.com" 
                className="w-full border border-gray-300 px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors" 
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
                  className="w-full border border-gray-300 px-4 py-3 pr-12 text-sm text-black focus:outline-none focus:border-black transition-colors" 
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
              className="w-full bg-[#8B1B1B] hover:bg-[#6c1414] text-white text-xs font-bold tracking-widest uppercase py-4 mt-8 transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
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
