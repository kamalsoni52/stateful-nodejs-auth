const express = require("express");
const { 
    handleHomePage,
    handleRedirectURL,
    handleSignUpPage,
    handleLoginPage
     } = require("../controllers/staticURL")

const staticRouter = express.Router();

staticRouter.get("/signup", handleSignUpPage)
staticRouter.get("/login", handleLoginPage)

staticRouter.get("/",handleHomePage)
staticRouter.get("/:id", handleRedirectURL);

module.exports = staticRouter;

