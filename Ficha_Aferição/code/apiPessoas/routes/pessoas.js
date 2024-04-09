var express = require('express');
var router = express.Router();
var Pessoas = require("../controllers/pessoas")

router.get('/', function(req, res, next) {
  Pessoas.listTotal()
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(501).jsonp(erro))
});

router.get('/:id', function(req, res, next) {
  Pessoas.findById(req.params.id)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(502).jsonp(erro))
});

router.post('/', function(req, res, next) {
  Pessoas.insert(req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(503).jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  Pessoas.delete(req.params.id)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(504).jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  Pessoas.update(req.params.id, req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(505).jsonp(erro))
}); 


module.exports = router;
