import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useRef } from 'react'
import { useSelectedLocation } from '../hooks/useSelectedLocation'

const containerStyle = {
  width: '100%',
  height: '500px'
}

const center = {
  lat: 42.7339,
  lng: 25.4858
}

export const Map = () => {
  const selectedLocation = useSelectedLocation()

  useEffect(() => {
    if (!selectedLocation) {
      return
    }
  }, [selectedLocation])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDP_WR7eGdU8lElMj3025SPZEyJEUWiqnU'
  })

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
      options={{
        fullscreenControl: false
      }}
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
