const express= require('express');
const URL= require('../models/url');
const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const allURLs=await URL.find({createdBy:req.user._id});
     //Only those URLs will be shown which are created by the user
    return res.render('home', {
        urls: allURLs
    })
}
);

router.get('/signup', (req, res) => {
    return res.render('signup');
});
router.get('/login', (req, res) => {
    return res.render('login');
});
module.exports = router;