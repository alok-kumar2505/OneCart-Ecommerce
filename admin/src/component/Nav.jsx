import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { FiLogOut } from 'react-icons/fi'

function Nav() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)

  const logOut = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      toast.success('Logged out successfully')
      getAdmin()
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="OneCart" className="h-7 w-7 object-contain" />
        <span className="text-lg font-bold text-gray-900">
          One<span className="text-indigo-600">Cart</span>
        </span>
        <span className="ml-2 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
          Admin
        </span>
      </div>
      <button
        onClick={logOut}
        className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <FiLogOut className="h-4 w-4" /> Log Out
      </button>
    </header>
  )
}

export default Nav
