import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  painPoints: {
    type: String,
    required: true
  },
  annualRevenue: {
    type: String,
    required: true
  },
  teamSize: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'matched', 'contacted', 'demo_scheduled', 'converted', 'closed'],
    default: 'new'
  },
  matchedStartup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Lead = mongoose.model('Lead', leadSchema);