import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
    let {products} = useContext(shopDataContext)
    let [latestProducts,setLatestProducts] = useState([])

    useEffect(()=>{
    setLatestProducts(products.slice(0,8));
    },[products])

  return (
    <div className='w-full px-3 sm:px-4 lg:px-6'>
      <div className='w-[100%] text-center md:mt-[50px]  '>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 '>Step Into Style – New Collection Dropping This Season!</p>
      </div>
      <div className='mt-[30px] grid w-full grid-cols-1 place-items-center gap-[20px] sm:grid-cols-2 xl:grid-cols-4 xl:gap-[30px]'>
        {
            latestProducts.map((item,index)=>(
                <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
            ))
        }
        
        </div>
    </div>
  )
}

export default LatestCollection
