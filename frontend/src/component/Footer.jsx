import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-8 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        
        {/* Logo & Description */}
        <div className="lg:pr-8">
          <h2 className="font-playfair text-3xl tracking-[0.15em] mb-6">VELORA</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Luxury fashion platform engineered with AI personal styling and high-end editorial curation.
          </p>
        </div>

        {/* Collections Links */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-6">Collections</h3>
          <ul className="space-y-4">
            {['Outerwear & Coats', 'Poplin Shirts', 'Tailored Trousers', 'Silk Evening Dresses', 'Leather Footwear'].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Services Links */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-6">AI Services</h3>
          <ul className="space-y-4">
            {['AI Personal Stylist', 'Visual Outfit Search', 'Digital Wardrobe', 'Semantic AI Search'].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-6">Newsletter</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Subscribe to receive private invitations to new autumn releases and bespoke editorial lookbooks.
          </p>
          <form className="flex border border-gray-700 bg-[#1A1A1A] h-12 relative overflow-hidden">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent text-sm px-4 focus:outline-none text-white placeholder-gray-600"
            />
            <button type="submit" className="px-6 text-xs font-bold tracking-widest uppercase hover:bg-[#222222] transition-colors border-l border-gray-700">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs text-center md:text-left">
          © 2026 VELORA LUXURY FASHION INC. ALL RIGHTS RESERVED.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-[10px] font-bold tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Shipping & Returns</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
