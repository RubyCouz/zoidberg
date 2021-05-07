const channels = ['840313271244161085']
module.exports = (client) => {
    client.on('message', message => {
        const {content} = message
        // séparation de chaque ligne du message et stockage dans un tableau
        const eachLine = content.split('\n')

        for(const line of eachLine) {
            if(line.includes('=')) {
                const split = line.split('=')
                const emoji = split[0].trim()
                message.react(emoji)
            }
        }
    })
}