const express= require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require('../controllers/url');
const { body } = require('express-validator');
const router = express.Router();

router.post(
  '/',
  [
    body('url').isURL().withMessage('A valid URL is required'),
    body('customShortId')
      .optional({ checkFalsy: true })
      .isLength({ min: 3, max: 30 }).withMessage('Custom short link must be 3-30 characters')
      .matches(/^[a-zA-Z0-9-_]+$/).withMessage('Custom short link can only contain letters, numbers, hyphens, and underscores')
      .trim().escape()
  ],
  handleGenerateNewShortUrl
);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;