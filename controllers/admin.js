const User = require('../models/user');
const URL = require('../models/url');

async function handleGetAdminDashboard(req, res) {
    const allUsers = await User.find({});
    const allUrls = await URL.find({});
    res.render('admin', {
        users: allUsers,
        urls: allUrls,
    });
}

module.exports = {
    handleGetAdminDashboard,
}; 