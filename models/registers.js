const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/loginRegistration").then(()=>{
    console.log("mongodb 4connected");
});


const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
        unique : true
    },
    district: {
        type :String,
        required : true,
        unique :true
    }
    ,
    address:{
        type :String,
        required : true,
        unique : true
    }
    ,
    phonenumber:{
        type :String,
        required : true,
        unique : true
    },
    pincode:{
        type :String,
        required : true,
        unique : true
    },
    email_id:{
        type :String,
        required : true,
        unique : true
    },
    second_phonenumber:{
        type :String,
        required : true,
        unique : true
    },
    is_verified:{
        type : String

    }



})





// const employeeSchema = new mongoose.Schema({
//     Username : {
//         type : String,
//         required :true,
//         unique : true
//     },

//     Email_id: {
//         type :String,
//         required : true,
//         unique :true
//     },
//     Password:{
//         type :String,
//         required : true
//     },
//     Confirm_password:{
//         type :String,
//         required : true
//     }

// })
console.log("hello");

const Register = new mongoose.model("Register5",employeeSchema);
module.exports = Register;

console.log("hello");