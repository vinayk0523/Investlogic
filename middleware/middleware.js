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
            console.log('hi')
            // res.send(
            //     "user exist"
            // )
            next();
            
        })
        
        

}
module.exports = {verifyToken};