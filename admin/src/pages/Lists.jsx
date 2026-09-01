import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiBox } from 'react-icons/fi'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/product/list')
      setList(result.data)
    } catch (error) {
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) fetchList()
    } catch (error) {
    }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
      <Nav />
      <Sidebar />

      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10 pb-24">
        <div className="max-w-5xl">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-white mb-2">Product Catalog</h1>
              <p className="text-sm text-gray-400">Manage all {list.length} products in your store.</p>
            </div>
            <a
              href="/add"
              className="inline-flex justify-center items-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02]"
            >
              + Add Product
            </a>
          </div>

          {list.length === 0 ? (
            <div className="glass-panel rounded-[2.5rem] p-16 text-center border-white/10 mt-10">
              <div className="w-20 h-20 bg-gradient-to-br from-obsidian-800 to-obsidian-700 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner border border-white/5">
                <FiBox className="h-8 w-8 text-amber-500/50" />
              </div>
              <p className="font-display text-xl font-bold text-white mb-2">Catalog is empty</p>
              <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">You haven't added any products yet. Start by creating your first product.</p>
              <a href="/add" className="text-amber-500 hover:text-amber-400 font-bold underline underline-offset-4">Add your first product</a>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl border-white/10 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-6 border-b border-white/10 bg-white/5 px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <span className="w-14">Image</span>
                <span>Name</span>
                <span className="hidden sm:block text-center">Category</span>
                <span className="text-center">Price</span>
                <span className="text-center">Action</span>
              </div>

              <div className="divide-y divide-white/10">
                {list.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-6 px-6 py-5 hover:bg-white/5 transition-colors"
                  >
                    <div className="h-14 w-14 rounded-xl overflow-hidden bg-obsidian-900 border border-white/5">
                      <img src={item.image1} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm line-clamp-2">{item.name}</p>
                    </div>
                    <span className="hidden sm:block rounded-md bg-obsidian-800 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase text-amber-400 text-center whitespace-nowrap">
                      {item.category}
                    </span>
                    <span className="font-display text-sm font-bold text-white text-center whitespace-nowrap">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => removeList(item._id)}
                      className="flex items-center justify-center rounded-xl p-2.5 text-gray-500 hover:bg-white/5 hover:text-pink-500 transition-colors mx-auto"
                      aria-label="Remove Product"
                    >
                      <RiDeleteBin6Line className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Lists
