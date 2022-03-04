import actorAccountManagement from "../../services/ActorAccountManagement.js";

const onboarding = async (req, res)=>{
    await actorAccountManagement.userOnboardProcess(req.body,res);
}

const login = async (req,res)=>{
    await actorAccountManagement.loginProcess(req.body,res);
}

const logout = (req, res)=>{
   
}


export default {
    onboarding,
    login,
    logout
}