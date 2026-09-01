import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiUploadCloud } from 'react-icons/fi'

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all'

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [price, setPrice] = useState('')
  const [subCategory, setSubCategory] = useState('TopWear')
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)

  const MAX_IMAGE_SIZE = 250 * 1024
  const validateImage = (file) => {
    if (!file) return false
    if (file.size > MAX_IMAGE_SIZE) { toast.error('Upload image less than 250KB'); return false }
    return true
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('image1', image1)
      formData.append('image2', image2)
      formData.append('image3', image3)
      formData.append('image4', image4)

      await axios.post(serverUrl + '/api/product/addproduct', formData, { withCredentials: true })
      toast.success('Product added successfully!')
      setName(''); setDescription(''); setImage1(false); setImage2(false)
      setImage3(false); setImage4(false); setPrice(''); setBestSeller(false)
      setCategory('Men'); setSubCategory('TopWear'); setSizes([])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Add product failed.')
    } finally {
      setLoading(false)
    }
  }

  const imageSlots = [
    { state: image1, set: setImage1, id: 'image1' },
    { state: image2, set: setImage2, id: 'image2' },
    { state: image3, set: setImage3, id: 'image3' },
    { state: image4, set: setImage4, id: 'image4' },
  ]

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL']

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Nav />
      <Sidebar />

      <main className="ml-14 pt-16 md:ml-56">
        <div className="max-w-3xl px-6 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
            <p className="mt-1 text-sm text-gray-500">Fill in the details below to add a new product to the store.</p>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-6">
            {/* Image Upload */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              <label className="mb-3 block text-sm font-semibold text-gray-900">Product Images</label>
              <p className="mb-4 text-xs text-gray-500">Upload up to 4 images (max 250KB each). First image will be the primary.</p>
              <div className="flex flex-wrap gap-4">
                {imageSlots.map(({ state, set, id }) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-indigo-400 transition-colors"
                  >
                    {state ? (
                      <img src={URL.createObjectURL(state)} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <FiUploadCloud className="h-6 w-6 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                        <span className="text-[10px] text-gray-400">Upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id={id}
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (validateImage(file)) set(file)
                        else e.target.value = null
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">Product Details</h2>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">Product Name</label>
                <input type="text" placeholder="e.g. Slim Fit Cotton Shirt" className={inputClass} onChange={(e) => setName(e.target.value)} value={name} required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">Description</label>
                <textarea
                  placeholder="Describe your product..."
                  className={`${inputClass} h-24 resize-none`}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Category</label>
                  <select className={inputClass} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Sub-Category</label>
                  <select className={inputClass} onChange={(e) => setSubCategory(e.target.value)}>
                    <option value="TopWear">TopWear</option>
                    <option value="BottomWear">BottomWear</option>
                    <option value="WinterWear">WinterWear</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Price (₹)</label>
                  <input type="number" placeholder="e.g. 1999" className={inputClass} onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              <h2 className="mb-4 text-sm font-semibold text-gray-900">Available Sizes</h2>
              <div className="flex flex-wrap gap-2">
                {allSizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])}
                    className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-all ${
                      sizes.includes(s)
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Bestseller */}
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
              <input
                type="checkbox"
                id="checkbox"
                className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
                onChange={() => setBestSeller(prev => !prev)}
                checked={bestseller}
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">Mark as Bestseller</p>
                <p className="text-xs text-gray-500">This product will appear in the Best Sellers section on the homepage.</p>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors active:scale-[0.98] disabled:opacity-70 sm:w-auto sm:px-12"
            >
              {loading ? <Loading /> : 'Add Product'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Add
