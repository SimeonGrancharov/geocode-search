import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from '../hooks/useDebouncedCallback'
import { produce } from 'immer'
import { SuggestionT } from '../types/Suggestion'
import './Search.css'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import { getSuggestions } from '../services/getSuggestions'

type SearchResultsState = {
  results: Record<SuggestionT['text'], SuggestionT>
  searchResults: Record<string, SuggestionT['text'][]>
}

export const Search = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [resultsByText, setResultsByText] = useState<
    SearchResultsState['results']
  >({})

  const [searchResultsCache, setSearchResultsCache] = useState<
    SearchResultsState['searchResults']
  >({})

  const fetchSuggestions = useDebouncedCallback(
    async (query: string) => {
      if (!query) {
        return
      }

      if (searchResultsCache[query] !== undefined) {
        // cache hit no need to spam requests
        return
      }

      setIsSearching(true)

      const suggestions = await getSuggestions(query)

      setResultsByText((state) =>
        produce(state, (draftState) => {
          suggestions.forEach((suggestion) => {
            draftState[suggestion.text] = suggestion
          })
        })
      )

      if (!searchResultsCache[searchQuery]) {
        setSearchResultsCache((state) =>
          produce(state, (draftState) => {
            draftState[query] = suggestions.map((suggestion) => suggestion.text)
          })
        )
      }

      setIsSearching(false)
    },
    { duration: 50 }
  )

  useEffect(() => {
    fetchSuggestions(searchQuery)
  }, [searchQuery, fetchSuggestions])

  const searchResults = useMemo(
    () =>
      searchResultsCache[searchQuery]?.map((result) => resultsByText[result]),
    [searchResultsCache, searchQuery, resultsByText]
  )

  const setQuery = useCallback(
    (query: string) => {
      setSearchQuery(query)
    },
    [setSearchQuery]
  )

  return (
    <div className="search-container">
      <SearchInput onChange={setQuery} />
      <SearchResults data={searchResults} isLoading={isSearching} />
    </div>
  )
}
