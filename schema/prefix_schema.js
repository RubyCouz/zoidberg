// apple de mongoose
const mongoose = require('mongoose')
// définition d'un type de donnée du schéma
const reqString = {
    type: String,
    required: true
}
// définiton du schema à envoyer dans la base de données
const prefixSchema = mongoose.Schema({
    _id: reqString,
    prefix: reqString
})
// envoie du schéma dans la base de données
module.exports = mongoose.model('guild-prefixes', prefixSchema)