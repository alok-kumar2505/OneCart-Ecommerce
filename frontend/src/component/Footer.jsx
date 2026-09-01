import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const companyLinks = ['Home', 'About Us', 'Delivery', 'Privacy Policy']
const contactInfo = ['+91-9525487783', 'contact@onecart.com', '+1-123-456-7890', 'admin@onecart.com']

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="w-full bg-[#1A1A1A] pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top border gold line */}
        <div className="mb-10 h-px w-full bg-[#C9A96E]/30" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex cursor-pointer items-center gap-2.5 mb-4" onClick={() => navigate('/')}>
              <img src={logo} alt="OneCart" className="h-6 w-6 object-contain" />
              <span className="text-base font-bold tracking-widest uppercase text-white">
                One<span className="text-[#C9A96E]">Cart</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/40">
              Your all-in-one online shopping destination. Quality products, unbeatable deals, and fast delivery — backed by trusted service.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A96E]">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-xs text-white/50 tracking-wide hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A96E]">Get in Touch</h3>
            <ul className="space-y-2.5">
              {contactInfo.map(item => (
                <li key={item} className="text-xs text-white/50 tracking-wide">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="text-[10px] tracking-widest text-white/20 uppercase">© 2025 OneCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
