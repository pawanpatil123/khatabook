const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel")
const hisaabModel = require("../models/hisabModel")
const bcrypt = require("bcrypt")


module.exports.homepageController = function (req, res) {
    res.render("index", { loggedin: false });
};
module.exports.registerController = function (req, res) {
    res.render("register", { loggedin: false });
};
module.exports.postRegisterController = async function (req, res) {
    let { email, password, username, name } = req.body;

    try {
        if (!username || !email) {
            req.flash("error", " All field are required")
            return res.redirect("/register")
        };

        const useremail = await userModel.findOne({ email });
        if (useremail) {
            // req.flash("error", "Email already exists");
            return res.redirect("/register");
        }
        const userName = await userModel.findOne({ username })
        if (userName) {
            // req.flash("error", "username already exists ")
            return res.redirect("/register")
        }

        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);

        user = await userModel.create({
            email, name, username, password: hashed
        });
        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/profile")
    }
    catch (err) {
        res.send(err.message)
    }
};


module.exports.loginController = async function (req, res) {
    let { email, password } = req.body
    if (!email || !password) {
        req.flash("error","All field are required")
        // console.log(error)
    }
    let user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        res.redirect("/");
        return
    }

    let result = await bcrypt.compare(password, user.password)
    if (result) {
        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/profile")
    }
    else {
        res.redirect("/");
        return

    }
};
module.exports.logoutController = function (req, res) {
    res.cookie("token", "");
    return res.redirect("/");
};

module.exports.profileController = async function (req, res) {
    // console.log(req.user)
    let byDate = Number(req.query.byDate);
    let { startDate, endDate } = req.query;

    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("1970-01-01")
    endDate = endDate ? endDate : new Date();

    let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "hisaab",
        match: { createdAt: { $gte: startDate, $lte: endDate } },
        options: { sort: { createdAt: byDate } },
    });
    res.render("profile", { user });
};