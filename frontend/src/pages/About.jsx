import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { FiCheckCircle, FiZap, FiHeadphones } from 'react-icons/fi'

const reasons = [
  {
    icon: FiCheckCircle,
    title: 'Quality Assurance',
    desc: 'We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction.',
  },
  {
    icon: FiZap,
    title: 'Convenience',
    desc: 'Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.',
  },
  {
    icon: FiHeadphones,
    title: 'Exceptional Support',
    desc: 'Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience.',
  },
]

function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24 md:pb-0">
      {/* About Section */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Title text1="ABOUT" text2="US" />
        </div>
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          <div className="flex w-full items-center justify-center lg:w-1/2">
            <img
              src={about}
              alt="About OneCart"
              className="w-full max-w-md rounded-2xl object-cover shadow-lg"
            />
          </div>
          <div className="flex w-full flex-col gap-5 lg:w-1/2">
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              OneCart was born for smart, seamless shopping — created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Built for modern shoppers — combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first experience.
            </p>
            <div className="mt-2 border-l-4 border-indigo-600 pl-4">
              <p className="text-sm font-bold text-gray-900 sm:text-base">Our Mission</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                To redefine online shopping by delivering quality, affordability, and convenience — connecting customers with trusted products and brands in a seamless experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <Title text1="WHY" text2="CHOOSE US" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-base font-bold text-gray-900">{title}</p>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default About
