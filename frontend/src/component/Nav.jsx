import React, { useContext, useState } from 'react'
import { IoSearchOutline, IoClose } from 'react-icons/io5'
import { FiShoppingCart, FiUser, FiPackage, FiLogOut, FiHome } from 'react-icons/fi'
import { HiOutlineCollection, HiSparkles } from 'react-icons/hi'
import { MdContacts } from 'react-icons/md'
import { userDataContext } from '../context/UserContext'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { shopDataContext } from '../context/ShopContext'

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      await getCurrentUser()
      navigate('/login')
    } catch (error) { console.log(error) }
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collection' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* ── Header Navigation Blueprint ── */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* Logo Blueprint */}
          <div className="flex cursor-pointer items-center gap-3" onClick={() => navigate('/')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-pink-500 to-amber-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                <HiSparkles className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <span className="font-display text-2xl font-bold text-white tracking-wide uppercase">
              One<span className="text-amber-500">Cart</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'gradient-text font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setShowSearch(p => !p); if (!showSearch) navigate('/collection') }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-colors"
              aria-label="Search"
            >
              {showSearch ? <IoClose className="h-5 w-5" /> : <IoSearchOutline className="h-5 w-5" />}
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="relative hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-colors"
              aria-label="Cart"
            >
              <FiShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md text-[10px] font-bold text-white">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(p => !p)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all"
                aria-label="Account"
              >
                {userData?.name ? (
                  <span className="truncate max-w-[80px]">{userData.name}</span>
                ) : (
                  <>
                    <FiUser className="h-4 w-4" /> <span>Account</span>
                  </>
                )}
              </button>

              {showProfile && (
                <div className="absolute right-0 top-14 w-52 rounded-2xl glass-panel border border-white/10 shadow-2xl py-2 animate-slide-down z-50">
                  {userData && (
                    <div className="px-4 py-3 border-b border-white/10 mb-1">
                      <p className="text-sm font-bold text-white truncate">{userData.name}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{userData.email}</p>
                    </div>
                  )}
                  <button onClick={() => { navigate('/order'); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    <FiPackage className="h-4 w-4 text-violet-400" /> My Orders
                  </button>
                  <button onClick={() => { navigate('/about'); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    <FiUser className="h-4 w-4 text-pink-400" /> About
                  </button>
                  <div className="my-1 border-t border-white/10" />
                  {userData ? (
                    <button onClick={() => { handleLogout(); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <FiLogOut className="h-4 w-4 text-gray-400" /> Log Out
                    </button>
                  ) : (
                    <button onClick={() => { navigate('/login'); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/5 transition-colors">
                      <FiUser className="h-4 w-4 text-amber-400" /> Log In
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar - Adapted from blueprint */}
        {showSearch && (
          <div className="absolute left-0 right-0 top-full glass-panel border-b border-white/10 p-4 animate-slide-down z-30">
            <div className="max-w-4xl mx-auto relative">
              <div className="relative glass-panel rounded-2xl p-2 shadow-2xl border-white/15 focus-within:border-violet-500/60 focus-within:ring-4 focus-within:ring-violet-500/20 transition-all">
                <div className="flex items-center gap-3">
                  <IoSearchOutline className="w-5 h-5 text-violet-400 ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none py-2"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    autoFocus
                  />
                  {search && <button onClick={() => setSearch('')} className="p-2 text-gray-500 hover:text-white"><IoClose className="h-4 w-4" /></button>}
                  <button onClick={() => navigate('/collection')} className="hidden sm:block px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-violet-600/25">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-panel border-t border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-3">
          {[
            { icon: FiHome, label: 'Home', path: '/' },
            { icon: HiOutlineCollection, label: 'Shop', path: '/collection' },
            { icon: FiShoppingCart, label: 'Cart', path: '/cart', badge: getCartCount() },
            { icon: MdContacts, label: 'Contact', path: '/contact' },
          ].map(({ icon: Icon, label, path, badge }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                isActive(path) ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive(path) ? 'text-violet-400' : ''}`} />
              <span className={`text-[10px] font-semibold ${isActive(path) ? 'text-white' : ''}`}>{label}</span>
              {badge > 0 && (
                <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-[9px] font-bold text-white shadow-md">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Nav
