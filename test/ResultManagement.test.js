const { temporaryTied,
    permanentTied,
    currentScore,
    finalWinner} = require("../services/ResultManagement");
    const colors = require('colors');
    const { createSpinner } = require("nanospinner");
    const GameComponents = require("../services/GameComponents");
    const {repeatedValues, printOutType,isConsoleOrApi, resType} = require("../libraries/sustainedValues");
    const sleep = require("../libraries/sleep");
    const {create} = require("../repositories/GameRep");
    const {decryptToken} = require("../libraries/encryptAndDecrypt");
    const {successResponse,errorResponse} = require("../response/apiResponse");
    const {HttpCodes} = require("../libraries/sustainedValues");  
    const {diff} = require('jest-diff');  



global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  }

  describe('Test analytical engine method', () => {
    
    test('The test one should pass', async() => {
      expect(true).toEqual(true)
    //   functionB = jest.fn(() => {return Promise.resolve()});
    //   const temporaryTiedSpy = jest.spyOn(temporaryTied, 'temporaryTied');
      
     
    //  const value = {
    //         gameResult: 'tied',
    //         playerName: 'Semslam',
    //         moves: { playerMove: 'rock', computerMove: 'rock' },
    //         scores: { playerScore: 0, computerScore: 0 },
    //         gameMode: 'console',
    //         gameOption: 'humanVsComputer',
    //         tieCount: 1
    //       }
    //       void temporaryTied(value).then(()=>{
    //         expect(temporaryTiedSpy).not.toHaveBeenCalled();
    //       })
        // void temporaryTied(value).then(data =>{
        //     const spinner = createSpinner("the result...").start();
        //     sleep();
        //     // diff(global.console.log,spinner.error({text: `The game is tied, (Semslam):🙄  🤜(rock) 0 VS 0 (rock) 🤜 🙄:(Computer), tie count ${value.tieCount}. ${colors.green("Continue playing the game")}`,}))
        //     // spinner.stop();
        //     expect(global.console.log).toEqual(
        //         "The game is tied, (Semslam):🙄  🤜(rock) 0 VS 0 (rock) 🤜 🙄:(Computer), tie count 1. Continue playing the game"
        //     );

  
        // })
        
        
    })
    

//     // test('Xavier: rock, computer: rock, The game should be a tie', () => {
//     //     return testGame.analyticalEngine("Xavier", "rock", "rock").then(winner => {
//     //         expect(winner).toBe('tied');
//     //     });
//     // });

//     // test('Xavier: scissors, computer: rock, The winner should be a computer', () => {
//     //     return testGame.analyticalEngine("Xavier", "scissors", "rock").then(winner => {
//     //         expect(winner).toBe('computer');
//     //     });
//     // });

//     // test('Robot: paper, computer: rock, The winner should be a Robot', () => {
//     //     return testGame.analyticalEngine("Robot", "paper", "rock").then(winner => {
//     //         expect(winner).toBe('Robot');
//     //     });
//     // });

//     // test('Robot: scissors, computer: rock, The winner should be a computer', () => {
//     //     return testGame.analyticalEngine("Robot", "scissors", "rock").then(winner => {
//     //         expect(winner).toBe('computer');
//     //     });
//     // });
//     // test('Robot: scissors, computer: scissors, The winner should be a computer', () => {
//     //     return testGame.analyticalEngine("Robot", "scissors", "scissors").then(winner => {
//     //         expect(winner).toBe('tied');
//     //     });
//     // });
//     // test('Robot: bird, computer: rock, Expecting the process to fail', () => {
//     //     return testGame.analyticalEngine("Robot", "bird", "rock").then(winner => {
//     //         expect(winner).toBe('computer');
//     //     });
//     // });
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
  