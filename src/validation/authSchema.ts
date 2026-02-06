import { z } from "zod";

export const registerSchema = z.object({
    email: z.string()
        .nonempty("Пошта обов'язкова")
        .email("Некоректний формат пошти"),
    password: z.string()
        .nonempty("Пароль обов'язковий")
        .min(6, "Мінімум 6 символів")
        .regex(/[A-Z]/, "Пароль має містити хоча б одну велику літеру")
        .regex(/[0-9]/, "Пароль має містити хоча б одну цифру"),
    firstName: z.string()
        .nonempty("Ім'я обов'язкове")
        .max(50,"Максимум 50 символів"),
    lastName: z.string()
        .nonempty("Прізвище обов'язкове")
        .max(50,"Максимум 50 символів"),
    imageFile: z.any()
        .refine((file) => file !== null && file !== undefined, "Зображення обов'язкове")
        .refine((file) => file?.uri, "Необхідно вибрати файл")
});

export const loginSchema = z.object({
    email: z.string()
        .nonempty("Пошта обов'язкова")
        .email("Некоректний формат пошти"),
    password: z.string()
        .nonempty("Пароль обов'язковий")
        .min(6, "Мінімум 6 символів")
        .regex(/[A-Z]/, "Пароль має містити хоча б одну велику літеру")
        .regex(/[0-9]/, "Пароль має містити хоча б одну цифру"),
});



export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;