import humanMoves from "./humanMoves.controllers.js";
import {playingValidateReq,playerNameValidateReq,playerMoveValidateReq} from "./humanMoves.validator.js";
import auth from "../../middleware/jsonwebtokenAuthentication.js"

export default (router) => {
    
    // accept game options request
    router.post('/game_options/',auth.authenticateToken, playingValidateReq,humanMoves.provideGameOption);
    //
    router.post('/player_name/',auth.authenticateToken, playerNameValidateReq,humanMoves.providePlayerName);
    // accept the player mover request
    router.post('/game_move/',auth.authenticateToken, playerMoveValidateReq,humanMoves.gameMove);
    

    return router;
  };