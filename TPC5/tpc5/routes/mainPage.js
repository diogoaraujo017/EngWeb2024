var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  try { 
    res.status(200).render("mainPage", {"date": d})
  }
  catch(e) {
    res.status(502).render("error", {"error": e})
  }
});

module.exports = router;
