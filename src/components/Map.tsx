import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelectedLocation } from '../hooks/useSelectedLocation'

const center = {
  lat: 42.7339,
  lng: 25.4858
}

export const Map = () => {
  const [map, setMap] = useState<google.maps.Map | undefined>()
  const containerStyle = {
    width: '100%',
    height: '100vh'
  }

  const selectedLocation = useSelectedLocation()

  useEffect(() => {
    if (selectedLocation !== undefined) {
      map?.moveCamera({
        center: {
          lat: selectedLocation.location.y,
          lng: selectedLocation.location.x
        },
        zoom: 14
      })
    }
  }, [selectedLocation, map])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'whothis?'
  })

  const mapOptions = useMemo(
    () => ({
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    }),
    []
  )

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={() => {}}
      options={mapOptions}
    >
      {selectedLocation ? (
        <Marker
          position={{
            lat: selectedLocation.location.y,
            lng: selectedLocation.location.x
          }}
        />
      ) : null}
    </GoogleMap>
  ) : (
    <></>
  )
}
