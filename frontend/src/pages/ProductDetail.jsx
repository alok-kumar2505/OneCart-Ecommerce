import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
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
    const found = products.find(item => item._id === productId)
    if (found) {
      setProductData(found)
      const imgs = [found.image1, found.image2, found.image3, found.image4].filter(Boolean)
      setImages(imgs)
      setImage(found.image1)
    }
  }, [productId, products])

  if (!productData) return <div className="opacity-0" />

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24 md:pb-8">
      {/* ── Product Section ── */}
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
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    image === img ? 'border-indigo-500 shadow-md' : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 overflow-hidden rounded-2xl bg-gray-100">
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
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{productData.name}</h1>
              {/* Rating */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(4)].map((_, i) => <FaStar key={i} className="h-4 w-4 text-amber-400" />)}
                  <FaStarHalfAlt className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-sm text-gray-500">(124 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-indigo-600">{currency} {productData.price}</span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-gray-600">
              {productData.description} — Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless everyday style.
            </p>

            {/* Size */}
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(s)}
                    className={`min-w-[3rem] rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-all ${
                      size === s
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:text-indigo-600'
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors active:scale-[0.98] disabled:opacity-70 sm:w-auto sm:px-10"
            >
              {loading ? <Loading /> : (<><FiShoppingCart className="h-4 w-4" /> Add to Cart</>)}
            </button>

            {/* Policies */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              {[
                { icon: FiShield, text: '100% Original product — guaranteed authentic.' },
                { icon: FiTruck, text: 'Cash on delivery available on this product.' },
                { icon: FiRefreshCw, text: 'Easy return & exchange within 7 days.' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-gray-500">
                  <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description / Reviews Tabs ── */}
        <div className="mt-14">
          <div className="flex border-b border-gray-200">
            {['description', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab === 'reviews' ? 'Reviews (124)' : 'Description'}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 text-sm leading-relaxed text-gray-600">
            {activeTab === 'description'
              ? 'Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.'
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
