import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8))
  }, [products])

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            Step Into Style — New arrivals dropping this season, curated just for you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestProducts.map((item, index) => (
            <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestCollection
