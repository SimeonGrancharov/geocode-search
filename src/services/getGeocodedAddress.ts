import { LocationT } from '../types/Location'
import { api } from '../utils/api'

export async function getGeocodedAddresss(
  address: string,
  magicKey: string
): Promise<LocationT> {
  const data = await api('findAddressCandidates', {
    singleLine: address,
    magicKey
  })

  return data[0]
}
