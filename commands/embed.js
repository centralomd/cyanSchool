const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'beta',
    cooldown: 1,
    guildOnly: true,
	async execute(message, args, client) {
    var author;
    var authorpic;
    var title;
    var url;
    var image;
    var thumb;
    var color;
    var desc;
    var footer;
    var timestamp;
    var channel;
    
    const getRandomColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

    const askAuth = new Discord.MessageEmbed()
    .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 1: Author')
      .setDescription(`Alright, ${message.author}. What do you want the embed author be?`)
      .setColor(getRandomColor)
      .setFooter(`Started by ${message.author.tag} • Type \`cancel\` to stop the generator.`, message.author.avatarURL())

      const askAuthPic = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 2: Author Image')
      .setDescription(`Alright, how about the author image?`)
      .setColor(getRandomColor)
      .setFooter(`Started by ${message.author.tag} • Type \`cancel\` to stop the generator.`, message.author.avatarURL())

      const askTitle = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 3: Title')
      .setDescription(`What do you want the embed title be?`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator.`, message.author.avatarURL())

      const askDesc = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 4: Description')
      .setDescription(`Tip: The Description is more like the explanation.`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator, or \`null\` to make part of embed empty.`, message.author.avatarURL())

      const askURL = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 5: URL')
      .setDescription(`What would be the URL of the embed? Note: The URL is where the user will be redirected when they click the title of the embed.`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator.`, message.author.avatarURL())

      const askImg = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 6: Image')
      .setDescription(`What would be the image for the embed? Please put the image in URL.`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator, or \`null\` to make part of embed empty.`, message.author.avatarURL())

      const askThumb = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 7: Thumbnail')
      .setDescription(`Please put the thumbnail in URL form.`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator, or \`null\` to make part of embed empty.`, message.author.avatarURL())

      const askColor = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 8: Color')
      .setDescription(`Use the default color names, or use # (HTML HEX).`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator, or \`null\` to make part of embed empty.`, message.author.avatarURL())

      const askFooter = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 9: Footer')
      .setDescription(`Tip: The Footer is the small, grey-ed text on the bottom of the embed.`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator, or \`null\` to make part of embed empty.`, message.author.avatarURL())

      const askTime = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 10: Timestamp')
      .setDescription(`Do you want to input a timestamp (Today at 0:00, Yesterday at 0:00) to your embed? \`YES/NO\``)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator, or \`null\` to make part of embed empty.`, message.author.avatarURL())

      const askChannel = new Discord.MessageEmbed()
      .setAuthor(`Embed Creator • Started by ${message.author.tag}`)
      .setTitle('<a:loading:758159813523275777> Step 11: Channel')
      .setDescription(`Please put the name of the channel to where the embed will be sent.`)
      .setColor(getRandomColor)
      .setFooter(`Type \`cancel\` to stop the generator.`, message.author.avatarURL())

      const filter = response => response.author.id === message.author.id;
// AUTHOR
    await message.channel.send(askAuth).then(m => {
      const wait1 = message.channel.createMessageCollector(filter, { time: 60000 })

      wait1.on('collect', c => {
        if (c.content.toLowerCase() === 'null') return author = null;
        if (c.content.toLowerCase() === 'cancel') {
          m.delete();
          return wait1.stop();
        };
        author = c.content;
        c.delete();
        wait1.stop();
      })

      wait1.on('end', () => {
// AUTH IMG
        m.edit(askAuthPic).then(m => {
          const wait2 = message.channel.createMessageCollector(filter, { time: 60000 })

          wait2.on('collect', c => {
            if (c.content.toLowerCase() === 'null') return authorpic = null
            //if (!c.content.toLowerCase().startsWith("http://") || !c.toLowerCase().startsWith("https://")) return message.channel.send("Please input a link.");
            if (c.content.toLowerCase() === 'cancel') {
              m.delete();
              return wait2.stop();
            };
            authorpic = c.content;
            c.delete();
            wait2.stop();
          })
    
          wait2.on('end', () => {
// TITLE
            m.edit(askTitle).then(m => {
              const wait3 = message.channel.createMessageCollector(filter, { time: 60000 })

              wait3.on('collect', c => {
                if (c.content.toLowerCase() === 'cancel') {
                  m.delete();
                  return wait3.stop();
                };
                title = c.content;
                c.delete();
                wait3.stop();
              })
        
              wait3.on('end', () => {
// URL
                m.edit(askDesc).then(m => {
                  const wait4 = message.channel.createMessageCollector(filter, { time: 480000 })

                  wait4.on('collect', c => {
                    if (c.content.toLowerCase() === 'null') return desc = null;
                    if (c.content.toLowerCase() === 'cancel') {
                      m.delete();
                      return wait4.stop();
                    };
                    desc = c.content;
                    c.delete();
                    wait4.stop();
                  })
            
                  wait4.on('end', () => {
        // TITLE
                    m.edit(askURL).then(m => {
                      const wait5 = message.channel.createMessageCollector(filter, { time: 60000 })

                      wait5.on('collect', c => {
                        if (c.content.toLowerCase() === 'null') return url = null;
                        if (c.content.toLowerCase() === 'cancel') {
                          m.delete();
                          return wait5.stop();
                        };
                        url = c.content;
                        c.delete();
                        wait5.stop();
                      })
                
                      wait5.on('end', () => {
            // TITLE
                        m.edit(askImg).then(m => {
                          const wait6 = message.channel.createMessageCollector(filter, { time: 60000 })

                          wait6.on('collect', c => {
                            if (c.content.toLowerCase() === 'null') return image = null;
                            if (c.content.toLowerCase() === 'cancel') {
                              m.delete();
                              return wait6.stop();
                            };
                            image = c.content;
                            c.delete();
                            wait6.stop();
                          })
                    
                          wait6.on('end', () => {
                // TITLE
                            m.edit(askThumb).then(m => {
                              const wait7 = message.channel.createMessageCollector(filter, { time: 60000 })

                              wait7.on('collect', c => {
                                if (c.content.toLowerCase() === 'null') return thumb = null;
                                if (c.content.toLowerCase() === 'cancel') {
                                  m.delete();
                                  return wait7.stop();
                                };
                                thumb = c.content;
                                c.delete();
                                wait7.stop();
                              })
                        
                              wait7.on('end', () => {
                    // TITLE
                                m.edit(askColor).then(m => {
                                  const wait8 = message.channel.createMessageCollector(filter, { time: 60000 })

                                  wait8.on('collect', c => {
                                    if (c.content.toLowerCase() === 'null') return color = null;
                                    if (!c.content.toLowerCase().startsWith("#")) {
                                      if (!c.content === 'black' || !c.content === 'green' || !c.content === 'blue' || !c.content === 'pink' || !c.content === 'magenta' || !c.content === 'lime' || !c.content === 'cyan' || !c.content === 'red' || !c.content === 'orange' || !c.content === 'yellow' || !c.content === 'purple') return message.channel.send('Color does not exist!');
                                    
                                      switch(c.content) {
                                        case 'black':
                                          color = "#000000";
                                          break;
                                        case 'green':
                                          color = "#17F021";
                                        break;
                                        case 'blue':
                                          color = "#174FF0";
                                        break;
                                        case 'pink':
                                          color = "#ED17D3";
                                        break;
                                        case 'magenta':
                                          color = "#BC17ED";
                                        break;
                                        case 'lime':
                                          color = "#17ED7F";
                                        break;
                                        case 'cyan':
                                          color = "#17EDD6";
                                        break;
                                        case 'red':
                                          color = "#F91D1D";
                                        break;
                                        case 'orange':
                                          color = "#F9771D";
                                        break;
                                        case 'yellow':
                                          color = "#F9D41D";
                                        break;
                                        case 'purple':
                                          color = "#B91DF9";
                                        break;
                                        default:
                                          color = "#000000";
                                      }
                                    }
                                    if (c.content.toLowerCase() === 'cancel') {
                                      m.delete();
                                      return wait8.stop();
                                    };
                                    color = c.content;
                                    c.delete();
                                    wait8.stop();
                                  })
                            
                                  wait8.on('end', () => {
                        // TITLE
                                    m.edit(askFooter).then(m => {
                                      const wait9 = message.channel.createMessageCollector(filter, { time: 60000 })

                                      wait9.on('collect', c => {
                                        if (c.content.toLowerCase() === 'null') return footer = null;
                                        if (c.content.toLowerCase() === 'cancel') {
                                          m.delete();
                                          return wait9.stop();
                                        };
                                        footer = c.content;
                                        c.delete();
                                        wait9.stop();
                                      })
                                
                                      wait9.on('end', () => {
                            // TITLE
                                        m.edit(askTime).then(m => {
                                          const wait10 = message.channel.createMessageCollector(filter, { time: 60000 })

                                          wait10.on('collect', c => {
                                            if (c.content.toLowerCase() === 'cancel') {
                                              m.delete();
                                              return wait10.stop();
                                            };

                                            if (c.content.toLowerCase().startsWith('yes') || c.content.toLowerCase().startsWith('y')) timestamp = true
                                            else if (c.content.toLowerCase().startsWith('no') || c.content.toLowerCase().startsWith('n')) timestamp = false
                                            else message.channel.send('Invalid Argument. Answer in Yes/Y or No/N.');
                                            c.delete();
                                            wait10.stop();
                                          })
                                    
                                          wait10.on('end', () => {
                                // TITLE
                                            m.edit(askChannel).then(m => {
                                              const wait11 = message.channel.createMessageCollector(filter, { time: 60000 })

                                              wait11.on('collect', c => {
                                                if (c.content.toLowerCase() === 'cancel') {
                                                  m.delete();
                                                  return wait11.stop();
                                                };
                                                channel = c.content;
                                                c.delete();
                                                wait11.stop();
                                              })
                                        
                                              wait11.on('end', () => {
                                                const channelIs = message.guild.channels.cache.find(c => c.name === channel);
                                                const theEpicEmbed = new Discord.MessageEmbed();

                                                if (!channelIs) {
                                                  message.channel.send('Channel Invalid. You have one more attempt to type the name of a valid channel.').then(m => {
                                                    const channelReattempt = message.channel.createMessageCollector(filter, { time: 60000 })

                                                    channelReattempt.on('collect', c => {
                                                      if (c.content.toLowerCase() === 'cancel') {
                                                        m.delete();
                                                        return channelReattempt.stop();
                                                      };
                                                      channel = c.content;
                                                      c.delete();
                                                      channelReattempt.stop();
                                                    })

                                                    channelReattempt.on('end', async () => {
                                                      const channelIS2 = await message.guild.channels.cache.find(c => c.name === channel);
                                                      if (!channelIS2) return message.channel.send('Channel Invalid. Try doing the command again, but this time **MENTION** a valid channel.');
                                                      embedCreator();
                                                      channelIS2.send(theEpicEmbed)
                                                    })
                                                  })
                                                }

                                                async function embedCreator() {
                                                  if (author !== null && authorpic !== null) await theEpicEmbed.setAuthor(author, authorpic);
                                                  if (author !== null && authorpic === null) await theEpicEmbed.setAuthor(author);
                                                  await theEpicEmbed.setTitle(title);
                                                  if (url !== null) await theEpicEmbed.setURL(url);
                                                  if (image !== null) await theEpicEmbed.setImage(image)
                                                  if (thumb !== null) await theEpicEmbed.setThumbnail(thumb);
                                                  await theEpicEmbed.setColor(color);
                                                  if (desc !== null) await theEpicEmbed.setDescription(desc);
                                                  if (footer !== null) await theEpicEmbed.setFooter(footer);
                                                  if (timestamp === true) await theEpicEmbed.setTimestamp();
                                                };

                                                embedCreator();
                                                channelIs.send(theEpicEmbed);
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
    },
};