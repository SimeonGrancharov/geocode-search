import { useCallback, useEffect, useMemo, useState } from 'react'
import { LocationContext } from '../context/Location'
import { getGeocodedAddresss } from '../services/getGeocodedAddress'
import { LocationT } from '../types/Location'
import { LocationContextT } from '../types/LocationContext'

type PropsT = {
  children: React.ReactNode
}

type AddressData = {
  address: string
  magicKey: string
}

export const LocationContextProvider = (props: PropsT) => {
  const [address, setAddress] = useState<AddressData | undefined>(undefined)
  const [location, setLocation] = useState<LocationT | undefined>(undefined)

  const fetchLocation = useCallback(async (params: AddressData) => {
    const location = await getGeocodedAddresss(params.address, params.magicKey)

    setLocation(location)
  }, [])

  useEffect(() => {
    if (address !== undefined) {
      fetchLocation(address)
    }
  }, [address, fetchLocation])

  const value = useMemo<LocationContextT>(
    () => ({
      selectedLocation: location,
      selectAddress: setAddress
    }),
    [location, setAddress]
  )

  return (
    <LocationContext.Provider value={value}>
      {props.children}
    </LocationContext.Provider>
  )
}
