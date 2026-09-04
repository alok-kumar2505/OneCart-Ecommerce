import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => e.preventDefault()
  
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto py-20 px-4 sm:px-8 flex flex-col items-center justify-center text-center">
        
        <p className="text-[#8B1B1B] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
          Exclusive Access
        </p>
        
        <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-black mb-6">
          Join the Inner Circle
        </h2>
        
        <p className="text-gray-500 text-sm max-w-lg mb-10 leading-relaxed">
          Subscribe to get early access to new collections, exclusive drops, and a 20% discount on your first order.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-xl mx-auto border border-gray-300">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 bg-transparent px-6 py-4 text-sm text-black placeholder-gray-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors border-l border-gray-300 sm:border-t-0 border-t"
          >
            Subscribe
          </button>
        </form>
        
        <p className="mt-4 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
          No spam. Unsubscribe at any time.
        </p>
        
      </div>
    </section>
  )
}

export default NewLetterBox
