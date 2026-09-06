import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FiShoppingBag, FiUsers, FiBox } from 'react-icons/fi'
import { BiRupee } from 'react-icons/bi'
import Loading from '../component/Loading'

function Home() {
  const { serverUrl } = useContext(authDataContext)
  const [stats, setStats] = useState({ dailyRevenue: 0, weeklyRevenue: 0, monthlyRevenue: 0, orders: 0 })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const response = await axios.post(serverUrl + '/api/order/dashboard-stats', {}, { withCredentials: true })
      if (response.data) {
        setStats(response.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [serverUrl])

  const statCards = [
    { label: 'Daily Earning', value: `₹${stats.dailyRevenue.toLocaleString()}`, icon: BiRupee, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-500/20' },
    { label: 'Weekly Earning', value: `₹${stats.weeklyRevenue.toLocaleString()}`, icon: BiRupee, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-500/20' },
    { label: 'Monthly Earning', value: `₹${stats.monthlyRevenue.toLocaleString()}`, icon: BiRupee, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-500/20' },
    { label: 'Total Orders', value: stats.orders, icon: FiShoppingBag, color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-500/20' },
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
        {loading ? (
          <div className="flex justify-center py-20">
            <Loading />
          </div>
        ) : (
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
        )}

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
