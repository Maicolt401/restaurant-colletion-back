const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../db/models/User");
const userMock = require("../mocks/userMocks");
const { registerUser, userLogin } = require("./userControllers");

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  create: jest.fn(),
  findOne: jest.fn(),
  hash: jest.fn(),
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockNewUser = {
  name: "Silvi",
  username: "silvi",
  password: "11111",
  _id: "sdjdksfwe54",
};

jest.mock("../../db/models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn(() => mockNewUser),
}));

const expectedToken = "aaaa";

describe("Given a loginUser function", () => {
  const req = {
    body: {
      username: "lelo",
      password: "lelo",
    },
  };
  const next = jest.fn();

  describe("When invoked with a req object with the correct username and password", () => {
    User.findOne = jest.fn().mockResolvedValue(true);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jwt.sign = jest.fn().mockReturnValue(expectedToken);

    test("Then it should call res status method status with 201", async () => {
      const expectedStatus = 200;

      await userLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});

describe("Given a Register funtion", () => {
  describe("When it`s invoked whith a response", () => {
    test("Then it should call the response method status with 201", async () => {
      const req = {
        body: {
          restaurantName: "la villa",
          username: "villasants",
          password: "123456",
          CIF: "y2135ds52",
        },
      };
      const next = jest.fn();
      const expectedStatus = 201;
      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it's called with an existen username", () => {
    test("Then it should call response with error message 'User already exists'", async () => {
      const req = {
        body: userMock,
      };

      const expectErrorMessage = new Error();
      expectErrorMessage.customMessage = "User already exists";

      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});
