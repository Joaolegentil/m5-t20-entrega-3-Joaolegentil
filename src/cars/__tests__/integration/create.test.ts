import { prisma } from "../../../../prisma/database";
import supertest from "supertest";
import { app } from "../../../app";

describe("Car create integration tests", () => {
  const request = supertest(app);
  const endpoint = "/cars";

  beforeEach(async () => {
    await prisma.car.deleteMany();
  });

  test("Shoul be able to create a car succesfully", async () => {
    const validPayload = {
      name: "Gol",
      description: "Gol Quadrado",
      brand: "VW",
      year: 1995,
      km: 10000,
    };

    const response = await request.post(endpoint).send(validPayload);

    const expectedResponseBody = {
      id: expect.any(String),
      name: validPayload.name,
      description: validPayload.description,
      brand: validPayload.brand,
      year: validPayload.year,
      km: validPayload.km,
    };

    expect(response.body).toEqual(expectedResponseBody);
    expect(response.status).toBe(201);
  });

  test("Should return an error when creating a car without required keys", async () => {
    const invalidPayload = {};
    const response = await request.post(endpoint).send(invalidPayload);

    expect(response.body.errors).toBeDefined();

    const requiredKeys = ["name", "brand", "year", "km"];
    const receivedKeys = Object.keys(response.body.errors);
    expect(receivedKeys).toEqual(requiredKeys);

    requiredKeys.forEach((requiredKey) => {
      expect(response.body.errors[requiredKey]).toContain("Required");
    });
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

    const carRegisteredName = {
      name: car1.name,
      description: "Gol Bolinha",
      brand: "VW 2",
      year: 2099,
      km: 15,
    };

    const response = await request.post(endpoint).send(carRegisteredName);

    const expectResponseBody = {
      error: "Car already registered",
    };

    expect(response.body).toEqual(expectResponseBody)
    expect(response.statusCode).toBe(409)
  });
});
