const Discord = require("discord.js");
module.exports = {
    commands: ['serverinfo'],
    expectedArgs: '',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 0,
    maxArgs: 0,
    description: 'Informations sur le serveur',
    callback: (client, message, arguments, text) => {
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
    },
    permissions: [],
    requiredRoles : [],
}