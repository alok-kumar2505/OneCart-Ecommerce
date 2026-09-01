import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="w-full bg-indigo-600 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">Newsletter</p>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Subscribe &amp; get <span className="text-indigo-200">20% off</span>
        </h2>
        <p className="mt-3 text-sm text-indigo-200 sm:text-base">
          Exclusive deals, early access to new collections, and special offers — delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 rounded-xl border border-indigo-400 bg-white/10 px-4 py-3 text-sm text-white placeholder-indigo-300 outline-none focus:border-white focus:bg-white/20 transition-colors"
            required
          />
          <button
            type="submit"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors active:scale-95"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-xs text-indigo-300">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export default NewLetterBox
