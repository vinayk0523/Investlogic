const jwt = require("jsonwebtoken");
const secretKey = 'vinaykumar'


const verifyToken = async(req , res , next)=>{
        const token = req.cookies.token;
        console.log("token" , token);
        if(!token){
            res.send("user logged out");
        }
        
        jwt.verify(token , secretKey , async(err , payload)=>{
            if(!payload){
               return res.send("user logged out");
            }
            
            req.id= payload.id;
        
            console.log("payload id", payload.id)
            
        //    return res.send(
        //         "user exist yoo!!"        
        //     )
            return res.send({
                "id" : payload.id
            })     
        })
}
module.exports = {verifyToken};