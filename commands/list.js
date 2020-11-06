const Discord = require('discord.js');

module.exports = {
  name: 'list',
  async execute(message, args, client) {
    if (client.tasks.size == 0) return message.author.send("No task can be found.");
    const getRandomColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

    const remEm = new Discord.MessageEmbed()
      .setColor(getRandomColor)
      .setAuthor("Reminders", client.user.avatarURL())
      .setTitle("Lists of tasks:")
      .setTimestamp()

    await client.tasks.indexes.forEach(task => {
      remEm.addField(`ID: ${task}`, `${client.tasks.get(task)}`);
    });

    await message.author.send(remEm);
  },
};