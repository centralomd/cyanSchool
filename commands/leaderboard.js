const Discord = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'beta',
    cooldown: 20,
    guildOnly: true,
	execute(message, args, client, currency) {
        const leadEmbed = new Discord.MessageEmbed()
        .setColor('#46FFC7')
        .setAuthor(`Leaderboard • ${message.guild.name}`, message.guild.iconURL())
        .setTitle('Leaderboard')
        .setDescription(`${
            currency.sort((a, b) => b.balance - a.balance)
            .filter(user => client.users.cache.has(user.user_id))
            .first(7)
            .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)} - ${user.balance}💰`)
            .join('\n')
        }`)
        .setFooter('Economy System • From centralomd#7083')

        return message.channel.send(leadEmbed);
    },
};