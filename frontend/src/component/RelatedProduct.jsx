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
    <section className="w-full bg-[#FAF8F4] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <Title text1="RELATED" text2="PRODUCTS" />
        </div>
        <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {related.map((item, i) => (
            <Card key={i} id={item._id} name={item.name} price={item.price} image={item.image1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedProduct
