const RockPaperScissor = require("../services/RockPaperScissor.js");

const testGame = new RockPaperScissor();
global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  }

  describe('Test analytical engine method', () => {
    test('Xavas: scissors, computer: paper, The winner should be Xavas', () => {
        return testGame.analyticalEngine("Xavas", "scissors", "paper").then(winner => {
            expect(winner).toBe('Xavas');
        });
    });

    test('Xavas: rock, computer: rock, The game should be a tie', () => {
        return testGame.analyticalEngine("Xavas", "rock", "rock").then(winner => {
            expect(winner).toBe('tied');
        });
    });

    test('Xavas: scissors, computer: rock, The winner should be a computer', () => {
        return testGame.analyticalEngine("Xavas", "scissors", "rock").then(winner => {
            expect(winner).toBe('computer');
        });
    });
  })


  describe('Test computerMove method', () => {
    test('return value within testGame.gameMoves', () => {
        expect(testGame.gameMoves).toContain(testGame.computerMove());
    });
    // test('The test is meant to fail', () => {
    //     expect(["scissor", "bottle","bird"]).toContain(testGame.computerMove());
    // });
  })

  describe('Test if formatGameResult method as expected console.log the result, ', () => {
    test('The test one should pass', () => {
        testGame.computerScore=0, testGame.humanScore =1;
        testGame.formatGameResult('gameResult', 'playerName', 'playerMove','computerMove');
        expect(global.console.log).toHaveBeenCalledWith(
            'The winner is gameResult ** playerName:(playerMove) 1 VS 0 Computer:(computerMove) '
        )
    })

    test('The test two should pass', () => {
        testGame.computerScore=1, testGame.humanScore =0;
        testGame.formatGameResult('gameResult', 'playerName', 'playerMove','computerMove');
        expect(global.console.log).toHaveBeenCalledWith(
            'The winner is gameResult ** playerName:(playerMove) 0 VS 1 Computer:(computerMove) '
        )
    })

    // test('The test three should fail', () => {
    //     testGame.computerScore=1, testGame.humanScore =1;
    //     testGame.formatGameResult('gameResult', 'playerName', 'playerMove','computerMove');
    //     expect(global.console.error).toHaveBeenCalledWith(
    //         'The winner is gameResult ** playerName:(playerMove) 0 VS 1 Computer:(computerMove) '
    //     )
    // })
})
  
  

