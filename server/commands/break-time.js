const STOP_COMMAND = 'stop';
const START_COMMAND = 'start';
const FULL_DAY_MILLISECONDS = 86400000;
const HOUR_MILLISECONDS = 36000000;

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const calculateNextDay = () => {
	const today = new Date();
	const nextDay = new Date();
	nextDay.setHours(8, 0, 0, 0);
	if (today.getDay() < 5) {
		return nextDay.getTime() + FULL_DAY_MILLISECONDS - today.getTime();
	}
	else {
		return nextDay.getTime() + (8 - today.getDay()) * FULL_DAY_MILLISECONDS - today.getTime();
	}
};

const uzEvents = [
	(message) => {
		message.channel.send('@everyone Good morning coders. If you\'ve been working before standup, please take a break!');
		return HOUR_MILLISECONDS * 1.5;
	},
	(message) => {
		message.channel.send('@everyone Hello everybody. Take a break if you haven\'t already');
		return HOUR_MILLISECONDS;
	},
	(message) => {
		message.channel.send('@everyone Everybody, it\'s time for lunch! Be back in an hour.');
		return HOUR_MILLISECONDS;
	},
	(message) => {
		message.channel.send('@everyone Welcome back everybody. Time to get back to work!');
		return HOUR_MILLISECONDS;
	},
	(message) => {
		message.channel.send('@everyone Hello everybody. Take a break if you haven\'t already');
		return HOUR_MILLISECONDS * 1.25;
	},
	(message) => {
		message.channel.send('@everyone Last break for the day!');
		return HOUR_MILLISECONDS * 1.25;
	},
	(message) => {
		let goodbyeMessage = 'Good work everybody!';
		const nextTime = calculateNextDay();
		goodbyeMessage += nextTime > FULL_DAY_MILLISECONDS ? ' Hope ya\'ll have a nice weekend!' : 'See everybody tomorrow!';
		message.channel.send(goodbyeMessage);
		return nextTime;
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
				this.isOn === true;
				this.start(message);
				message.channel.send('UzBot: Turning on..');
			}
		}
		else if(args[0] === STOP_COMMAND) {
			if(!this.isOn && this.timer !== null) {
				message.channel.send('UzBot: I\'m already off..');
			}
			else {
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
		this.timer = setInterval(
			async () => {
				console.log(this.index);
				const sleepTime = uzEvents[this.index++ % uzEvents.length](message);
				await snooze(sleepTime);
			},
			1000);
	},
};
