import actorAccountManagement from "../../services/ActorAccountManagement.js";

const onboarding = async (req, res)=>{
    await actorAccountManagement.userOnboardProcess(req.body,res);
}

const login = async (req,res)=>{
    await actorAccountManagement.loginProcess(req.body,res);
}



export default {
    onboarding,
    login
}