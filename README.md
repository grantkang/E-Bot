# E-Bot
Rated E for everyone.

## Getting Started

### Prerequisites
* Node.js 10 or higher
* NPM 6 or higher
* Discord Account

### Discord Developer Setup

1. Visit www.discord.com and create a new account if you don't have one already

2. Visit the developer portal https://discord.com/developers/applications

3. Create a new application & give it a name

4. Click the Bot tab and add a bot

5. Save your bot's token, you'll be needing it in the latter steps

### Environment Setup

1. Clone the repository
    ```shell
    $ git clone https://github.com/grantkang/E-Bot.git
    ```
2. Once inside the project directory, install the dependencies
    ```shell
    $ npm install
    ```
3. Create a config.json in the root of the project. Include a command prefix and your bot's token from earlier
    ```json
    {
      "prefix": "<YOUR_COMMAND_PREFIX>",
      "token": "<YOUR_BOT'S_TOKEN>"
    }
    ```
4. ..and you're set!

### Running the Bot

1. Visit the developer portal https://discord.com/developers/applications

2. Choose your app

3. Copy the client id

4. Visit https://discord.com/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&scope=bot and choose the server you want to add your bot in

5. Navigate to the root directory of the project and run the following npm script
    ```shell
    $ npm run start
    ```
    
## Removing/enabling bot commands

Currently available commands are in `server/commands/available`. To create new commands, create new JavaScript files in that folder while following the same format as  existing files.

1. to enable commands, run the enable script while providing the names of the JavaScript files of the commands
    ```shell
    $ npm run cmd-enable break-time.js ping.js
    ```
2. to disable commands, run the disable script while providing the names of the JavaScript files of the commands
    ```shell
    $ npm run cmd-disable break-time.js ping.js beep.js
    ```
