import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiSparkles } from 'react-icons/hi'

const companyLinks = ['Home', 'About Us', 'Delivery', 'Privacy Policy']
const contactInfo = ['+91-9525487783', 'contact@onecart.com', '+1-123-456-7890', 'admin@onecart.com']

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="w-full bg-obsidian-950 pb-20 md:pb-0 relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-12">
          
          {/* Brand */}
          <div className="sm:col-span-5 lg:col-span-4">
            <div className="flex cursor-pointer items-center gap-3 mb-6" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-pink-500 to-amber-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                  <HiSparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="font-display text-xl font-bold text-white uppercase tracking-wide">
                One<span className="text-amber-500">Cart</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 pr-4">
              Redefining online shopping. Experience premium quality, seamless checkout, and curated collections designed for modern living.
            </p>
          </div>

          {/* Company */}
          <div className="sm:col-span-3 lg:col-span-2 lg:col-start-7">
            <h3 className="mb-6 font-display text-sm font-bold text-white">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-4 lg:col-span-3">
            <h3 className="mb-6 font-display text-sm font-bold text-white">Contact</h3>
            <ul className="space-y-4">
              {contactInfo.map(item => (
                <li key={item} className="text-sm text-gray-400 hover:text-white transition-colors">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 OneCart. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-xs text-gray-500 hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="text-xs text-gray-500 hover:text-white cursor-pointer transition-colors">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
