import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    let [showFilter,setShowFilter] = useState(false)
    let {products,search,showSearch} = useContext(shopDataContext)
    let [filterProduct,setFilterProduct] = useState([])
    let [category,setCaterory] = useState([])
    let [subCategory,setSubCaterory] = useState([])
    let [sortType,SetSortType] = useState("relavent")

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setCaterory(prev => [...prev,e.target.value])
         }
    }

    const toggleSubCategory = (e) =>{
         if(subCategory.includes(e.target.value)){
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setSubCaterory(prev => [...prev,e.target.value])
         }
    }

    const applyFilter = ()=>{
        let productCopy = products.slice()

        if(showSearch && search){
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length > 0)
        {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0)
        {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)

    }


    const sortProducts = (e)=>{
        let fbCopy = filterProduct.slice()

        switch(sortType){
         case 'low-high':
            setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;

         case 'high-low':
            setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
            applyFilter()
        break;
        }

    }

    useEffect(()=>{
        sortProducts()
    },[sortType])


    useEffect(()=>{
    setFilterProduct(products)
    },[products])

    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search ,showSearch])






  return (
    <div className='relative z-[2] flex min-h-[100vh] w-full flex-col items-start justify-start overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] pb-[110px] md:flex-row'>
      <div className={`w-full border-r-[1px] border-gray-400 p-[20px] text-[#aaf5fa] md:min-h-[100vh] md:w-[30vw] lg:fixed lg:w-[20vw] ${showFilter ? "h-[45vh]" :"h-[8vh]"}`}>
        <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer' onClick={()=>setShowFilter(prev=>!prev)}>FILTERS
            {!showFilter && <FaChevronRight className='text-[18px] md:hidden'  />}
           {showFilter && <FaChevronDown className='text-[18px] md:hidden'  />}
        </p>
        

        <div className={`mt-6 rounded-md border-[2px] border-[#dedcdc] bg-slate-600 pl-5 py-3 ${showFilter ? "" : "hidden"} md:block`}>
            <p className='text-[18px] text-[#f8fafa]'>CATEGORIES</p>
            <div className='flex h-[120px] w-full max-w-[230px] flex-col items-start justify-center gap-[10px]'>
                <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'Men'} className='w-3' onChange={toggleCategory} /> Men</p>
                 <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory} /> Women</p>
                  <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'Kids'} onChange={toggleCategory} className='w-3' /> Kids</p>
            </div>
        </div>
        <div className={`mt-6 rounded-md border-[2px] border-[#dedcdc] bg-slate-600 pl-5 py-3 ${showFilter ? "" : "hidden"} md:block`}>
            <p className='text-[18px] text-[#f8fafa]'>SUB-CATEGORIES</p>
            <div className='flex h-[120px] w-full max-w-[230px] flex-col items-start justify-center gap-[10px]'>
                <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'TopWear'} className='w-3' onChange={toggleSubCategory} /> TopWear</p>
                 <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'BottomWear'} className='w-3' onChange={toggleSubCategory} /> BottomWear</p>
                  <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'WinterWear'} className='w-3' onChange={toggleSubCategory} /> WinterWear</p>
            </div>
        </div>
      </div>
      <div className='w-full md:py-[10px] lg:pl-[20%]'>
        <div className='flex w-full flex-col justify-between px-4 lg:flex-row lg:px-[50px] '> 
            <Title text1={"ALL"} text2={"COLLECTIONS"}/>

            <select name="" id="" className='h-[50px] w-full rounded-lg border-[2px] border-transparent bg-slate-600 px-[10px] text-[white] hover:border-[#46d1f7] md:w-[200px] lg:mt-[0px] lg:w-[220px]' onChange={(e)=>SetSortType(e.target.value)}>
                <option value="relavent" className='w-[100%] h-[100%]'>Sort By: Relavent</option>
                <option value="low-high" className='w-[100%] h-[100%]'>Sort By: Low to High</option>
                <option value="high-low" className='w-[100%] h-[100%]'>Sort By: High to Low</option>
            </select>
        </div>
        <div className='flex min-h-[70vh] w-full flex-wrap items-center justify-center gap-[24px] px-4 md:w-[60vw] lg:w-[80vw] lg:gap-[30px]'>
            {
             filterProduct.map((item,index)=>(
                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
             ))
            }
        </div>
      </div>
    </div>
  )
}

export default Collections