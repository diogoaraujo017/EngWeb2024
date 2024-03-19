var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores")
        .then(resp => {
          compositores = resp.data
          res.status(200).render("composerListPage", {"slist": compositores, "date": d})
        })
        .catch( erro =>{
          res.status(502).render("error", {"error": erro})
        })
});

// Done
router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/periodos")
    .then(resp => {
      periodos = resp.data
      res.status(200).render("composerFormPage", {"periods": periodos, "date": d})
    })
    .catch( erro =>{
      res.status(503).render("error", {"error": erro})
    })
});

// Done
router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  result = req.body
  axios.post("http://localhost:3000/compositores/", result)
        .then(resp => {
          res.redirect("/compositores")
        })
        .catch( erro => {
          res.status(504).render("error", {"error": erro})
        })
});

// Done
router.get('/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/" + id)
        .then(resp => {
            compositor = resp.data
            res.status(200).render("composerPage", {"composer": compositor, "date": d})
        })
        .catch( erro =>{
            res.status(504).render("error", {"error": erro})
        })
});

// Done
router.get('/edit/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/" + id)
        .then(resp => {
            compositor = resp.data
            axios.get("http://localhost:3000/periodos")
              .then(resp => {
                periodos = resp.data
                res.status(200).render("composerFormEditPage", {"composer": compositor, "periods": periodos, "date": d})
              })
              .catch( erro =>{
                res.status(505).render("error", {"error": erro})
              })
        })
        .catch( erro =>{
            res.status(510).render("error", {"error": erro})
        })
});

// Done
router.post('/edit/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var composer = req.body
  axios.put("http://localhost:3000/compositores/" + composer.id, composer)
        .then(resp => {
            res.redirect("/compositores")
        })
        .catch( erro =>{
            res.status(505).render("error", {"error": erro})
        })
});

// Done
router.get('/delete/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idCompositor
  axios.delete("http://localhost:3000/compositores/" + id)
        .then(resp => {
            res.redirect("/compositores")
        })
        .catch( erro =>{
            res.status(506).render("error", {"error": erro})
        })
});


module.exports = router;
