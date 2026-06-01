import { z } from 'zod'

export const filterQuerySchema = z.object({
  search: z.string().trim().optional().default(''),
  date: z.string().trim().optional().default(''),
  status: z
    .string()
    .trim()
    .optional()
    .default('')
    .refine(
      (value) => ['', 'Pending', 'Contacted', 'Completed'].includes(value),
      'Invalid status filter',
    ),
})
