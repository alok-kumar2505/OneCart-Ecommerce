import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegListAlt } from 'react-icons/fa'
import { SiTicktick } from 'react-icons/si'
import { FiHome } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'

const links = [
  { icon: FiHome, label: 'Dashboard', path: '/' },
  { icon: IoIosAddCircleOutline, label: 'Add Product', path: '/add' },
  { icon: FaRegListAlt, label: 'Product List', path: '/lists' },
  { icon: SiTicktick, label: 'Orders', path: '/orders' },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <aside className="fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-14 flex-col border-r border-gray-200 bg-white pt-6 md:w-56">
      <nav className="flex flex-col gap-1 px-2">
        {links.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              isActive(path)
                ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
            }`}
          >
            <Icon className={`h-5 w-5 flex-shrink-0 ${isActive(path) ? 'text-indigo-600' : 'text-gray-400'}`} />
            <span className="hidden md:block">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
