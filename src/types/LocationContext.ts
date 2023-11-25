import { LocationT } from './Location'

export type LocationContextT = {
  selectedLocation: LocationT | undefined
  selectAddress: (params: { address: string; magicKey: string }) => void
}
