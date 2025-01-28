const { addLead } = require('../Controllers/LeadController')

const router= require('express').Router();

router.post('/' , addLead);

module.exports = router;
