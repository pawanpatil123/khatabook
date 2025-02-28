const mongoose = require("mongoose");
const { type } = require("os");


const hisabSchema= mongoose.Schema({
   title:{
    type: String,
    trim: true,
    minLength:3,
    maxLength: 100,
    requried:true
   },
   description:{
type: String,
requried: true,
trim: true,
   },
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
   encrypted: {
    type: Boolean,
    default: false,

   },
   shareable:{
    type: Boolean,
    default: false,
   },
   passcode:{
    type: String,
    default:"",
   },
editpermissions:{
    type: Boolean,
    default: false,
},
},
{ timestamps: true }
)

module.exports = mongoose.model("hisaab",hisabSchema);
