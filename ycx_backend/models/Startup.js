import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  industry: {
    type: [String],
    required: true
  },
  solutionKeywords: {
    type: [String],
    required: true
  },
  useCases: {
    type: [String],
    required: true
  },
  affiliateProgram: {
    commission: {
      type: Number,
      required: true
    },
    terms: String
  },
  minimumCustomerSize: {
    type: Number,
    default: 0
  },
  idealCustomerProfile: {
    annualRevenue: {
      min: Number,
      max: Number
    },
    teamSize: {
      min: Number,
      max: Number
    },
    industries: [String]
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Startup = mongoose.model('Startup', startupSchema);
