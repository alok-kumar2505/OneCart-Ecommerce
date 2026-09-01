import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(shopDataContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let copy = products.slice()
        .filter(i => i.category === category)
        .filter(i => i.subCategory === subCategory)
        .filter(i => i._id !== currentProductId)
      setRelated(copy.slice(0, 4))
    }
  }, [products, category, subCategory, currentProductId])

  if (related.length === 0) return null

  return (
    <section className="w-full relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      {/* Background with slight glassmorphic separation */}
      <div className="absolute inset-0 bg-obsidian-900/50 backdrop-blur-sm -z-10 border-t border-white/10" />
      
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <Title text1="Related" text2="Products" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {related.map((item, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <Card id={item._id} name={item.name} price={item.price} image={item.image1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedProduct
