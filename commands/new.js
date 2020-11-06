const random = require('random')

module.exports = {
    name: 'new',
    async execute(message, args, client) {
        if (!args.length) return message.author.send("Please state what task do you want to be reminded of.");

        var ntn = client.tasks.autonum;

        client.tasks.set(ntn, `${args.join(" ")}`);
        message.author.send(`<:good:773900320740081664> New Task has been added. (ID: ${ntn})`);
    },
};