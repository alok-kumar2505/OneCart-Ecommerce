import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiDollarSign, FiShoppingBag, FiUsers, FiBox } from 'react-icons/fi'

function Home() {
  const { serverUrl } = useContext(authDataContext)
  const [stats, setStats] = useState({ revenue: 0, orders: 0, users: 0, products: 0 })

  useEffect(() => {
    // In a real app, you would fetch these stats from an endpoint.
    // Simulating stats for the dashboard.
    setStats({ revenue: 45230, orders: 124, users: 890, products: 45 })
  }, [serverUrl])

  const statCards = [
    { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: FiDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-500/20' },
    { label: 'Total Orders', value: stats.orders, icon: FiShoppingBag, color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-500/20' },
    { label: 'Active Users', value: stats.users, icon: FiUsers, color: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-500/20' },
    { label: 'Products Listed', value: stats.products, icon: FiBox, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-500/20' },
  ]

  return (
    <div className="bg-[#F9F9F9] text-black min-h-screen">
      <Nav />
      <Sidebar />
      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-2">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, admin. Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white rounded-none p-6 flex flex-col justify-between h-36 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{stat.label}</span>
                <div className={`p-2 rounded-full bg-gray-50 border border-gray-200 text-black`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="font-playfair text-3xl font-bold text-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity placeholder (simulated) */}
        <div className="bg-white rounded-none p-8 border border-gray-200 shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-black mb-6">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
              <span className="text-2xl text-gray-300">✦</span>
            </div>
            <p className="text-gray-500 text-sm">Activity feed will appear here when connected to live data.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
