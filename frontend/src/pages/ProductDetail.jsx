import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt, FaChevronDown, FaChevronUp, FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'
import RelatedProduct from '../component/RelatedProduct'
import Footer from '../component/Footer'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading, wishlist, toggleWishlist } = useContext(shopDataContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('S')
  const [expandedSection, setExpandedSection] = useState('description')
  
  const inWishlist = wishlist?.includes(productId)

  useEffect(() => {
    const found = products.find(i => i._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image1)
    }
  }, [productId, products])

  if (!productData) return <div className="bg-white min-h-screen" />

  const oldPrice = productData.oldPrice || Math.round(productData.price * 1.3)
  const discount = Math.round(((oldPrice - productData.price) / oldPrice) * 100)

  return (
    <div className="bg-white min-h-screen border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2">
        
        {/* ── Left: Image ── */}
        <div className="bg-[#F9F9F9] flex items-center justify-center p-8 md:p-16 min-h-[600px] border-r border-gray-200">
          <img src={image} alt={productData.name} className="w-full max-w-md h-auto object-contain" />
        </div>

        {/* ── Right: Details ── */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          
          {/* Brand/Label */}
          <p className="text-[#8B1B1B] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">ONECART</p>
          
          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl text-black leading-tight mb-4">
            {productData.name}
          </h1>
          
          {/* Rating & SKU */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex text-[#8B1B1B]">
                {[...Array(4)].map((_, i) => <FaStar key={i} className="w-3 h-3" />)}
                <FaStarHalfAlt className="w-3 h-3" />
              </div>
              <span className="text-gray-500 text-xs">(18)</span>
            </div>
            <span className="text-gray-400 text-[10px] uppercase tracking-widest">SKU: OC-{productData._id.substring(0, 6)}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-bold text-black text-xl">{currency}{productData.price}</span>
            <span className="text-gray-400 text-sm line-through">{currency}{oldPrice}</span>
            <span className="text-[#8B1B1B] text-xs font-bold">-{discount}%</span>
          </div>

          {/* Color */}
          <div className="mb-6">
            <p className="text-xs font-bold tracking-widest uppercase mb-3 text-black">Color: <span className="text-gray-500 font-normal capitalize">Brown</span></p>
            <button className="w-6 h-6 rounded-full bg-[#5C2E20] border-2 border-white outline outline-1 outline-gray-300"></button>
          </div>

          {/* Size */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold tracking-widest uppercase text-black">Size: <span className="text-gray-500 font-normal">{size}</span></p>
            </div>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 flex items-center justify-center text-xs font-bold transition-colors ${
                    size === s ? 'bg-black text-white' : 'bg-white text-black border border-gray-300 hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-12">
            <button 
              onClick={() => addtoCart(productData._id, size)}
              disabled={loading}
              className="flex-1 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors py-4"
            >
              ADD TO BAG
            </button>
            <button className="flex-1 bg-[#8B1B1B] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#6c1414] transition-colors py-4">
              BUY NOW
            </button>
            <button 
              onClick={() => toggleWishlist(productData._id)}
              className={`w-14 h-[52px] flex items-center justify-center border transition-colors flex-shrink-0 ${inWishlist ? 'border-[#8B1B1B] text-[#8B1B1B]' : 'border-gray-300 text-gray-500 hover:text-black hover:border-black'}`}
            >
              {inWishlist ? <FaHeart className="w-5 h-5" /> : <FiHeart className="w-5 h-5" />}
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-gray-200 divide-y divide-gray-200">
            <div className="py-4">
              <button 
                className="w-full flex justify-between items-center text-xs font-bold tracking-widest uppercase text-black"
                onClick={() => setExpandedSection(expandedSection === 'description' ? '' : 'description')}
              >
                DESCRIPTION & SILHOUETTE
                {expandedSection === 'description' ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
              </button>
              {expandedSection === 'description' && (
                <div className="mt-4 text-sm text-gray-500 leading-relaxed">
                  Elevate your wardrobe with the {productData.name}. Defined by crisp tailoring, clean lines, and luxurious fabric draping, this piece offers timeless refinement.
                </div>
              )}
            </div>
            
            <div className="py-4">
              <button 
                className="w-full flex justify-between items-center text-xs font-bold tracking-widest uppercase text-black"
                onClick={() => setExpandedSection(expandedSection === 'fabric' ? '' : 'fabric')}
              >
                FABRIC & CRAFTSMANSHIP
                {expandedSection === 'fabric' ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
              </button>
              {expandedSection === 'fabric' && (
                <div className="mt-4 text-sm text-gray-500 leading-relaxed">
                  Crafted in Italy using 100% premium fibers. Dry clean only. Do not bleach or tumble dry.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      <Footer />
    </div>
  )
}

export default ProductDetail
