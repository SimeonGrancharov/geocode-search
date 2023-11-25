import './SearchResult.css'
import { SuggestionT } from '../types/Suggestion'
import { useSelectAddress } from '../hooks/useSelectAddress'

export const SearchResult = (props: { suggestion: SuggestionT }) => {
  const selectAddress = useSelectAddress()

  return (
    <div
      className="result-container"
      onClick={() => {
        selectAddress({
          address: props.suggestion.text,
          magicKey: props.suggestion.magicKey
        })
      }}
    >
      <p>{props.suggestion.text}</p>
    </div>
  )
}
