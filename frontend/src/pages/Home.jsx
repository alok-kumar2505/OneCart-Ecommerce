import React from 'react'
import Nav from '../component/Nav'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  return (
    <div className="bg-obsidian-950 text-gray-200">
      <Nav />
      <main>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewLetterBox />
      </main>
      <Footer />
    </div>
  )
}

export default Home
