import { z } from "zod";

// Вспомогательная функция для проверки сложности пароля
const passwordSchema = z
  .string()
  .min(1, "Пароль не может быть пустым")
  .min(8, "Пароль должен содержать минимум 8 символов")
  .max(50, "Пароль не должен превышать 50 символов")
  .refine(
    (password) => /[A-Z]/.test(password),
    "Пароль должен содержать хотя бы одну заглавную букву"
  )
  .refine(
    (password) => /[a-z]/.test(password),
    "Пароль должен содержать хотя бы одну строчную букву"
  )
  .refine(
    (password) => /\d/.test(password),
    "Пароль должен содержать хотя бы одну цифру"
  );

export const registrationSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email обязателен для заполнения")
      .email("Введите корректный email адрес")
      .max(320, "Email не должен превышать 320 символов")
      .transform((email) => email.toLowerCase().trim()), // аналогично .normalizeEmail()
    
    password: passwordSchema,
    
    confirmPassword: z
      .string()
      .min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })
  .refine((data) => {
    // Дополнительная проверка: пароль не должен содержать часть email
    const emailUsername = data.email.split('@')[0];
    return !data.password.toLowerCase().includes(emailUsername.toLowerCase());
  }, {
    message: "Пароль не должен содержать часть вашего email",
    path: ["password"],
  });

export type RegistrationValues = z.infer<typeof registrationSchema>;