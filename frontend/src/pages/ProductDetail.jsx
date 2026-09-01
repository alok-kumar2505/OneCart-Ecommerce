import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { FiShoppingCart, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'
import Footer from '../component/Footer'
import Nav from '../component/Nav'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading } = useContext(shopDataContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [images, setImages] = useState([])
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const found = products.find(i => i._id === productId)
    if (found) {
      setProductData(found)
      const imgs = [found.image1, found.image2, found.image3, found.image4].filter(Boolean)
      setImages(imgs); setImage(found.image1)
    }
  }, [productId, products])

  if (!productData) return <div className="bg-obsidian-950 min-h-screen" />

  return (
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            {productData.category} <span className="text-gray-600 mx-2">/</span> <span className="gradient-text-gold">{productData.subCategory}</span>
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">

          {/* ── Images ── */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex flex-row gap-3 lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImage(img)}
                  className={`relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                    image === img ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-obsidian-950' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  {image !== img && <div className="absolute inset-0 bg-black/20" />}
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 overflow-hidden rounded-3xl glass-panel p-2">
              <div className="relative w-full h-full aspect-[4/5] overflow-hidden rounded-2xl bg-obsidian-900">
                <img
                  src={image}
                  alt={productData.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* ── Details ── */}
          <div className="flex flex-col gap-8 lg:w-1/2">
            <div>
              <h1 className="font-display text-3xl font-bold text-white sm:text-4xl leading-tight">{productData.name}</h1>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => <FaStar key={i} className="h-4 w-4 text-amber-500" />)}
                  <FaStarHalfAlt className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-sm font-medium text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">(124 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="glass-panel rounded-2xl p-6 border-white/10 border-l-4 border-l-violet-500">
              <p className="font-display text-4xl font-extrabold text-white">
                {currency}{productData.price}
                <span className="text-lg font-medium text-gray-500 line-through ml-4">{currency}{Math.floor(productData.price * 1.3)}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-gray-300">
              {productData.description} — Crafted with meticulous attention to detail, this piece offers an unparalleled blend of comfort and luxury. Perfect for those who demand excellence in their everyday style.
            </p>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-white">Select Size</p>
                <button className="text-xs font-medium text-violet-400 hover:text-violet-300 underline underline-offset-4">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(s)}
                    className={`h-12 min-w-[3rem] rounded-xl px-5 text-sm font-bold transition-all duration-300 ${
                      size === s
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                        : 'glass-panel text-gray-300 hover:text-white hover:border-violet-500/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addtoCart(productData._id, size)}
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-gold-400 py-4.5 text-sm font-extrabold uppercase text-obsidian-950 shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loading /> : (<><FiShoppingCart className="h-5 w-5" /> Add to Shopping Bag</>)}
            </button>

            {/* Policies */}
            <div className="glass-panel rounded-2xl p-6 mt-2 space-y-4">
              {[
                { icon: FiShield, text: '100% Original product — guaranteed authentic.' },
                { icon: FiTruck, text: 'Express delivery available on this product.' },
                { icon: FiRefreshCw, text: 'Easy return & exchange within 7 days.' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-20">
          <div className="flex gap-4 border-b border-white/10 pb-4">
            {['description', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white/10 text-white border border-white/5'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {tab === 'reviews' ? 'Reviews (124)' : 'Description'}
              </button>
            ))}
          </div>
          <div className="mt-6 glass-panel rounded-2xl p-8 text-base leading-relaxed text-gray-300">
            {activeTab === 'description'
              ? 'Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Designed with modern aesthetics in mind, this piece seamlessly transitions from casual daywear to sophisticated evening attire.'
              : 'Customer reviews coming soon. Be the first to share your experience with this product! Our community values your opinion.'}
          </div>
        </div>
      </div>

      <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      <Footer />
    </div>
  )
}

export default ProductDetail
