import {z} from "zod";

export const registrationSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(3, "Минимум 3 символа").max(20, "Максимум 20 символов"),
    confirmPassword: z.string().min(3, "Минимум 3 символа").max(20, "Максимум 20 символов"),
}).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Пароли не совпадают"});

export type RegistrationValues = z.infer<typeof registrationSchema>;