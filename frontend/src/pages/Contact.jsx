import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.jpg'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { FiMapPin, FiPhone, FiMail, FiBriefcase } from 'react-icons/fi'

function Contact() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24 md:pb-0">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Title text1="CONTACT" text2="US" />
        </div>

        <div className="flex flex-col items-center gap-10 lg:flex-row">
          {/* Image */}
          <div className="flex w-full items-center justify-center lg:w-1/2">
            <img
              src={contact}
              alt="Contact OneCart"
              className="w-full max-w-md rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            <div>
              <h2 className="mb-4 text-lg font-bold text-gray-900">Our Store</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Dharmsamaj Chowk, Motihari, Bihar, India
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                  <p className="text-sm text-gray-600">+91-9525487783</p>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                  <p className="text-sm text-gray-600">admin@onecart.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <FiBriefcase className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
                <div>
                  <p className="text-base font-bold text-gray-900">Careers at OneCart</p>
                  <p className="mt-1 text-sm text-gray-500">Learn more about our teams and job openings.</p>
                  <button className="mt-3 rounded-xl border border-indigo-200 px-5 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors">
                    Explore Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Contact
