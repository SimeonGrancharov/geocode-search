import './SearchInput.css'
import { useSetSearchQuery } from '../hooks/useSetSearchQuery'

export const SearchInput = () => {
  const setSearchQuery = useSetSearchQuery()

  return (
    <input
      className="search-input"
      placeholder="Търси..."
      onChange={(ev) => {
        setSearchQuery(ev.target.value)
      }}
    />
  )
}
