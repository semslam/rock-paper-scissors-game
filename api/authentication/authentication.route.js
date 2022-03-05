import authentication from "./authentication.controllers.js";
import {onBoardValidateReq,loginValidateReq} from "./authentication.validator.js"
export default (router) => {
  
    router.post('/onboard/',onBoardValidateReq,authentication.onboarding);
    
    router.post('/login/',loginValidateReq,authentication.login);
    
    return router;
  };