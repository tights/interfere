const { Client } = require('discord.js');

const client = new Client({ disableMentions: 'everyone' });

var owners = ['user id 1', 'user id 2'];
var token = 'bot token not user or ur account will get locked';
var prefix = 'stupid prefix';

client.on('ready', () => console.log(`Connected as ${client.user.tag}`));
client.on('message', async msg => {
    if (!owners.includes(msg.author.id)) return;
    if (!msg.guild || msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    switch (cmd) {
        case 'ping': {
            let now = Date.now();
            let message = await msg.channel.send('...');

            return message.edit(`Ping: \`${Math.floor(client.ws.ping)}ms\` \nResponse: \`${Date.now() - now}ms\``);
        }

        case 'send': {
            return msg.guild.members.cache.filter(x => !x.user.bot).forEach(async member => {
                await member.send(args.join(' '))
                    .then(() => console.log(`Sent to ${member.user.tag}`))
                    .catch(error => console.log(`Couldn't send to ${member.user.tag}`))
            });
        }
    }
});

client.login(token);
