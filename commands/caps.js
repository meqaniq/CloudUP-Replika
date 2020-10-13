const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(nn.setImage('https://media.giphy.com/media/Y41ynggo39awUmeg70/giphy.gif').setTitle(`Bir hata oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`!caps\` **kullanmak için,** \`Yönetici\` **olmanız gerekiyor.**`)).then(a => a.delete({timeout: 10000}));
const sistem = await data.fetch(`caps.${message.guild.id}`);
if(sistem) return message.channel.send(nn.setDescription(`Caps engelleme zaten aktif. Daha neyi açmaya çalışıyorsun? 😑`)).then(a => a.delete({timeout: 10000}));

data.set(`caps.${message.guild.id}`, 'codare');
return message.channel.send(nn.setTitle(`İşte bu kadar!`).setColor('#000001').setDescription(`Caps kısıtlaması başarıyla açıldı.`)).then(a => a.delete({timeout: 10000}));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['caps'],
  permLevel: 0
}

exports.help = {
  name: 'caps'
};