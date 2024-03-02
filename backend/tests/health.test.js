jest.mock('../config/mongoose', () => {
    const connect = jest.fn();
    return { connect };
  });
  
  const request = require("supertest");
  const app = require("../config/express");


  describe("GET /api/health", () => {

    it("should return 404 not allowed for other methods", async () => {
      const resPut = await request(app).put("/api/health");
      expect(resPut.statusCode).toBe(404);

    });

    
    it("should return 200 for GET method", async () => {
        const resPut = await request(app).get("/api/health");
        expect(resPut.statusCode).toBe(200);
  
      });

});