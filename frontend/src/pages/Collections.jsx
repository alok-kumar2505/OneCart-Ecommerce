import React, { useContext, useEffect, useState, useMemo } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Loading from '../component/Loading'

function Collections() {
  const { products, search, setSearch, productsLoading } = useContext(shopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [showFilter, setShowFilter] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState([])

  const uniqueCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean))
    return Array.from(cats)
  }, [products])

  const toggleCategory = (e) => {
    if (categoryFilter.includes(e.target.value)) {
      setCategoryFilter(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategoryFilter(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let copy = products.slice()

    // 1. Filter by Search Query
    if (search) {
      copy = copy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // 2. Filter by Category
    if (categoryFilter.length > 0) {
      copy = copy.filter(item => categoryFilter.includes(item.category))
    }

    // 3. Apply Sorting
    if (sortType === 'low-high') {
      copy = copy.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      copy = copy.sort((a, b) => b.price - a.price)
    }

    setFilterProduct(copy)
  }

  useEffect(() => {
    applyFilter()
  }, [products, search, categoryFilter, sortType])

  return (
    <div className="bg-white min-h-screen pt-12 pb-24 px-4 sm:px-8 max-w-[1440px] mx-auto border-t border-gray-200">
      
      {/* ── Header ── */}
      <div className="mb-12 text-center">
        <h1 className="font-playfair text-5xl sm:text-6xl text-black mb-4">ALL COLLECTIONS</h1>
        <p className="text-gray-500 text-sm">Showing {filterProduct.length} luxury pieces crafted in timeless silhouettes.</p>
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-4 gap-4 w-full">
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className={`border border-gray-300 text-black text-xs font-bold tracking-widest px-6 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors ${showFilter ? 'bg-gray-100' : ''}`}
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H14V2H0V0ZM3 5H11V7H3V5ZM6 10H8V12H6V10Z" fill="currentColor"/>
          </svg>
          FILTERS
        </button>
        
        <div className="flex-1 w-full sm:px-4 sm:flex sm:justify-center">
          <input 
            type="text"
            placeholder="Search collections..."
            className="w-full sm:max-w-md border border-gray-300 px-4 py-2 text-sm text-black focus:outline-none focus:border-black transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 shrink-0">
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* ── Filter Sidebar ── */}
        <div className={`md:w-64 flex-shrink-0 ${showFilter ? 'block' : 'hidden md:block'}`}>
          <div className="border border-gray-200 p-6 bg-gray-50/50">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-black">CATEGORIES</h3>
            <div className="space-y-3">
              {uniqueCategories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 hover:text-black group">
                  <input 
                    type="checkbox" 
                    value={cat} 
                    className="w-4 h-4 accent-black cursor-pointer"
                    onChange={toggleCategory}
                  />
                  <span className="capitalize">{cat}</span>
                </label>
              ))}
              {uniqueCategories.length === 0 && (
                <p className="text-xs text-gray-500">No categories found.</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div className="flex-1">
          {productsLoading ? (
            <div className="flex justify-center items-center py-32">
              <Loading />
            </div>
          ) : filterProduct.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              <p className="text-sm text-gray-500">Try adjusting your filters or search to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collections