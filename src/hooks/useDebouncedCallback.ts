import { useCallback, useRef } from 'react'

export function useDebouncedCallback<T extends (...args: any) => any>(
  cb: T,
  config: {
    duration: number
  }
): T {
  const callbackRef = useRef<typeof cb>(cb)
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined)

  // For referential stabillity
  callbackRef.current = cb

  const callback = useCallback((...args: any) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => cb(...args), config.duration)
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return callback as T
}
