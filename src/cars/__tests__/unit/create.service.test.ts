import { prisma } from "../../../../prisma/database";
import { create } from "../../services";

describe("Car service create unit tests", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to create a car succesfully", async () => {
    const validTestCar = {
      name: "Gol",
      description: "Gol Quadrado",
      brand: "VW",
      year: 1995,
      km: 10000,
    };

    const receivedValue = await create(validTestCar);

    const expectedValue = {
      id: expect.any(String),
      name: validTestCar.name,
      description: validTestCar.description,
      brand: validTestCar.brand,
      year: validTestCar.year,
      km: validTestCar.km,
    };

    expect(receivedValue).toEqual(expectedValue);

    const createdCar = await prisma.car.findFirst({
      where: { id: receivedValue.id },
    });

    expect(createdCar).toBeTruthy();
  });

  test("Should throw an error when creating an existing car", async () => {
    const car1 = {
      name: "Gol",
      description: "Gol Quadrado",
      brand: "VW",
      year: 1995,
      km: 10000,
    };

    await prisma.car.create({ data: car1 });

    const carAlreadyRegistered = {
      name: "Gol",
      description: "Gol Bolinha",
      brand: "VW 2",
      year: 2004,
      km: 5500,
    };

    await expect(create(carAlreadyRegistered)).rejects.toThrow(
      "Car already registered"
    );
  });
});
