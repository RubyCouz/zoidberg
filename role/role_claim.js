const roleMessage = require ('../homeMessage/homeMessage')
module.exports = (client) => {
    const channelId = '836583472268050454'
    // récupération des emojis du serveur
    const getEmoji = emojiName =>client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        Ghost_Think: 'Membre',
    }
    // tableau contenant les réactions
    const reactions = []
    // variable texte
    let emojiText  = 'Sélectionnez un rôle en cliquant sur la réaction correspondante : \n\n'
    // parcours de l'objet emojis pour récupérer les réactions
    for(const key in emojis) {
        // récupération des emojis du serveur en fonction de l'index de l'objet emoji
        const emoji = getEmoji(key)
        // envoie de l'emoji dans le tableau contenant les réactions
        reactions.push(emoji)
        // assignation de la valeur correspondant à la clé key de l'objet emoji
        const role = emojis[key]
        // concaténation pour obtenir la liste de role dans le message afficher par le bot
        emojiText += `${emoji} = ${role}\n`
    }
    // message pour assignation de rôle
    roleMessage(client, channelId, emojiText, reactions)

    /**
     *  Ajout / suppression du rôle ua click sur la réaction
     * @param reaction
     * @param user
     * @param add
     */
    const handleReaction = (reaction, user, add) => {
        // si l'id du user est celui du bot => pas d'action, le bot ne doit pas prendre le role
        if(user.id === '836129942239707136') {
            return
        }
        // récupération de l'emoji de la réaction sur laquelle le click à été fait
        const emoji = reaction._emoji.name
        const { guild } = reaction.message
        // récupération de la valeur de l'emoji (nom du role)
        const roleName = emojis[emoji]
        // si la réaction en correspond pas avec ce qui a été définis (ajout d'un emoji par l'utilisateur)
        if(!roleName) {
            return
        }
        // accès au role du serveur qui est égal à roleName (reaction)
        const role = guild.roles.cache.find((role) => role.name === roleName)
        // récupération des infos de l'utilisateur qui a cliqué sur la réaction
        const member = guild.members.cache.find((member) => member.id === user.id)
        // s'il y a add (premier click sur une réaction)
        if(add) {
            // ajout du role au membre
            member.roles.add(role)
        } else {
            // suppression du role si 2e click sur la réaction
            member.roles.remove(role)
        }
    }

    // click sur réaction pour ajout du rôle
    client.on('messageReactionAdd', (reaction, user) => {
        // on check que le click sur la réaction se passe bien dans ce salon
        if(reaction.message.channel.id === channelId) {

            handleReaction(reaction, user, true)
        }
    })

    // click sur la réaction pour enlever le rôle
    client.on('messageReactionRemove', (reaction, user) => {
        // on check que le click sur la réaction se passe bien dans ce salon
        if(reaction.message.channel.id === channelId) {

            handleReaction(reaction, user, false)
        }
    })

}