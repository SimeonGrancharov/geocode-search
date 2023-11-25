import './SearchResults.css'
import { useSearchResults } from '../hooks/useSearchResults'
import { SearchResult } from './SearchResult'
import { useIsSearching } from '../hooks/useIsSearching'
import { useEffect, useState } from 'react'

export const SearchResults = () => {
  const _searchResults = useSearchResults()
  const [searchResults, setSearchResults] = useState(_searchResults)
  const isSearching = useIsSearching()

  useEffect(() => {
    // if an api call is ongoing or it is just initiated we want to preserve
    // the prevResults
    if (isSearching || _searchResults === undefined) {
      return
    }
    console.log(' E kak > ', _searchResults)

    setSearchResults(_searchResults)
  }, [isSearching, _searchResults, setSearchResults])

  if (!searchResults?.length) {
    return null
  }

  return (
    <div className="search-results-container">
      {searchResults?.map((x) => <SearchResult key={x.text} suggestion={x} />)}
    </div>
  )
}
