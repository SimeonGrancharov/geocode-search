import { useEffect, useState } from 'react'

export function useWindowDimensions(): { width: number; height: number } {
  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  }>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    })

    return () => {
      window.removeEventListener('resize', () => {})
    }
  }, [])

  return dimensions
}
