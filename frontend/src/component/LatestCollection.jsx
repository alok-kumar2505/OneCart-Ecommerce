import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => { setLatestProducts(products.slice(0, 8)) }, [products])

  return (
    <section className="w-full bg-transparent px-4 py-20 sm:px-6 lg:px-8 relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <Title text1="Latest" text2="Arrivals" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
            Discover our newest collection of premium items, designed with excellence and crafted for the bold.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestProducts.map((item, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <Card name={item.name} image={item.image1} id={item._id} price={item.price} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestCollection
