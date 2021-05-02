const Discord = require("discord.js");
module.exports = {
    commands: ['invites'],
    expectedArgs: '',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 0,
    maxArgs: 0,
    callback: (client, message, arguments, text) => {
        // récupération de la guild dans l'objet message
const {guild} = message
        // recherche des invitations
        guild.fetchInvites().then((invite) => {
            const inviteCounter = {}
            invite.forEach((invite) => {
                const {uses, inviter} = invite
                // récupération des infos de la personne envoyant les invits
                const {username, discriminator} = inviter
                // formatage du nom d'utilisateur
                const name = `${username}#${discriminator}`
                // calcul du nombre d'invitation par utilisateur
                inviteCounter[name] = (inviteCounter[name] || 0) + uses
            })
            let replyText = ''
            // tri
            const sortedInvites = Object.keys(inviteCounter).sort(
                (a, b) => inviteCounter[b] - inviteCounter[a]
            )
            // compte du nombre d'invitation par utilisateur
            let position = 0 // variable de position du membre
            for (const invite of sortedInvites) {
                const count = inviteCounter[invite]
                // incrémentaion de la position
               position++
                // formatage de la réponse
                replyText += `#${position} : ${invite} a invité ${count} membres\n`
            }
            // création message embed
            const embed = new Discord.MessageEmbed()
                .setTitle('Ladder Board invitations')
                .setThumbnail('https://cdn.wallpapersafari.com/63/23/rcteLA.jpg')
                .setFooter('exemple de footer', 'https://cdn.wallpapersafari.com/63/23/rcteLA.jpg')
                .setColor('#ff0000')
                .addFields(
                    {
                        name: 'Classement',
                        value: `${replyText}`,
                        inline: false
                    },
                )
            // envoie du message
            message.channel.send(embed)
        })
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles : [],
}