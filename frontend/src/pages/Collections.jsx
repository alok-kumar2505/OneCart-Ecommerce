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

  const toggleCategory = (val) => setCategory(p => p.includes(val) ? p.filter(i => i !== val) : [...p, val])
  const toggleSubCategory = (val) => setSubCategory(p => p.includes(val) ? p.filter(i => i !== val) : [...p, val])

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search) copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    if (category.length > 0) copy = copy.filter(i => category.includes(i.category))
    if (subCategory.length > 0) copy = copy.filter(i => subCategory.includes(i.subCategory))
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
  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch])

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-16 pb-24 md:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">

        {/* ── Sidebar Filter ── */}
        <aside className="w-full border-b border-[#E8E2D9] bg-white md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-60 md:min-w-[15rem] md:overflow-y-auto md:border-b-0 md:border-r md:border-[#E8E2D9]">
          <button
            className="flex w-full items-center justify-between px-5 py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#1A1A1A] md:hidden"
            onClick={() => setShowFilter(p => !p)}
          >
            <span className="flex items-center gap-2"><FiFilter className="h-4 w-4 text-[#C9A96E]" /> Filters</span>
            {showFilter ? <FaChevronDown className="h-3 w-3 text-[#A09890]" /> : <FaChevronRight className="h-3 w-3 text-[#A09890]" />}
          </button>

          <div className={`px-5 py-6 space-y-7 ${showFilter ? 'block' : 'hidden'} md:block`}>
            <div>
              <h3 className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A96E]">Category</h3>
              <div className="space-y-3">
                {categories.map(cat => (
                  <label key={cat} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={category.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="h-3.5 w-3.5 accent-[#C9A96E] cursor-pointer"
                    />
                    <span className="text-xs tracking-wide text-[#1A1A1A]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E8E2D9]" />

            <div>
              <h3 className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A96E]">Sub-Category</h3>
              <div className="space-y-3">
                {subCategories.map(sub => (
                  <label key={sub} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={subCategory.includes(sub)}
                      onChange={() => toggleSubCategory(sub)}
                      className="h-3.5 w-3.5 accent-[#C9A96E] cursor-pointer"
                    />
                    <span className="text-xs tracking-wide text-[#1A1A1A]">{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Title text1="ALL" text2="COLLECTIONS" />
              <p className="mt-1 text-xs tracking-wide text-[#6B6360]">{filterProduct.length} products</p>
            </div>
            <select
              className="h-10 border border-[#E8E2D9] bg-white px-4 text-xs tracking-wide text-[#1A1A1A] outline-none hover:border-[#C9A96E] focus:border-[#C9A96E] transition-colors cursor-pointer"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {filterProduct.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3">
              {filterProduct.map((item, i) => (
                <Card key={i} id={item._id} name={item.name} price={item.price} image={item.image1} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-[#E8E2D9] bg-white">
              <p className="text-4xl mb-5 text-[#E8D5B0]">✦</p>
              <p className="text-sm font-semibold tracking-widest uppercase text-[#1A1A1A]">No products found</p>
              <p className="mt-2 text-xs tracking-wide text-[#6B6360]">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Collections