import { ClearIcon } from './ClearIcon'
import './SearchInput.css'

export const SearchInput = (props: {
  onChange: (value: string) => void
  value: string
  onFocus: () => void
}) => {
  return (
    <div className="search-input-container">
      <input
        type="text"
        value={props.value}
        className="search-input"
        placeholder="Търси..."
        onChange={(ev) => {
          props.onChange(ev.target.value)
        }}
        onFocus={props.onFocus}
      />
      <div
        onClick={() => {
          props.onChange('')
        }}
        className="clear-search-button"
      >
        <ClearIcon className="clear-search" fill="#9E9E9E" />
      </div>
    </div>
  )
}
