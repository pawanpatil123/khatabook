const express = require("express");
const app = express();
const path = require("path")
const cookieParser= require("cookie-parser")
require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const hisaabRouter = require("./routes/hisaabRouter");
const { connection } = require("mongoose");
const db = require("./config/mongoose-connection")

const expressSession = require("express-session");
const flash = require("connect-flash");


app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.use(
    expressSession({
        secret:"piy",
        resave: false,
        saveUninitialized: false,
        httpOnly: true
    })
)

app.use(flash());

app.use("/", indexRouter);
app.use("/hisaab", hisaabRouter);


// app.listen(process.env.PORT   3000)
app.listen(3000)