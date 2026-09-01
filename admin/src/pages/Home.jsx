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
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
      <Nav />
      <Sidebar />
      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-sm text-gray-400">Welcome back, admin. Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, i) => (
            <div key={i} className="glass-panel-interactive rounded-2xl p-6 flex flex-col justify-between h-36 border-white/5">
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold text-gray-400">{stat.label}</span>
                <div className={`p-2 rounded-xl ${stat.bg} border`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity placeholder (simulated) */}
        <div className="glass-panel rounded-3xl p-8 border-white/10">
          <h2 className="font-display text-lg font-bold text-white mb-6">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-obsidian-800 rounded-full flex items-center justify-center mb-4 border border-white/5">
              <span className="text-2xl text-amber-500/50">✦</span>
            </div>
            <p className="text-gray-400 text-sm">Activity feed will appear here when connected to live data.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
