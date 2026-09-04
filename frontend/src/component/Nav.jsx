import React, { useContext, useState, useEffect } from 'react'
import { IoSearchOutline, IoClose } from 'react-icons/io5'
import { FiShoppingCart, FiUser, FiPackage, FiLogOut, FiHeart, FiBell } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { userDataContext } from '../context/UserContext'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { shopDataContext } from '../context/ShopContext'

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount, cartItem, products, currency, updateQuantity, getCartAmount } = useContext(shopDataContext)
  const [showProfile, setShowProfile] = useState(false)
  const [showCartSidebar, setShowCartSidebar] = useState(false)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) tempData.push({ _id: items, size: item, quantity: cartItem[items][item] })
      }
    }
    setCartData(tempData)
  }, [cartItem])

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true })
      await getCurrentUser()
      navigate('/login')
    } catch (error) {  }
  }

  const handleSearchSubmit = () => {
    if (search.trim()) {
      setShowSearch(false)
      navigate('/collection')
    }
  }

  return (
    <>
      {/* ── Top Announcement Banner ── */}
      <div className="w-full bg-black text-white text-[10px] font-bold tracking-widest text-center py-2 uppercase">
        Complimentary shipping & duties on all orders above ₹2,999
      </div>

      {/* ── Main Header Navigation ── */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-8">

          {/* Left Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { name: 'SHOP', path: '/collection' },
              { name: 'ABOUT US', path: '/about' },
              { name: 'CONTACT', path: '/contact' },
              { name: 'ORDERS', path: '/order' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-[11px] font-bold tracking-widest text-gray-800 hover:text-black transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Center Logo */}
          <div className="flex cursor-pointer items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2" onClick={() => navigate('/')}>
             <span className="font-playfair text-3xl tracking-[0.15em] text-black">ONECART</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            {/* Icons */}
            <div className="flex items-center gap-4 text-gray-800">
              <button onClick={() => setShowSearch(true)} aria-label="Search">
                <IoSearchOutline className="h-5 w-5 hover:text-black transition-colors" />
              </button>
              <button aria-label="Wishlist" className="hidden sm:block">
                <FiHeart className="h-5 w-5 hover:text-black transition-colors" />
              </button>
              <button aria-label="Notifications" className="hidden sm:block">
                <FiBell className="h-5 w-5 hover:text-black transition-colors" />
              </button>
              
              <button onClick={() => setShowCartSidebar(true)} className="relative" aria-label="Cart">
                <FiShoppingCart className="h-5 w-5 hover:text-black transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-[#8B1B1B] text-[9px] font-bold text-white rounded-full">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Auth Buttons / Profile */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              {userData ? (
                <div className="relative">
                  <button onClick={() => setShowProfile(p => !p)} className="text-[11px] font-bold tracking-widest text-gray-800 hover:text-black transition-colors">
                    {userData.name?.toUpperCase() || 'ACCOUNT'}
                  </button>
                  {showProfile && (
                    <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 shadow-xl py-2 z-50">
                      <button onClick={() => { navigate('/order'); setShowProfile(false) }} className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50">My Orders</button>
                      <button onClick={() => { navigate('/about'); setShowProfile(false) }} className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50">About</button>
                      <div className="my-1 border-t border-gray-100" />
                      <button onClick={() => { handleLogout(); setShowProfile(false) }} className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-gray-50">Log Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-1.5 text-[11px] font-bold tracking-widest hover:bg-gray-800 transition-colors">
                    LOG IN
                  </button>
                  <button onClick={() => navigate('/signup')} className="bg-white text-black border border-black px-4 py-1.5 text-[11px] font-bold tracking-widest hover:bg-gray-50 transition-colors">
                    REGISTER
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Search Modal ── */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Dimmed Background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSearch(false)} />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-white p-8 shadow-2xl z-10 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl tracking-wide">CATALOG SEARCH</h2>
              <button onClick={() => setShowSearch(false)} className="text-gray-500 hover:text-black">
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            
            <div className="relative border border-gray-300 p-3 mb-4 flex items-center">
              <IoSearchOutline className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search catalog or ask AI (e.g., 'Black leather jacket under 15000')"
                className="w-full bg-transparent text-black placeholder-gray-400 text-sm focus:outline-none"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                autoFocus
              />
            </div>
            
            <div className="flex gap-4 mb-8">
              <button onClick={handleSearchSubmit} className="bg-black text-white text-xs font-bold tracking-widest px-6 py-3 hover:bg-gray-800">
                SEARCH CATALOG
              </button>
            </div>
            
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-3">POPULAR SUGGESTIONS:</p>
              <div className="flex flex-wrap gap-2">
                {['Leather Jackets', 'Poplin Shirts', 'Pleated Trousers', 'Silk Slip Dress', 'Chelsea Boots'].map(tag => (
                  <button key={tag} onClick={() => { setSearch(tag); handleSearchSubmit() }} className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-3 py-1.5 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Slide-out Shopping Cart Sidebar ── */}
      {showCartSidebar && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Dimmed Background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCartSidebar(false)} />
          
          {/* Sidebar Content */}
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl z-10 animate-fade-in translate-x-0 transition-transform duration-300">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="font-playfair text-xl tracking-wide">SHOPPING BAG ({getCartCount()})</h2>
              <button onClick={() => setShowCartSidebar(false)} className="text-gray-500 hover:text-black">
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartData.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Your shopping bag is empty.</p>
              ) : (
                cartData.map((item, index) => {
                  const p = products.find(prod => prod._id === item._id)
                  if (!p) return null
                  return (
                    <div key={index} className="flex gap-4 border-b border-gray-100 pb-6">
                      <div className="w-20 h-28 bg-gray-100 flex-shrink-0">
                        <img src={p.image1} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-gray-900 leading-tight mb-1">{p.name}</p>
                          <button onClick={() => updateQuantity(item._id, item.size, 0)} className="text-gray-400 hover:text-red-500 ml-2">
                            <RiDeleteBin6Line className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">Size: {item.size} | Color: Default</p>
                        <p className="text-sm font-bold mb-3">{currency}{p.price}</p>
                        
                        <div className="flex items-center border border-gray-300 w-24 rounded-sm">
                          <button onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                          <span className="flex-1 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            
            {/* Footer */}
            {cartData.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-white">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <p>SUBTOTAL</p>
                  <p>{currency}{getCartAmount()}</p>
                </div>
                <div className="flex justify-between items-center text-base font-bold text-black mb-6">
                  <p>TOTAL</p>
                  <p>{currency}{getCartAmount()}</p>
                </div>
                <button 
                  onClick={() => { setShowCartSidebar(false); navigate('/placeorder') }}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold text-xs tracking-widest py-4 uppercase"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Nav
