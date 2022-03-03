import humanMoves from "./humanMoves.controllers.js";

export default (app) => {
    
    const router = app;

    // accept game options request
    router.post('/game_options/', humanMoves.provideGameOption);
    //
    router.post('/player_name/', humanMoves.providePlayerName);
    // accept the player mover request
    router.post('/game_move/', humanMoves.gameMove);
    

    return router;
  };