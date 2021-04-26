// import du prefix
const {prefix} = require('../config.json')
module.exports = (client, aliases, callback) => {
    // si l'alias est une chaine de caratère
    if (typeof aliases === 'string') {
        // stockage de l'alias dans un tableau
        aliases = [aliases]
    }
    // quand une commande est tapée
    client.on('message', message => {

            const {content} = message
        // parcours du tableau
            aliases.forEach(alias => {
                const command = `${prefix}${alias}`
                // si le message commence par la commande ou est égale à la commande
                if (content.startsWith(`${command} `) || content === command) {
                    console.log(`Running the command ${command}`)
                    // fonction de rappel
                    callback(message)
                }
            })
        }
    )
}