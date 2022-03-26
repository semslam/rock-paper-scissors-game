# rock-paper-cissors-game
A console and API based rock-paper-scissors game is played by two players, one human and one computer and computer to computer

# Instructions
1. Open your terminal and navigate to the rock-paper-scissors-game folder. Run those commands below before you start the game. 
```
$ npm install
```
2. Run this to start the console game:
```
$ npm run start
```
3. Run this to start the API game:
```
$ nodemon
```
4. Run this for the test case:
```
$ npm test -- GameApiEndpoint.test.js
$ npm test -- GameComponents.test.js
$ npm test -- Validator.test.js
```
# Console Guides
1. When the game begins, you will be prompted to begin a new game. Y -> continue,  n or any other key press -> exit the game.
2. If you opt to proceed, you will be asked to select a game mode: Human vs Computer or Computer vs Computer
3. If you opt to proceed, you will be asked to select a game round: Play only once or Play three times
4. Next, the console prompts the user to input the player's name and the moves, only if Human vs Computer is chosen
5. The system prompts the user to choose his move from either paper, scissors, or rock as a choice

# API Guides
1. A user must be aboard. The system offers a point for a user to be onboarded (creating a user account).

Onboard User URL Path (POST)`/authorize/onboard`

Payload Example:
```
{
  "username": "ibrahim@example.com",
  "password": "1234567",
  "gender": "Male"
}
```
2. Before playing the game, the user must first login. After successfully login in, the user receives an access token that may be used to connect with other game endpoints.

User Login URL Path (POST) `/authorize/login`

Payload Example:
```
{
  "username": "ibrahim@example.com",
  "password": "1234567"
}
```
3. Playing with a computer is divided into three stages. The first is the play most, which offers the game player type (human vs. computer) and the number of rounds played (one or three).

Game propperties for human vs. computer URL Path (POST) `/process/game_properties`

Header Authorization, bearer with the user token: Authorization Bearer $token
Payload Example:
```
{
  "playersType": "humanVsComputer",
  "gameRound": 3 || 1
}
```
4. The following endpoint allows the user to enter the player's name.

Play name URL Path (POST) `/process/player_name`

Header Authorization, bearer with the user token: Authorization Bearer $token
Payload Example:
```
{
  "playerName": "Olanrewaju"
}
```
5. The last endpoint allows the user to specify a game move, such as rock, paper, or scissors.

Play moves URL Path (POST) `/process/player_name`
Header Authorization, bearer with the user token: Authorization Bearer $token
Payload Example:
```
{
  "playersMove": "rock" || "paper" || "scissors"
}
```
6. A computer Vs. computer game requires the user to input the player type computerVsComputer as well as the number of rounds to play (one or three).

Game propperties for computer vs. computer URL Path (POST) `/process/game_properties`

Header Authorization, bearer with the user token: Authorization Bearer $token
Payload Example:
```
{
  "playersType": "computerVsComputer",
  "gameRound": 3 || 1
}
```
#### Game,User Storage and Reports
1. The game include a storage and reports. The game's results are stored in the MongoDB database and also presented as JSON, which contains the game ID and user ID.
2. The system provides a GraphQL endpoint for the game reports.
3. An endpoint is available for retrieving individual users or game information. as well as an endpoint for retrieving the most recent user and game information by filtering.
1. Graphql endpoint to query game result
URL Path (POST) `/queries/game_result`

Header Authorization, bearer with the user token: Authorization Bearer $token
Query payload Example:
GraphQl Game Records query
```
query{
    gameRecords(userId:"62222dc983398810e7d52f23",_id:"6223a8cff87ec5d02e713350"){
      _id
      userId
      isWin
      gameMode
      gameType
      drawTimes
      winningTimes
      playingHistory {
        resultType
        playerOne
        playerOneMove
        playerOneScores
        playerTwo
        playerTwoMove
        playerTwoScores
      }
      rowRecords
      scoreRecord {
        playerOne {
          name,
          scores
        }
        playerTwo {
          name,
          scores
        }
      }
      createAt
    }
  }

query{
    anyGameResult(userId: "62222dc983398810e7d52f23",isWin:true,gameType: "computerVsComputer",winningTimes: 3,_id: "6228df0655e18dbae64aaaf1"){
      _id
      userId
      isWin
      gameMode
      gameType
      drawTimes
      winningTimes
      playingHistory {
        resultType
        playerOne
        playerOneMove
        playerOneScores
        playerTwo
        playerTwoMove
        playerTwoScores
      }
      rowRecords
      scoreRecord {
        playerOne {
          name,
          scores
        }
        playerTwo {
          name,
          scores
        }
      }
      createAt
    }
```
2. Graphql endpoint for query user records

URL Path (POST) `/queries/user_record`

Header Authorization, bearer with the user token: Authorization Bearer $token
Query payload Example:
GraphQl User Records query
```
query{
    getUser(_id:"62222dc983398810e7d52f23"){
      _id,
      username,
      gender,
      createAt
    },
    getUsers(gender:"Female"){
      _id,
      username,
      gender,
      createAt
    }
  }
```
#### Game's Rules
A user can choose to play with a computer, or a computer can play with a computer named "Robot"
The game round can alternatively be played once or three times in a row.
As a three-round player, the first player to win twice is declared the winner.
Playing 50 consecutive times without a winner is a tie officially. According to the game's rules.
