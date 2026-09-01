import React from 'react'
import { RiExchangeFundsLine } from 'react-icons/ri'
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb'
import { BiSupport } from 'react-icons/bi'

const policies = [
  {
    icon: RiExchangeFundsLine,
    title: 'Easy Exchange Policy',
    desc: 'Exchange made easy — quick, simple, and customer-friendly process.',
  },
  {
    icon: TbRosetteDiscountCheckFilled,
    title: '7-Day Return Policy',
    desc: 'Shop with confidence — 7-day hassle-free return guarantee.',
  },
  {
    icon: BiSupport,
    title: 'Best Customer Support',
    desc: 'Dedicated support team ready to help anytime, anywhere.',
  },
]

function OurPolicy() {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {policies.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center px-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
                <Icon className="h-7 w-7 text-indigo-600" />
              </div>
              <p className="text-base font-semibold text-gray-900">{title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy
