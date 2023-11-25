import { useContext } from 'react'
import { LocationContext } from '../context/Location'
import { LocationContextT } from '../types/LocationContext'

export function useSelectAddress(): LocationContextT['selectAddress'] {
  const ctx = useContext(LocationContext)

  return ctx.selectAddress
}
