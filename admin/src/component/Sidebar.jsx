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
    <aside className="fixed top-20 bottom-0 left-0 z-30 w-16 md:w-64 glass-panel border-r border-white/10 overflow-y-auto transition-all duration-300">
      <nav className="flex flex-col gap-2 p-3 md:p-4">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path || (path === '/' && location.pathname === '/home')
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-4 rounded-xl px-3 md:px-4 py-3 transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-violet-600/20 to-transparent border border-violet-500/30' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon 
                className={`h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-violet-400' : 'text-gray-500 group-hover:text-gray-300'
                }`} 
              />
              <span 
                className={`hidden md:block text-sm font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                }`}
              >
                {label}
              </span>
              
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-violet-400 to-indigo-500 rounded-r-full hidden md:block" />
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
