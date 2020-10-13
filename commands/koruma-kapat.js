const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(nn.setImage('https://media.giphy.com/media/Y41ynggo39awUmeg70/giphy.gif').setTitle(`Bir hata oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`!koruma-kapat\` **kullanmak için,** \`Yönetici\` **olmanız gerekiyor.**`)).then(a => a.delete({timeout: 10000}));
if(message.author.id !== message.guild.owner.id) return message.channel.send(nn.setImage('https://i.imgur.com/KKywwBj.png').setTitle(`Bir hata oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`!koruma\` **kullanmak için,** \`Sunucu Sahibi\` **olmanız gerekiyor.

Sunucu Sahibi**
${message.guild.owner.user.tag}`))

const sistem = await data.fetch(`korumalar.${message.guild.id}`);
if(!sistem) return message.channel.send(nn.setDescription(`Koruma zaten aktif değil. Daha neyi kapatmaya çalışıyorsun? 😑`)).then(a => a.delete({timeout: 10000}));

data.delete(`korumalar.${message.guild.id}`, 'codare');
return message.channel.send(nn.setTitle(`İşte bu kadar!`).setColor('#000001').setDescription(`Koruma sistem başarıyla kapatıldı.

**__Kapatılan korumalar__**:
\`\`\`• Rol silme koruma,
• Rol yöneticilik koruma,
• Sağ tık yasaklama koruma,
• Kanal koruma & Kanal Geri Açma,
• Emoji koruma,
• Bot Koruma\`\`\``)).then(a => a.delete({timeout: 10000}));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['korumakapat'],
  permLevel: 0
}

exports.help = {
  name: 'koruma-kapat'
};