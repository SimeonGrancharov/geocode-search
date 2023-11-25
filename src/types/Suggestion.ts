import * as z from 'zod'

export const SuggestionSchema = z.object({
  text: z.string(),
  magicKey: z.string(),
  isCollection: z.boolean()
})

export type SuggestionT = z.TypeOf<typeof SuggestionSchema>
