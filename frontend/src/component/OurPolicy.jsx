import React from 'react'
import { LuShieldCheck } from 'react-icons/lu'
import { HiOutlineSparkles } from 'react-icons/hi'
import { FiCheckCircle } from 'react-icons/fi'

function OurPolicy() {
  return (
    <div className="bg-[#F9F9F9] border-t border-gray-200">
      
      {/* Testimonial Section */}
      <div className="py-24 px-4 sm:px-8 max-w-4xl mx-auto text-center border-b border-gray-200">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-black leading-tight italic mb-8">
          “VELORA redefines modern luxury by seamlessly fusing haute-couture Italian craftsmanship with groundbreaking artificial intelligence.”
        </h2>
        <p className="text-[#8B1B1B] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
          <span>+</span> VOGUE EDITORIAL REVIEW 2026 <span>+</span>
        </p>
      </div>

      {/* Policy Features Section */}
      <div className="bg-white py-20 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          <div className="flex flex-col items-center pt-8 md:pt-0 md:px-8">
            <LuShieldCheck className="w-10 h-10 text-[#8B1B1B] mb-6 stroke-1" />
            <h3 className="text-black font-bold text-[11px] tracking-widest uppercase mb-4">100% Authentic Tailoring</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Crafted with premium Italian virgin wool & Giza Egyptian cotton.
            </p>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0 md:px-8">
            <HiOutlineSparkles className="w-10 h-10 text-[#8B1B1B] mb-6 stroke-1" />
            <h3 className="text-black font-bold text-[11px] tracking-widest uppercase mb-4">AI Fit Advisor</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Personalized size recommendations calculated for every silhouette.
            </p>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0 md:px-8">
            <FiCheckCircle className="w-10 h-10 text-[#8B1B1B] mb-6 stroke-1" />
            <h3 className="text-black font-bold text-[11px] tracking-widest uppercase mb-4">Secure Payment & Express Shipping</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Encrypted Razorpay checkout & complimentary express delivery.
            </p>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default OurPolicy
