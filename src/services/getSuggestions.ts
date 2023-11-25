import { SuggestionT } from '../types/Suggestion'
import { api } from '../utils/api'

export async function getSuggestions(query: string): Promise<SuggestionT[]> {
  const { suggestions } = await api('suggest', {
    text: query,
    returnCollections: false,
    maxSuggestions: 10
  })

  return suggestions
}
