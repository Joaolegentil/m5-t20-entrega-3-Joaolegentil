import { z } from "zod";

const carSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullish(),
  brand: z.string().min(1),
  year: z.number().positive(),
  km: z.number(),
});

const carCreateSchema = carSchema.omit({id: true})

const carUpdateSchema = carCreateSchema.partial()

export {carSchema, carCreateSchema, carUpdateSchema}