import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => { setLatestProducts(products.slice(0, 8)) }, [products])

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className="mx-auto mt-4 max-w-xl text-xs tracking-wide text-[#6B6360] sm:text-sm">
            Step into style — new arrivals curated for the discerning eye.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestProducts.map((item, i) => (
            <Card key={i} name={item.name} image={item.image1} id={item._id} price={item.price} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestCollection
