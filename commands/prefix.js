const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!args[0]) {

  const prefixdata = await data.fetch(`codare3.${message.guild.id}`)
  if(prefixdata) {
    
  let i = 0; let checky = "";
  prefixdata.map(async(codare) => checky += `${i++ +1}. ${data.get(`codare3.${message.guild.id}`)[i-1].prefix}\n`)
  message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`${i} prefixes`).setDescription(checky))
    
  } else { message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`2 prefixes`).setDescription('1. !\n2. ?')) }
 
} else {
  if(args[0] === 'set') {
  client.commands.forEach(async p => { await data.push(`codare3.${message.guild.id}`, {prefix2: `${args[1]}${p.help.name} ${args[1]}`}) })
    
  data.push(`codare3.${message.guild.id}`, {prefix: args[1]})
  message.channel.send('tamam') } else { 
  if(args[0] === 'delete') {
  client.commands.forEach(async p => { await data.delete(`codare3.${message.guild.id}`, {prefix2: `${args[1]}${p.help.name} ${args[1]}`}) })
    
  data.delete(`codare3.${message.guild.id}`, {prefix: args[1]})
  message.channel.send('ok')
  }
  }
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'prefix'
};