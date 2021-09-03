// for validating api 

// importing modules 
const bcrypt  = require("bcrypt");
require("dotenv").config();

//Validating API secret key
const validateApiSecret = (req,res,next) =>{

  // Checking if the API secret key is provided or not
  if(req.header('validationKey') == "" || req.header('validationKey') == undefined){
    return res.status(401).json({
      status:false,      
      message:"Don't have authority to access"
    });
  }

  // removing "Bearer" from the token
  const validationToken = req.header('validationKey').replace('Bearer','');

  //Checking if the API secret key is valid or not
  bcrypt.compare(validationToken,process.env.api_secret_key, function(e, result) {
    if(e || !result){
      return res.status(401).json({
        status:false,
        message:"Invalid API validation key"
      });
    }
    else{
      // redirecting forward on successful verificating of token
     next(); 
    }
  });
}

// exporting validator
module.exports = validateApiSecret;