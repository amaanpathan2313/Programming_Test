
const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String
    },
    address : {
        type : String
    },
    age : {
        type : Number
    },
    education : {
        type : String
    }
});


const AuthModel = mongoose.model("authUser", authSchema);

module.exports = AuthModel;