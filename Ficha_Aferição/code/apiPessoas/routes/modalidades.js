var express = require('express');
var router = express.Router();
var Modalidades = require("../controllers/modalidades")

router.get("/", (req, res) => {
    Modalidades.listarTodasModalidades()
        .then(result => res.status(200).send(result))
        .catch((error) => res.status(510).json({error: error.message}));
});

router.get("/:id", (req, res) => {
    Modalidades.listarPessoasModalidade(req.params.id)
        .then(result => res.status(200).send(result))
        .catch((error) => res.status(511).json({error: error.message}));
});

module.exports = router;