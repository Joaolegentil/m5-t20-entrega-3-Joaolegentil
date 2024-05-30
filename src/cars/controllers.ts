import { Request, Response } from "express";
import { create, destroy, list, partialUpdate, retrieve } from "./services";

export const createController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const createdCar = await create(req.body);

  return res.status(201).json(createdCar);
};

export const listController = async (
  req: Request,
  res: Response
): Promise<Response> => {
 const listCars = await list()

  return res.status(200).json(listCars);
};


export const retrieveController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const carId = req.params.id

 const retrieveCar = await retrieve(carId)

  return res.status(200).json(retrieveCar);
};

export const partialUpdateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const carId = req.params.id
  const payload = req.body

 const partialUpdateCar = await partialUpdate(payload, carId)

  return res.status(200).json(partialUpdateCar);
};

export const destroyController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const carId = req.params.id

 const deleteCar = await destroy(carId)

  return res.status(200).json(deleteCar);
};
