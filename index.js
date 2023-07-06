const express = require ('express')
const app = express ()
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const dotenv = require ('dotenv')
dotenv.config()
app.use (bodyParser.urlencoded({extended:true}))



app.set("view engine", "ejs")

let URI = process.env.URI


mongoose.connect(URI)

let userSchema = {
    item: {type:String, required:true, unique:true},
    price: {type:String, required: true },
    quantity: {type:String, require: true}
}
let userModel = mongoose.model("data", userSchema)


app.get("/",(req,res)=>{
    userModel.find()
    .then((result)=>{
        console.log(result);
        res.render("signup", {status:false, budget: result, message: ""})
    })
    .catch((err)=>{
        console.log(err);
    })
})


app.get("/signup",(req,res)=>{
    userModel.find()
    .then((result)=>{
        console.log(result);
        res.render("signup", {status:false, budget: result, message: ""})
    })
    .catch((err)=>{
        console.log(err);
    })
})


app.post("/major", (req, res)=>{
    let form = new userModel(req.body)
    form.save()
    .then((result)=>{
        console.log(result);
        res.redirect("signup")
    })
    .catch((err)=>{
        console.log(err);
        if(err.code ==11000){
            res.render("signup", {status: false, message: "duplicate user found"})
        } else{
            res.render("signup", {status: false, message: "please fill in appropriately"})
        }
    })
})

app.post("/delete", (req, res)=>{
    userModel.deleteOne({item:req.body.newItem})
    .then((result)=>{
        console.log(result);
        res.redirect("/signup")
    })
    .catch((err)=>{
        console.log(err);
    })
})



app.post("/edit", (req, res)=>{
    userModel.findOne({item:req.body.newItem})
    .then((result)=>{
        console.log(result);
        res.render("editusers", {userData: result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.post("/update", (req,res)=>{
    userModel.updateOne ({item:req.body.item}, req.body)
    .then((result)=>{
            console.log(result);
            res.redirect("signup")  
    })
    .catch((err)=>{
        console.log(err);
    })
})



     
app.listen("3000", ()=>{
    console.log("work time");
})


