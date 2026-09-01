import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  const { products } = useContext(shopDataContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    setBestSeller(products.filter(i => i.bestseller).slice(0, 4))
  }, [products])

  return (
    <section className="w-full bg-[#FAF8F4] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <Title text1="BEST" text2="SELLERS" />
          <p className="mx-auto mt-4 max-w-xl text-xs tracking-wide text-[#6B6360] sm:text-sm">
            Tried, tested and loved — our all-time customer favourites.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bestSeller.map((item, i) => (
            <Card key={i} name={item.name} id={item._id} price={item.price} image={item.image1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSeller
