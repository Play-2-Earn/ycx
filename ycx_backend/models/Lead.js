const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
},
{timestamps:true});

module.exports = Lead = mongoose.model('Lead', leadSchema);
