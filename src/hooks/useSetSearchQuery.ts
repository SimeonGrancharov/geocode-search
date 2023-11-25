import { useContext } from 'react'
import { SearchContext } from '../context/Search'
import { SearchContextT } from '../types/SearchContext'

export function useSetSearchQuery(): SearchContextT['setSearchQuery'] {
  const context = useContext(SearchContext)

  return context ? context.setSearchQuery : () => {}
}
