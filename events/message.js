const Discord = require('discord.js');
const data = require('quick.db');

module.exports = async message => {
  
  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  let prefix = client.ayarlar.prefix;
  if (message.content.startsWith(prefix)) {
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if(cmd) {
  const süre = await data.fetch(`nbr.${message.author.id}.${cmd.help.name}.${message.guild.id}`);
  if(süre) return;
  data.set(`nbr.${message.author.id}.${cmd.help.name}.${message.guild.id}`, 'ok');
  setTimeout(() => {
  data.delete(`nbr.${message.author.id}.${cmd.help.name}.${message.guild.id}`);
  }, 4000)
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  }

};
