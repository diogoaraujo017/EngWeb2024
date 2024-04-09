var Pessoas = require("../models/pessoas")

// Returns the list of all people
module.exports.listTotal = () => {
    return Pessoas
        .find()
        .sort({nome : 1})
        .exec()
}

// Returns the person with the given id
module.exports.findById = id => {
    return Pessoas
        .findOne({_id :  ObjectId(id)})
        .exec()
}

// Inserts a new person
module.exports.insert = pessoa => {
    var newPessoa = new Pessoas(pessoa)
    return newPessoa.save()
}

// Deletes the person with the given id
module.exports.delete = id => {
    return Pessoas
        .deleteOne({_id: ObjectId(id)})
        .exec()
}

// Updates the person with the given id
module.exports.update = (pessoa) => {
    return Pessoas
        .findOneAndUpdate({_id: ObjectId(pessoa.id)}, pessoa)
        .exec()
}