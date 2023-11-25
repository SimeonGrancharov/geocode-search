import './Search.css'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'

export const Search = () => {
  return (
    <div className="search-container">
      <SearchInput />
      <SearchResults />
    </div>
  )
}
