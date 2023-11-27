import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from '../hooks/useDebouncedCallback'
import { produce } from 'immer'
import { SuggestionT } from '../types/Suggestion'
import './Search.css'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import { getSuggestions } from '../services/getSuggestions'
import { useWindowDimensions } from '../hooks/useWindowDimensions'

type SearchResultsState = {
  results: Record<SuggestionT['text'], SuggestionT>
  searchResults: Record<string, SuggestionT['text'][]>
}

export const Search = () => {
  const [shouldHideResults, setShouldHideResults] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const windowDimensions = useWindowDimensions()

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

  useEffect(() => {
    // We want results to always be shown on resolution > 500px width
    if (windowDimensions.width > 500 && shouldHideResults) {
      setShouldHideResults(false)
    }
  }, [windowDimensions.width, shouldHideResults])

  const searchResults = useMemo<SuggestionT[] | undefined>(
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

  const onResultClick = useCallback(() => {
    if (window.innerWidth <= 500) {
      setShouldHideResults(true)
    }
  }, [])

  const onInputFocused = useCallback(() => {
    if (window.innerWidth <= 500) {
      setShouldHideResults(false)
    }
  }, [])

  return (
    <div className="search-container">
      <SearchInput
        onChange={setQuery}
        value={searchQuery}
        onFocus={onInputFocused}
      />
      <SearchResults
        data={searchResults}
        isLoading={isSearching}
        isShown={!shouldHideResults && Boolean(searchQuery)}
        onResultClick={onResultClick}
      />
    </div>
  )
}
