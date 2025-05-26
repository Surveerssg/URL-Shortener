const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
  redirectUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique:true,
  },
  visitHistory:[{
    timestamp: {
      type: Number,
    },
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
},
{timestamps:true});

const URL = mongoose.models.URL || mongoose.model('URL', urlSchema);
module.exports = URL;