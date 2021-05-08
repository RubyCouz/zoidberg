const mongoose = require('mongoose')
const {mongoPath} = require('./config.json')
// connexion à mongoDB; constructeur client mongoDB
module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}