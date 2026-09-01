import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  const { products } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const filtered = products.filter(item => item.bestseller)
    setBestSeller(filtered.slice(0, 4))
  }, [products])

  return (
    <section className="w-full bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <Title text1="BEST" text2="SELLERS" />
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            Tried, tested and loved — discover our all-time customer favourites.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bestSeller.map((item, index) => (
            <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSeller
