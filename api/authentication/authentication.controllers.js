const actorAccountManagement = require("../../services/ActorAccountManagement");

const onboarding = async (req, res)=>{
    await actorAccountManagement.userOnboardProcess(req.body,res);
}

const login = async (req,res)=>{
    await actorAccountManagement.loginProcess(req.body,res);
}



module.exports = {
    onboarding,
    login
}