// const bcrypt = require("bcrypt");
const User = require("../../db/models/User");
const userMock = require("../mocks/userMocks");
const { registerUser } = require("./userControllers");

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  create: jest.fn(),
  findOne: jest.fn(),
}));

jest.mock("bcrypt", () => ({ compare: jest.fn(), hash: jest.fn() }));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

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

      const expectedStatus = 201;
      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it's called with an existen username", () => {
    test("Then it should call response with error message 'User already exists'", async () => {
      const req = {
        body: userMock,
      };

      const error = new Error();
      error.customMessage = "User already exists";

      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
