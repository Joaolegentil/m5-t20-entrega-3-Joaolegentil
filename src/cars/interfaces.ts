import { carCreateSchema, carSchema, carUpdateSchema } from "./schemas";
import { z } from "zod";

type Car = z.infer<typeof carSchema>;

type CarCreate = z.infer<typeof carCreateSchema>;

type CarUpdate = z.infer<typeof carUpdateSchema>;

export { Car, CarCreate, CarUpdate };
