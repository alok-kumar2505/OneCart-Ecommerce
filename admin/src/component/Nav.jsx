import React, { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiLogOut } from 'react-icons/fi'

function Nav() {
  const { serverUrl } = useContext(authDataContext)
  const { setAdminData } = useContext(adminDataContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      setAdminData(null)
      toast.success("Logout Successful")
      navigate('/')
    } catch (error) { 
      toast.error("Logout failed")
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex cursor-pointer items-center" onClick={() => navigate('/')}>
          <span className="font-playfair text-xl sm:text-2xl tracking-[0.15em] text-black">ONECART ADMIN</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="bg-black text-white px-5 py-2.5 text-[11px] font-bold tracking-widest hover:bg-gray-800 transition-colors uppercase"
          >
            Log Out
          </button>
        </div>
        
      </div>
    </header>
  )
}

export default Nav
