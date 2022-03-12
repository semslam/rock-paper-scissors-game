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
let loginPayload = {
    username: "bolola1020@gmail.com",
    password: "1234567"
};

let playComputerVaComputerPayload = {
    playersType: "computerVsComputer",
    gameRound: 3
};
let playHumanVaComputerPayload = {
    playersType: "humanVsComputer",
    gameRound: 1
};
let accessToken = "";


describe("API Endpoint Testing", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

    describe("Check if the endpoint exist", () => {
      it("should return a 404", async () => {
        await supertest(app).get(`/user`).expect(404);
      });
    });

    describe("Onboard and Login user", () => {
        it("Onboard user,should return a 201", async () => {
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
          it("Onboard with wrong credential,should return a 422", async () => {
            creatUserPayload.username = "example@"
            const { statusCode, body } = await supertest(app).post("/authorize/onboard")
              .set("Content-Type", `application/json`)
              .send(creatUserPayload);
            expect(statusCode).toBe(422);
          });
    });


    describe("User login Test", () => {
        it("User login, should return a 200", async () => {
            const { statusCode, body } = await supertest(app).post("/authorize/login")
              .set("Content-Type", `application/json`)
              .send(loginPayload);
              accessToken = body.data.accessToken;
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                code: 200,
                timestamp: expect.any(Number),
                status: 'Successful',
                message: "The login was successful!",
                data:expect.any(Object)
              })
            
            
          });
          it("Login with wrong login details, should return a 500", async () => {
            loginPayload.username = "example@gmail.com"
            const { statusCode, body } = await supertest(app).post("/authorize/login")
              .set("Content-Type", `application/json`)
              .send(loginPayload);
            expect(statusCode).toBe(500);
            expect(body).toEqual({
                code: 500,
                timestamp: expect.any(Number),
                status: 'Failed',
                message: "It cannot find user in the entries."
              })
          });
    });


    describe("Test game play by computer vs computer", () => {
        jest.setTimeout(10000)
        it("Test three rounds, should return a 200", async () => {
            const { statusCode, body } = await supertest(app).post("/process/game_options")
            .set("Content-Type", `application/json`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(playComputerVaComputerPayload);
            console.log("computer vs computer playing 3 rounds, response body in test ")
            console.log(body)
            expect(statusCode).toBe(200);    
            
          });
          
          it("Test one round, should return a 200", async () => {
            playComputerVaComputerPayload.gameRound = 1;
            const { statusCode, body } = await supertest(app).post("/process/game_options")
            .set("Content-Type", `application/json`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(playComputerVaComputerPayload);
            console.log("computer vs computer playing 1 rounds, response body in test")
            console.log(body)
            expect(statusCode).toBe(200);


          });
          
          it("Test wrong round, should return a 422", async () => {
            playComputerVaComputerPayload.gameRound = 2;
            const { statusCode, body } = await supertest(app).post("/process/game_options")
            .set("Content-Type", `application/json`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(playComputerVaComputerPayload);
            console.log("computer vs computer playing 3 rounds, error response body in test")
            console.log(body)
            expect(statusCode).toBe(422); 
          });
    });

    describe("Test game play by human vs computer", () => {
        jest.setTimeout(10000)
        it("Test one round, should return a 200", async () => {
        
            const { statusCode, body } = await supertest(app).post("/process/game_options")
            .set("Content-Type", `application/json`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send(playHumanVaComputerPayload);
            expect(statusCode).toBe(200);
            console.log("human vs computer playing 1 round, response body in test ")
            console.log(body)
                
          });
          
          it("Test if player provide a name, should return a 200", async () => {
            const nameRes  = await supertest(app).post("/process/player_name")
            .set("Content-Type", `application/json`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send({playerName: "Ibrahim"});
            console.log("Player name, response body in test")
            console.log(nameRes.body)
            expect(nameRes.statusCode).toBe(200);

          });
          
          it("Test Wrong Move, should return 422", async () => {
            const wrongRes = await supertest(app).post("/process/game_move")
                .set("Content-Type", `application/json`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({playersMove:"bird"});
                console.log("Play after game end, response body in test")
                console.log(wrongRes.body)
                expect(wrongRes.statusCode).toBe(422);
                expect(wrongRes.body).toEqual({
                    code: 422,
                    timestamp: expect.any(Number),
                    status: 'Failed',
                    message: "\"playersMove\" must be one of [rock, paper, scissors]"
                  })
          })

          it("Test a player Move, should return 200", async () => {
            const moveRes = await supertest(app).post("/process/game_move")
                .set("Content-Type", `application/json`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({playersMove:"rock"});
                console.log("Player move, response body in test")
                console.log(moveRes.body)
                expect(moveRes.statusCode).toBe(200);
               

          });

    });
  

});