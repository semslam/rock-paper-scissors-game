import humanMoves from "./humanMoves.controllers.js";
import {playingValidateReq,playerNameValidateReq,playerMoveValidateReq} from "./humanMoves.validator.js";

export default (router) => {
    
    // accept game options request
    router.post('/game_options/', playingValidateReq,humanMoves.provideGameOption);
    //
    router.post('/player_name/',playerNameValidateReq,humanMoves.providePlayerName);
    // accept the player mover request
    router.post('/game_move/',playerMoveValidateReq,humanMoves.gameMove);
    

    return router;
  };