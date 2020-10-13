const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
  if(message.author.id !== message.guild.owner.user.id) return message.channel.send(nn.setImage('https://i.imgur.com/KKywwBj.png').setTitle(`Bir hata oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`!bot-koruma\` **kullanmak için,** \`Sunucu Sahibi\` **olmanız gerekiyor.**
  
  **Sunucu Sahibi**\n${message.guild.owner.user.tag}`))
  const sistem = await data.fetch(`botkoruma.${message.guild.id}`);
if(!sistem) return message.channel.send(nn.setDescription(`Bot koruma zaten aktif değil. Daha neyi kapatmaya çalışıyorsun? 😑`)).then(a => a.delete({timeout: 10000}));

data.delete(`botkoruma.${message.guild.id}`);
return message.channel.send(nn.setTitle(`İşte bu kadar!`).setColor('#000001').setDescription(`Bot koruma sistem başarıyla kapatıldı.`)).then(a => a.delete({timeout: 10000}));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['botkorumakapat'],
  permLevel: 0
}

exports.help = {
  name: 'bot-koruma-kapat'
};