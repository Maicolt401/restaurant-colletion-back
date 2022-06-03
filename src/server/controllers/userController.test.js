const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../db/models/User");
const { userMock, mockLogin } = require("../mocks/userMocks");
const { registerUser, userLogin } = require("./userControllers");

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  create: jest.fn(),
  findOne: jest.fn(),
}));

const expectedToken = "adas6545496a8sdsa6d54";
const next = jest.fn();

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
          userMock,
        },
      };

      const expectedStatus = 201;
      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("when its called with wrong credentials", () => {
    test("Then it should call next", async () => {
      User.create = jest.fn().mockRejectedValue();
      const req = {
        body: { userMock },
      };

      const error = new Error();
      error.statusCode = 400;
      error.customMessage = "bad request";

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it is called with a user that is already in the database", () => {
    test("Then it should call the 'next' middleware with an error", async () => {
      const req = {
        body: { userMock },
      };

      User.findOne.mockImplementation(() => true);
      bcrypt.hash.mockImplementation(() => "hashedPassword");
      await registerUser(req, res, next);

      const mockError = new Error();
      mockError.statusCode = 409;
      mockError.customMessage = "this user already exists";

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});

describe("Given a userLogin function", () => {
  const req = {
    body: {
      mockLogin,
    },
  };

  describe("When it`s invoked whit username and password", () => {
    User.findOne = jest.fn().mockResolvedValue(true);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jsonwebtoken.sign = jest.fn().mockReturnValue(expectedToken);

    test("Then it should call the response method whit status 200 ", async () => {
      const expectedStatus = 201;

      await userLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it is called with a user that is already in the database", () => {
    test("Then it should call the 'next' middleware with an error", async () => {
      User.findOne.mockImplementation(() => true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      await userLogin(req, res, next);

      const error = new Error();
      error.statusCode = 403;
      error.customMessage = "bad request";

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When invoked with a req object with an incorrect username", () => {
    test("Then it should call the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
