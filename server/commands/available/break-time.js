const Discord = require('discord.js');
const fetch = require('node-fetch');

const STOP_COMMAND = 'stop';
const START_COMMAND = 'start';
const FULL_DAY_MILLISECONDS = 86400000;
const HOUR_MILLISECONDS = 3600000;

// TODO: Repeatedly recursively calling setInterval probably isn't a good idea. Find a better solution.

const calculateNextDay = () => {
	const today = new Date();
	const nextDay = new Date();
	nextDay.setHours(11, 0, 0, 0);
	if (today.getDay() < 5) {
		return nextDay.getTime() + FULL_DAY_MILLISECONDS - today.getTime();
	}
	else {
		return nextDay.getTime() + (8 - today.getDay()) * FULL_DAY_MILLISECONDS - today.getTime();
	}
};

const uzEvent = (message, content, time) => {
	fetch('https://anime-reactions.uzairashraf.dev/api/reactions/random')
		.then(result => result.json())
		.then(data => {
			const attachment = new Discord.MessageAttachment(data.reaction);
			message.channel.send(content, attachment);
		});
	return time;
};

const uzEvents = [
	(message) => {
		return uzEvent(message, '@everyone Good morning coders. If you\'ve been working before standup, please take a break!', HOUR_MILLISECONDS * 1.5);
	},
	(message) => {
		return uzEvent(message, '@everyone Hello everybody. Take a break if you haven\'t already.', HOUR_MILLISECONDS);
	},
	(message) => {
		return uzEvent(message, '@everyone Everybody, it\'s time for lunch! Be back in an hour.', HOUR_MILLISECONDS);
	},
	(message) => {
		return uzEvent(message, '@everyone Welcome back everybody. Time to get back to work!', HOUR_MILLISECONDS);
	},
	(message) => {
		return uzEvent(message, '@everyone Hello everybody.Take a break if you haven\'t already.', HOUR_MILLISECONDS * 1.25);
	},
	(message) => {
		return uzEvent(message, '@everyone Last break for the day! Home stretch!', HOUR_MILLISECONDS * 1.25);
	},
	(message) => {
		let goodbyeMessage = '@everyone Good work everybody!';
		const nextTime = calculateNextDay();
		goodbyeMessage += nextTime > FULL_DAY_MILLISECONDS ? ' Hope ya\'ll have a nice weekend!' : 'See everybody tomorrow!';
		return uzEvent(message, goodbyeMessage, nextTime);
	},
];


module.exports = {
	name: 'uzi',
	description: 'Starts a timer',
	index: 0,
	nextTime: 0,
	isOn: false,
	timer: null,
	execute(message, args) {
		if(args[0] === START_COMMAND) {
			if(this.isOn) {
				message.channel.send('UzBot: I\'m already on..');
			}
			else {
				console.log(`${message.author.username} turned on Uzbot!`);
				this.isOn = true;
				this.start(message);
				message.channel.send('UzBot: Turning on..');
			}
		}
		else if(args[0] === STOP_COMMAND) {
			if(!this.isOn && this.timer !== null) {
				message.channel.send('UzBot: I\'m already off..');
			}
			else {
				console.log(`${message.author.username} turned off Uzbot!`);
				clearInterval(this.timer);
				this.timer = null;
				this.isOn = false;
				message.channel.send('UzBot: Shutting down..');
			}
		}
		else {
			message.channel.send('Invalid argument(s)..');
		}
	},
	start(message) {
		this.index = 0;
		this.nextTime = calculateNextDay();
		this.timer = setInterval(()=> this.runEvent(message), this.nextTime);
	},
	runEvent(message) {
		clearInterval(this.timer);
		if(!this.isOn) return;
		this.nextTime = uzEvents[this.index++ % uzEvents.length](message);
		this.timer = setInterval(()=>this.runEvent(message), this.nextTime);
	},
};
