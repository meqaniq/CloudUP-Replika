const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!args[0]) {

  const prefixdata = await data.fetch(`codare32.${message.guild.id}`)
  if(prefixdata) {
    
  let i = 0; let checky = "";
  prefixdata.map(async(codare) => checky += `${i++ +1}. ${data.get(`codare32.${message.guild.id}`)[i-1].prefix2.split(' ')[1]}\n`)
  message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`${i} prefixes`).setDescription(checky))
    
  } else { message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`2 prefixes`).setDescription('1. !\n2. ?')) }
 
} else {
  if(args[0] === 'set') {
  client.commands.forEach(async p => { await data.push(`codare32.${message.guild.id}`, {prefix2: `${args[1]}${p.help.name} ${args[1]}`}) })
    
  message.channel.send('tamam') } else if(args[0] === 'delete') {
  if(args[1]) {
    
  let komut = args[1]
  
  let komutlar = data.fetch(`codare32.${message.guild.id}`);
  if(komutlar.length === 2) {
  data.delete(`codare32.${message.guild.id}`)
  message.channel.send(`Tag "${komut}" successfully deleted.`)
  } else {
  let ex = [];
  komutlar.forEach(db => {
  if(db.prefix2.split(' ')[1] === komut) return;
  ex.push(db)
  data.set(`codare32.${message.guild.id}`, ex)
  })
  }
  message.channel.send(`Tag "${komut}" successfully deleted.`)
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