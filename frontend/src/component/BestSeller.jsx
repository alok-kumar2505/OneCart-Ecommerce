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
    <section className="w-full relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      {/* Background with slight glassmorphic separation */}
      <div className="absolute inset-0 bg-obsidian-900/50 backdrop-blur-sm -z-10" />
      
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <Title text1="Best" text2="Sellers" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
            Tried, tested, and loved. Discover our most popular pieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bestSeller.map((item, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <Card name={item.name} id={item._id} price={item.price} image={item.image1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSeller
