import { prisma } from "../../prisma/database";
import { ApiError } from "../errors/api.error";
import { Car, CarCreate, CarUpdate } from "./interfaces";

export const create = async (payload: CarCreate): Promise<Car> => {
  const car = await prisma.car.findFirst({ where: { name: payload.name } });

  if (car) {
    throw new ApiError("Car already registered", 409);
  }

  const newCar = await prisma.car.create({ data: payload });

  return newCar;
};

export const list = async (): Promise<Array<Car>> => {
  return await prisma.car.findMany();
};

export const retrieve = async (carId: string): Promise<Car> => {
  const car = await prisma.car.findUnique({ where: { id: carId } });

  if (!car) {
    throw new ApiError("Car not found", 404);
  }

  return car;
};

export const partialUpdate = async (payload: CarUpdate, carId: string) => {
  await retrieve(carId);

  if (payload.name) {
    const sameNameCar = await prisma.car.findFirst({
      where: { name: payload.name },
    });

    if (sameNameCar) {
      throw new ApiError("Name already used", 409);
    }
  }

  const carUp = await prisma.car.update({
    where: { id: carId },
    data: payload,
  });

  return carUp;
};

export const destroy = async (carId: string): Promise<void> => {
  await retrieve(carId);

  await prisma.car.delete({ where: { id: carId } });
};
