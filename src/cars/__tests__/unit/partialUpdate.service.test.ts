import { prisma } from "../../../../prisma/database";
import { partialUpdate } from "../../services";

describe("Car service partial update unit tests", () => {
  beforeAll(async () => {
    await prisma.car.deleteMany();
  });
  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to partial update a car by id", async () => {
    const car = {
      name: "Gol",
      description: "Gol Quadrado",
      brand: "VW",
      year: 1995,
      km: 10000,
    };

    const createdCar = await prisma.car.create({ data: car });

    const toUpdatePayload = {
      name: "Gol Atualizado",
      description: "Gol Quadrado Atualizado",
      brand: "VW Atualizado",
      year: 295,
      km: 0,
    };

    const receivedValue = await partialUpdate(toUpdatePayload, createdCar.id);

    const expectedValue = {
      id: createdCar.id,
      name: toUpdatePayload.name,
      description: toUpdatePayload.description,
      brand: toUpdatePayload.brand,
      year: toUpdatePayload.year,
      km: toUpdatePayload.km,
    };
    expect(receivedValue).toEqual(expectedValue);

    const updatedCar = await prisma.car.findUnique({
      where: { id: createdCar.id },
    });
    expect(updatedCar).toEqual(expectedValue);
  });

  test("Should throw an error when partial updating a Car with non existing id", async () => {
    const idNotExist = "c6d5fc16-fca5-43e5";

    await expect(partialUpdate({}, idNotExist)).rejects.toThrow(
      "Car not found"
    );
  });

  test("Should throw an error when partial updating a Car with already exist", async () => {
    const car1 = {
      name: "Gol",
      description: "Gol Quadrado",
      brand: "VW",
      year: 1995,
      km: 10000,
    };

    const car2 = {
      name: "Mustang",
      description: "Amarelo",
      brand: "Chevrolet",
      year: 1999,
      km: 15000,
    };

    const createdCar1 = await prisma.car.create({ data: car1 });
    const createdCar2 = await prisma.car.create({ data: car2 });

    const toUpdatePayload = {
      name: car2.name,
    };

    await expect(
      partialUpdate(toUpdatePayload, createdCar1.id)
    ).rejects.toThrow("Name already used");

    const receivedCar1 = await prisma.car.findUnique({
      where: { id: createdCar1.id },
    });

    expect(receivedCar1).toEqual(createdCar1)
  });
});
