import './SearchResults.css'
import { SearchResult } from './SearchResult'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SuggestionT } from '../types/Suggestion'

export const SearchResults = (props: {
  data: SuggestionT[] | undefined
  isShown: boolean
  isLoading: boolean
  onResultClick: (res: SuggestionT) => void
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldShowTopGradient, setShouldShowTopGradient] =
    useState<boolean>(false)
  const [shouldShowBottomGradient, setShouldShowBottomGradient] =
    useState<boolean>(false)
  const [searchResults, setSearchResults] = useState(props.data)

  const decideAndSetGradients = useCallback(() => {
    if (!containerRef.current) {
      return
    }

    setShouldShowBottomGradient(
      containerRef.current.scrollTop + containerRef.current.offsetHeight <
        containerRef.current.scrollHeight
    )

    setShouldShowTopGradient(containerRef.current.scrollTop > 0)
  }, [])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      decideAndSetGradients()
    })

    resizeObserver.observe(containerRef.current)

    containerRef.current?.addEventListener('scroll', () => {
      decideAndSetGradients()
    })

    return () => {
      resizeObserver.disconnect()
      containerRef.current?.removeEventListener('scroll', () => {})
    }
  }, [decideAndSetGradients])

  useEffect(() => {
    if ((containerRef.current?.scrollTop ?? 0) > 0) {
      containerRef.current?.scrollTo({ top: 0 })
    }
  }, [searchResults])

  useEffect(() => {
    // The desired behavior is that the popup should remain visible with old
    // results when new search is initiated
    //
    // If the component is visible and there is an ongoing api call or there is no
    // data (which means there is no data at all, not just no results)
    // we want to preserve the popup open to achieve the desired behavior.
    //
    if ((props.isLoading || props.data === undefined) && props.isShown) {
      return
    }

    setSearchResults(props.data)
  }, [props.isLoading, props.data, setSearchResults, props.isShown])

  return (
    <div
      ref={(r) => (containerRef.current = r)}
      className={`search-results-container ${
        // Since the fact that we use ref to the container it is better approach to
        // hide the container with css rather than unmounting the div
        !searchResults || !props.isShown ? 'invisible' : ''
      }`}
    >
      {shouldShowTopGradient ? (
        <div className="search-results-gradient top" />
      ) : null}
      {searchResults !== undefined ? (
        searchResults.length ? (
          searchResults.map((result) => (
            <SearchResult
              key={result.text}
              result={result}
              onClick={props.onResultClick}
            />
          ))
        ) : (
          <div className="empty-results-container">
            <p>Няма намерени резултати</p>
          </div>
        )
      ) : null}
      {shouldShowBottomGradient ? (
        <div className="search-results-gradient bottom" />
      ) : null}
    </div>
  )
}
