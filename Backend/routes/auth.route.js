

const express = require('express');
const AuthModel = require('../models/auth.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
require('dotenv').config();

 
const authRouter = express.Router();


// Signup Route

authRouter.post('/signup', async (req, res) => {

    const { userName, password} = req.body;

    try {

        let exist = await AuthModel.findOne({userName});

        if(exist){
          return  res.status(403).json({msg : "User already register"})
        }
 
            const hash = await bcrypt.hash(password, saltRounds);

            console.log(hash)
            await AuthModel.create({userName, password: hash});

            res.status(201).json({msg : "User Successfully Register"})
        
    } catch (err) {

        res.status(500).json({msg : `Error Occur while signup user : ${err.message}`})
        
    }


}); 


// Login Route

authRouter.post('/login', async (req, res) => {

    const { userName, password} = req.body;

    try {

        let exist = await AuthModel.findOne({userName});

        if(!exist){
           return res.status(403).json({msg : "User not found !"})
        }
              // Load hash from your password DB.
              let hash = exist.password;
                  bcrypt.compare(password, hash, function(err, result) {
                        // result == true

                        if(err){
                            return res.status(500).json({msg : "Error occur while verify the password !"})
                        }

                        if(result){
                            var token = jwt.sign({ userId : exist._id }, process.env.KEY, { expiresIn: '1h' });

                          return res.status(200).json({msg : "Login Successful", token})


                        }else{
                            return res.status(403).json({msg : "Wrong Password ! "})
                        }
                   });
            
    } catch (err) {

        res.status(500).json({msg : `Error Occur while Login user : ${err.message}`})
        
    }


}); 

// Profile Route

authRouter.get('/profile', async(req, res) => {

    const token = req?.headers?.authorization.split(" ")[1];

     if(!token){
         return  res.status(401).json({msg : "Token Not found ! "})
     }

    try {

        // verify a token symmetric
            var decoded = jwt.verify(token, process.env.KEY);

                
                if(decoded){

                    let data = await AuthModel.findById(decoded.userId);

                    res.status(200).json({data})
                    
                }else{
                     return  res.status(401).json({msg : `Token expired or invalid ` });

                 }
        
    } catch (err) {

        res.json({msg : `Error occur while fetch profile : ${err.message}`})
        
    }
})


module.exports = authRouter;