const  request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const createServer = require("./createServer");
const mongoose = require("mongoose");
// const  { createProduct } = require("../service/product.service");

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

let playHumanVaComputerPayload = {
    playersType: "humanVsComputer",
    gameRound: 1
};
// This user access token was generated on Thursday, March 23, 2022. It will expire after 356 days.
let accessToken = '';

async function regularPostRequest(urlPath,requestBody) {
  return await request(app)
          .post(urlPath)
          .send(requestBody)
          .set('Accept', 'application/json'); 
}

async function regularGetRequest(urlPath) {
  return await request(app)
          .get(urlPath)
}

async function regularPostRequestWithHerderAuth(urlPath,token,requestBody) {
  return await request(app)
          .post(urlPath)
          .send(requestBody)
          .set("Authorization", `Bearer ${token}`)
          .set('Accept', 'application/json'); 
}


describe("API Endpoint Testing", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

    describe("Check for non-existent endpoints", () => {
      it("should return a 404", async () => {
        const getResponse = await regularGetRequest(`/user`);
        expect(getResponse.status).toEqual(404);
      });
    });

    describe("Onboard and login user test", () => {
        it("Onboard user,should return a 201", async () => {
          const requestBody = {
            username: "bolola1020@gmail.com",
            password: "1234567",
            gender: "Female"
        };
          const { status, body } = await  regularPostRequest("/authorize/onboard",requestBody);
      
            expect(status).toBe(201);
            expect(body).toEqual({
                code: 201,
                timestamp: expect.any(Number),
                status: 'Successful',
                message: 'Account was successful created',
                data: { username: 'bolola1020@gmail.com', gender: 'Female' }
              })  
          });
          it("Onboard with wrong email,should return a 422", async () => {
            const requestBody = {
              username: "bolola1020@",
              password: "1234567",
              gender: "Female"
          };
          const { status, body } = await  regularPostRequest("/authorize/onboard",requestBody);
          const { code, message, status: statusMessage } = body;
          expect(status).toBe(422);
          expect(statusMessage).toEqual("Failed")
          expect(message).toEqual('"username" must be a valid email');
          expect(code).toBe(422);
        
          });

          it("Onboard with non-valid password,should return a 422", async () => {
            const requestBody = {
              username: "bolola1020@gmail.com",
              password: "123456",
              gender: "Female"
          };
          const { status, body } = await  regularPostRequest("/authorize/onboard",requestBody);
        
          expect(status).toBe(422);
          expect(body).toEqual({
            code: 422,
            timestamp: expect.any(Number),
            status: 'Failed',
            message: '"password" length must be at least 7 characters long'
          })
            
          });
          it("Onboard with wrong gender,should return a 422", async () => {
            const requestBody = {
              username: "bolola1020@gmail.com",
              password: "1234567",
              gender: "Hermaphrodite"
          };
          const { status, body } = await  regularPostRequest("/authorize/onboard",requestBody);
        
          expect(status).toBe(422);
          expect(body).toEqual({
            code: 422,
            timestamp: expect.any(Number),
            status: 'Failed',
            message: '"gender" must be one of [Male, Female]'
          })
            
          });
          it("Onboard with missing request body,should return a 422", async () => {
            const requestBody = {
              username: "bolola1020@gmail.com",
              password: "1234567"
          };
          const { status, body } = await  regularPostRequest("/authorize/onboard",requestBody);
        
          expect(status).toBe(422);
          expect(body).toEqual({
            code: 422,
            timestamp: expect.any(Number),
            status: 'Failed',
            message: '"gender" is required'
          })
            
          });
    });


    describe("User login Test", () => {
        it("User login successful, should return a 200", async () => {

          const requestBody = {
            username: "bolola1020@gmail.com",
            password: "1234567"
        };
        const { status, body } = await  regularPostRequest("/authorize/login",requestBody);
        accessToken = body.accessToken;
         console.log("computer vs computer playing 1 rounds, response body in test")
            console.log(body)
            expect(status).toBe(200);
            expect(body).toEqual({
                code: 200,
                timestamp: expect.any(Number),
                status: 'Successful',
                message: "The login was successful!",
                data: expect.any(Object)
              })
            
            
          });
          it("Login with wrong login details, should return a 500", async () => {

            const requestBody = {
              username: "example@gmail.com",
              password: "1234567"
          };
          const { status, body } = await  regularPostRequest("/authorize/login",requestBody);
          
            expect(status).toBe(500);
            expect(body).toEqual({
                code: 500,
                timestamp: expect.any(Number),
                status: 'Failed',
                message: "It cannot find the user's record"
              })
          });

          it("Login with wrong invalid email, should return a 422", async () => {

            const requestBody = {
              username: "example@.com",
              password: "1234567"
          };
          const { status, body } = await  regularPostRequest("/authorize/login",requestBody);

            expect(status).toBe(422);
            expect(body).toEqual({
                code: 422,
                timestamp: expect.any(Number),
                status: 'Failed',
                message: '"username" must be a valid email'
              })
          });
          it("Login with wrong invalid password, should return a 400", async () => {

            const requestBody = {
              username: "bolola1020@gmail.com",
              password: "12345678"
          };
          const { status, body } = await  regularPostRequest("/authorize/login",requestBody);
            expect(status).toBe(400);
            expect(body).toEqual({
                code: 400,
                timestamp: expect.any(Number),
                status: 'Failed',
                message: 'Wrong user login details'
              })
          });
          it("Login with missing out login details, should return a 422", async () => {

            const requestBody = {
              username: "bolola1020@gmail.com"
          };
          const { status, body } = await  regularPostRequest("/authorize/login",requestBody);
            expect(status).toBe(422);
            expect(body).toEqual({
                code: 422,
                timestamp: expect.any(Number),
                status: 'Failed',
                message: '"password" is required'
              })
          });
    });


    describe("Test game play by computer vs computer", () => {
        jest.setTimeout(10000)
        it("A played three rounds game, should return a 200", async () => {
          const requestBody = {
            playersType: "computerVsComputer",
            gameRound: 3
        };
      
           const { status, body } = await regularPostRequestWithHerderAuth("/process/game_properties",accessToken,requestBody);
          
            expect(status).toBe(200);
            expect(body.data.isWin).toBeBoolean()
            expect(body.data.userId).toEqual(expect.any(String))    
            expect(body.data.gameType).toEqual('computerVsComputer')
            expect(body.data.gameMode).toEqual('api')
            expect(body.data.winner).toEqual(expect.any(String))
            expect(body.data.scoreRecord).toEqual(expect.any(Object))
            expect(body.data.playingHistory).toEqual(expect.any(Array))
            expect(body.data.rowRecords).toEqual(expect.any(Array))
            expect(body.data.winningTimes).toEqual(expect.any(Number))
            expect(body.data.drawTimes).toEqual(expect.any(Number))
            expect(body.data.drawTimes).toEqual(expect.any(Number))
          });
          
          it("A player provides a wrong gameRound request, should return a 422", async () => {
            const requestBody = {
              playersType: "computerVsComputer",
              gameRound: 2
            };
             const { status, body } = await regularPostRequestWithHerderAuth("/process/game_properties",accessToken,requestBody);
            console.log("computer vs computer playing 1 rounds, response body in test")
            console.log(body)
            expect(status).toBe(422);

          });
          
          it("A player missing a playersType request body, should return a 422", async () => {
            const requestBody = {
              gameRound: 2
            };
             const { status, body } = await regularPostRequestWithHerderAuth("/process/game_properties",accessToken,requestBody);
            console.log("computer vs computer playing 1 rounds, response body in test")
            console.log(body)
            expect(status).toBe(422);
          });
    });

    describe("Test a game played by a human vs. a computer with one round", () => {
        jest.setTimeout(10000)
        async function playingContinue(URL_Path){
            const gameMoves = ["rock", "paper", "scissors"];
            let move =  gameMoves[Math.floor(Math.random() * gameMoves.length)];
              const requestBody = {
                playersMove: move
            };
              const { status, body } = await regularPostRequestWithHerderAuth(URL_Path,accessToken,requestBody);
                if(body.message !== "WINNER"){
                await playingContinue(URL_Path)
                }
                expect(status).toBe(200);
        }
        it("A player makes a single round of pre-request, should return a 200", async () => {
          const requestBody = {
            playersType: "humanVsComputer",
            gameRound: 1
        };
        const { status, body } = await regularPostRequestWithHerderAuth("/process/game_properties",accessToken,requestBody);
            expect(status).toBe(200);
            console.log("human vs computer playing 1 round, response body in test ")
            console.log(body);    
          });
          
          it("player provide a character's name, should return a 200", async () => {
            const requestBody = {
              playerName: "Ibrahim"
            };
            const { status, body } = await regularPostRequestWithHerderAuth("/process/player_name",accessToken,requestBody);
            expect(status).toBe(200);
            console.log("human vs computer playing 1 round, response body in test ")
            console.log(body)
        
          });
          
          it("Test Wrong Move, should return 422", async () => {
            const requestBody= {playersMove:"bird"}
            const { status, body } = await regularPostRequestWithHerderAuth("/process/player_move",accessToken,requestBody);
                expect(status).toBe(422);
                expect(body).toEqual({
                    code: 422,
                    timestamp: expect.any(Number),
                    status: 'Failed',
                    message: "\"playersMove\" must be one of [rock, paper, scissors]"
                  })
          })

          it("Player provide a game move, should return 200", async () => {
            await playingContinue("/process/player_move");
          });

    });

    describe("Test a game played by a human vs. a computer with three round", () => {
      jest.setTimeout(10000)
      async function playingContinue(URL_Path){
          const gameMoves = ["rock", "paper", "scissors"];
          let move =  gameMoves[Math.floor(Math.random() * gameMoves.length)];
            const requestBody = {
              playersMove: move
          };
            const { status, body } = await regularPostRequestWithHerderAuth(URL_Path,accessToken,requestBody);
              if(body.message !== "WINNER"){
              await playingContinue(URL_Path)
              }
              expect(status).toBe(200);
      }
      it("A player makes a three round of pre-request, should return a 200", async () => {
        const requestBody = {
          playersType: "humanVsComputer",
          gameRound: 3
      };
      const { status, body } = await regularPostRequestWithHerderAuth("/process/game_properties",accessToken,requestBody);
          expect(status).toBe(200);
          console.log("human vs computer playing 3 round, response body in test ")
          console.log(body)
              
        });
        
        it("A player provides a character's name., should return a 200", async () => {
          const requestBody = {
            playerName: "Ibrahim"
          };
          const { status, body } = await regularPostRequestWithHerderAuth("/process/player_name",accessToken,requestBody);
          expect(status).toBe(200);
          console.log("human vs computer playing 1 round, response body in test ")
          console.log(body)
      
        });
        
        it("A player makes a wrong move, should return 422", async () => {
          const requestBody= {playersMove:"bird"}
          const { status, body } = await regularPostRequestWithHerderAuth("/process/player_move",accessToken,requestBody);
              expect(status).toBe(422);
              expect(body).toEqual({
                  code: 422,
                  timestamp: expect.any(Number),
                  status: 'Failed',
                  message: "\"playersMove\" must be one of [rock, paper, scissors]"
                })
        })

        it("A player provides a move, should return 200", async () => {
          await playingContinue("/process/player_move");
        });

  });
  

});