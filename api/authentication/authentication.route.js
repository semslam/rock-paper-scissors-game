const authentication = require("./authentication.controllers");
const {onBoardValidateReq,loginValidateReq} = require("./authentication.validator");
module.exports = (router) => {
  
    router.post('/onboard/',onBoardValidateReq,authentication.onboarding);
    
    router.post('/login/',loginValidateReq,authentication.login);
    
    return router;
  };