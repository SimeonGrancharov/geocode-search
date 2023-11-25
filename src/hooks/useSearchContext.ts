import { useContext } from 'react'
import { SearchContext } from '../context/Search'
import { SearchContextT } from '../types/SearchContext'

export function useSearchResults(): SearchContextT['searchResults'] | null {
  const context = useContext(SearchContext)

  return context?.searchResults ?? null
}
