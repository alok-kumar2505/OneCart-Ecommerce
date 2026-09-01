import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => e.preventDefault()
  return (
    <section className="w-full bg-[#1A1A1A] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C9A96E]">Exclusive Access</p>
        <h2 className="mt-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
          Subscribe &amp; Get <span className="text-[#C9A96E]">20% Off</span>
        </h2>
        <p className="mt-3 text-xs tracking-wide text-white/50 sm:text-sm">
          Early access to new collections, exclusive deals, and curated style — delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#C9A96E] transition-colors"
            required
          />
          <button
            type="submit"
            className="border border-[#C9A96E] bg-[#C9A96E] px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1A1A] hover:bg-[#A8895A] hover:border-[#A8895A] transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-xs text-white/25 tracking-wide">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

export default NewLetterBox
