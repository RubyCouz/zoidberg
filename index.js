// appel de path et fs, permettant la manipulation / récupération d'infos de dossier
const path = require('path')
const fs = require('fs')
// import de la librairie discord.js
const Discord = require('discord.js')
const config = require('./config.json')
// instanciation de la classe client
const client = new Discord.Client()
// appel des différentes librairie pour le fonctionnement du bot
const mongo = require('./mongo')
const loadCommands = require ('./command/load_commands')
const welcome = require('./welcome/welcome')
const invitNotif = require('./notifications/invites')
const roleClaim = require('./role/role_claim')
const poll = require('./poll/poll')
const commandBase = require('./command/command-base');
const advPoll = require('./poll/advenced_poll')

/**
 * quand le bot est prêt
 */
client.on('ready', async () => {
    console.log('bot ready !!!')
    // récupération de la connexion à mongoDB
    await mongo().then(mongoose => {
        try {
            console.log('Connected to mango')
        } catch (e) {

        } finally {
            // fermeture de la connexion à mongoDB (dans finally => tout le temps exécutée)
            mongoose.connection.close()
        }
    })
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
    // listener de commande (unique)
    commandBase.listen(client)
    // chargement des commandes
    loadCommands(client)
    // chargement poll avancé
    advPoll(client)

})


// connection du bot sur le serveur
client.login(config.token)
