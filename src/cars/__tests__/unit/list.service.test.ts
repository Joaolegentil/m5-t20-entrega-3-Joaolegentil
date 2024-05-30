import { prisma } from "../../../../prisma/database";
import { list } from "../../services";

describe("Car service list unit tests", () => {
  beforeAll(async () => {
    await prisma.car.deleteMany();
  });

  test("Should be able to list all car succesfully", async () => {
    const validTestCars = [
      {
        name: "Cobalt",
        description: "Flex",
        brand: "Chevrolet",
        year: 2020,
        km: 3000,
      },
      {
        name: "HRV",
        description: "Automático",
        brand: "Honda",
        year: 2021,
        km: 4000,
      },
      {
        name: "Logan",
        description: "Prateado",
        brand: "Renault",
        year: 2022,
        km: 5000,
      },
    ];

    await prisma.car.createMany({ data: validTestCars });

    const receivedValue = await list();
    const expectedValue = [
      {
        id: expect.any(String),
        name: "Cobalt",
        description: "Flex",
        brand: "Chevrolet",
        year: 2020,
        km: 3000,
      },
      {
        id: expect.any(String),
        name: "HRV",
        description: "Automático",
        brand: "Honda",
        year: 2021,
        km: 4000,
      },
      {
        id: expect.any(String),
        name: "Logan",
        description: "Prateado",
        brand: "Renault",
        year: 2022,
        km: 5000,
      },
    ];

    expect(receivedValue).toEqual(expectedValue)
  });
});
