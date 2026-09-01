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
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8 relative z-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {policies.map(({ icon: Icon, title, desc }, i) => (
            <div 
              key={title} 
              className="glass-panel-interactive flex flex-col items-center gap-4 rounded-3xl p-10 text-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-16 w-16 rounded-2xl glass-panel flex items-center justify-center border border-white/10 group-hover:border-violet-500/50 transition-colors">
                  <Icon className="h-8 w-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-white mt-2">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy
