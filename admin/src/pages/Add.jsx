import React, { useState, useContext } from 'react'
import upload_area from '../assets/upload_area.png'
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
      <div className={`h-24 w-24 rounded-xl flex items-center justify-center overflow-hidden transition-all ${!img ? 'border-2 border-dashed border-white/20 bg-white/5 hover:border-violet-500/50 hover:bg-white/10' : 'border border-white/10'}`}>
        {!img ? (
          <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-violet-400">
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
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
      <Nav />
      <Sidebar />
      <main className="ml-16 pt-20 md:ml-64 p-6 md:p-10 pb-24">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-white mb-2">Add New Product</h1>
            <p className="text-sm text-gray-400">Fill in the details below to add a new product to your catalog.</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            
            {/* Images */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border-white/10">
              <p className="text-sm font-bold uppercase tracking-wider text-white mb-6">Product Imagery</p>
              <div className="flex gap-4 flex-wrap">
                <ImageUploader img={image1} setImg={setImage1} id="image1" />
                <ImageUploader img={image2} setImg={setImage2} id="image2" />
                <ImageUploader img={image3} setImg={setImage3} id="image3" />
                <ImageUploader img={image4} setImg={setImage4} id="image4" />
              </div>
            </div>

            {/* General Info */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border-white/10 space-y-5">
              <p className="text-sm font-bold uppercase tracking-wider text-white mb-2">General Information</p>
              
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Product Name</label>
                <input type="text" placeholder="Type here" className="glass-input w-full rounded-xl px-5 py-3 text-sm" required onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Product Description</label>
                <textarea placeholder="Write content here" className="glass-input w-full rounded-xl px-5 py-3 text-sm h-32 resize-none" required onChange={(e) => setDescription(e.target.value)} value={description} />
              </div>
            </div>

            {/* Categories & Price */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Category</label>
                  <select className="glass-input w-full rounded-xl px-5 py-3 text-sm appearance-none" onChange={(e) => setCategory(e.target.value)}>
                    <option value="Men" className="bg-obsidian-900">Men</option>
                    <option value="Women" className="bg-obsidian-900">Women</option>
                    <option value="Kids" className="bg-obsidian-900">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Sub Category</label>
                  <select className="glass-input w-full rounded-xl px-5 py-3 text-sm appearance-none" onChange={(e) => setSubCategory(e.target.value)}>
                    <option value="TopWear" className="bg-obsidian-900">TopWear</option>
                    <option value="BottomWear" className="bg-obsidian-900">BottomWear</option>
                    <option value="WinterWear" className="bg-obsidian-900">WinterWear</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Price</label>
                  <input type="number" placeholder="25" className="glass-input w-full rounded-xl px-5 py-3 text-sm" required onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
              </div>
            </div>

            {/* Sizes & Bestseller */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border-white/10 space-y-6">
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-white">Available Sizes</label>
                <div className="flex gap-3 flex-wrap">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                    <div 
                      key={s} 
                      onClick={() => toggleSize(s)} 
                      className={`cursor-pointer px-6 py-2 rounded-xl text-sm font-bold transition-all border ${sizes.includes(s) ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-500/50 shadow-md shadow-violet-600/20' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-6 border-t border-white/10">
                <input type="checkbox" id="bestseller" onChange={() => setBestseller(prev => !prev)} checked={bestseller} className="w-5 h-5 accent-violet-600 rounded cursor-pointer" />
                <label htmlFor="bestseller" className="cursor-pointer text-sm font-medium text-gray-300">Add to bestseller list</label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-gold-400 text-obsidian-950 font-extrabold text-sm uppercase shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex justify-center">
              {loading ? <Loading /> : 'ADD PRODUCT'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Add
