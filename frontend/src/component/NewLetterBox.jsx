import React from 'react'
import { HiSparkles } from 'react-icons/hi'

function NewLetterBox() {
  const handleSubmit = (e) => e.preventDefault()
  return (
    <section className="w-full px-4 py-24 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="mx-auto max-w-3xl text-center glass-panel rounded-[2.5rem] p-8 sm:p-16 border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 to-obsidian-900/50 z-0" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-pink-500/30 mb-6">
            <HiSparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-pink-300">Exclusive Access</span>
          </div>
          
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Join the <span className="gradient-text">Inner Circle</span>
          </h2>
          
          <p className="mt-6 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Subscribe to get early access to new collections, exclusive drops, and a <span className="text-amber-400 font-bold">20% discount</span> on your first order.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="glass-input flex-1 rounded-xl px-5 py-3.5 text-sm"
              required
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-transform flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
          
          <p className="mt-6 text-xs text-gray-500">No spam. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}

export default NewLetterBox
