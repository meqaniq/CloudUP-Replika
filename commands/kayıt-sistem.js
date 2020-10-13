const Discord = require('discord.js');

exports.run = (client, message, args) => {

message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL({dynamic: true})).setColor('#f583fa')
.setDescription(`${client.user} **Kayıt sistemi:
Tek komut ile kayıt ve isim yapabilirsin.
Rol sıfırlamak yerine yeniden etiketle!**

> 🌸 **!erkek-role [@rolEtiket]**
> 🌸 **!kadın-role [@rolEtiket]**
> 🌸 **!yetkili-role [@rolEtiket]**
> 🌸 **!kayıtsız-role [@rolEtiket]**

!e, !E, !erkek, !Erkek, !man, !Man
**Örnek kullanım:** \`!e @Etiket\` veya \`!e @Etiket BlaBla\`

\`\`\`İsmine sembol koymak için: !kayıt-tag 🚀\`\`\``));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'kayıt-sistem'
};