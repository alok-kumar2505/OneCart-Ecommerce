import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchOutline, IoClose } from 'react-icons/io5'
import { FiShoppingCart, FiUser, FiPackage, FiLogOut, FiHome } from 'react-icons/fi'
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
      {/* ── Top Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E8E2D9]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex cursor-pointer items-center gap-2.5" onClick={() => navigate('/')}>
            <img src={logo} alt="OneCart" className="h-7 w-7 object-contain" />
            <span className="text-xl font-bold tracking-widest text-[#1A1A1A] uppercase">
              One<span className="text-[#C9A96E]">Cart</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-150 ${
                  isActive(link.path)
                    ? 'text-[#C9A96E] border-b-2 border-[#C9A96E]'
                    : 'text-[#1A1A1A] hover:text-[#C9A96E]'
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
              className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
              aria-label="Search"
            >
              {showSearch ? <IoClose className="h-5 w-5" /> : <IoSearchOutline className="h-5 w-5" />}
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="relative hidden md:flex p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
              aria-label="Cart"
            >
              <FiShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center bg-[#C9A96E] text-[10px] font-bold text-white">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(p => !p)}
                className="flex h-9 w-9 items-center justify-center bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-[#2D2D2D] transition-colors"
                aria-label="Account"
              >
                {userData?.name ? userData.name.slice(0, 1).toUpperCase() : <FiUser className="h-4 w-4" />}
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 w-52 bg-white border border-[#E8E2D9] shadow-lg py-2 animate-slide-down z-50">
                  {userData && (
                    <div className="px-4 py-2 border-b border-[#E8E2D9] mb-1">
                      <p className="text-sm font-semibold text-[#1A1A1A] truncate">{userData.name}</p>
                      <p className="text-xs text-[#6B6360] truncate">{userData.email}</p>
                    </div>
                  )}
                  <button onClick={() => { navigate('/order'); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2 text-xs font-medium tracking-wide text-[#1A1A1A] hover:bg-[#FAF8F4] hover:text-[#C9A96E] transition-colors uppercase">
                    <FiPackage className="h-4 w-4" /> My Orders
                  </button>
                  <button onClick={() => { navigate('/about'); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2 text-xs font-medium tracking-wide text-[#1A1A1A] hover:bg-[#FAF8F4] hover:text-[#C9A96E] transition-colors uppercase">
                    <FiUser className="h-4 w-4" /> About
                  </button>
                  <div className="my-1 border-t border-[#E8E2D9]" />
                  {userData ? (
                    <button onClick={() => { handleLogout(); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2 text-xs font-medium tracking-wide text-[#1A1A1A] hover:bg-[#FAF8F4] transition-colors uppercase">
                      <FiLogOut className="h-4 w-4" /> Log Out
                    </button>
                  ) : (
                    <button onClick={() => { navigate('/login'); setShowProfile(false) }} className="flex w-full items-center gap-3 px-4 py-2 text-xs font-medium tracking-wide text-[#C9A96E] hover:bg-[#FAF8F4] transition-colors uppercase">
                      <FiUser className="h-4 w-4" /> Log In
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="border-t border-[#E8E2D9] bg-white px-4 py-3 animate-slide-down">
            <div className="mx-auto flex max-w-2xl items-center gap-3 border border-[#E8E2D9] bg-[#FAF8F4] px-4 py-2.5 focus-within:border-[#C9A96E] transition-colors">
              <IoSearchOutline className="h-4 w-4 flex-shrink-0 text-[#6B6360]" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder-[#6B6360] outline-none"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                autoFocus
              />
              {search && <button onClick={() => setSearch('')} className="text-[#6B6360] hover:text-[#1A1A1A]"><IoClose className="h-4 w-4" /></button>}
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E8E2D9]">
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
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive(path) ? 'text-[#C9A96E]' : 'text-[#6B6360] hover:text-[#1A1A1A]'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold tracking-wide uppercase">{label}</span>
              {badge > 0 && (
                <span className="absolute -top-0.5 right-1 flex h-4 w-4 items-center justify-center bg-[#C9A96E] text-[9px] font-bold text-white">
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
