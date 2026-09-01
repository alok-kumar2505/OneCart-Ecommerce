import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchOutline, IoClose } from 'react-icons/io5'
import { FiShoppingCart, FiUser, FiPackage, FiLogOut, FiMenu, FiX, FiHome } from 'react-icons/fi'
import { HiOutlineCollection } from 'react-icons/hi'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      await getCurrentUser()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collection' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* ── Top Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="OneCart" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              One<span className="text-indigo-600">Cart</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                  ${isActive(link.path)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button
              onClick={() => { setShowSearch(prev => !prev); if (!showSearch) navigate('/collection') }}
              className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Search"
            >
              {showSearch ? <IoClose className="h-5 w-5" /> : <IoSearchOutline className="h-5 w-5" />}
            </button>

            {/* Cart — desktop only */}
            <button
              onClick={() => navigate('/cart')}
              className="relative hidden md:flex p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Cart"
            >
              <FiShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* User avatar / profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(prev => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                aria-label="Account"
              >
                {userData?.name ? userData.name.slice(0, 1).toUpperCase() : <FiUser className="h-4 w-4" />}
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 w-52 rounded-xl bg-white shadow-xl border border-gray-100 py-2 animate-slide-down z-50">
                  {userData && (
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{userData.name}</p>
                      <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                    </div>
                  )}
                  <button
                    onClick={() => { navigate('/order'); setShowProfile(false) }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <FiPackage className="h-4 w-4" /> My Orders
                  </button>
                  <button
                    onClick={() => { navigate('/about'); setShowProfile(false) }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <FiUser className="h-4 w-4" /> About
                  </button>
                  <div className="my-1 border-t border-gray-100" />
                  {userData ? (
                    <button
                      onClick={() => { handleLogout(); setShowProfile(false) }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="h-4 w-4" /> Log Out
                    </button>
                  ) : (
                    <button
                      onClick={() => { navigate('/login'); setShowProfile(false) }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <FiUser className="h-4 w-4" /> Log In
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Inline Search Bar ── */}
        {showSearch && (
          <div className="border-t border-gray-100 bg-white px-4 py-3 animate-slide-down">
            <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <IoSearchOutline className="h-5 w-5 flex-shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                autoFocus
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                  <IoClose className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-1px_10px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { icon: FiHome, label: 'Home', path: '/' },
            { icon: HiOutlineCollection, label: 'Shop', path: '/collection' },
            { icon: FiShoppingCart, label: 'Cart', path: '/cart', badge: getCartCount() },
            { icon: MdContacts, label: 'Contact', path: '/contact' },
          ].map(({ icon: Icon, label, path, badge }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors
                ${isActive(path) ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
              {badge > 0 && (
                <span className="absolute -top-0.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
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
