import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.jpg'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import Nav from '../component/Nav'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

function Contact() {
  return (
    <div className="bg-obsidian-950 text-gray-200 min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12"><Title text1="Contact" text2="Us" /></div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative rounded-[2.5rem] p-3 glass-panel border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/20 to-violet-600/20 rounded-[2.5rem] blur-xl -z-10" />
              <img src={contact} alt="Contact Us" className="w-full rounded-3xl aspect-[4/5] object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 lg:pl-10">
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border-white/10">
              <h3 className="font-display text-2xl font-bold text-white mb-8">Our Store</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">54709 Willms Station</p>
                    <p className="text-gray-300">Suite 350, Washington, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-5 h-5 text-violet-400" />
                  </div>
                  <p className="text-gray-300 mt-2">Tel: (415) 555-0132</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-5 h-5 text-pink-400" />
                  </div>
                  <p className="text-gray-300 mt-2">admin@onecart.com</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="font-display text-xl font-bold text-white mb-4">Careers at OneCart</h3>
                <p className="text-sm text-gray-400 mb-6">Learn more about our teams and job openings.</p>
                <button className="px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors w-full sm:w-auto">
                  Explore Jobs
                </button>
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

export default Contact
