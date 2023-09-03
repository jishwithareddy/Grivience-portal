

const mongoose = require("mongoose");
const Register = require("../models/registers");

mongoose.connect("mongodb://localhost:27017/loginRegistration").then(()=>{
    console.log("mongodb 2connected");
});


// const user = new Register({Username:"jishw",Email_id:"ll",Password : 26,Confirm_password: 26})
// user.save().then(()=> console.log("user saved"))