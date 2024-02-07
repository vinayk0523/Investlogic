const conn = require('./db')

const loginQuery = async (logData) => {

    return new Promise((resolve,reject) => {
        const {email,password} = logData
        
        // normal login query 
        // conn.query(`SELECT * FROM user WHERE password = ? AND email = ?`, [password,email], 


        conn.query(`SELECT * FROM user WHERE email = ?`, [email], 
        (error,result)=>{
            console.log(result);
            if(error){
                console.log(error);
                reject('error')
            }else{
                resolve(result)
            }
        });
    }); 
};

const signupQuery = async (signData) => {
    return new Promise((resolve,reject)=>{
        const {name,email,hashedText,salt} = signData

        conn.query(`SELECT * FROM user WHERE email = ?`, [email], (error,result)=>{
            if(error){
                console.log(error)
                reject('error');
            }
            else if(result.length > 0){
                resolve('user exist')
            }
            else {
                console.log("<<>>",hashedText,salt);
                conn.query(`INSERT INTO user (name,email,password,salt) VALUES(?,?,?,?)`, 
                [name,email,hashedText,salt], (error,result)=>{
                    if(error){
                        reject('error');
                    }
                    else{
                        resolve(result)
                    }
                })
            }
        })
    })
}

module.exports = {loginQuery,signupQuery}
