import { Router } from "express";
import { createController, destroyController, listController, partialUpdateController, retrieveController } from "./controllers";
import { isBodyValid } from "../middlewares";
import { carCreateSchema, carUpdateSchema } from "./schemas";

export const carRouter = Router();

carRouter.post("/",isBodyValid(carCreateSchema), createController);

carRouter.get("/", listController);

carRouter.get("/:id", retrieveController);

carRouter.patch("/:id",isBodyValid(carUpdateSchema), partialUpdateController);

carRouter.delete("/:id", destroyController);
