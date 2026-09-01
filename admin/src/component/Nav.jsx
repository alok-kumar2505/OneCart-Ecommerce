import React, { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import logo from '../assets/logo.png'

function Nav() {
  const { serverUrl, getAdminUser } = useContext(authDataContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      getAdminUser()
      navigate('/login')
    } catch (error) {  }
  }

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex cursor-pointer items-center" onClick={() => navigate('/')}>
          <img src={logo} alt="OneCart" className="h-9 w-auto object-contain" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all"
          >
            Log Out
          </button>
        </div>
        
      </div>
    </header>
  )
}

export default Nav
