const Discord = require('discord.js');
const fs = require('fs');
const { Users, CurrencyShop } = require('../dbObjects');
const { Op } = require('sequelize');
const config = JSON.parse(fs.readFileSync('./config.json', "utf8"));
const PREFIX = config.prefix;

module.exports = {
    name: 'transfer',
    description: 'beta',
    cooldown: 20,
    guildOnly: true,
	execute(message, args, client, currency) {
        if (!message.content.startsWith(PREFIX)) return;
	      const input = message.content.slice(PREFIX.length).trim();
	      if (!input.length) return;

        const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

        if (!args.length) return message.channel.send("❌ **ERROR**: No user/amount of bread tokens to transfer.")
        const currentAmount = currency.getBalance(message.author.id);
        const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
        const transferTarget = message.mentions.users.first();
        
        if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`❌ **ERROR**: Invalid amount of bread tokens given.`);
        const notenough = new Discord.MessageEmbed()
        .setColor('#FF8F46')
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .setTitle('❌ **Balance Low**')
        .setDescription('You don\'t have enough ฿r!')
        .addFields(
            { name: '\u200b', value: '\u200b'},
            { name: '**Balance**', value: `฿r${currency.getBalance(message.author.id)}`},
            { name: '**Transfer Amount**', value: `฿r${transferAmount}`},
        )
        .setFooter('Economy System • From centralomd#7083')
        if (transferAmount > currentAmount) return message.channel.send(notenough);
        if (transferAmount <= 0) return message.channel.send(`❌ **ERROR**:Please enter an amount greater than zero, ${message.author}.`);
        
        currency.add(message.author.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);
        
        const transferred = new Discord.MessageEmbed()
        .setColor('#46FFC7')
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .setTitle('✅ **Transferred**')
        .setDescription('bread tokens has successfully been transferred.')
        .addFields(
            { name: '\u200b', value: '\u200b'},
            { name: '**New Balance**', value: `฿r${currency.getBalance(message.author.id)}`},
            { name: '**Transferred Amount**', value: `${transferAmount}`},
            { name: '**Transfer to**', value: `฿r${transferTarget.tag}`},
        )
        .setFooter('Economy System • From centralomd#7083')
        return message.channel.send(transferred);
    },
};