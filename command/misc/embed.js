const Discord = require("discord.js");
module.exports = {
    commands: ['embed'],
    expectedArgs: '',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 0,
    maxArgs: 0,
    description: 'Affichage d\'un message "amélioré"',
    callback: (client, message, arguments, text) => {
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
    },
    permissions: [],
    requiredRoles : [],
}