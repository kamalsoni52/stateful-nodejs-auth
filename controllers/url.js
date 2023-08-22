const ShortUniqueId = require('short-unique-id');
const URL = require("../models/url")

const handleCreateShortURL = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "URLS is required"});
    const shortId = new ShortUniqueId();
    const id = shortId()
    console.log(id)
    let redUrl = body.url;
    if(!redUrl.match(/^(https:\/\/)|(http:\/\/)/gi)) redUrl = "https://"+redUrl
    await URL.create({
        shortId: id,
        redirectURL: redUrl, 
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.status(200).render("home", {
        "shortUrl" : "localhost:8001/"+id
    })

}

const handleAnalytics = async (req,res) => {
    const shortId = req.params.id;
    const result = await URL.findOne({ shortId });    
    return res.json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}


module.exports = {
  
    handleCreateShortURL,
    handleAnalytics
}