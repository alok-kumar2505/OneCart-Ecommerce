import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { FiShoppingCart, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'
import Footer from '../component/Footer'

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

  if (!productData) return <div className="opacity-0" />

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-16 pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">

          {/* ── Images ── */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex flex-row gap-2 lg:flex-col">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImage(img)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden border-2 transition-all ${
                    image === img ? 'border-[#C9A96E]' : 'border-[#E8E2D9] hover:border-[#C9A96E]/50'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 overflow-hidden bg-white border border-[#E8E2D9]">
              <img
                src={image}
                alt={productData.name}
                className="h-full max-h-[500px] w-full object-cover object-center transition-all duration-300 lg:max-h-none"
              />
            </div>
          </div>

          {/* ── Details ── */}
          <div className="flex flex-col gap-5 lg:w-1/2 lg:pt-2">
            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C9A96E]">
                {productData.category} / {productData.subCategory}
              </p>
              <h1 className="text-2xl font-bold tracking-wide text-[#1A1A1A] sm:text-3xl">{productData.name}</h1>
              <div className="mt-3 flex items-center gap-2">
                {[...Array(4)].map((_, i) => <FaStar key={i} className="h-3.5 w-3.5 text-[#C9A96E]" />)}
                <FaStarHalfAlt className="h-3.5 w-3.5 text-[#C9A96E]" />
                <span className="text-xs text-[#6B6360]">(124 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-[#E8E2D9] py-4">
              <p className="text-2xl font-bold tracking-wide text-[#C9A96E]">{currency} {productData.price}</p>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[#6B6360]">
              {productData.description} — Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless everyday style.
            </p>

            {/* Size */}
            <div>
              <p className="mb-3 text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(s)}
                    className={`min-w-[3rem] border-2 px-4 py-2 text-xs font-bold tracking-wide transition-all ${
                      size === s
                        ? 'border-[#C9A96E] bg-[#C9A96E] text-[#1A1A1A]'
                        : 'border-[#E8E2D9] bg-white text-[#1A1A1A] hover:border-[#C9A96E]'
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
              className="flex items-center justify-center gap-2 border border-[#1A1A1A] bg-[#1A1A1A] py-4 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-[#2D2D2D] transition-colors disabled:opacity-70 sm:w-auto sm:px-12"
            >
              {loading ? <Loading /> : (<><FiShoppingCart className="h-4 w-4" /> Add to Cart</>)}
            </button>

            {/* Policies */}
            <div className="border-t border-[#E8E2D9] pt-4 space-y-3">
              {[
                { icon: FiShield, text: '100% Original product — guaranteed authentic.' },
                { icon: FiTruck, text: 'Cash on delivery available on this product.' },
                { icon: FiRefreshCw, text: 'Easy return & exchange within 7 days.' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-xs text-[#6B6360]">
                  <Icon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#C9A96E]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-14">
          <div className="flex border-b border-[#E8E2D9]">
            {['description', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#C9A96E] text-[#C9A96E]'
                    : 'text-[#6B6360] hover:text-[#1A1A1A]'
                }`}
              >
                {tab === 'reviews' ? 'Reviews (124)' : 'Description'}
              </button>
            ))}
          </div>
          <div className="mt-6 border border-[#E8E2D9] bg-white p-6 text-sm leading-relaxed text-[#6B6360]">
            {activeTab === 'description'
              ? 'Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style.'
              : 'Customer reviews coming soon. Be the first to share your experience with this product!'}
          </div>
        </div>
      </div>

      <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      <Footer />
    </div>
  )
}

export default ProductDetail
