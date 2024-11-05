const mongoose = require("mongoose");
const { type } = require("os");


const userSchema= mongoose.Schema({
   username:{
    type: String,
    trim:true,
    minlength: 3,
    maxlength: 20,
    requried:true,
   },
   name: {
    type: String,
    requried: true,
    trim: true,

   },
   profilepicture:{
    type:String,
    trim: true,
   },
  
   email:{
 type: String,
 requried: true,
 trim: true,
   },
   password:{
type: String,
requried: true,
select: false,
   },
hisaab:[{type: mongoose.Schema.Types.ObjectId, ref: "hisaab"}],

})

module.exports=  mongoose.model("user", userSchema);