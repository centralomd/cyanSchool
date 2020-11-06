module.exports = {
  name: 'del',
  async execute(message, args, client) {
    if (!args.length) return message.channel.send("Please state what task to be deleted.");
    if (!client.tasks.has(args[0])) return message.author.send("<:bad:773900319352291368> Task does not exist. Please copy the ID.");

    await client.tasks.delete(args[0]);
    message.author.send(`<:good:773900320740081664> Task has successfully been deleted.`);
  },
};