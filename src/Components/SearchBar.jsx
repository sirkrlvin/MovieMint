import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(inputValue)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button type="submit">Search</button>
    </form>
  )
}
