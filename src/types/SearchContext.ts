import { SuggestionT } from './Suggestion'

export type SearchContextT = {
  searchResults: SuggestionT[]
  searchQuery: string
  setSearchQuery: (query: string) => void
}
