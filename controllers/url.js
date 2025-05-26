const nanoId = require('nano-id');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url)
        return res.status(400).json({error:'URL is required'});
    
    const shortID = nanoId(8);
    await URL.create({
        redirectUrl: body.url,
        shortId: shortID,
        visitHistory: [],
        createdBy: req.user._id,
    });

    // Fetch all URLs for the user after creating new one
    const allURLs = await URL.find({ createdBy: req.user._id });
    
    return res.render('home', {
        id: shortID,
        urls: allURLs
    });
    // return res.status(200).json({
    //   id: shortID,
    // });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    if(!entry)
        return res.status(404).json({error:'URL not found'});
    return res.status(200).json({
        analytics: entry.visitHistory,
        totalClicks: entry.visitHistory.length,
    });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
};