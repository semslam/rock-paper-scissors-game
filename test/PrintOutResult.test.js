
import  PrintOutResult from "../services/PrintOutResult";



const printOutResult = new PrintOutResult()
global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  }


  describe('Test commonTextDisplay method', () => {
    test('This method will print out game result', () => {
        printOutResult.commonTextDisplay("Ibrahim","Ibrahim","rock","paper",1,0);
        expect(global.console.log).toHaveBeenCalledWith(
            'The winner is gameResult ** playerName:(playerMove) 1 VS 0 Computer:(computerMove) '
        );
    });
    // test('The test is meant to fail', () => {
    //     expect(["scissor", "bottle","bird"]).toContain(testGame.computerMove());
    // });
  })