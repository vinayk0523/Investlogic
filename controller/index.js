const {logService, signService} = require('../services')
const cryptoJs = require("crypto-js")
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const secretKey = 'vinaykumar';
const pdfPath = '/home/vinay/Desktop/vinayProject1/frontend/my-react-app/src/media/pdf'
const fs = require('fs')
const firstpdfPath = '/home/vinay/Desktop/vinayProject1/frontend/my-react-app/public/pdf/pdf1.pdf '
const {passwordRegex, emailRegex, nameRegex} = require('../constant')



const loginController = async (req,res) => {

    try{
        const {email,password} = req.body

        if(! email || !password){
            return res.send({
                success : false,
                message : "enter email or password",
                result : {}
            });
        }

        else{
            const loginData = {email,password}
            const loginOutput = await logService(loginData)

             if (loginOutput === 'user not found'){
                return res.send({
                    success: false,
                    message: "User not found",
                    loginOutput : {},
                });
            }
            else if(loginOutput === 'wrong password'){
                return res.send({
                    success: false,
                    message: "wrong password",
                    loginOutput : {},
                });
            }


            // Using cryptoJs :-
                // console.log("<<",loginOutput[0]);
                // const salt =loginOutput[0].salt;
                // const hashpasswordMy = cryptoJs.SHA256(password + salt).toString();
             


                // // right method
                // const hash = crypto.createHash('sha256');
                // const salt = loginOutput[0].salt;
                // const hashpasswordMy = hash.update(password + salt).digest('hex');



                // const salt = crypto.randomBytes(16).toString('hex');
                // const hash = crypto.createHash('sha256');               
                // const hashedText = hash.update(password + salt).digest('hex');
         
        

                
                // const result = await signupQuery({name , email , hashedText , salt});
                // console.log("Result" , result);
                // return result;
        

            else{



                console.log("login output", loginOutput)

                const user = { id: loginOutput[0].id, name: loginOutput[0].name };  
                console.log("user ", user);

                const token = jwt.sign(user, secretKey, { expiresIn: '60s' });

                console.log("<<<>>>",token)

                
            
                

                res.cookie('token',token,{httpOnly: true, secure: true, sameSite: 'none' });

   

                
                return res.send({
                    success: true,
                    message: "logged In!!",
                    loginOutput,
                });

                // const {id,name} = loginOutput[0];
                // console.log("testing",loginOutput);
                // const user = { id, name };        
                // jwt.sign(user, secretKey, {expiresIn: '60s'}, (err, token)=>{
                //     console.log("tokenlogin----",token);
                //     res.cookie('token', token, {httpOnly: true});
                //     return res.send({
                //         success: true,
                //         message: "logged In!",
                //         loginOutput
                //     });
                // });


            }
             
        }
    }
    catch(error){
        console.log(error);
        return res.send({
            success: false,
            message: "Error",
            result: {},
        });
    }
}





// const profileController = async (req,res) => {
//     jwt.verify(req.token, secretKey, (err, authData)=>{
//         console.log("req.token---", req.token,authData,err);
//         if(err){
//             return res.send({
//                 success: false,
//                 message: "session expired",
//                 authData: {},
//             });
//         }
//         else{
//             if(!authData){
//                 console.log("undefined authData");
//                 return res.send({
//                     success: false,
//                     message: "session expired",
//                     authData:  {}
//                 });
//             }
//             console.log("data sent to frontend");
//             return res.send({
//                 success: true,
//                 message: "Token verified",
//                 authData
//             });
//         }
//     });
// }


const homeController =(req,res) => {
console.log("sad")
 const id = req.id;
 res.send({"id":id});
}


const signController = async (req,res) => {

    try{
        const {name,email,password} = req.body
    

        if(!name || !email || !password){
            return res.send({
                success : false,
                message : "enter name, email or password",
                result : {}
            })
        }

        else if (!password.match(passwordRegex)){
            return res.send({
                success : false,
                message : "Invalid Password",
                result : {}
            })
        }
        else if(!email.match(emailRegex)){
            return res.send({
                success: false,
                message: "Invalid email format",
                result: {},
              });
        }else if(!name.match(nameRegex)){
            return res.send({
                success: false,
                message: "Name should contain only letters (upper or lower case)",
                result: {},
            });
        }
        else{

// using cryptoJs:- 
//             const salt = cryptoJs.lib.WordArray.random(16).toString();
//             const hashedPassword = cryptoJs.SHA256(password + salt).toString();

//             const signupData = { name, email, hashedPassword, salt };
//             const signupOutput = await signService(signupData); 


            const signupData = {name,email,password};
            const signupOutput = await signService(signupData)
            console.log("signupcontroller ", signupOutput);

            if (signupOutput === "user exist"){
                return res.send({
                    success: false,
                    message: "User already exists!",
                    signupOutput: {},
                });
            }
            else{
                return res.send({
                    success : true,
                    message : "Registered!!",
                    signupOutput
                })
            }
        }
    }
    catch(error){
        console.log(error);
        return res.send({
            success:false,
            message : "Error in Signup controller",
            result : {}
        })
    }
}






const policyController = (req, res) => {
      
    try{
      const policy = fs.readdirSync(pdfPath)
      const policyData = []
      let serialNum = 0;
      policy.map(item => {
        if(item.includes('.pdf')){
            serialNum  += 1;
           const element = {
            serialNum  : serialNum ,
             file : item
           } 
           policyData.push(element)
        }
      })
      return res.send({
          success : true,
          message : "SUCCESS",
          policyData
      })
    }catch(err){
      console.log(err);
      return res.send({
        success : false,
        message : "ERROR"
      })
    }
}


   
const pdfController = (req, res) => {
        try{
            res.send({
                success : "true",
                message : "PDF path successfully send",
                firstpdfPath
            }) 
          }catch(err){
             console.log(err);
          }
    }




module.exports = {loginController,signController, policyController, pdfController, homeController}


