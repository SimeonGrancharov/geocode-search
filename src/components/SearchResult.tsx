import './SearchResult.css'
import { SuggestionT } from '../types/Suggestion'
import { useSelectAddress } from '../hooks/useSelectAddress'
import { useCallback } from 'react'

export const SearchResult = (props: {
  result: SuggestionT
  onClick: (res: SuggestionT) => void
}) => {
  const selectAddress = useSelectAddress()

  const onClick = useCallback(() => {
    selectAddress({
      address: props.result.text,
      magicKey: props.result.magicKey
    })

    props.onClick(props.result)
  }, [props, selectAddress])

  return (
    <div className="result-container" onClick={onClick}>
      <p>{props.result.text}</p>
    </div>
  )
}
