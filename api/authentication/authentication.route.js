import authentication from "./authentication.controllers.js";
export default (router) => {
    
    router.post('/onboard/', authentication.onboarding);
    
    router.post('/login/', authentication.login);
    
    return router;
  };