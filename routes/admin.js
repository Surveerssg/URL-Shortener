const express = require('express');
const { handleGetAdminDashboard } = require('../controllers/admin');
const { checkAdmin, restrictToLoggedinUserOnly } = require('../middlewares/auth');

const router = express.Router();

router.get('/', restrictToLoggedinUserOnly, checkAdmin, handleGetAdminDashboard);

module.exports = router; 