import React from 'react'
import { LocationContextT } from '../types/LocationContext'

export const LocationContext = React.createContext<LocationContextT>({
  selectedLocation: undefined,
  selectAddress: () => {}
})
