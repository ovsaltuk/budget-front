import { z } from "zod";

export const singInSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов"),
});

export type SingInValues = z.infer<typeof singInSchema>;
