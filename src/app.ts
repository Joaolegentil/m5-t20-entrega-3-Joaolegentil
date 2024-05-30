import express from "express";
import "express-async-errors";
import { initRoutes } from "./routes";
import { handleError } from "./errors/handle.erros";

export const initApp = () => {
  const app = express();
  app.use(express.json());

  initRoutes(app);

  app.use(handleError)
  return app;
};

export const app = initApp();
