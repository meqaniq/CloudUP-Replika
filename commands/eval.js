const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let codein = args.slice(0).join(' ')
  if(!codein.toLowerCase().includes('token')) {
  try {
      let code = eval(codein)
      if (codein.length < 1) return message.channel.send(`:x: Bir kod girmelisin.`)
      if (typeof code !== 'string')    
        code = require('util').inspect(code, { depth: 0 });
      
      const embed = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.setFooter(`Twitter`, 'https://cdn.discordapp.com/attachments/710064900604428349/710898525730504744/dbcgcza-8b6c4fd1-ad02-49a7-822d-88dcf1d61262.png')
.setTimestamp()
.setColor(client.ayarlar.renk)
      .addField('Kod', `\`\`\`js\n${codein.length > 1024 ? "Karakter aşımı!" : codein}\`\`\``)
      .addField('Sonuç', `\`\`\`js\n${code.length > 1024 ? "Karakter aşımı!" : code}\n\`\`\``)
      message.channel.send(embed).then(embed => embed.react("✅"))
  } catch(e) {
    let embed2 = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.setFooter(`Twitter`, 'https://cdn.discordapp.com/attachments/710064900604428349/710898525730504744/dbcgcza-8b6c4fd1-ad02-49a7-822d-88dcf1d61262.png')
.setTimestamp()
.setColor('red')
    .addField('Kod', `\`\`\`js\n${codein.length > 1024 ? "Karakter aşımı!" : codein}\`\`\``)
    .addField('Hata', `\`\`\`js\n${e.length > 1024 ? "Karakter aşımı!" : e}\`\`\``)
    message.channel.send(embed2);
  }
  } else {
    message.reply('Fazla zekisin herhalde xD?')
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["e"],
    permLevel: 4
  };
  
  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'eval <kod>',
    kategori: 'sahip'
  };