const express = require("express");
const session = require("express-session");
const hbs = require("hbs");
const path = require("path");
const app = express();

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret : "secret"
}))


require("../db/connection.js");
const mongoose = require("mongoose");
const Register = require("../models/registers");
const Register2 = require("../models/appeal");


mongoose.connect("mongodb://localhost:27017/loginRegistration").then(()=>{
    console.log("mongodb 2connected");
});
const port = process.env.PORT || 5000;
const static_path = path.join(__dirname,"../public");
app.use(express.static(__dirname + '/public'));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'))


app.use(express.static(static_path));
app.set('views', path.join(__dirname,'../templates'));
app.set("view engine","hbs");
const partials_path = path.join(__dirname,"../templates/partials");
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    // res.send("<h1>Home___Page</h1>");
    res.render("../templates/front_page");
    


});

// app.get("/",(req,res)=>{
//     // res.send("<h1>Home___Page</h1>");
//     res.render("../templates/login");
    


// });
app.post("/login",async(req,res)=>{
    const username = req.body.Username;
});
app.get("/front_page",(req,res)=>{
    res.render("../templates/front_page");
})
app.get("/registration_new",(req,res)=>{
    res.render("../templates/registration_new");
})
app.get("/registration_login",(req,res)=>{
    res.render("../templates/registration_login");
})
app.get("/sign_new",(req,res)=>{
    res.render("../templates/sign_new");
});
app.get("/login",(req,res)=>{
    res.render("../templates/login");
});
app.get("/dashboard_new",(req,res)=>{
    console.log("...");
    const sessionId = req.session.user_id;
    console.log(req.session.user_id);
    res.render("../templates/dashboard_new");
    console.log("...");


});

app.get('/admin', async (req, res) => {
    const users = await Register.find();
    res.render('admin', { users });
  });

//   app.get('/admin', async (req, res) => {
//     try {
//       const users = await Register2.find();
//       res.render('admin', { users });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });
  
  app.delete("/admin/:id/delete", async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await Register.findByIdAndRemove(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  
  app.put('/admin/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await Register2.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  




app.get("/profile", async (req, res) => {
    try {
        // Retrieve user information using session ID
        const user = await Register.findById(req.session.user_id);

        // Render the profile view and pass the user information to it
        res.render("../templates/profile", { user });
    } catch (error) {
        res.status(500).send(error);
    }
});

// app.get("/profile",(req,res)=>{
//     res.render("../templates/profile");
// });

// app,get("/")

app.get("/new_appeal",(req,res)=>{
    res.render("../templates/new_appeal");
});
app.get("/view_status",(req,res)=>{
    res.render("../templates/view_status");
})

// app.post("/sign_new",async(req,res)=>{
//     try{ 
//        const Password = req.body.Password;
//         const cpassword = req.body.Confirm_password;
        
//         if(Password === cpassword){
//                 const data = new Register({
//         Username : req.body.Username,
//         Email_id : req.body.Email_id,
//         Password : req.body.Password,
//         Confirm_password :req.body.Confirm_password

//     })
//     const registered = await data.save();
//     res.status(201).render("../templates/login"); 
//         }
//         else{
        
//             res.send("password incorrect");
//         }
//     }
//     catch(error){
//         res.send(400).send(error);
//     }
// })
app.post("/new_appeal",async(req,res)=>{
    try{ 
     
       
                const data = new Register2({
        complaint_date : req.body.complaint_date,
        incident_date : req.body.incident_date,
        witness : req.body.witness,
        witness2 : req.body.witness2,

        appeal_result : req.body.appeal_result,
        reason : req.body.reason,
        response_from_company : req.body.response_from_company,
        grievance : req.body.grievance


    })
    const registered = await data.save();
    console.log("grivance saved!!!");
    res.status(201).render("../templates/dashboard_new"); 
        
    }
    catch(error){
        console.log("123456789");
        res.send(400).send(error);
    }
})

app.post("/registration_new",async(req,res)=>{
    try{ 
     
       
                const data = new Register({
        name : req.body.name,
        district : req.body.district,
        address : req.body.address,
        pincode : req.body.pincode,

        phonenumber : req.body.phonenumber,
        email_id : req.body.email_id,
        second_phonenumber : req.body.second_phonenumber


    })
    const registered = await data.save();
    res.status(201).render("../templates/registration_login"); 
        
    }
    catch(error){
        console.log("123456789");
        res.send(400).send(error);
    }
})


app.post("/registration_login",async(req,res)=>{
    try{
        
        const Name = req.body.name;
        const Phonenumber = req.body.phonenumber;


     const userdetails =  await Register.findOne({name : Name});
     console.log(Phonenumber);
     console.log(Name);
    //  res.status(201).render("../templates/dashboard_new");
     if(userdetails.phonenumber === Phonenumber){
        req.session.user_id = userdetails._id;
        const userid = userdetails._id;
        console.log(userid);
        res.status(201).render("../templates/dashboard_new");
     }
     else{
        console.log("not found");
        res.send("Invalid login details");
     }

    }catch(error){
        console.log("error");
        res.send(400).send("Invalid login details");
    }
})



// app.post("/login",async(req,res)=>{
//     try{
//         const username = req.body.Username;
//         const password = req.body.Password;

//      const userdetails =  await Register.findOne({Username : username});
//      if(userdetails.Password === password){
//         res.status(201).render("../templates/home");
//      }
//      else{
//         res.send("Invalid login details");
//      }

//     }catch(error){
//         res.send(400).send("Invalid login details");
//     }
// })

// const router = express.Router();
// // DELETE operation - Delete user details
// router.delete('/user/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const deletedUser = await Register2.findByIdAndRemove(userId);
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     return res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // PUT operation - Update user details
// router.put('/user/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedUser = await Register2.findByIdAndUpdate(userId, req.body, {
//       new: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     return res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;






app.listen(port, ()=>{
    console.log('Server started on port no :');
});


 
