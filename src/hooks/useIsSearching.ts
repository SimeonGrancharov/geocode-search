import { useContext } from 'react'
import { SearchContext } from '../context/Search'

export function useIsSearching(): boolean {
  const context = useContext(SearchContext)

  return context?.isSearching ?? false
}
