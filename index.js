// import de la librairie discord.js
const Discord = require('discord.js')
const config = require('./config.json')
// instanciation de la classe client
const client = new Discord.Client()
const welcome = require('./welcome/welcome')
const command = require('./command/command')
// const homeMessage = require('./homeMessage/homeMessage')

const roleClaim = require('./role/role_claim')
const poll = require('./poll/poll')
// quand le bot est prêt
client.on('ready', function () {
    // définition de l'activité du bot
    client.user.setActivity('Gestion du serveur').catch(console.error)
    // message d'accueil pour l'arrivée d'un membre
    welcome(client)
    // gestion de rôle user
    roleClaim(client)
    // système de vote
    poll(client)
    // réponse à une commande ping
    // command(client, 'ping', (message) => {
    //     message.channel.send('pong')
    // })
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
            // récupération de tous les messages du chan
            message.channel.messages.fetch().then((results) => {
                // suppression de tous les messages du chan
                message.channel.bulkDelete(results)
            })
        }
    })
    // création d'un channel text
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
    // création channel vocal (voir pour gestion des erreurs si manque nom de chan lors de la création)
    command(client, 'voicechannel', (message) => {
        const name = message.content.replace('$voicechannel', '')
        message.guild.channels.create(name, {
            type: 'voice',
        })
            .then((channel) => {
                const categoryId = '818757144962662420'
                channel.setParent(categoryId)
                channel.setUserLimit(10)
            })
    })
    // message embed
    command(client, 'embed', (message) => {
        console.log(message.author)
        const embed = new Discord.MessageEmbed()

            .setTitle('Test embed')
            .setURL('https://www.youtube.com/watch?v=C22dH_ZUj-Q&list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe&index=11')
            .setAuthor(message.author.username)
            .setImage('https://cdn.wallpapersafari.com/63/23/rcteLA.jpg')
            .setThumbnail('https://cdn.wallpapersafari.com/63/23/rcteLA.jpg')
            .setFooter('exemple de footer', 'https://cdn.wallpapersafari.com/63/23/rcteLA.jpg')
            .setColor('#ff0000')
            .addFields(
                {
                    name: 'Field1',
                    value: 'hello world',
                    inline: true
                },
                {
                    name: 'Field2',
                    value: 'hello world',
                    inline: true
                },
                {
                    name: 'Field3',
                    value: 'hello world',
                    inline: true
                },
                {
                    name: 'Field4',
                    value: 'Some text here'
                }
            )

        message.channel.send(embed)
    })
    // info serveur
    command(client, 'serverinfo', (message) => {
        const {guild} = message
        // récupérération des info nécessaires, voir doc discord.js, guild
        const {name, region, memberCount, owner, afkTimeout} = guild
        const icon = guild.iconURL()
        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for ${name}`)
            .setThumbnail(icon)
            .setColor('#000000')
            .addFields(
                {
                    name: 'Name',
                    value: name,
                    inline: true
                },
                {
                    name: 'Region',
                    value: region,
                    inline: true
                },
                {
                    name: 'Member count',
                    value: memberCount,
                    inline: true
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                    inline: true
                },
                {
                    name: 'AFK TimeOut',
                    value: afkTimeout,
                    inline: true
                }
            )

        message.channel.send(embed);
    })
    // commande help
    command(client, 'help', (message) => {
        message.channel.send(`
        Commandes actives : 
        
        **$serverinfo** - informations sur le serveur
        **$embed** - affiche un message stylisé
        **$cc** - supprime tout les messages du channel sur lequel est tapé la commande
        **$channel nom_du_channel** création d'un channel de texte
        **$voicechannel nom_du_channel** - création d'un channel vocal
        **$server** - une info server
        **$ping** - pong 
        **$ban** - ban un utilisateur
        **kick** - kick un utilisateur
        **$poll** - après un message, permet d'ajouter les réactions like et dislike sur ce message (si pas posté dans le chan suggestion)
        `)
    })
    // commande ban
    command(client, 'ban', (message) => {
        const {member, mentions} = message
        // récupération du user demandant le ban
        const tag = `<@${member.id}>`
        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
            // récupération du user mentionné
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                // ban du user mentionné
                targetMember.ban()
                message.channel.send(`Quel ban merveilleux ${tag}`)
            } else {
                message.channel.send(`${tag} Je peux pas ban si tu ne me dis pas qui je dois ban, hein !!!`)
            }
        } else {
            message.channel.send(`${tag} Tu n'as pas la permission d'utiliser cette commande... Noob !!!`)
        }
    })
    // commande kick
    command(client, 'kick', (message) => {
        const {member, mentions} = message
        // récupération du user demandant le ban
        const tag = `<@${member.id}>`
        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')) {
            // récupération des infos user mentionné
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                // ban du user mentionné
                targetMember.kick()
                message.channel.send(`Quel kick merveilleux ${tag}`)
            } else {
                message.channel.send(`${tag} Je peux pas kick si tu ne me dis pas qui je dois kick, hein !!!`)
            }
        } else {
            message.channel.send(`${tag} Tu n'as pas la permission d'utiliser cette commande... Noob !!!`)
        }
    })
})


// connection du bot sur le serveur
client.login(config.token)
