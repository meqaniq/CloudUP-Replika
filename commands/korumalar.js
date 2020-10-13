const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {


message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL({dynamic: true})).setFooter(`${client.user.username} seni takip ediyor.`).setDescription(`**⭐ \`!koruma\` && \`!koruma-kapat\`
6 adet sistemi sunucunuz için aktif edersin.

🛡️ \`!bot-koruma\` & \`!bot-koruma-kapat\`
Sunucunuza giren botlara yasak koyar.

__Diğer korumalar;__
\`!küfür\` & \`!küfür-kapat\`
\`!reklam\` & \`!reklam-kapat\`
\`!caps\` & \`!caps-kapat\`
\`!spam\` & \`!spam-kapat\`

**`));


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'korumalar'
};