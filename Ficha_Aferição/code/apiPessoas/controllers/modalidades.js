var Pessoas = require("../models/pessoas")

// Returns the list of all modalidades
module.exports.listarTodasModalidades = () => {
    return Pessoas
        .distinct("desportos")
        .sort( { desportos: 1 })
        .exec()
}

// Returns the list of all persons from that modalidade
module.exports.listarPessoasModalidade = (modalidade) => {
    return Pessoas
        .find({desportos: modalidade})
        .select('nome')
        .sort( { nome: 1 })
        .exec()
}

