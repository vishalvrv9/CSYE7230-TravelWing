const request = require("supertest");
const app = require("../config/express");
const mongoose = require('../config/mongoose');

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });
  
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

describe("POST /signup", () => {
  it("should return 200 for successful user creation", async () => {
    const timestamp = Date.now();
    const newUser = {
      email: `test${timestamp}@gmail.com`,
      password: "123",
      fname: "it2",
      lname:"p",
    };
    const response = await request(app).post("/signup").send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("newUser"); 
  });
});

describe("POST /login", () => {
  it("should return 200 and a token for successful login", async () => {

    const newUser = {
      email: `tests6@gmail.com`,
      password: "123",
      fname: "it2",
      lname:"p",
    };
    await request(app).post("/signup").send(newUser);
    
    const loginUser = {
      email: "tests6@gmail.com",
      password: "123"
    };
    const response = await request(app).post("/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user"); 
  });

  it("should return 401 for invalid credentials", async () => {
    // Attempt login with invalid credentials
    const invalidUser = {
      email: "tests6@gmail.com",
      password: "invalidpwd"
    };
    const response = await request(app).post("/login").send(invalidUser);
    
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email or password"); 
  });
});

jest.mock('../utils/modelStrategy', () => {
  const originalModule = jest.requireActual('../utils/modelStrategy');
  return {
    ...originalModule,
    ItineraryGenerator: jest.fn(),
  };
});


describe('GET /api/v1/hotels/search-by-city/:cityCode', () => {
  test('should respond with JSON data and status 200 for a valid city code', async () => {
    const cityCode = 'PAR';
    const response = await request(app).get(`/api/v1/hotels/search-by-city/${cityCode}`);
    expect(response.statusCode).toBe(200);
  });
});