import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Footer from '../component/Footer'
import Loading from '../component/Loading'

function Wishlist() {
  const { products, wishlist, productsLoading } = useContext(shopDataContext)
  const [wishlistProducts, setWishlistProducts] = useState([])

  useEffect(() => {
    if (products.length > 0 && wishlist) {
      const filtered = products.filter(item => wishlist.includes(item._id))
      setWishlistProducts(filtered)
    }
  }, [products, wishlist])

  return (
    <div className="bg-white min-h-screen pt-12 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
        
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl text-black mb-4">MY WISHLIST</h1>
          <p className="text-gray-500 text-sm">
            {wishlistProducts.length > 0 
              ? `You have ${wishlistProducts.length} saved pieces.` 
              : "Your wishlist is empty."}
          </p>
        </div>

        {/* ── Product Grid ── */}
        {productsLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loading />
          </div>
        ) : wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((item, i) => (
              <Card 
                key={i} 
                id={item._id} 
                name={item.name} 
                price={item.price} 
                image={item.image1} 
                category={item.category} 
                oldPrice={item.oldPrice || Math.round(item.price * 1.2)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl font-playfair text-black mb-2">No items saved yet</p>
            <p className="text-sm text-gray-500">Explore our collections and heart the pieces you love.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Wishlist
