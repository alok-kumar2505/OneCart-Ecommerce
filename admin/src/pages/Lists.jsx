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
    <div className="bg-[#F9F9F9] text-black min-h-screen">
      <Nav />
      <Sidebar />

      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10 pb-24">
        <div className="max-w-5xl">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-black mb-2">Product Catalog</h1>
              <p className="text-sm text-gray-500">Manage all {list.length} products in your store.</p>
            </div>
            <a
              href="/add"
              className="inline-flex justify-center items-center px-8 py-3 bg-[#8B1B1B] hover:bg-[#6c1414] text-white font-bold text-[11px] tracking-widest uppercase transition-colors"
            >
              + Add Product
            </a>
          </div>

          {list.length === 0 ? (
            <div className="bg-white p-16 text-center border border-gray-200 mt-10 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 mx-auto flex items-center justify-center mb-6 border border-gray-200 rounded-full">
                <FiBox className="h-8 w-8 text-gray-400" />
              </div>
              <p className="font-playfair text-xl font-bold text-black mb-2">Catalog is empty</p>
              <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">You haven't added any products yet. Start by creating your first product.</p>
              <a href="/add" className="text-black hover:text-[#8B1B1B] font-bold underline underline-offset-4 tracking-wider text-[11px] uppercase">Add your first product</a>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-6 border-b border-gray-200 bg-gray-50 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black">
                <span className="w-14">Image</span>
                <span>Name</span>
                <span className="hidden sm:block text-center">Category</span>
                <span className="text-center">Price</span>
                <span className="text-center">Action</span>
              </div>

              <div className="divide-y divide-gray-200">
                {list.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-6 px-6 py-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-14 w-14 overflow-hidden border border-gray-200 bg-white">
                      <img src={item.image1} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm line-clamp-2">{item.name}</p>
                    </div>
                    <span className="hidden sm:block border border-gray-300 px-3 py-1 text-[10px] font-bold uppercase text-black text-center whitespace-nowrap bg-white">
                      {item.category}
                    </span>
                    <span className="font-playfair text-sm font-bold text-black text-center whitespace-nowrap">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => removeList(item._id)}
                      className="flex items-center justify-center p-2 text-gray-500 hover:text-[#8B1B1B] transition-colors mx-auto"
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
