module.exports = {
  name: 'clear',
  async execute(message, args, client) {
    if (client.tasks.size == 0) return message.author.send("<:bad:773900319352291368> No task is available to be cleared.");

    await client.tasks.clear();
    message.author.send(`<:good:773900320740081664> Task has successfully been deleted.`);
  },
};