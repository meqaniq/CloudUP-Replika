const Discord = require('discord.js')
const data = require('quick.db')
module.exports = async message => {
  
  let client = message.client;
  if(message.author.bot) return;
  const prefixdata = await data.fetch(`codare.${message.guild.id}`)
  if(!prefixdata) {
    
    if(message.content.startsWith(`<@!${client.user.id}>`)) {
    let command = message.content.split(' ')[1].slice(0);
    let params = message.content.split(' ').slice(2);
    let perms = client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      message.mentions.users.delete(client.user.id)
      message.mentions.members.delete(client.user.id)
      cmd.run(client, message, params, perms);
     }
} else {
  let ünlem = '!'
  let soru = '?'
  if(message.content.startsWith('!')) {
    let command = message.content.split(' ')[0].slice(ünlem.length);
    let params = message.content.split(' ').slice(1);
    let perms = client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      cmd.run(client, message, params, perms);
     }
  } else {
    if(message.content.startsWith('?')) {
    let command = message.content.split(' ')[0].slice(soru.length);
    let params = message.content.split(' ').slice(1);
    let perms = client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      cmd.run(client, message, params, perms);
     }
  }
  }
}
    
  } else {

if(message.content.startsWith(`<@!${client.user.id}>`)) {
    let command = message.content.split(' ')[1].slice(0);
    let params = message.content.split(' ').slice(2);
    let perms = client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      message.mentions.users.delete(client.user.id)
      message.mentions.members.delete(client.user.id)
      cmd.run(client, message, params, perms);
     }
} else {
  let prefixx = prefixdata.find(a => a.prefix === message.content.split(' ')[0].slice(1));
  if(message.content.startsWith(prefixx)) {
    let command = message.content.split(' ')[0].slice(prefixx.length);
    let params = message.content.split(' ').slice(1);
    let perms = client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      cmd.run(client, message, params, perms);
     }
}
}
    
  }
};