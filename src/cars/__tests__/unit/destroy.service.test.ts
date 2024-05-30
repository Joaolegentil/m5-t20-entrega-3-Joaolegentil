import { prisma } from "../../../../prisma/database";
import { destroy } from "../../services";

describe("Car service delete unit tests", () => {
  beforeAll(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to delete a car by id", async () => {
    const car = {
      name: "Gol",
      description: "Gol Quadrado",
      brand: "VW",
      year: 1995,
      km: 10000,
    };

    const createdCar = await prisma.car.create({ data: car });

    await destroy(createdCar.id)

    const cars = await prisma.car.findMany()

    expect(cars).toEqual([]);

  });

  test("Should throw an error when delete a Car with non existing id", async () => {
    const idNotExist = "c6d5fc16-fca5-43e5";

    await expect(destroy(idNotExist)).rejects.toThrow("Car not found");
  });
});
