const Reserve = require("../../db/models/Reserve");
const { reservesReadyMock } = require("../mocks/reservesReadyMock");

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
      Reserve.find = jest.fn().mockResolvedValue(false);

      await getReserves(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expecStatus);
    });
  });
});
