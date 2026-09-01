import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiPackage } from 'react-icons/fi'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/product/list')
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) fetchList()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Nav />
      <Sidebar />

      <main className="ml-14 pt-16 md:ml-56">
        <div className="max-w-4xl px-6 py-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product List</h1>
              <p className="mt-1 text-sm text-gray-500">{list.length} products in your store</p>
            </div>
            <a
              href="/add"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              + Add Product
            </a>
          </div>

          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-100 py-24 text-center shadow-sm">
              <FiPackage className="mb-4 h-12 w-12 text-gray-200" />
              <p className="text-base font-semibold text-gray-600">No products yet</p>
              <p className="mt-1 text-sm text-gray-400">Add your first product to get started.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <span className="w-16">Image</span>
                <span>Name</span>
                <span className="text-center">Category</span>
                <span className="text-center">Price</span>
                <span className="text-center">Action</span>
              </div>

              <div className="divide-y divide-gray-50">
                {list.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 text-center whitespace-nowrap">
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-gray-900 text-center whitespace-nowrap">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => removeList(item._id)}
                      className="flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <RiDeleteBin6Line className="h-4 w-4" />
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
