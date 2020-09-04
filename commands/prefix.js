const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!args[0]) {

  const prefixdata = await data.fetch(`codare.${message.guild.id}`)
  if(prefixdata) {
    
  let i = 2; let checky = "";
  prefixdata.map(async(codare) => checky += `${i++ +1}. ${data.get(`codare.${message.guild.id}`)}`+"\n")
  message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`${i} prefixes`).setDescription(`1. <@!${client.user.id}>\n`+checky))
    
  } else { message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`3 prefixes`).setDescription(`1. <@!${client.user.id}>\n2. ?\n3. !`)) }
  
} else {
  data.push(`codare.${message.guild.id}`, {prefix: args[1]})
  message.channel.send('tamam')
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