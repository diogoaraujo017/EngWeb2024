var Compositores = require("../models/compositores")

// Returns the list of all composers
module.exports.listTotal = () => {
    return Compositores
        .find()
        .sort({nome : 1})
        .exec()
}

// Returns the list of composers by period
module.exports.listByPeriod = period => {
    return Compositores
        .find({period: period})
        .sort({nome : 1})
        .exec()
}

// Returns the composer with the given id
module.exports.findById = id => {
    return Compositores
        .findOne({id : id})
        .exec()
}

// Inserts a new composer
module.exports.insert = compositor => {
    var newComposer = new Compositores(compositor)
    return newComposer.save()
}

// Deletes the composer with the given id
module.exports.delete = id => {
    return Compositores
        .deleteOne({id: id})
        .exec()
}

// Updates the composer with the given id
module.exports.update = (composer) => {
    return Compositores
        .findOneAndUpdate({id: composer.id},
                          {$set: {nome: composer.nome, 
                                  bio: composer.bio, 
                                  dataNasc: composer.dataNasc,
                                  dataObito: composer.dataObito,
                                  periodo: composer.periodo}})
        .exec()
}