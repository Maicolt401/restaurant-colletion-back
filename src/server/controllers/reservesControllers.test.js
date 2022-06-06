const { reservesReadyMock } = require("../mocks/reservesReadyMock");

const Reserve = require("../../db/models/reserves");
const { getReserves } = require("./reservesControllers");

describe("Given a reservesControllers functionk", () => {
  describe("When invoked with mthod response and status 200", () => {
    test("Then it should call the method and response", async () => {
      const req = {
        body: { reservesReadyMock },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expecStatus = 200;
      Reserve.findOne = jest.fn().mockResolvedValue(false);

      await getReserves(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expecStatus);
    });
  });
});
