import { useContext } from 'react'
import { LocationContext } from '../context/Location'
import { LocationContextT } from '../types/LocationContext'

export function useSelectedLocation(): LocationContextT['selectedLocation'] {
  return useContext(LocationContext).selectedLocation
}
