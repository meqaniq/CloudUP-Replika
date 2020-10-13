const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {

const kadınroleID = await data.fetch(`kadın.${message.guild.id}`);
const yetkiliroleID = await data.fetch(`yetkili.${message.guild.id}`);
const kayıtsızroleID = await data.fetch(`kayıtsız.${message.guild.id}`);

const nn = new Discord.MessageEmbed().setThumbnail();
if(!args[0] || !message.mentions.members.first()) return message.channel.send(nn.setTitle('Bir hata oldu!').setColor('#000001').setDescription(`Kullanıcı Etiketleyerek dener misin?

**Örnek:**
\`\`\`!kadın @kullanıcı
!kadın @kullanıcı Blabla 123\`\`\``)).then(a => a.delete({timeout: 10000}));


let member = message.mentions.members.first();
let kadın = message.guild.roles.cache.get(kadınroleID);
let yetkili = message.guild.roles.cache.get(yetkiliroleID);
let kayıtsız = message.guild.roles.cache.get(kayıtsızroleID);
if(!kadın||!kayıtsız||!yetkili) return;
let isim;
if(args[1]) {
isim = args.slice(1).join(' ');
} else {
isim = member.user.username;
}

if(!message.member.roles.cache.has(yetkiliroleID)) return message.channel.send(nn.setDescription(`${yetkili} | Rolüne sahip olman gerekiyor.`));
if(!member.roles.cache.has(kayıtsızroleID)) return message.channel.send(nn.setColor('#000001').setDescription(`${kayıtsız} | Bu Rol kayıt edilecek üyenin üzerinde bulunması gerekiyor.`));;
const n = await data.fetch(`tag.${message.guild.id}`);

member.roles.add(kadın.id);
member.roles.remove(kayıtsız.id);
if(isim && nn) member.setNickname(n+isim); 
if(isim && !nn) member.setNickname(isim);
if(!isim && nn) member.setNickname(nn+member.user.username);

message.channel.send(nn.setThumbnail(member.user.avatarURL({dynamic: true})).setColor('#f583fa').setTitle(`İşte bu kadar! [ Kayıt Başarılı. ]`)
.setDescription(`${member} **Kullanıcısına ${kadın} rolü verildi.**

${message.author}
\`\`\`${isim} isim olarak kayıt edildi! \`\`\`
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['k', 'K', 'Kadın', 'women', 'Women'],
  permLevel: 0
}

exports.help = {
  name: 'kadın'
};