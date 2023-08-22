const express =require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const { connectToMongo } = require("./credential")
const URL = require("./models/url");
const  {restrictToLoggedInUserOnly ,checkAuth} =require("./middleware/auth")
const app =express();
const PORT = 8001 ; 

//routes import
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticURL")
const userRoute = require("./routes/user")

connectToMongo("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("mongo started"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());



app.use("/url", restrictToLoggedInUserOnly ,urlRoute);
app.use("/", checkAuth , staticRoute);
app.use("/user", userRoute);


app.listen(PORT, ()=>{
    console.log("URL Shortner Server Satrted")
})