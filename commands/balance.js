const Discord = require('discord.js');

module.exports = {
    name: 'balance',
    description: 'beta',
    cooldown: 20,
    aliases: ['bal', 'bl', 'blc', 'bnc', 'money', 'bank', 'cash'],
    guildOnly: true,
	execute(message, args, client, currency) {
        const target = message.mentions.users.first() || message.author;

        const balanceEmbed = new Discord.MessageEmbed()
            .setColor('#46FFC7')
            .setAuthor(`${target.tag}`, target.avatarURL())
            .setTitle('Stats')
            .addFields(
                { name: '\u200b', value: '\u200b'},
                { name: '**Balance**', value: `฿r${currency.getBalance(target.id)}`},
                { name: '**User**', value: `${target.tag}`},
                { name: '**Guild**', value: `${message.guild.name}`},
            )
            .setFooter('Economy System • From centralomd#7083')

        return message.channel.send(balanceEmbed);
    },
};