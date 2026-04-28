import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
    let {products} = useContext(shopDataContext)
    let [bestSeller,setBestSeller] = useState([])

    useEffect(()=>{
    let filterProduct = products.filter((item) => item.bestseller)

    setBestSeller(filterProduct.slice(0,4));
    },[products])
  return (
    <div className='w-full px-3 sm:px-4 lg:px-6'>
      <div className='w-[100%] text-center mt-[50px] '>
            <Title text1={"BEST"} text2={"SELLER"}/> 
            <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>Tried, Tested, Loved – Discover Our All-Time Best Sellers.</p>
        </div>
      <div className='mt-[30px] grid w-full grid-cols-1 place-items-center gap-[20px] sm:grid-cols-2 xl:grid-cols-4 xl:gap-[30px]'>
            {
             bestSeller.map((item,index)=>(
                <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
             ))
            }
        </div>
      
    </div>
  )
}

export default BestSeller
