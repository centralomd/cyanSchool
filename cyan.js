// Packaging
const fs = require('fs');
const Discord = require('discord.js');
//const Enmap = require('enmap');

// Setup Stuffs
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();

// Stuffs

// Setup
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
  const storedBalances = await Users.findAll();
  storedBalances.forEach(b => currency.set(b.user_id, b));

  console.log(`${client.user.username} is online and running! With:\n Username: ${client.user.username}`)
  client.user.setPresence({ activity: { name: `Online Class`, type: "WATCHING" }, status: 'dnd' })
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    if (message.channel.type === 'dm') {
        return message.reply('I can\'t execute commands inside DMs!');
    }


    try {
        command.execute(message, args, client, currency, Discord);
    } catch (error) {
        console.error(error);
        console.log(`Execution of Command (${commandName}) has failed at ${new Date().getTime()} with the error: \n ${error} \n Executed by ${message.author.tag} with ID of ${message.author.id}.`)
    
        const executionfailure = new Discord.MessageEmbed()
          .setColor('#FC352C')
          .setTitle('Error')
          .setDescription('Bug Found.')
          .addFields(
            { name: '\u200b', value: `\u200b` },
            { name: 'Command Ran', value: `${commandName}` },
            { name: 'Error Info', value: `${error}` },
            { name: 'Executed At', value: `${new Date().getTime()}` },
            { name: 'Executer', value: `${message.author.tag}` },
          )
          .setTimestamp()
    
        message.channel.send(executionfailure);
    }
});

client.login(token);