require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const connectDb = require("../../db");
const User = require("../../db/models/User/User");
const { userMock, mockLogin } = require("../mocks/userMocks");

const memoryTest = process.env.MONGO_STRING_TEST;
beforeAll(async () => {
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

describe("Given a post endpoint /clients/login", () => {
  describe("when it receives a request", () => {
    test("then is should call the status method of res with 201 ", async () => {
      const response = await request(app)
        .post("/clients/login")
        .send(mockLogin)
        .expect(200);

      expect(response.body).toHaveProperty(
        mockLogin.password,
        mockLogin.username
      );
    });
  });
});
