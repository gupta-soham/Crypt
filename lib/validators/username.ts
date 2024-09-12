import { z } from 'zod';
import Filter from 'bad-words';

const filter = new Filter();

const reservedSlugs = ['app', 'admin', 'www', 'he', 'she'];

export const UsernameValidator = z.object({
  name: z
    .string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z0-9_]+$/)
    .refine((name: string) => !reservedSlugs.includes(name), {
      message: "Username can't be one of the reserved names",
    })
    .refine((name: string) => !filter.isProfane(name), {
      message: "Username contains inappropriate language",
    }),
});
