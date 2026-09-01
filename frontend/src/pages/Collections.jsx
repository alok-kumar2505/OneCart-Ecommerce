import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { FiFilter } from 'react-icons/fi'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Nav from '../component/Nav'
import Footer from '../component/Footer'

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
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
      <Nav />
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row pb-24 md:pb-8 pt-8 px-4 sm:px-6 lg:px-8">

        {/* ── Sidebar Filter ── */}
        <aside className="w-full md:sticky md:top-24 md:h-[calc(100vh-8rem)] md:w-64 md:min-w-[16rem] md:overflow-y-auto mb-8 md:mb-0 md:mr-8 z-10">
          <div className="glass-panel rounded-2xl border-white/10 overflow-hidden">
            <button
              className="flex w-full items-center justify-between p-5 text-sm font-bold uppercase text-white md:hidden hover:bg-white/5 transition-colors"
              onClick={() => setShowFilter(p => !p)}
            >
              <span className="flex items-center gap-2">
                <FiFilter className="h-5 w-5 text-amber-500" /> Filters
              </span>
              {showFilter ? <FaChevronDown className="h-4 w-4 text-gray-400" /> : <FaChevronRight className="h-4 w-4 text-gray-400" />}
            </button>

            <div className={`p-5 space-y-8 ${showFilter ? 'block' : 'hidden'} md:block`}>
              <div>
                <h3 className="mb-5 text-xs font-bold tracking-[0.2em] uppercase text-white border-b border-white/10 pb-3">Category</h3>
                <div className="space-y-4">
                  {categories.map(cat => (
                    <label key={cat} className="flex cursor-pointer items-center gap-3 group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${category.includes(cat) ? 'bg-violet-600 border-violet-500' : 'border-gray-500 bg-obsidian-800 group-hover:border-violet-400'}`}>
                        {category.includes(cat) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input type="checkbox" className="hidden" checked={category.includes(cat)} onChange={() => toggleCategory(cat)} />
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-5 text-xs font-bold tracking-[0.2em] uppercase text-white border-b border-white/10 pb-3">Sub-Category</h3>
                <div className="space-y-4">
                  {subCategories.map(sub => (
                    <label key={sub} className="flex cursor-pointer items-center gap-3 group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${subCategory.includes(sub) ? 'bg-violet-600 border-violet-500' : 'border-gray-500 bg-obsidian-800 group-hover:border-violet-400'}`}>
                        {subCategory.includes(sub) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input type="checkbox" className="hidden" checked={subCategory.includes(sub)} onChange={() => toggleSubCategory(sub)} />
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <main className="flex-1">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Title text1="All" text2="Collections" />
              <p className="mt-2 text-sm text-gray-400">Showing {filterProduct.length} exclusive products</p>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none glass-input rounded-xl px-5 py-3 pr-10 text-sm font-medium w-full sm:w-auto cursor-pointer"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="relevant" className="bg-obsidian-900 text-white">Sort: Relevant</option>
                <option value="low-high" className="bg-obsidian-900 text-white">Price: Low to High</option>
                <option value="high-low" className="bg-obsidian-900 text-white">Price: High to Low</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3" />
            </div>
          </div>

          {filterProduct.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filterProduct.map((item, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${(i % 10) * 50}ms` }}>
                  <Card id={item._id} name={item.name} price={item.price} image={item.image1} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-16 text-center border-white/10 mt-10">
              <div className="w-20 h-20 bg-gradient-to-br from-obsidian-800 to-obsidian-700 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner border border-white/5">
                <p className="text-4xl text-amber-500/50 font-display">✦</p>
              </div>
              <p className="text-lg font-bold text-white mb-2">No products found</p>
              <p className="text-sm text-gray-400 max-w-md mx-auto">Try adjusting your filters or search term to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Collections