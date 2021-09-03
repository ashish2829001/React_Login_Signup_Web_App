// importing required  modules
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require("fs");

// importing jwt module 
const jwt = require('jsonwebtoken');
require("dotenv").config();

// creating an express app
const app = express();

// importing local modules
const validateApi = require('./middleware/validateApi');

// Body parser preset
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

// CORS presets
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// register api
app.post('/api/register',validateApi, async(req, res) => {
    
    try { 

        // getting user-Credential of all users from Credentials.json
        const data = fs.readFileSync("./credentials.json", {encoding : "utf8"});
        let allDetails = await JSON.parse(data);

        // checking to existing user with same username
        let resultant = allDetails.find(user=> user.userName === req.body.userName);
        if(!resultant){
            // hashing of password using bcrypt and saving it to the same file
            let hashedPassword = await bcrypt.hash(req.body.password,8);
            allDetails = [...allDetails, {
                name: req.body.name,
                userName : req.body.userName,
                password : hashedPassword
            }];
            fs.writeFileSync("./credentials.json", JSON.stringify(allDetails));

            // sending response
            res.status(200).json({
                success : true,
                message : "successfully registered!"
            });            
        }    
        else {
            // error if user with same username is there
            throw "userName is already in use!";
        }
    } catch (error) {
        // handing error
        res.status(403).json({
            success : false, 
            message : error
        });
    }
});

// Login API
app.post('/api/login',validateApi, async(req, res) => {
    try {

        // getting user-Credential of all users from Credentials.json
        const data = fs.readFileSync("./credentials.json", {encoding : "utf8"});
        let allDetails = await JSON.parse(data);
        
        // checking whether user exist or not
        let resultant = allDetails.find(user=> user.userName === req.body.userName);
        if(resultant){
            //  comparing password
            let boolean = await bcrypt.compare(req.body.password, resultant.password);
            if(!boolean) {
                // error of password mismatch
                throw "Incorrect Password!";
            }
            else {
                // generating token using jwt with expire duration of 30 days
                const apiKey = process.env.TOKEN_SECRET;
                const token = jwt.sign({userName: resultant.userName.toString()},apiKey,{
                    expiresIn: "30d",
                });
                // handling error during jwt token generation
                if(!token)
                    throw 'JWT Error!';
                // sending response on successfullly logging in
                res.status(200).json({
                    success : true, 
                    message : "Successfully logged in!",
                    details : {
                        name : resultant.name,
                        userName : resultant.userName,
                        token
                    }
                });
            }
        }
        else{
            // error when no user with same username found
            throw "Invalid username!";
        }
        
    } catch (error) {
        // error handling in try-block
        res.status(403).json({
            success : false, 
            message : error
        });
    }
});

// Authenticating jwt API
app.post('/api/auth',validateApi, async(req, res) => {

    try {
        // extracting details from signed token
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decoded === null) {
            throw "Invalid token!";
        }
        else {
            // getting user-Credential of all users from Credentials.json   
            const data = fs.readFileSync("./credentials.json", {encoding : "utf8"});
            let allDetails = await JSON.parse(data);
            let resultant = allDetails.find(user=> user.userName === decoded.userName);
            
            if(resultant){
                // creating new token to update the duration of token validity
                const apiKey = process.env.TOKEN_SECRET;
                const newToken = jwt.sign({userName: resultant.userName.toString()},apiKey,{
                    expiresIn: "30d",
                });
                // handling error during token generation
                if(!newToken)
                throw 'JWT Error!';
                
                // sending response on sucessful authenticating
                res.status(200).json({
                    success : true, 
                    message : "Correct token!",
                    details : {
                        name : resultant.name,
                        userName : resultant.userName,
                        token : newToken
                    }
                });
            }
            else{
                // error for invalid token 
                throw "Invalid Token!";
            }
        }
    } catch (error) {
        // handling error in try-block
        res.status(403).json({
            success : false, 
            message : error
        });
    }
});

// Exports
module.exports = app;