require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const connectDb = require("../../db");
const User = require("../../db/models/User");
const userMock = require("../mocks/userMocks");

beforeAll(async () => {
  const memoryTest = process.env.MONGO_STRING_TEST;
  await connectDb(memoryTest);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Given a post endpoint /clients/register", () => {
  describe("when it receives a request", () => {
    test("then is should call the status method of res with 201 ", async () => {
      const response = await request(app)
        .post("/clients/register")
        .send(userMock)
        .expect(201);

      expect(response.body).toHaveProperty("username", userMock.username);
    });
  });
});
