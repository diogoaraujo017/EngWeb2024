var express = require('express');
var router = express.Router();
var Compositores = require("../controllers/compositores")
var Periodos = require("../controllers/periodos");
const periodos = require('../models/periodos');

// Done
router.get('/', async function(req, res) {
    try {
        var d = new Date().toISOString().substring(0, 16)

        var periodos = await Periodos.listTotal()
       
        var composers = await Compositores.listTotal()

        res.status(200).render("composerListPage", {"slist": composers, "periods" : periodos, "date": d})

    } catch (erro) {
        res.status(502).render("errorPage", {"error": erro})
    }
});

// Done
router.get('/registo', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    Periodos.listTotal()
    .then(data => res.status(200).render("composerFormPage", {"periods": data, "date": d}))
    .catch(erro => res.status(503).render("errorPage", {"error": erro}))
});

// Done
router.post('/registo', function(req, res) {
    var composer = req.body
    Compositores.insert(composer)
    .then(data => res.redirect("/compositores"))
    .catch(erro => res.status(504).render("errorPage", {"error": erro}))
});

// Done
router.get('/:idCompositor', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idCompositor
    Compositores.findById(id)
    .then(data => res.status(200).render("composerPage", {"composer": data, "date": d}))
    .catch(erro => res.status(505).render("errorPage", {"error": erro}))
});

// Done
router.get('/edit/:idCompositor', async function(req, res) {
    try {
        var d = new Date().toISOString().substring(0, 16)
        var id = req.params.idCompositor

        var periodos = await Periodos.listTotal()

        var composer = await Compositores.findById(id)

        res.status(200).render("composerFormEditPage", {"composer": composer, "periods": periodos, "date": d})

    } catch (erro) {
        res.status(506).render("errorPage", {"error": erro})
    }
});

// Done
router.post('/edit/:idCompositor', function(req, res) {
    var composer = req.body
    Compositores.update(composer)
    .then(data => res.redirect("/compositores"))
    .catch(erro => res.status(507).render("errorPage", {"error": erro}))
});

// Done
router.get('/delete/:idCompositor', function(req, res) {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idCompositor
    
    Compositores.delete(id)
    .then(data => res.status(200).redirect("/compositores"))
    .catch(erro => res.status(508).render("errorPage", {"error": erro}))
});


module.exports = router;
