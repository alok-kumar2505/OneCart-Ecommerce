import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiPlusSquare, FiList, FiCheckSquare } from 'react-icons/fi'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/add', label: 'Add Items', icon: FiPlusSquare },
    { path: '/lists', label: 'List Items', icon: FiList },
    { path: '/orders', label: 'Orders', icon: FiCheckSquare },
  ]

  return (
    <aside className="fixed top-20 bottom-0 left-0 z-30 w-16 md:w-64 bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300">
      <nav className="flex flex-col gap-2 p-3 md:p-4 mt-4">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path || (path === '/' && location.pathname === '/home')
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-4 px-3 md:px-4 py-4 transition-all duration-300 group ${
                isActive 
                  ? 'bg-gray-50 border-r-4 border-[#8B1B1B]' 
                  : 'hover:bg-gray-50 border-r-4 border-transparent'
              }`}
            >
              <Icon 
                className={`h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#8B1B1B]' : 'text-gray-400 group-hover:text-black'
                }`} 
              />
              <span 
                className={`hidden md:block text-[11px] font-bold tracking-widest uppercase transition-colors ${
                  isActive ? 'text-black' : 'text-gray-500 group-hover:text-black'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
