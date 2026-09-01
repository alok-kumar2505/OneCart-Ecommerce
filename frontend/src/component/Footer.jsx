import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const companyLinks = ['Home', 'About Us', 'Delivery', 'Privacy Policy']
const contactInfo = ['+91-9525487783', 'contact@onecart.com', '+1-123-456-7890', 'admin@onecart.com']

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="w-full bg-gray-900 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="OneCart" className="h-7 w-7 object-contain" />
              <span className="text-lg font-bold text-white">
                One<span className="text-indigo-400">Cart</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Your all-in-one online shopping destination. Quality products, unbeatable deals, and fast delivery — all backed by trusted service.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Get in Touch</h3>
            <ul className="mt-4 space-y-2">
              {contactInfo.map(item => (
                <li key={item} className="text-sm text-gray-300">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-500">© 2025 OneCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
