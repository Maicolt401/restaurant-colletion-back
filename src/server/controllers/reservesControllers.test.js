const Reserve = require("../../db/models/Reserve");
const { reservesReadyMock } = require("../mocks/reservesReadyMock");

const { getReserves, deleteReserve } = require("./reservesControllers");

describe("Given a reservesControllers functionk", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When invoked with mthod response and status 200", () => {
    test("Then it should call the method and response", async () => {
      const req = {
        body: { reservesReadyMock },
      };
      const expecStatus = 200;
      Reserve.find = jest.fn().mockResolvedValue(false);

      await getReserves(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expecStatus);
    });
  });
  describe("when its called with reserves not found", () => {
    test("Then it should call next", async () => {
      const next = jest.fn();
      const error = { code: 404, customMessage: "reserves not found" };

      Reserve.find = jest.fn().mockRejectedValue({});
      await getReserves(null, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a deleteCheck controller", () => {
  describe("When it's invoqued with a response and a request with an id to delete", () => {
    test("Then it should call the response's status method with 200 and the json method with a 'Check deleted' message", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = { params: { idReserve: 54 } };

      Reserve.findByIdAndDelete = jest.fn().mockResolvedValue();

      await deleteReserve(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: "Reserve deleted" });
    });
  });

  describe("When it's invoqued with a response and a request with a invalid id to delete", () => {
    test("Then it should call the response's status method with 404 and the json method with a 'No check with that id found' message", async () => {
      const next = jest.fn();
      const req = { params: { idReserve: 55 } };
      const expectedError = {
        customMessage: "No Reserve with that id found",
        code: 404,
      };

      Reserve.findByIdAndDelete = jest.fn().mockRejectedValue({});
      await deleteReserve(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
