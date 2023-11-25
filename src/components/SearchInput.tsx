import './SearchInput.css'

export const SearchInput = (props: { onChange: (value: string) => void }) => {
  return (
    <input
      className="search-input"
      placeholder="Търси..."
      onChange={(ev) => {
        props.onChange(ev.target.value)
      }}
    />
  )
}
