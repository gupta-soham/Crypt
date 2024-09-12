import { z } from 'zod'
import Filter from 'bad-words';

const filter = new Filter();

export const SubgroupValidator = z.object({
  name: z
    .string()
    .min(3)
    .max(20)
    .refine((name: string) => !filter.isProfane(name), {
    message: "Community name contains inappropriate language",
  }),
})

export const SubgroupSubscriptionValidator = z.object({
  subgroupId: z.string(),
})

export type CreateSubgroupPayload = z.infer<typeof SubgroupValidator>
export type SubscribeToSubgroupPayload = z.infer<
  typeof SubgroupSubscriptionValidator
>