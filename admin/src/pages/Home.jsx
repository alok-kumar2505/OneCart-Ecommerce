import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiPackage, FiShoppingBag, FiTrendingUp, FiUsers } from 'react-icons/fi'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, { withCredentials: true })
      setTotalProducts(products.data.length)
      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      setTotalOrders(orders.data.length)
    } catch (err) {
      console.error('Failed to fetch counts', err)
    }
  }

  useEffect(() => { fetchCounts() }, [])

  const stats = [
    {
      icon: FiShoppingBag,
      label: 'Total Products',
      value: totalProducts,
      color: 'indigo',
    },
    {
      icon: FiPackage,
      label: 'Total Orders',
      value: totalOrders,
      color: 'violet',
    },
    {
      icon: FiTrendingUp,
      label: 'Revenue',
      value: '—',
      color: 'green',
    },
    {
      icon: FiUsers,
      label: 'Customers',
      value: '—',
      color: 'orange',
    },
  ]

  const colorMap = {
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'border-violet-100' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Nav />
      <Sidebar />

      <main className="ml-14 pt-16 md:ml-56">
        <div className="max-w-5xl px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Welcome back, Admin. Here's an overview of your store.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, color }) => {
              const c = colorMap[color]
              return (
                <div
                  key={label}
                  className={`flex items-start gap-4 rounded-2xl border ${c.border} bg-white p-5 shadow-sm`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${c.icon}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <a href="/add" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                + Add Product
              </a>
              <a href="/orders" className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                View Orders
              </a>
              <a href="/lists" className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                Manage Products
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
