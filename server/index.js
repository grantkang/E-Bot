const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { prefix, token } = require('../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandLinks = fs.readdirSync('./server/commands/enabled').filter(file => file.endsWith('.js'));

console.log(commandLinks);

for (const link of commandLinks) {
	const file = fs.readlinkSync(path.join('./server/commands/enabled/', link));
	const command = require(`./commands/available/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
