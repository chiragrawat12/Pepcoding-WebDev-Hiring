const bcrypt = require("bcrypt");

bcrypt.hash("password" , 10 , (error , hash)=>{
    if(error) throw error;
    console.log(hash);
})