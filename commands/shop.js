const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects');

module.exports = {
    name: 'shop',
    description: 'beta',
    cooldown: 20,
    guildOnly: true,
	async execute(message, args, client) {
        const items = await CurrencyShop.findAll();
        const shopEmbed = new Discord.MessageEmbed()
            .setColor('#FB6DFF')
            .setAuthor('Shop')
            .setDescription(`${items.map(item => `${item.name} (**฿r${item.cost}**)`).join('\n')}`)
            .setFooter('Economy System • From centralomd#7083')
        return message.channel.send(shopEmbed);
    },
};