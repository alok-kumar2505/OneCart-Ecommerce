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
  const [stats, setStats] = useState({ 
    dailyRevenue: 0, weeklyRevenue: 0, monthlyRevenue: 0, 
    dailyOrders: 0, weeklyOrders: 0, monthlyOrders: 0, 
    totalOrders: 0 
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeFilter, setTimeFilter] = useState('Today') // 'Today', 'Weekly', 'Monthly', 'Custom'
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchStats = async () => {
    try {
      setLoading(true)
      const payload = {}
      if (timeFilter === 'Custom' && startDate && endDate) {
        payload.startDate = startDate
        payload.endDate = endDate
      }
      const response = await axios.post(serverUrl + '/api/order/dashboard-stats', payload, { withCredentials: true })
      if (response.data) {
        setStats(response.data)
      }
      const ordersResponse = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      if (ordersResponse.data) {
        // Reverse array so latest is first, then take top 5
        setRecentOrders(ordersResponse.data.reverse().slice(0, 5))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Re-fetch only if timeFilter is NOT custom, OR if it's custom and dates are ready (handled by an Apply button or use effect logic)
    // Actually, it's safer to just fetchStats when we change normal filters. 
    // For Custom, we'll fetch on 'Apply' button click.
    if (timeFilter !== 'Custom') {
      fetchStats()
    }
  }, [serverUrl, timeFilter])

  // Determine which stats to show based on filter
  let displayRevenue = 0;
  let displayOrders = 0;

  if (timeFilter === 'Today') {
    displayRevenue = stats.dailyRevenue;
    displayOrders = stats.dailyOrders;
  } else if (timeFilter === 'Weekly') {
    displayRevenue = stats.weeklyRevenue;
    displayOrders = stats.weeklyOrders;
  } else if (timeFilter === 'Monthly') {
    displayRevenue = stats.monthlyRevenue;
    displayOrders = stats.monthlyOrders;
  } else if (timeFilter === 'Custom') {
    displayRevenue = stats.customRevenue || 0;
    displayOrders = stats.customOrders || 0;
  }

  const statCards = [
    { label: `${timeFilter} Revenue`, value: `₹${displayRevenue.toLocaleString()}`, icon: BiRupee },
    { label: `${timeFilter} Orders`, value: displayOrders, icon: FiShoppingBag },
    { label: 'Total Orders (All Time)', value: stats.totalOrders, icon: FiBox },
  ]

  return (
    <div className="bg-[#F9F9F9] text-black min-h-screen">
      <Nav />
      <Sidebar />
      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-black mb-2">Dashboard Overview</h1>
            <p className="text-sm text-gray-500">Welcome back, admin. Here's what's happening with your store.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Period:</span>
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm font-bold bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="Weekly">This Week</option>
              <option value="Monthly">This Month</option>
              <option value="Custom">Custom Range</option>
            </select>
          </div>
        </div>

        {timeFilter === 'Custom' && (
          <div className="mb-8 p-4 bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col w-full sm:w-auto">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex flex-col w-full sm:w-auto mt-auto">
              <button 
                onClick={fetchStats}
                disabled={!startDate || !endDate}
                className="bg-black text-white px-6 py-2.5 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {loading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-md">
            <Loading className="h-12 w-12 text-[#8B1B1B]" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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

        {/* Recent Activity */}
        <div className="bg-white rounded-none p-8 border border-gray-200 shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-black mb-6">Recent Activity</h2>
          {recentOrders.length > 0 ? (
            <div className="space-y-6">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 flex items-center justify-center border border-gray-200">
                      <FiShoppingBag className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black uppercase tracking-wider">{order.address.firstName} {order.address.lastName}</p>
                      <p className="text-xs text-gray-500">Placed an order for {order.items.length} item(s)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-playfair text-lg font-bold text-black">₹{order.amount}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${order.payment ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {order.payment ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                <span className="text-2xl text-gray-300">✦</span>
              </div>
              <p className="text-gray-500 text-sm">Activity feed will appear here when connected to live data.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
