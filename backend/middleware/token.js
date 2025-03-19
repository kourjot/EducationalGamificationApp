import jwt from "jsonwebtoken"
import "dotenv/config"
const tokenverify = async(req,res,next)=>{
    const token=req.headers["authorization"]
    try{
        const verify=jwt.verify(token,process.env.SECRET_KEY)
        
        if(!verify){
            return res.status(401).json({error:"Token is not valid"})
        }        
        next()

    }
    catch(err){
        return res.status(401).json({error:"Token is not valid"})
    }
}
export {tokenverify}