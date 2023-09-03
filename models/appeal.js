const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/loginRegistration").then(()=>{
    console.log("mongodb 4connected");
});


const employeeSchema2 = new mongoose.Schema({
    complaint_date : {
        type : String,
        required :true,
        unique : true
    },
    incident_date: {
        type :String,
        required : true,
        unique :true
    }
    ,
    witness:{
        type :String,
        required : true,
        unique : true
    }
    ,
    witness2:{
        type :String,
        required : true,
        unique : true
    },
    appeal_result:{
        type :String,
        required : true,
        unique : true
    },
    reason:{
        type :String,
        required : true,
        unique : true
    },
    response_from_company:{
        type :String,
        required : true,
        unique : true
    },
    grievance:{
        type :String,
        required : true,
        unique : true
    },



})



console.log("hello");

const Register2 = new mongoose.model("Register1",employeeSchema2);
module.exports = Register2;

console.log("hello");