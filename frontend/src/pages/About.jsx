import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import about from '../assets/about.jpg'
import Footer from '../component/Footer'
import { FiTarget, FiStar, FiHeart } from 'react-icons/fi'

function About() {
  return (
    <div className="bg-[#F9F9F9] min-h-screen border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        
        <div className="mb-16 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl text-black">About Us</h1>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="bg-white p-4 shadow-sm border border-gray-200">
              <img src={about} alt="About Us" className="w-full aspect-[4/3] object-cover" />
            </div>
          </div>

          {/* Text */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="font-playfair text-3xl text-black">Redefining the Shopping Experience</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              OneCart was born out of a desire to create a shopping destination that seamlessly blends premium quality with effortless convenience. We curate exclusive collections that cater to your unique style.
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              Our mission is simple: to provide a curated selection of exceptional products while delivering an unparalleled customer experience. We believe that shopping should be an inspiring journey.
            </p>
            
            <div className="pt-8 mt-8 border-t border-gray-200">
              <p className="font-playfair text-2xl text-black mb-6">Why Choose Us</p>
              <div className="space-y-6">
                {[
                  { icon: FiTarget, title: 'Quality Assurance', desc: 'Every product is rigorously vetted for excellence.' },
                  { icon: FiStar, title: 'Curated Collections', desc: 'Handpicked items designed for modern living.' },
                  { icon: FiHeart, title: 'Exceptional Service', desc: 'A dedicated team ensuring your absolute satisfaction.' }
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#8B1B1B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-sm uppercase tracking-widest">{title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default About
