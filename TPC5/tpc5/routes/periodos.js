var express = require('express');
var router = express.Router();
var axios = require('axios');

// Done
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/periodos")
        .then(resp => {
          periodos = resp.data
          res.status(200).render("periodListPage", {"slist": periodos, "date": d})
        })
        .catch( erro =>{
          res.status(520).render("error", {"error": erro})
        })
});

// Done
router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("periodFormPage", {"date": d})
});

// Done
router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  result = req.body
  axios.post("http://localhost:3000/periodos/", result)
        .then(resp => {
          res.redirect("/periodos")
        })
        .catch( erro => {
          res.status(521).render("error", {"error": erro})
        })
});

// Done
router.get('/:idPeriodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idPeriodo
  axios.get("http://localhost:3000/periodos/" + id)
        .then(resp => {
            periodo = resp.data
            res.status(200).render("periodPage", {"period": periodo, "date": d})
        })
        .catch( erro =>{
            res.status(522).render("error", {"error": erro})
        })
});

// Done
router.get('/edit/:idPeriodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idPeriodo
  axios.get("http://localhost:3000/periodos/" + id)
        .then(resp => {
            periodo = resp.data
            res.status(200).render("periodFormEditPage", {"periodo": periodo, "date": d})
        })
        .catch( erro =>{
            res.status(523).render("error", {"error": erro})
        })
});

// Done
router.post('/edit/:idPeriodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var periodo = req.body
  axios.put("http://localhost:3000/periodos/" + periodo.id, periodo)
        .then(resp => {
            res.redirect("/periodos")
        })
        .catch( erro =>{
            res.status(530).render("error", {"error": erro})
        })
});

// Done
router.get('/delete/:idPeriodo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idPeriodo
  axios.delete("http://localhost:3000/periodos/" + id)
        .then(resp => {
            res.redirect("/periodos")
        })
        .catch( erro =>{
            res.status(531).render("error", {"error": erro})
        })
});


module.exports = router;
