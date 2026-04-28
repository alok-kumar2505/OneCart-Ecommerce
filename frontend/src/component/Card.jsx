import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({name , image , id , price}) {
    let {currency} = useContext(shopDataContext)
    let navigate = useNavigate()
  return (
    <div className='flex w-full max-w-[320px] cursor-pointer flex-col items-start justify-start rounded-lg border-[1px] border-[#80808049] bg-[#ffffff0a] p-[10px] shadow-sm shadow-black transition-transform duration-200 hover:scale-[1.02] sm:max-w-[300px] xl:max-w-[280px]' onClick={()=>navigate(`/productdetail/${id}`)}>
        <img src={image} alt="" className='h-[260px] w-full rounded-sm object-cover sm:h-[280px] xl:h-[250px]'/>
        <div className='py-[10px] text-[16px] text-[#c3f6fa] sm:text-[18px]'>{name}</div>
        <div className='text-[14px] text-[#f3fafa] '>{currency} {price}</div>
      
    </div>
  )
}

export default Card
