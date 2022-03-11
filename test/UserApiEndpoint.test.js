const  supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const createServer = require("./createServer");
const mongoose = require("mongoose");
// const  { createProduct } = require("../service/product.service");

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

let creatUserPayload = {
    username: "bolola1020@gmail.com",
    password: "1234567",
    gender: "Female"
};


describe("User", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        await supertest(app).get(`/api/user`).expect(404);
      });
    });

    describe("given the product does exist", () => {
        it("should return a 403", async () => {
            const { statusCode, body } = await supertest(app).post("/authorize/onboard")
              .set("Content-Type", `application/json`)
              .send(creatUserPayload);
    
            expect(statusCode).toBe(201);
            expect(body).toEqual({
                code: 201,
                timestamp: expect.any(Number),
                status: 'Successful',
                message: 'Account was successful created',
                data: { username: 'bolola1020@gmail.com', gender: 'Female' }
              })
            
            
          });
          it("should return a 403", async () => {
            creatUserPayload.username = "example@"
            const { statusCode, body } = await supertest(app).post("/authorize/onboard")
              .set("Content-Type", `application/json`)
              .send(creatUserPayload);
            expect(statusCode).toBe(422);
          });
    });
  });


});