const RockPaperScissor = require("../services/RockPaperScissor.js");

const testGame = new RockPaperScissor();


  describe('Test analytical engine method', () => {
    test('Xavas: scissors, computer: paper, The winner should be Xavas', () => {
        return testGame.analyticalEngine("Xavas", "scissors", "paper").then(winner => {
            expect(winner).toBe('Xavas');
        });
    });

    test('Xavas: rock, computer: rock, The game should be a tie', () => {
        return testGame.analyticalEngine("Xavas", "rock", "rock").then(winner => {
            expect(winner).toBe('tie game');
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
  
  

