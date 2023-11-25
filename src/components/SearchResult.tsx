import './SearchResult.css'
import { SuggestionT } from '../types/Suggestion'

export const SearchResult = (props: { suggestion: SuggestionT }) => {
  return (
    <div className="result-container">
      <p>{props.suggestion.text}</p>
    </div>
  )
}
