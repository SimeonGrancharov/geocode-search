import { useCallback, useRef } from 'react'

export function useThrottledCallback<T extends (...args: any) => any>(
  cb: T,
  config: {
    duration: number
  }
): T {
  const timerRef = useRef<number | null>(null)
  const callbackRef = useRef<typeof cb>(cb)

  callbackRef.current = cb

  const callback = useCallback((...args: any) => {
    const now = Date.now()

    if (timerRef.current !== null && timerRef.current > now) {
      return
    }

    timerRef.current = Date.now() + config.duration

    return callbackRef.current(...args)
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return callback as T
}

export function useDebouncedCallback<T extends (...args: any) => any>(
  cb: T,
  config: {
    duration: number
  }
): T {
  const callbackRef = useRef<typeof cb>(cb)
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined)

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
