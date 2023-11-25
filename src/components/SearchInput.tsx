import { useSetSearchQuery } from '../hooks/useSetSearchQuery'

export const SearchInput = () => {
  const setSearchQuery = useSetSearchQuery()

  return (
    <input
      onChange={(ev) => {
        setSearchQuery(ev.target.value)
      }}
    />
  )
}
