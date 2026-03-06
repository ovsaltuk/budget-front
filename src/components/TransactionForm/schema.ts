import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.string(),  
  category: z.string(),
  subcategory: z.string(),
  date: z.string(),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
});

export type TransactionValues = z.infer<typeof transactionSchema>;