import './SearchResults.css'
import { SearchResult } from './SearchResult'
import { useEffect, useState } from 'react'
import { SuggestionT } from '../types/Suggestion'

export const SearchResults = (props: {
  data: SuggestionT[] | undefined
  isShown: boolean
  isLoading: boolean
}) => {
  const [searchResults, setSearchResults] = useState(props.data)

  useEffect(() => {
    // The desired behavior is that the popup should remain visible with old
    // results when new search is initiated
    //
    // If the component is visible and there is an ongoing api call or there is no
    // data (which means there is no data at all, not just no results)
    // we want to preserve the popup open to achieve the desired behavior.
    //
    if ((props.isLoading || props.data === undefined) && props.isShown) {
      return
    }

    setSearchResults(props.data)
  }, [props.isLoading, props.data, setSearchResults, props.isShown])

  if (!searchResults) {
    return null
  }

  return (
    <div className="search-results-container">
      {searchResults.length ? (
        searchResults.map((result) => (
          <SearchResult key={result.text} result={result} />
        ))
      ) : (
        <div className="empty-results-container">
          <p>Няма намерени резултати</p>
        </div>
      )}
    </div>
  )
}
