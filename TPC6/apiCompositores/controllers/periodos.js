var Periodos = require("../models/periodos")

// Returns the list of all periods
module.exports.listTotal = () => {
    return Periodos
        .find()
        .sort({nome : 1})
        .exec()
}

// Returns the period with the given id
module.exports.findById = id => {
    return Periodos
        .findOne({id : id})
        .exec()
}

// Inserts a new period
module.exports.insert = period => {
    var newPeriod = new Periodos(period)
    return newPeriod.save()
}

// Deletes the period with the given id
module.exports.delete = id => {
    return Periodos
        .deleteOne({id: id})
        .exec()
}

// Updates the period with the given id
module.exports.update = (periodo) => {
    return Periodos
        .findOneAndUpdate({id: periodo.id},
                          {$set: {nome: periodo.nome, 
                                  desc: periodo.desc}})
        .exec()
}