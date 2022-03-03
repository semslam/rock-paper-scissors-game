import {repeatedValues} from "../libraries/sustainedValues.js";

const [
    ROCK,
    PAPER,
    SCISSORS,
    COMPUTER,
    TIED,
    ...values] = repeatedValues;

class GameComponents {

    constructor(){
        this.gameMoves = [ROCK, PAPER, SCISSORS];
    }

    /**
     * Computer choose a random option from the three choices
     * @returns {String} move
     */
    computerMove = () => {
        return this.gameMoves[Math.floor(Math.random() * this.gameMoves.length)];
    };

    /**
     * Determine the winner of the game, whether it is a tie between the two players or not.
     * @param {String} playerName
     * @param {String} playerMove
     * @param {String} computerMove
     * @returns {String} winner
     */
    analyticalEngine = (playerName, playerMove, computerMove) => {
        let winner = "";
        switch (playerMove) {
        case computerMove:
            winner = TIED;
            break;
        case ROCK:
            winner = computerMove === PAPER ? COMPUTER : playerName;
            break;
        case PAPER:
            winner = computerMove === SCISSORS ? COMPUTER : playerName;
            break;
        case SCISSORS:
            winner = computerMove === ROCK ? COMPUTER : playerName;
            break;
        default:
            console.log(`Wrong parameter pass in analyticalEngine ${playerMove}`)
            process.exit();
        }

        return new Promise((resolve, reject) => {
        resolve(winner);
        });
    };

     /**
     * This returns emoji that represent game moves
     * @param {String} emojiName 
     * @returns {String} emoji
     */
    chooseEmojiMove = (emojiName) => {
        switch (emojiName) {
        case ROCK:
            return "🤜";
        case PAPER:
            return "✋";
        case SCISSORS:
            return "✌️";
        default:
            console.log("Wrong parameter pass");
        }
    };
}

export default GameComponents;