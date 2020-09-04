const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!args[0]) {

  const prefixdata = await data.fetch(`codare3223.${message.guild.id}`)
  if(prefixdata) {
  const nbr = await data.fetch(`cod2.${message.guild.id}`)
  if(nbr) {
  let i = 2; let checky = "";
  nbr.map(async(codare) => checky += `${i++ +1-2}. ${data.get(`cod2.${message.guild.id}`)[i-1].annen}\n`)
  message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(` ${checky.lenght} Prefixes`).setDescription(checky))
  }
  } else { message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Prefixes').setFooter(`2 prefixes`).setDescription('1. !\n2. ?')) }
 
} else {
  if(args[0] === 'set') {
  client.commands.forEach(async p => { await data.push(`codare3223.${message.guild.id}`, {prefix2: `${args[1]}${p.help.name} ${args[1]}`}) })
  data.push(`cod2.${message.guild.id}`, {annen: args[1]})
  message.channel.send('tamam') } else if(args[0] === 'delete') {
  if(args[1]) {
    
  let komut = args[1]
  
  let komutlar = data.fetch(`codare3223.${message.guild.id}`);
    
  if(komutlar) {
  if(!komutlar.find(c => c.prefix2.split(' ')[1] === komut)) return message.channel.send('I do not have this prefix registered.')
  if(komutlar.length == 2) {
  data.delete(`codare3223.${message.guild.id}`)
  message.channel.send(`Tag "${komut}" successfully deleted.`)
  } else {
  let ex = [];
  komutlar.forEach(db => {
  if(db.prefix2.split(' ')[1] === komut) return;
  ex.push(db)
  data.set(`codare3223.${message.guild.id}`, ex)
  })
  } }
    
  let annen = data.fetch(`cod2.${message.guild.id}`);
    
  if(annen) {
  if(annen.length == 2) {
  data.delete(`annen.${message.guild.id}`)
  message.channel.send(`Tag "${komut}" successfully deleted.`)
  } else {
  let ex = [];
  komutlar.forEach(db => {
  if(db.annen === komut) return;
  ex.push(db)
  data.set(`cod2.${message.guild.id}`, ex)
  })
  }
  } }
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