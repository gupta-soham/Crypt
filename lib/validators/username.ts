import { z } from 'zod';
import Filter from 'bad-words';

const filter = new Filter();

const reservedSlugs = [
  'app', 'admin', 'api', 'auth', 'dashboard', 'login', 'logout',
  'profile', 'register', 'settings', 'user', 'users', 'www',
  'about', 'terms', 'privacy', 'help', 'support', 'contact'
];

const offensivePatterns = [
  /a+s+s+/i, /f+u+c+k+/i, /s+h+i+t+/i,
];

export const UsernameValidator = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username can only contain letters and numbers",
    })
    .refine((name) => !/^\d+$/.test(name), {
      message: "Username cannot be entirely numeric",
    })
    .refine((name) => !reservedSlugs.includes(name.toLowerCase()), {
      message: "This username is reserved and cannot be used",
    })
    .refine((name) => !filter.isProfane(name), {
      message: "Username contains inappropriate language",
    })
    .refine((name) => !offensivePatterns.some(pattern => pattern.test(name)), {
      message: "Username contains an inappropriate pattern",
    })
});

export type UsernameValidatorType = z.infer<typeof UsernameValidator>;