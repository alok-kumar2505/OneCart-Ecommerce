import React, { useEffect, useState } from 'react'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  const heroData = [
    { text1: '30% OFF — Limited Time', text2: 'Style that speaks for itself.' },
    { text1: 'Discover Bold Fashion', text2: 'Exclusive picks, just for you.' },
    { text1: 'Explore Our Best Collection', text2: 'Shop the season\'s finest.' },
    { text1: 'Your Perfect Fashion Fit', text2: 'Now on Sale — Don\'t miss out.' },
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-x-hidden pt-16">
      {/* Hero */}
      <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />

      {/* Product sections on light bg */}
      <div className="bg-[#F8FAFC]">
        <Product />
        <OurPolicy />
        <NewLetterBox />
        <Footer />
      </div>
    </div>
  )
}

export default Home
