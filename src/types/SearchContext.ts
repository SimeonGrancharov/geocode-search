import { SuggestionT } from './Suggestion'

export type SearchContextT = {
  searchResults: SuggestionT[] | undefined
  searchQuery: string
  isSearching: boolean
  setSearchQuery: (query: string) => void
}
