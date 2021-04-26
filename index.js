// import de la librairie discord.js
const Discord = require('discord.js')
const config = require('./config.json')
// instanciation de la classe client
const client = new Discord.Client()
const welcome = require('./welcome/welcome')
const command = require('./command/command')
const homeMessage = require ('./homeMessage/homeMessage')
// // message accueil
// const homeEmbed = new Discord.MessageEmbed()
//     .setColor('#FF0000')
//     .setTitle('Choix de role')
//     .setURL('https://une.url.com')
//     .setAuthor('RubyCouz')
//     .setDescription('choisissez un rôle')
//     .setFooter('un pti text')
//
// channel.send(homeEmbed)

// quand le bot est prêt
client.on('ready', function () {
    // définition de l'activité du bot
    client.user.setActivity('Gestion du serveur').catch(console.error)
    // message d'accueil pour l'arrivée d'un membre
    welcome(client)
    // réponse à une commande ping
    command(client, 'ping', (message) => {
        message.channel.send('pong')
    })
    // nombre de personne sur le serveur
    command(client, 'server', (message) => {
        // récupération des info du serveur
        client.guilds.cache.forEach((guild) => {
            console.log(guild)
            // formatage du texte affichant le nombre de personnes sur le serveur
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })
    // clear chan
    command(client, 'cc', (message) => {
        // check de la permission
        if (message.member.hasPermission('ADMINISTRATOR')) {
            // réucpération de tous les messages du chan
            message.channel.messages.fetch().then((results) => {
                // suppression de tous les messages du chan
               message.channel.bulkDelete(results)
                })
        }
    })
    // création d'un channel
    command(client, 'channel', (message) => {
        // échappement de la commande pour récupérer le nom du chan
        const name = message.content.replace('$channel', '')
        // création du chan
        message.guild.channels.create(name, {
            type: 'text',
        })
            .then((channel) => {
                // récupéraiton des infos du chan en console
                console.log(channel)
                // définition de l'id parent
                const categoryId = '818757144962662420'
                // assignation du cha à une catégorie en particulier
                channel.setParent(categoryId)
            })
    })

    homeMessage(client, '836186856781643776', 'hello world', ['👋', '🖖', '🖕'])
})


// connection du bot sur le serveur
client.login(config.token)
