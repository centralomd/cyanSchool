module.exports = {
  name: 'list',
  async execute(message, args, client) {
    if (client.tasks.size == 0) return message.author.send("<:bad:773900319352291368> No task can be found.");

    const remEm = new Discord.MessageEmbed()
      .setColor(getRandomColor)
      .setAuthor("Reminders")
      .setTitle("Lists of tasks:")
      .setTimestamp()

    await client.tasks.indexes.forEach(task => {
      remEm.addField(`${client.tasks.get(task)}`, `${task}`);
    });

    await message.author.send(remEm);
  },
};