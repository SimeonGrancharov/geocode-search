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
    // if an api call is ongoing or it is just initiated we want to preserve
    // the prevResults for a smoother experience of the popup
    if (props.isLoading || props.data === undefined) {
      return
    }

    setSearchResults(props.data)
  }, [props.isLoading, props.data, setSearchResults])

  return props.isShown ? (
    <div className="search-results-container">
      {searchResults && searchResults.length ? (
        searchResults.map((result) => (
          <SearchResult key={result.text} result={result} />
        ))
      ) : (
        <div className="empty-results-container">
          <p>Няма намерени резултати</p>
        </div>
      )}
    </div>
  ) : null
}
