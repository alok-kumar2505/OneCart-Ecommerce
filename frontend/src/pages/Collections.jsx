import React, { useContext, useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'

function Collections() {
  const { products, search, showSearch } = useContext(shopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search) copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    setFilterProduct(copy)
  }

  const sortProducts = () => {
    const copy = filterProduct.slice()
    if (sortType === 'low-high') setFilterProduct(copy.sort((a, b) => a.price - b.price))
    else if (sortType === 'high-low') setFilterProduct(copy.sort((a, b) => b.price - a.price))
    else applyFilter()
  }

  useEffect(() => { sortProducts() }, [sortType])
  useEffect(() => { setFilterProduct(products) }, [products])
  useEffect(() => { applyFilter() }, [search, showSearch])

  return (
    <div className="bg-white min-h-screen pt-12 pb-24 px-4 sm:px-8 max-w-[1440px] mx-auto border-t border-gray-200">
      
      {/* ── Header ── */}
      <div className="mb-12 text-center">
        <h1 className="font-playfair text-5xl sm:text-6xl text-black mb-4">ALL COLLECTIONS</h1>
        <p className="text-gray-500 text-sm">Showing {filterProduct.length} luxury pieces crafted in timeless silhouettes.</p>
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-4 gap-4">
        <button className="border border-gray-300 text-black text-xs font-bold tracking-widest px-6 py-2 flex items-center gap-2 hover:bg-gray-50">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H14V2H0V0ZM3 5H11V7H3V5ZM6 10H8V12H6V10Z" fill="currentColor"/>
          </svg>
          FILTERS
        </button>
        
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500">
          <span>Sort By:</span>
          <div className="relative">
            <select
              className="appearance-none bg-[#333333] text-white pl-4 pr-10 py-2 cursor-pointer focus:outline-none"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Newest Additions</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none w-3 h-3" />
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      {filterProduct.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filterProduct.map((item, i) => (
            <Card 
              key={i} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image1} 
              category={item.category} 
              oldPrice={item.oldPrice || Math.round(item.price * 1.2)} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xl font-playfair text-black mb-2">No products found</p>
          <p className="text-sm text-gray-500">Try adjusting your search to find what you're looking for.</p>
        </div>
      )}
    </div>
  )
}

export default Collections