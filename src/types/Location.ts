import * as z from 'zod'

export const LocationSchema = z.object({
  address: z.string(),
  location: z.object({
    x: z.number(),
    y: z.number()
  })
})

export type LocationT = z.TypeOf<typeof LocationSchema>
