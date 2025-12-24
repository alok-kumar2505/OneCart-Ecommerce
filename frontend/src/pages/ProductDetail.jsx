import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading } = useContext(shopDataContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = () => {
    const item = products.find(p => p._id === productId)
    if (item) {
      setProductData(item)
      setImage1(item.image1)
      setImage2(item.image2)
      setImage3(item.image3)
      setImage4(item.image4)
      setImage(item.image1)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  if (!productData) return <div className="opacity-0"></div>

  return (
    <div className="w-full overflow-x-hidden">

      {/* 🔹 TOP SECTION */}
      <div className="w-full min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-start gap-[20px] px-[10px]">

        {/* 🔹 LEFT IMAGE SECTION */}
        <div className="lg:w-[50%] w-full mt-[80px] flex flex-col lg:flex-row items-center gap-[20px]">

          {/* Thumbnails */}
          <div className="flex lg:flex-col flex-row gap-[15px]">
            {[image1, image2, image3, image4].map((img, i) => (
              <div key={i} className="w-[60px] h-[60px] md:w-[100px] md:h-[110px] bg-slate-300 rounded-md">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full rounded-md cursor-pointer"
                  onClick={() => setImage(img)}
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="lg:w-[70%] w-[90%] min-h-[300px] border rounded-md overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* 🔹 RIGHT PRODUCT DETAILS */}
        <div className="lg:w-[50%] w-full flex flex-col gap-[12px] py-[20px] px-[20px]">

          <h1 className="text-[36px] font-semibold text-white">
            {productData.name.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <FaStar className="fill-[#FFD700]" />
            <FaStar className="fill-[#FFD700]" />
            <FaStar className="fill-[#FFD700]" />
            <FaStar className="fill-[#FFD700]" />
            <FaStarHalfAlt className="fill-[#FFD700]" />
            <span className="text-white">(124)</span>
          </div>

          <p className="text-[28px] text-white font-semibold">
            {currency} {productData.price}
          </p>

          <p className="text-white md:w-[70%]">
            {productData.description} Stylish, breathable cotton shirt with a modern slim fit.
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <p className="text-white text-[22px] font-semibold">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border rounded-md ${
                    size === item ? 'bg-black text-[#2f97f1]' : 'bg-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addtoCart(productData._id, size)}
            className="mt-4 bg-[#495b61c9] px-6 py-3 rounded-xl text-white"
          >
            {loading ? <Loading /> : "Add to Cart"}
          </button>

          <div className="w-full h-[1px] bg-slate-700 my-3"></div>

          <div className="text-white text-[15px]">
            <p>✔ 100% Original Product</p>
            <p>✔ Cash on delivery available</p>
            <p>✔ Easy return within 7 days</p>
          </div>
        </div>
      </div>

      {/* 🔹 DESCRIPTION & RELATED */}
      <div className="w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] py-[40px]">

        <div className="flex gap-3 px-[20px] lg:px-[100px]">
          <p className="border px-5 py-3 text-white">Description</p>
          <p className="border px-5 py-3 text-white">Reviews (124)</p>
        </div>

        <div className="w-[90%] lg:w-[80%] bg-[#3336397c] text-white mt-5 mx-auto p-[20px] rounded-md">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt, crafted
          for comfort and everyday wear.
        </div>

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>

    </div>
  )
}

export default ProductDetail
