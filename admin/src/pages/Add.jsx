import React, { useState, useContext } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiImage } from 'react-icons/fi'

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('TopWear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const { serverUrl } = useContext(authDataContext)
  const [loading, setLoading] = useState(false)

  const toggleSize = (s) => setSizes(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])

  const onSubmitHandler = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name); formData.append('description', description)
      formData.append('price', price); formData.append('category', category)
      formData.append('subCategory', subCategory); formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))
      if (image1) formData.append('image1', image1)
      if (image2) formData.append('image2', image2)
      if (image3) formData.append('image3', image3)
      if (image4) formData.append('image4', image4)

      const response = await axios.post(serverUrl + '/api/product/add', formData, { withCredentials: true })
      if (response.data) {
        toast.success('Product Added Successfully')
        setName(''); setDescription(''); setPrice(''); setImage1(false); setImage2(false); setImage3(false); setImage4(false); setSizes([])
      } else toast.error('Failed to add product')
    } catch (error) { toast.error('Error occurred.') }
    setLoading(false)
  }

  const ImageUploader = ({ img, setImg, id }) => (
    <label htmlFor={id} className="cursor-pointer group relative">
      <div className={`h-24 w-24 flex items-center justify-center overflow-hidden transition-all ${!img ? 'border border-dashed border-gray-400 bg-gray-50 hover:border-black hover:bg-gray-100' : 'border border-gray-200'}`}>
        {!img ? (
          <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-black">
            <FiImage className="h-6 w-6" />
          </div>
        ) : (
          <img src={URL.createObjectURL(img)} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <input type="file" id={id} hidden onChange={(e) => setImg(e.target.files[0])} />
    </label>
  )

  return (
    <div className="bg-[#F9F9F9] text-black min-h-screen">
      <Nav />
      <Sidebar />
      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10 pb-24">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="font-playfair text-2xl font-bold text-black mb-2">Add New Product</h1>
            <p className="text-sm text-gray-500">Fill in the details below to add a new product to your catalog.</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            
            {/* Images */}
            <div className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-6">Product Imagery</p>
              <div className="flex gap-4 flex-wrap">
                <ImageUploader img={image1} setImg={setImage1} id="image1" />
                <ImageUploader img={image2} setImg={setImage2} id="image2" />
                <ImageUploader img={image3} setImg={setImage3} id="image3" />
                <ImageUploader img={image4} setImg={setImage4} id="image4" />
              </div>
            </div>

            {/* General Info */}
            <div className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-2">General Information</p>
              
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Product Name</label>
                <input type="text" placeholder="Type here" className="w-full border border-gray-300 px-5 py-3 text-sm focus:outline-none focus:border-black" required onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Product Description</label>
                <textarea placeholder="Write content here" className="w-full border border-gray-300 px-5 py-3 text-sm h-32 resize-none focus:outline-none focus:border-black" required onChange={(e) => setDescription(e.target.value)} value={description} />
              </div>
            </div>

            {/* Categories & Price */}
            <div className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</label>
                  <select className="w-full border border-gray-300 px-5 py-3 text-sm focus:outline-none focus:border-black bg-white" onChange={(e) => setCategory(e.target.value)}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Sub Category</label>
                  <select className="w-full border border-gray-300 px-5 py-3 text-sm focus:outline-none focus:border-black bg-white" onChange={(e) => setSubCategory(e.target.value)}>
                    <option value="TopWear">TopWear</option>
                    <option value="BottomWear">BottomWear</option>
                    <option value="WinterWear">WinterWear</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-500">Price</label>
                  <input type="number" placeholder="25" className="w-full border border-gray-300 px-5 py-3 text-sm focus:outline-none focus:border-black" required onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
              </div>
            </div>

            {/* Sizes & Bestseller */}
            <div className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
              <div>
                <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-black">Available Sizes</label>
                <div className="flex gap-3 flex-wrap">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                    <div 
                      key={s} 
                      onClick={() => toggleSize(s)} 
                      className={`cursor-pointer px-6 py-2 text-sm font-bold transition-all border ${sizes.includes(s) ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-6 border-t border-gray-200">
                <input type="checkbox" id="bestseller" onChange={() => setBestseller(prev => !prev)} checked={bestseller} className="w-5 h-5 accent-black rounded-none cursor-pointer border-gray-300" />
                <label htmlFor="bestseller" className="cursor-pointer text-sm font-medium text-black">Add to bestseller list</label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full sm:w-auto bg-[#8B1B1B] hover:bg-[#6c1414] text-white text-xs font-bold tracking-widest uppercase py-4 px-10 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
              {loading ? <Loading /> : 'ADD PRODUCT'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Add
