import './SearchResults.css'
import { SearchResult } from './SearchResult'
import { useEffect, useState } from 'react'
import { SuggestionT } from '../types/Suggestion'

export const SearchResults = (props: {
  data: SuggestionT[] | undefined
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

  if (!searchResults?.length) {
    return null
  }

  return (
    <div className="search-results-container">
      {searchResults?.map((result) => (
        <SearchResult key={result.text} result={result} />
      ))}
    </div>
  )
}
