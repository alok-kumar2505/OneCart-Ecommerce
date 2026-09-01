import React from 'react'
import { RiExchangeFundsLine } from 'react-icons/ri'
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb'
import { BiSupport } from 'react-icons/bi'

const policies = [
  { icon: RiExchangeFundsLine, title: 'Easy Exchange', desc: 'Quick, simple, and customer-friendly exchange process.' },
  { icon: TbRosetteDiscountCheckFilled, title: '7-Day Returns', desc: 'Shop with confidence — hassle-free return guarantee.' },
  { icon: BiSupport, title: 'Premium Support', desc: 'Dedicated team ready to assist anytime, anywhere.' },
]

function OurPolicy() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-px bg-[#E8E2D9] sm:grid-cols-3">
          {policies.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-4 bg-white px-8 py-10 text-center">
              <Icon className="h-8 w-8 text-[#C9A96E]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A1A1A]">{title}</p>
              <p className="text-xs leading-relaxed text-[#6B6360]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy
