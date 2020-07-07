const clearString = '‎\n'.repeat(50);

module.exports = {
	name: 'clear',
	description: 'Works kinda like the clear command on terminals',
	args: true,
	execute(message) {
		message.channel.send(clearString);
	},
};
