const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects');
const { Op } = require('sequelize');
const config = require('../config.json');
const PREFIX = config.prefix;

module.exports = {
    name: 'buy',
    description: 'beta',
    cooldown: 20,
    guildOnly: true,
	async execute(message, args, client, currency) {
    	if (!message.content.startsWith(PREFIX)) return;
	    const input = message.content.slice(PREFIX.length).trim();
	    if (!input.length) return;
	    const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
        if (!item) return message.channel.send(`**❌ ERROR**: Item doesn't exist. Make sure the item you're trying to buy is in the \`b!shop\`!`);
        if (item.cost > currency.getBalance(message.author.id)) {
            const notenough = new Discord.MessageEmbed()
            .setColor('#FF8F46')
            .setAuthor(`${message.author.tag}`, message.author.avatarURL())
            .setTitle('❌ **Balance Low**')
            .setDescription('You don\'t have enough ฿r!')
            .addFields(
                { name: '\u200b', value: '\u200b'},
                { name: '**Item**', value: `${item.name}`},
                { name: '**Balance**', value: `฿r${currency.getBalance(message.author.id)}`},
                { name: '**Item Cost**', value: `฿r${item.cost}`},
                { name: '**Required**', value: `฿r${item.cost - currency.getBalance(message.author.id)}`},
            )
            .setFooter('Economy System • From centralomd#7083')
            return message.channel.send(notenough);
        }
        
        const user = await Users.findOne({ where: { user_id: message.author.id } });
        currency.add(message.author.id, -item.cost);
        await user.addItem(item);
        
        const bought = new Discord.MessageEmbed()
        .setColor('#46FFC7')
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .setTitle('✅ **Purchased**')
        .setDescription('Item has been purchased!')
        .addFields(
            { name: '\u200b', value: '\u200b'},
            { name: '**New Balance**', value: `฿r${currency.getBalance(message.author.id)}`},
            { name: '**Item Bought**', value: `${item.name}`},
            { name: '**Item Cost**', value: `฿r${item.cost}`},
        )
        .setFooter('Economy System • From centralomd#7083')
        message.channel.send(bought);
    },
};