const Lead = require('../models/Lead')

exports.addLead = async (req, res) => {
  try {
    // Extracting lead details from the request body
    const { name, website, email, phone } = req.body;

    // Validating required fields
    if (!name || !email || !phone || !website) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: companyName, email, or phone , website.",
      });
    }

    // Creating a new lead
    const newLead = new Lead({ name, website, email, phone });

    // Saving the lead to the database
    const savedLead = await newLead.save();

    // Returning success response
    return res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      data: savedLead,
    });
  } catch (error) {
    // Handling Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: "Validation error.",
        errors: error.errors,
      });
    }

    // General error handling
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the lead.",
      error: error.message,
    });
  }
};
