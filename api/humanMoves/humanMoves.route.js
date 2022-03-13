const humanMoves = require("./humanMoves.controllers");
const {playingValidateReq,playerNameValidateReq,playerMoveValidateReq} = require("./humanMoves.validator");
const auth = require("../../middleware/jsonwebtokenAuthentication");

module.exports = (router) => {
    
    // accept the game properties request
    router.post('/game_options/',auth.authenticateToken, playingValidateReq,humanMoves.provideGameOption);
    // accept the player name request
    router.post('/player_name/',auth.authenticateToken, playerNameValidateReq,humanMoves.providePlayerName);
    // accept the player mover request
    router.post('/game_move/',auth.authenticateToken, playerMoveValidateReq,humanMoves.gameMove);
    

    return router;
  };