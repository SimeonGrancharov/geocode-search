import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useMemo } from 'react'
import { useSelectedLocation } from '../hooks/useSelectedLocation'

const center = {
  lat: 42.7339,
  lng: 25.4858
}

export const Map = () => {
  const containerStyle = {
    width: '100%',
    height: '100vh'
  }

  const selectedLocation = useSelectedLocation()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDP_WR7eGdU8lElMj3025SPZEyJEUWiqnU'
  })

  const mapOptions = useMemo(
    () => ({
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    }),
    []
  )

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        selectedLocation
          ? {
              lat: selectedLocation.location.y,
              lng: selectedLocation.location.x
            }
          : center
      }
      zoom={8}
      onLoad={() => {}}
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
