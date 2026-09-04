import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.jpg'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

function Contact() {
  return (
    <div className="bg-[#F9F9F9] min-h-screen border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        
        <div className="mb-16 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl text-black">Contact Us</h1>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="bg-white p-4 shadow-sm border border-gray-200">
              <img src={contact} alt="Contact Us" className="w-full aspect-[4/5] object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 lg:pl-10">
            <div className="bg-white shadow-sm p-8 sm:p-12 border border-gray-200">
              <h3 className="font-playfair text-2xl text-black mb-8">Our Store</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">54709 Willms Station</p>
                    <p className="text-gray-600 text-sm">Suite 350, Washington, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-5 h-5 text-black" />
                  </div>
                  <p className="text-gray-600 text-sm mt-3">Tel: (415) 555-0132</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-5 h-5 text-black" />
                  </div>
                  <p className="text-gray-600 text-sm mt-3">admin@onecart.com</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-playfair text-xl text-black mb-4">Careers at OneCart</h3>
                <p className="text-sm text-gray-500 mb-6">Learn more about our teams and job openings.</p>
                <button className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold text-xs tracking-widest uppercase transition-colors w-full sm:w-auto">
                  Explore Jobs
                </button>
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

export default Contact
