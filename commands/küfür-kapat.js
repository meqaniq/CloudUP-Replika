const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(nn.setImage('https://media.giphy.com/media/Y41ynggo39awUmeg70/giphy.gif').setTitle(`Bir hata oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`!küfür-kapat\` **kullanmak için,** \`Yönetici\` **olmanız gerekiyor.**`)).then(a => a.delete({timeout: 10000}));
const sistem = await data.fetch(`küfür.${message.guild.id}`);
if(!sistem) return message.channel.send(nn.setDescription(`Küfür engelleme zaten aktif değil. Daha neyi kapatmaya çalışıyorsun? 😑`)).then(a => a.delete({timeout: 10000}));

data.delete(`küfür.${message.guild.id}`);
return message.channel.send(nn.setTitle(`İşte bu kadar!`).setColor('#000001').setDescription(`Küfür engelleme sistemi başarıyla kapatıldı.`)).then(a => a.delete({timeout: 10000}));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['küfürkapat'],
  permLevel: 0
}

exports.help = {
  name: 'küfür-kapat'
};