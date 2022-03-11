
const GameComponent = require("../services/GameComponents");

global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  }
const gameComponent =  new GameComponent();
  describe('Test analytical engine method', () => {
    
    
    test('Xavier: rock, computer: rock, The game should be a tie', () => {
        return gameComponent.analyticalEngine("Xavier", "rock", "rock").then(winner => {
            expect(winner).toBe('tied');
        });
    });

    test('Xavier: scissors, computer: rock, The winner should be a computer', () => {
        return gameComponent.analyticalEngine("Xavier", "scissors", "rock").then(winner => {
            expect(winner).toBe('computer');
        });
    });

    test('Robot: paper, computer: rock, The winner should be a Robot', () => {
        return gameComponent.analyticalEngine("Robot", "paper", "rock").then(winner => {
            expect(winner).toBe('Robot');
        });
    });

    test('Robot: scissors, computer: rock, The winner should be a computer', () => {
        return gameComponent.analyticalEngine("Robot", "scissors", "rock").then(winner => {
            expect(winner).toBe('computer');
        });
    });
    test('Robot: scissors, computer: scissors, The winner should be a computer', () => {
        return gameComponent.analyticalEngine("Robot", "scissors", "scissors").then(winner => {
            expect(winner).toBe('tied');
        });
    });
    test('Robot: bird, computer: rock, Expecting the process to fail', () => {
        try {
            return gameComponent.analyticalEngine("Robot", "bird", "rock");
          } catch (error) {
            expect(error).toEqual(new Error('Wrong parameter pass in analyticalEngine'));
          }
    });

  })




  describe('Test computerMove method', () => {
    test('return value within testGame.gameMoves', () => {
        expect(gameComponent.gameMoves).toContain(gameComponent.computerMove());
    });
    test('The test is meant to fail', () => {
        expect(["scissor", "bottle","bird"]).not.toContain(gameComponent.computerMove());
    });
  })

  describe('Test chooseEmojiMove method', () => {
    test('Test chooseEmojiMove with scissors most pass', () => {
        const move = gameComponent.chooseEmojiMove("scissors");
        expect(move).toEqual("✌️");

    });
    test('Test chooseEmojiMove with rock most pass', () => {
        const move = gameComponent.chooseEmojiMove("rock");
        expect(move).toEqual("🤜");
    });
    test('Test chooseEmojiMove with paper most pass', () => {
        const move = gameComponent.chooseEmojiMove("paper");
        expect(move).toEqual("✋");
    });

    test('Test chooseEmojiMove with wrong parameter most fail', () => {
        try {
            return gameComponent.chooseEmojiMove("bird");
          } catch (error) {
            expect(error).toEqual(new Error("Wrong parameter pass in chooseEmojiMove"));
          }

    });
  })