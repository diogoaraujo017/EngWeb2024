var mongoose = require("mongoose")

var periodosSchema = new mongoose.Schema({
    id : String,
    nome : String,
    desc : String,
}, { versionKey: false })

module.exports = mongoose.model('periodos', periodosSchema)