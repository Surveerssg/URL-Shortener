const nanoId = require('nano-id');
const URL = require('../models/url');
const { validationResult } = require('express-validator');

async function handleGenerateNewShortUrl(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    const body = req.body;
    let shortID = body.customShortId ? body.customShortId : nanoId(8);
    // Check if the custom short link is already taken
    const existing = await URL.findOne({ shortId: shortID });
    if (existing) {
        // If customShortId was provided, show error; if random, generate a new one
        if (body.customShortId) {
            return res.status(400).json({ error: 'Custom short link is already taken. Please choose another.' });
        } else {
            // Try generating a new random one (very unlikely to collide)
            shortID = nanoId(8);
        }
    }
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