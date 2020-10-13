const Discord = require('discord.js');

exports.run = (client, message, args) => {
message.channel.send(new Discord.MessageEmbed().setFooter(`${message.author.username} içerikler yavaş yavaş koyuluyor.`).setThumbnail(message.author.avatarURL({dynamic: true})).setColor('#f583fa').setDescription(`☀️ \`!kayıt-sistem\`

🌕 \`!korumalar\``));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['help', 'y'],
  permLevel: 0
}

exports.help = {
  name: 'yardım'
};