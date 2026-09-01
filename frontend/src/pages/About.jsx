import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'
import about from '../assets/about.jpg'
import Footer from '../component/Footer'
import Nav from '../component/Nav'
import { FiTarget, FiStar, FiHeart } from 'react-icons/fi'

function About() {
  return (
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12"><Title text1="About" text2="Us" /></div>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative rounded-[2.5rem] p-3 glass-panel border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-amber-500/20 rounded-[2.5rem] blur-xl -z-10" />
              <img src={about} alt="About Us" className="w-full rounded-3xl aspect-[4/3] object-cover" />
            </div>
          </div>

          {/* Text */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="font-display text-3xl font-bold text-white">Redefining the Shopping Experience</h2>
            <p className="text-base leading-relaxed text-gray-300">
              OneCart was born out of a desire to create a shopping destination that seamlessly blends premium quality with effortless convenience. We curate exclusive collections that cater to your unique style.
            </p>
            <p className="text-base leading-relaxed text-gray-300">
              Our mission is simple: to provide a curated selection of exceptional products while delivering an unparalleled customer experience. We believe that shopping should be an inspiring journey.
            </p>
            
            <div className="pt-6 border-t border-white/10">
              <p className="font-display text-xl font-bold text-white mb-4">Why Choose Us</p>
              <div className="space-y-4">
                {[
                  { icon: FiTarget, title: 'Quality Assurance', desc: 'Every product is rigorously vetted for excellence.' },
                  { icon: FiStar, title: 'Curated Collections', desc: 'Handpicked items designed for modern living.' },
                  { icon: FiHeart, title: 'Exceptional Service', desc: 'A dedicated team ensuring your absolute satisfaction.' }
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <NewLetterBox />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
