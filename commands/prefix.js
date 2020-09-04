const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!args[0]) {

  const prefixdata = await data.fetch(`codaree.${message.guild.id}`)
  if(prefixdata) {
    
  let i = 0; let checky = "";
  prefixdata.map(async(codare) => checky += `${i++ +1}. ${data.get(`codaree.${message.guild.id}`)[i-1].prefix}\n`)
  message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`${i} prefixes`).setDescription(checky))
    
  } else { message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`2 prefixes`).setDescription('1. !\n2. ?')) }
 
} else {
  if(args[0] === 'set') {
  client.commands.forEach(p => { data.push(`codaree.${message.guild.id}`, {prefix2: `${args[1]}$[p.help.name}`}) })
    
  data.push(`codare.${message.guild.id}`, {prefix: args[1]})
  message.channel.send('tamam') } else { 
  if(args[0] === 'delete') {
  data.delete(`codare.${message.guild.id}`, {prefix: args[1]})
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