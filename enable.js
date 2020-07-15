const fs = require('fs');
const path = require('path');

const commandFiles = process.argv.slice(2);

const availablePath = '../available/';
const enabledPath = './server/commands/enabled/';

commandFiles.forEach(file => {
	fs.symlink(path.join(availablePath, file), path.join(enabledPath, file), err => {
		if (err) {
			throw err;
		}
	});
});
