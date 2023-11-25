import { useSearchResults } from '../hooks/useSearchContext'

export const SearchResults = () => {
  const searchResults = useSearchResults()

  console.log({ searchResults })

  return <>{searchResults?.map((x) => <p key={x.text}>{x.text}</p>)}</>
}
