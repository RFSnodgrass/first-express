var express = require('express');
var router = express.Router();

const classroom = require('../students.js')

/* GET home page. */
router.get('/', (req, res) => res.send("BOBO"));

module.exports = router;
