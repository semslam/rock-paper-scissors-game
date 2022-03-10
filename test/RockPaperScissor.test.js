// jest.useFakeTimers()

import RockPaperScissor from "../services/RockPaperScissor.js";


const testGame = new RockPaperScissor("console");
global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  }

  describe('Test analytical engine method', async () => {

    // test('Xavier: scissors, computer: paper, The winner should be Xavier', async() => {
    //     testGame.computerScore=1, testGame.playerScore =0; testGame.gameMode = "console";
    //     return  testGame.predictMove('gameResult', 'playerName', 'playerMove','computerMove', null).then(winner => {
    //         expect(global.console.log).toHaveBeenCalledWith(
    //             'The winner is gameResult ** playerName:(playerMove) 0 VS 1 Computer:(computerMove) '
    //         );
    //     });
    // });

    // beforeAll(()=>{
    //     jest.setTimeout(50000);
    //     console.log("<===========SEMSLAM============>")
    //   });
    
    //   afterAll(async () => {
    //   });
    
    test('adds 4 + 2 to equal 3', async () => {
        // await act(async () => {});
        // expect(testGame.sum(2, 2)).toBe(4);
        const value = await Promise.resolve(testGame.sum(2, 2));
        expect(value).toBe(4);
      });

    // test('Xavier: rock, computer: rock, The game should be a tie', () => {
    //     return testGame.analyticalEngine("Xavier", "rock", "rock").then(winner => {
    //         expect(winner).toBe('tied');
    //     });
    // });

    // test('Xavier: scissors, computer: rock, The winner should be a computer', () => {
    //     return testGame.analyticalEngine("Xavier", "scissors", "rock").then(winner => {
    //         expect(winner).toBe('computer');
    //     });
    // });

    // test('Robot: paper, computer: rock, The winner should be a Robot', () => {
    //     return testGame.analyticalEngine("Robot", "paper", "rock").then(winner => {
    //         expect(winner).toBe('Robot');
    //     });
    // });

    // test('Robot: scissors, computer: rock, The winner should be a computer', () => {
    //     return testGame.analyticalEngine("Robot", "scissors", "rock").then(winner => {
    //         expect(winner).toBe('computer');
    //     });
    // });
    // test('Robot: scissors, computer: scissors, The winner should be a computer', () => {
    //     return testGame.analyticalEngine("Robot", "scissors", "scissors").then(winner => {
    //         expect(winner).toBe('tied');
    //     });
    // });
    // test('Robot: bird, computer: rock, Expecting the process to fail', () => {
    //     return testGame.analyticalEngine("Robot", "bird", "rock").then(winner => {
    //         expect(winner).toBe('computer');
    //     });
    // });
  })




//   describe('Test computerMove method', () => {
//     test('return value within testGame.gameMoves', () => {
//         expect(testGame.gameMoves).toContain(testGame.computerMove());
//     });
//     // test('The test is meant to fail', () => {
//     //     expect(["scissor", "bottle","bird"]).toContain(testGame.computerMove());
//     // });
//   })

//   describe('Test if formatGameResult method as expected console.log the result, ', () => {
//     test('The test one should pass', () => {
//         testGame.computerScore=0, testGame.playerScore =1;
//         testGame.formatGameResult('gameResult', 'playerName', 'playerMove','computerMove');
//         expect(global.console.log).toHaveBeenCalledWith(
//             'The winner is gameResult ** playerName:(playerMove) 1 VS 0 Computer:(computerMove) '
//         )
//     })

    // test('The test two should pass', () => {
    //     testGame.computerScore=1, testGame.playerScore =0;
    //     testGame.formatGameResult('gameResult', 'playerName', 'playerMove','computerMove');
    //     expect(global.console.log).toHaveBeenCalledWith(
    //         'The winner is gameResult ** playerName:(playerMove) 0 VS 1 Computer:(computerMove) '
    //     )
    // })

//     // test('The test three should fail', () => {
//     //     testGame.computerScore=1, testGame.playerScore =1;
//     //     testGame.formatGameResult('gameResult', 'playerName', 'playerMove','computerMove');
//     //     expect(global.console.error).toHaveBeenCalledWith(
//     //         'The winner is gameResult ** playerName:(playerMove) 0 VS 1 Computer:(computerMove) '
//     //     )
//     // })
// })
  
  

