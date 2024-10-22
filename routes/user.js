const express = require('express')
const router = express.Router()

const {sayHi} =require('../contollers/user');

router.get('/', sayHi);

module.exports = router;