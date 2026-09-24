import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo válido")
    .max(254, "El correo no puede superar 254 caracteres"),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(5000, "El mensaje no puede superar 5000 caracteres"),
  _gotcha: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
