import { z } from "zod";

export const contactFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es demasiado largo"),
  email: z.string().email("Por favor ingresa un email válido").max(100, "El email es demasiado largo"),
  telefono: z.string().min(8, "El teléfono debe tener al menos 8 caracteres").max(20, "El teléfono es demasiado largo"),
  empresa: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres").max(200, "El nombre de la empresa es demasiado largo"),
  cargo: z.string().max(100, "El cargo es demasiado largo").optional(),
  empleados: z.string().max(50, "Este campo es demasiado largo").optional(),
  mensaje: z.string().max(1000, "El mensaje es demasiado largo").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;