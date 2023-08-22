const express = require("express");
const router = express.Router();
const { handleCreateShortURL , handleAnalytics, } = require("../controllers/url")

router.post("/",handleCreateShortURL);

router.get("/analytics/:id", handleAnalytics)


module.exports = router;