const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects');

module.exports = {
    name: 'inventory',
    description: 'beta',
    cooldown: 20,
    guildOnly: true,
	async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        const inventory = new Discord.MessageEmbed()
            .setColor('#46FFC7')
            .setAuthor(`${target.tag}`, target.avatarURL())
            .setTitle('Inventory')
            .setDescription(`${items.map(i => `${i.item.name} (\`${i.amount}\`)`).join('\n')}`)

        if (!items.length) return message.channel.send(`${target.tag} has nothing on their inventory.`);
        return message.channel.send(inventory);
        },
};