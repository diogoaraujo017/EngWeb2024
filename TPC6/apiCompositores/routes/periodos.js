var express = require('express');
var router = express.Router();
var Periodos = require("../controllers/periodos");

// Done
router.get('/', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    Periodos.listTotal()
    .then(data => res.status(200).render("periodListPage", {"slist": data, "date": d}))
    .catch(erro => res.status(510).render("errorPage", {"error": erro}))
});

// Done
router.get('/registo', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render("periodFormPage", {"date": d})
});

// Done
router.post('/registo', function(req, res) {
    result = req.body
    Periodos.insert(result)
    .then(data => res.status(200).redirect("/periodos"))
    .catch(erro => res.status(511).render("errorPage", {"error": erro}))
});

// Done
router.get('/:idPeriodo', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    Periodos.findById(req.params.idPeriodo)
    .then(data => res.status(200).render("periodPage", {"period": data, "date": d}))
    .catch(erro => res.status(512).render("errorPage", {"error": erro}))
});

// Done
router.get('/edit/:idPeriodo', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    Periodos.findById(req.params.idPeriodo)
    .then(data => res.status(200).render("periodFormEditPage", {"periodo": data, "date": d}))
    .catch(erro => res.status(513).render("errorPage", {"error": erro}))
});


router.post('/edit/:idPeriodo', function(req, res) {
    Periodos.update(req.body)
    .then(data => res.status(200).redirect("/periodos"))
    .catch(erro => res.status(514).render("errorPage", {"error": erro}))
});

// Done
router.get('/delete/:idPeriodo', function(req, res) {
    Periodos.delete(req.params.idPeriodo)
    .then(data => res.status(200).redirect("/periodos"))
    .catch(erro => res.status(515).render("errorPage", {"error": erro}))
});


module.exports = router;
