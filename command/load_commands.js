const path = require('path')
const fs = require('fs')

module.exports = (client) => {
    const baseFile = 'command-base.js'
    const commandBase = require(`./${baseFile}`)

    const commands = []
    const readCommands = (dir) => {
        //lecture du contenu du dossier command, récupération sous forme de tableau
        const files = fs.readdirSync(path.join(__dirname, dir))
        // parcour du tableau
        for (const file of files) {
            // récupération des infos des fichiers / dossiers
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            // si l'élément est un dossier
            if (stat.isDirectory()) {
                // appel de la fonction readcommand avec en paramêtre le dossier
                readCommands(path.join(dir, file))
                // sinon si l'élément est diffé de command-base et load_commands
            } else if (file !== baseFile && file !== 'load_commands.js') {
                // récupération des fichiers contenu dans command
                const option = require(path.join(__dirname, dir, file))
                // envoie des commands dans le tableau option
                commands.push(option)
                if (client) {
                    // appel de commandBase
                    commandBase(client, option)
                }
            }
        }
    }
    // lecture des commandes dans le dossier command
    readCommands('.')
    return commands
}
