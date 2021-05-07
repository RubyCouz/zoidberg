module.exports = {
    commands: ['add'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'Vous n\'avez pas la permission nécessaire pour exécuter cette commande.',
    minArgs: 2,
    maxArgs:2,
    description: 'test',
    callback: (message, arguments, text) => {

    },
    permissions: [],
    requiredRoles : [],
}