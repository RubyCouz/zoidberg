const loadCommands = require('../load_commands')
const {prefix} = require('../../config.json')
module.exports = {
    commands: ['help'],
    description: 'Listes des commandes du bot',
    callback: (client, message, arguments, text) => {
        let reply = 'Zoidberg pour vous servir, voici mes commandes : \n\n'

        const commands = loadCommands()
        for (const command of commands) {
            // récupération des permissions
            let permissions = command.permission
            // vérification des permissions
            if (permissions) {
                let hasPermission = true
                // check du type de la permission (string / array)
                if (typeof permissions === 'string') {
                    // si c'est une chaine de caractères, conversion en tableau
                    permissions = [permissions]
                }

                for (const permission of permissions) {
                    // si la personne qui fait la commande n'as pas la permission
                    if (!message.member.hasPermission(permission)) {
                        hasPermission = false;
                        break
                    }
                }
                if (!hasPermission) {
                    continue
                }
            }
            const mainCommand =
            // si la commande est un string
                typeof command.commands === 'string'
                    // on utilse la chaine de caractère
                ? command.commands
                    // sinon le tableau
                : command.commands[0]
            const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
            const {description} = command

            reply += `**${mainCommand}${args}** = ${description}\n`
        }
        message.channel.send(reply)
    },
    permissions: [],
    requiredRoles: [],
}