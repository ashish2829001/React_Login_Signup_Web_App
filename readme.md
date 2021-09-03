#### ----------------- Developer ------------------####
#### `Name` ------ `Ashish Pratap Singh` ----------####
#### `College` ------- `IIT Kharappur` ------------####
#### `Email` ----- `ashish2829001@gmail.com` ------####
#### `Contact` -------- `8709013012` --------------####

# Bankend Server for React Web App

This project deals with the authentication (Login/Signup) API with rendering static files

## Available Scripts

In the project directory (`/revirtSpace`), you can run:

### `npm install`

It install all the required modules for this web app

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3001](http://localhost:3000) to view it in the browser.

## About this web App

1. A temporary file is created named, `credentials.json`, which stores the details of every user. ( A file is used for temporary purpose as no instruction was given about database to be used ).

2. Used a API validator middleware which deals with the authority of every API call. 

    Every API call should contain this : 
    ## header 
    {
        `validationKey` : `######^&dmckjfsjkdkfj$$$` 
    }

3. Created a server and three API to deal with creadetial of a user.

4. First API (`Signup`) deals with the signing up of user details and used `bcrypt` to has password before saving. ( Strong password validation is not applied here as I have done it in the front end part ) 

5. Second API (`Login`) deals with the verifying the user details and creating a `JWT Token` with expiry duration of 30 days which will be stored in localStorage in front end.

6. Third API (`validating TOKEN`) deals with validation of token and creating a new one for future purpose.

###### API Details ######

## SignUp API ##  ( `http://localhost:3001/api/register`)

e.g. Request format

# header 
{
    `validationKey` : `######^&dmckjfsjkdkfj$$$` 
}
# body 
{
    `name` : `your name`,
    `userName` : `username` (not necessarily email I'd),
    `password` : `UserName@123`
}

e.g. Response format 
{
    `success` : true/false,
    `message` : details message
}

## LogIn  API ##  ( ( `http://localhost:3001/api/login`) )

e.g. Request format 

# header 
{
    `validationKey` : `######^&dmckjfsjkdkfj$$$` 
}
# body 
{
    `userName` : `username` (not necessarily email I'd),
    `password` : `UserName@123`
}

e.g. Response format 

{
    `success` : true/false,
    `message` : details message
    `token` : jwt token
}

## Auth API ## ( ( `http://localhost:3001/api/auth`) )

e.g. Request format 

# header 
{
    `validationKey` : `######^&dmckjfsjkdkfj$$$` 
}
# body 
{
    `token` : jwt token
}

e.g. Response format 

{
    `success` : true/false,
    `message` : details message
    `token` : jwt token
}
