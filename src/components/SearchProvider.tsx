import { produce } from 'immer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SearchContext } from '../context/Search'
import { useDebouncedCallback } from '../hooks/useDebouncedCallback'
import { getSuggestions } from '../services/getSuggestions'
import { SuggestionT } from '../types/Suggestion'

type PropsT = {
  children: React.ReactNode
}

type SearchResultsState = {
  results: Record<SuggestionT['text'], SuggestionT>
  searchResults: Record<string, SuggestionT['text'][]>
}

export const SearchContextProvider = ({ children }: PropsT) => {
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

  const contextValue = useMemo(
    () => ({
      searchResults,
      searchQuery,
      isSearching,
      setSearchQuery: setQuery
    }),
    [searchQuery, searchResults, setQuery, isSearching]
  )

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}
