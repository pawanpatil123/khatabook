const hisaabModel = require("../models/hisabModel")
const userModel = require("../models/usermodel")
module.exports.createHisaabController = async function(req, res){
   let {title, description, encrypted, shareable, passcode, editpermissions} = req.body
    encrypted = encrypted === "on" ? true : false;
    shareable = shareable === "on" ? true : false;
    editpermissions = encrypted === "on" ? true : false;
    
    
    let hisaabCreated = await hisaabModel.create({
    title,
    description,
    user: req.user._id,
    passcode,
    encrypted,
    shareable,
    editpermissions,
   });

try{
    let user= await userModel.findOne({email: req.user.email})
    user.hisaab.push(hisaabCreated._id)
    await user.save();
    res.redirect("/profile")
}
catch(err){
res.send(err.message);
}


}

module.exports.hisaabPageController= async function(req, res){
    res.render("create",{isLoggedIn: true})
}

module.exports.readHisaabController =  async function (req, res, next) {
    const id = req.params.id;
    const hisaab = await hisaabModel.findOne({
      _id: id
    })
  
  if(!hisaab){
  return res.redirect('/profile')
  }
  if(hisaab.encrypted){
  return res.render("passcode", {isloggedIn: true,id})
  }
  
    return res.render("hisaab", { isloggedIn: true, hisaab });
}


// module.exports.readVerifiedHisaabController = async function(req, res, next){
//     return res.render("hisaab")
// } 

module.exports.readVerifiedHisaabController = async function (req, res, next) {
    const id = req.params.id;
    
    const hisaab = await hisaabModel.findOne({_id: id});
    if(!hisaab){
      return res.redirect('/profile')
    }
    if(hisaab.passcode !== req.body.passcode){
      return res.redirect('/profile')
    }
      return res.render("hisaab",{
        isloggedIn: true,
        hisaab
      });
    };

module.exports.deleteController = async function (req, res, next) {
    const id = req.params.id;
  
    const hisaab = await hisaabModel.findOne({
      _id: id,
      user: req.user.id
    })
    if (!hisaab) {
      return res.redirect('profile')
    }
    await hisaabModel.deleteOne({
      _id: id
    })
  
    return res.redirect('/profile')
  }

  module.exports.editController = async function (req, res, next) {
    const id = req.params.id;
    const hisaab = await hisaabModel.findById(id);
  
    if (!hisaab) {
      return res.redirect('/profile')
    }
    return res.render("edit", { isloggedIn: true, hisaab })
  }
  module.exports.editPostController = async function (req, res, next) {
    const id = req.params.id;
    const hisaab = await hisaabModel.findById(id);
  
    if (!hisaab) {
      return res.redirect('/profile')
    }
    hisaab.title = req.body.title;
    hisaab. description = req.body.description;
    hisaab.editpermissions = req.body.editpermissons == 'on' ? true : false;
    hisaab.encrypted = req.body.encrypted == 'on' ? true : false;
    hisaab.passcode = req.body.passcode;
    hisaab.sharable = req.body.shareable == 'on' ? true : false;
  
    await hisaab.save();
  
  }