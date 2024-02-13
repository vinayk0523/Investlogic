const { loginQuery, signupQuery}  = require("../repository")
const crypto = require('crypto')
const {encryption} = require('../util')

const logService = async (loginData) => {

        
        const {password} =loginData;
        const result = await loginQuery(loginData);

        if(result.length ===0){
            return "user not found";
        }

        // const hash = crypto.createHash('sha256');

        const salt = result[0].salt;

        // const hashpasswordMy = hash.update(password + salt).digest('hex');

        const hashpasswordMy = encryption(password,salt);



        if(hashpasswordMy === result[0].password){
            return result;
        }

        else{
            return "wrong password";
        }



        
    // try {

    //     const result = await loginQuery(loginData);
    //     return result;
    // } catch (error) {
    //     console.log(error);
    //     return "error";
    // }
};

const signService = async(signupData) => {
    // try {

        // code 1:-
    
    const {name,email,password} = signupData

    const salt = crypto.randomBytes(16).toString('hex');

    // const hash = crypto.createHash('sha256');
    
    // const hashedText = hash.update(password + salt).digest('hex');
       
    const hashedText = encryption(password,salt);


    const result = await signupQuery({name , email , hashedText , salt});
    console.log("Result" , result);
    return result;





//     const result = await signupQuery(signupData);
//     return result;
// } catch (error) {
//     console.log("Error in sign up service");
//     return "error"   
// }














// }catch (error) {
//         console.log("Error in sign up service");
//         return "error"   
// }
};


module.exports = {logService,signService}