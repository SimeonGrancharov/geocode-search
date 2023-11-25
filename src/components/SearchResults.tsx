import './SearchResults.css'
import { useSearchResults } from '../hooks/useSearchContext'
import { SearchResult } from './SearchResult'

export const SearchResults = () => {
  const searchResults = useSearchResults()

  if (!searchResults?.length) {
    return null
  }

  return (
    <div className="search-results-container">
      {searchResults?.map((x) => <SearchResult key={x.text} suggestion={x} />)}
    </div>
  )
}
