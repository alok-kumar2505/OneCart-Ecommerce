import React, { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { HiSparkles } from 'react-icons/hi'

function Nav() {
  const { serverUrl, getAdminUser } = useContext(authDataContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      getAdminUser()
      navigate('/login')
    } catch (error) { console.log(error) }
  }

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Logo Blueprint */}
        <div className="flex cursor-pointer items-center gap-3" onClick={() => navigate('/')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-pink-500 to-amber-500 p-0.5 shadow-lg hidden sm:block">
            <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
              <HiSparkles className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide uppercase leading-none">
              One<span className="text-amber-500">Cart</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mt-0.5">Admin Panel</span>
          </div>
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
