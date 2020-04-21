//author = Xaroyz

const config = require("./config.json");;
const Discord = require("discord.js");
const fs = require("fs");
const active = new Map();
const readline = require('readline');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
  
  bot.user.setActivity("Making discord bots", {type: "PLAYING"});
  bot.user.setStatus('online');
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  var options = {
    active: active
  
  }

  let commands = bot.commands.get(cmd.slice(prefix.length));
  if(commands) commands.run(bot,message,args,options);

  
});

bot.login(config.token);
