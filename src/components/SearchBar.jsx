import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(inputValue)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 sm:flex-row">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-amber-400"
      />
      <button type="submit" className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400">
        Search
      </button>
    </form>
  )
}
