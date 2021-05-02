const path = require('path')
const fs = require('fs')
// import de la librairie discord.js
const Discord = require('discord.js')
const config = require('./config.json')
// instanciation de la classe client
const client = new Discord.Client()
const welcome = require('./welcome/welcome')
const invitNotif = require('./notifications/invites')
const roleClaim = require('./role/role_claim')
const poll = require('./poll/poll')
// quand le bot est prêt
client.on('ready', function () {
    console.log('bot ready !!!')
    // définition de l'activité du bot
    client.user.setActivity('Gestion du serveur').catch(console.error)
    // message d'accueil pour l'arrivée d'un membre
    welcome(client)
    // gestion de rôle user
    roleClaim(client)
    // système de vote
    poll(client)
    // notification de la personne qui à invité un membre à rejoindre le serveur
    invitNotif(client)
    const baseFile = 'command-base.js'
    const commandBase = require(`./command/${baseFile}`)

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                console.log(file, option)
                commandBase(option)
            }
        }
    }

    readCommands('command')
    // listener de commande (unique)
    commandBase.listen(client)

})


// connection du bot sur le serveur
client.login(config.token)
