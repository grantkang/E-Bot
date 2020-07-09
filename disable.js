const fs = require('fs');
const path = require('path');

const commandFiles = process.argv.slice(2);

const enabledPath = './server/commands/enabled/';

commandFiles.forEach(file => {
	fs.unlink(path.join(enabledPath, file), err => {
		if (err) {
			throw err;
		}
	});
});
