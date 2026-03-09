
const mongoose = require('mongoose');
require('dotenv').config();


async function connectDataBase(){

    try {

        await mongoose.connect(`${process.env.MONGO_DB_LINK}`);
        console.log("Data base successfully connected ! ")
        
    } catch (err) {

        console.log(`Error occur while data base connection : ${err.message}`)
        
    }
};

module.exports = connectDataBase;
