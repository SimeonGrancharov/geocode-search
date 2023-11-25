import * as z from 'zod'
import { LocationSchema } from '../types/Location'
import { SuggestionSchema } from '../types/Suggestion'

type BaseConfig = {
  suggest: {
    query: {
      text: string
      returnCollections: false
      maxSuggestions?: number
    }
  }
  findAddressCandidates: {
    query: {
      singleLine: string
      magicKey: string
    }
  }
}

type Config = {
  [K in keyof BaseConfig]: {
    response: z.ZodSchema
  }
}

const createApi = (
  config: Config
): (<K extends keyof Config>(
  endpoint: K,
  params: BaseConfig[K]['query']
) => Promise<z.TypeOf<Config[K]['response']>>) => {
  const baseUrl =
    'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'

  return async <K extends keyof Config>(
    endpoint: K,
    params: BaseConfig[K]['query']
  ): Promise<z.TypeOf<Config[K]['response']>> => {
    try {
      // Currently only query is supported so ez pz

      const formattedParams = Object.entries(params).reduce(
        (formatted, p) => {
          return {
            ...formatted,
            [p[0]]: p[1].toString()
          }
        },
        {
          // Just so every response is returned as json ¯\_(ツ)_/¯
          f: 'json',
          // Obfuscate other countries here
          countryCode: 'BGR'
        } as Record<string, string>
      )

      const address = `${baseUrl}/${endpoint}?${new URLSearchParams(
        formattedParams
      ).toString()}`

      const response = await fetch(address)
      const data = await response.json()

      const schema = config[endpoint].response

      return schema.parse(data)
    } catch (err) {
      console.log(`Endpoint /${endpoint} threw error: `, err)
    }
  }
}

export const api = createApi({
  suggest: {
    response: z.object({
      suggestions: z.array(SuggestionSchema)
    })
  },
  findAddressCandidates: {
    response: z.object({
      candidates: z.array(LocationSchema)
    })
  }
})
