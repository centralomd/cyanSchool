// Packaging
const fs = require('fs');
const Discord = require('discord.js');
const Enmap = require('enmap');

// Setup Stuffs
const client = new Discord.Client();
const prefix = "s?"

client.tasks = new Enmap({
  name: "tasks",
  fetchAll: true
});

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

client.once('ready', async () => {
  console.log(`${client.user.username} is online and running! With:\n Username: ${client.user.username}`)
  client.user.setPresence({ activity: { name: `Online Class`, type: "WATCHING" }, status: 'dnd' })

  if (client.tasks.isReady) {
    console.log("=========================");
    console.log(client.tasks.size + " tasks loaded!");
    console.log("=========================");
    setInterval(async () => {
      if (client.tasks.size != 0) {
        const remEm = new Discord.MessageEmbed()
          .setColor("#31EDC2")
          .setAuthor("Reminders")
          .setTitle("You have unfinished tasks.")
          .setDescription("Please finish these tasks below:")
          .setTimestamp()

        await client.tasks.indexes.forEach(task => {
          remEm.addField(`${client.tasks.get(task)}`, `${task}`);
        });

        const mu = await client.users.fetch("345813220612898818");
        mu.send(remEm);
      };
    }, 600000);
  };
});

client.on('message', async message => {
  if (message.author.id != "345813220612898818") return;
  if (message.channel.type != 'dm') return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

  if (!command) return;

  try {
    command.execute(message, args, client);
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

    message.author.send(executionfailure);
  }
});

client.login(process.env.DISCORD_TOKEN);