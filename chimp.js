const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader")(client);

client.ayarlar = { 
"token": "", // token
"prefix": "!", // prefix
"sahip": "",// sahip
}


/*

Bu altyapı Can°B#1308(Gökhan Can Bulut) tarafından discord.gg/codare için yapılmıştır.
Bot MIT license(lisansı silmek yasa dışıdır)'i ile paylaşılmıştır. Herhangi bir izinsiz paylaşma durumunda haklarımız devreye girmektedir.
İstediğiniz gibi kullanabilirsiniz. Herhangi bir komut yaptırmak isteyen kullanıcılar http://chimp.wtf sitesini ziyaret edebilir.
Altyapı "CloudUP+" isimli Discord botundan örnek alınarak yapılmıştır.

MIT License

Copyright (c) 2020 chimp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`Yüklenen komut: ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

client.login(client.ayarlar.token);
const data = require('quick.db');
const moment = require('moment');
moment.locale('tr');
const logs = require('discord-logs');
logs(client);


client.on('ready', async () => {
client.user.setStatus('online');
console.log(`${client.user.username} ismiyle bağlandım.`);
})


client.on('guildMemberAdd', async member => {
if(member.user.bot) {
const sistem = await data.fetch(`botkoruma.${member.guild.id}`);
const sistemm = await data.fetch(`korumalar.${member.guild.id}`);
if(sistem) {
member.guild.members.ban(member.id);
}
if(sistemm) {
member.guild.members.ban(member.id);
}
}
})



client.on('message', async message => {

const küfür = await data.fetch(`küfür.${message.guild.id}`);
if(!küfür) return;
const blacklist = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq"];
let content = message.content.split(' ');

content.forEach(kelime => {
if(blacklist.some(küfür => küfür === kelime))  {
if(message.member.hasPermission('BAN_MEMBERS')) return;
message.delete();
}
})

});

client.on('message', async message => {

const reklam = await data.fetch(`reklam.${message.guild.id}`);
if(!reklam) return;
const blacklist = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"];

if(blacklist.some(a => message.content.includes(a)))  {
if(message.member.hasPermission('BAN_MEMBERS')) return;
message.delete();
}

});

const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await data.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await data.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await data.fetch(`time.${message.guild.id}.${message.author.id}`);
data.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await data.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
return message.delete();
}
} else {
data.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
data.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
data.delete(`mesaj.${message.guild.id}.${message.author.id}`);
data.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500)
}

});

client.on('message', async message => {

if(message.content.length > 4) {

const caps = await data.fetch(`caps.${message.guild.id}`);
if(!caps) return;

let kontrol = message.content.toUpperCase()
if(message.content == kontrol) {

if(message.member.permissions.has('BAN_MEMBERS')) return;
if(message.mentions.users.first()) return;

return message.delete();

}}});


client.on('roleDelete', async role => {
const sistem = await data.fetch(`korumalar.${role.guild.id}`);
if(!sistem) return;

let guild = role.guild;
const entry = await guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('MANAGE_ROLES')) return member.roles.remove(s.id);
})
});

client.on('roleUpdate', async (oldRole, newRole) => {
const sistem = await data.fetch(`korumalar.${newRole.guild.id}`);
if(!sistem) return;

let guild = newRole.guild;
const entry = await guild.fetchAuditLogs({ type: "ROLE_UPDATE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(oldRole.permissions.has('ADMINISTRATOR') && newRole.permissions.has('ADMINISTRATOR')) {
if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('ADMINISTRATOR')) return member.roles.remove(s.id);
})
}
});

client.on('guildBanAdd', async member => {
const sistem = await data.fetch(`korumalar.${member.guild.id}`);
if(!sistem) return;

let guild = member.guild;
const entry = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(audit => audit.entries.first());
let yetkili = entry.executor;

if(yetkili.id == guild.owner.user.id) return;
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('BAN_MEMBERS')) return yetkili.roles.remove(s.id);
})
guild.members.unban(member.id);
})

client.on('channelDelete', async channel => {
const sistem = await data.fetch(`korumalar.${channel.guild.id}`);
if(!sistem) return;

let guild = channel.guild;
const entry = await guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('MANAGE_CHANNELS')) return yetkili.roles.remove(s.id);
})

channel.clone({ name: channel.name });
})

client.on('emojiDelete', async emoji => {
const sistem = await data.fetch(`korumalar.${emoji.guild.id}`);
if(!sistem) return;

let guild = emoji.guild;
const entry = await guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('MANAGE_EMOJIS')) return yetkili.roles.remove(s.id);
})

guild.emojis.create(emoji.url, emoji.name);
})