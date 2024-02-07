const {logService, signService} = require('../services')
const cryptoJs = require("crypto-js")
const crypto = require('crypto')


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
            
            // if(loginOutput === 'error'){
            //     return res.send({
            //         success : false,
            //         message : "error in logging",
            //         loginOutput : {}
            //     });
            // }
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


            //cryptoJs :-
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
                return res.send({
                    success: true,
                    message: "logged In!!",
                    loginOutput,
                });
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

        // if(!name || !email || !password){
        //     return res.send({
        //         success : false,
        //         message : "enter name, email or password",
        //         result : {}
        //     })
        // }

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

            // if(signupOutput === "error"){
            //     return res.send({
            //         success: false,
            //         message: "unable to create user",
            //         signupOutput: {},
            //     });
            // }
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



module.exports = {loginController,signController}


