import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { FiFilter } from 'react-icons/fi'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'

const categories = ['Men', 'Women', 'Kids']
const subCategories = ['TopWear', 'BottomWear', 'WinterWear']

function Collections() {
  const [showFilter, setShowFilter] = useState(false)
  const { products, search, showSearch } = useContext(shopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (val) => {
    setCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val])
  }
  const toggleSubCategory = (val) => {
    setSubCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val])
  }

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search) copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    if (category.length > 0) copy = copy.filter(i => category.includes(i.category))
    if (subCategory.length > 0) copy = copy.filter(i => subCategory.includes(i.subCategory))
    setFilterProduct(copy)
  }

  const sortProducts = () => {
    let copy = filterProduct.slice()
    if (sortType === 'low-high') setFilterProduct(copy.sort((a, b) => a.price - b.price))
    else if (sortType === 'high-low') setFilterProduct(copy.sort((a, b) => b.price - a.price))
    else applyFilter()
  }

  useEffect(() => { sortProducts() }, [sortType])
  useEffect(() => { setFilterProduct(products) }, [products])
  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch])

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24 md:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">

        {/* ── Sidebar Filter ── */}
        <aside className="w-full border-b border-gray-200 bg-white md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:min-w-[16rem] md:overflow-y-auto md:border-b-0 md:border-r md:border-gray-200">
          {/* Mobile toggle */}
          <button
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 md:hidden"
            onClick={() => setShowFilter(p => !p)}
          >
            <span className="flex items-center gap-2">
              <FiFilter className="h-4 w-4 text-indigo-600" /> Filters
            </span>
            {showFilter ? <FaChevronDown className="h-3 w-3 text-gray-400" /> : <FaChevronRight className="h-3 w-3 text-gray-400" />}
          </button>

          <div className={`px-5 py-4 space-y-6 ${showFilter ? 'block' : 'hidden'} md:block`}>
            {/* Category */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Category</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex cursor-pointer items-center gap-3 group">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="h-4 w-4 rounded border-gray-300 accent-indigo-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Sub-category */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Sub-Category</h3>
              <div className="space-y-2">
                {subCategories.map(sub => (
                  <label key={sub} className="flex cursor-pointer items-center gap-3 group">
                    <input
                      type="checkbox"
                      value={sub}
                      checked={subCategory.includes(sub)}
                      onChange={() => toggleSubCategory(sub)}
                      className="h-4 w-4 rounded border-gray-300 accent-indigo-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Title text1="ALL" text2="COLLECTIONS" />
              <p className="mt-1 text-sm text-gray-500">{filterProduct.length} products found</p>
            </div>
            <select
              className="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm outline-none hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {filterProduct.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filterProduct.map((item, index) => (
                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 text-5xl">🔍</div>
              <p className="text-lg font-semibold text-gray-700">No products found</p>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Collections