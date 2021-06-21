<p align="center">
  <img src="https://raw.githubusercontent.com/ming-suhi/djs-local-manager/master/assets/logo.svg" width="250" align="center" />
</p>

<p align="center">
  <a href="https://github.com/ming-suhi/djs-local-manager" target="_blank">
    <strong>@ming-suhi/djs-local-manager</strong>
  </a>
</p>

<p align="center">Powered by Discord.js</p>


## I. About
A package for managing Discord Slash Commands. For an in-depth documentation visit the <a href="https://ming-suhi.github.io/djs-local-manager/" target="_blank">official website</a>. For users who want to opt for a similar package with a database manager, check out <a href="https://github.com/ming-suhi/djs-manager" target="_blank">@ming-suhi/djs-manager</a> from the same developer. 


## II. Getting Started

## A. Installation

##### Run npm install on the command line or terminal.
```
npm install @ming-suhi/djs-local-manager
```


## B. Setting environment

1. Create a `.env` file in the root directory

```env
BOT_TOKEN = 

COMMANDS_FOLDER =
```

2. Get the Discord bot's token and store it as `BOT_TOKEN`.

3. Create a folder to hold command files. Store the folder path from the root as `COMMANDS_FOLDER`.


## C. Setting bot

1. Create an instance of Discord Client
```js
const Discord = require('discord.js');
const client = new Discord.Client();
```

2. Attach an instance of Manager Client
```js
const Manager = require('@ming-suhi/djs-local-manager');
client.msdm = new Manager.LocalClient();
```

3. Login bot
```js
client.login(client.msdm.token);
```


## D. Creating commands

1. Create a file inside the commands folder

2. Require/import `@ming-suhi/djs-local-manager`
```js
const Manager = require('@ming-suhi/djs-local-manager');
```

3. Create and export instance of GlobalCommand
```js
module.exports = new Manager.GlobalCommand(commandData);
```

Example
```js
const Manager = require('@ming-suhi/djs-local-manager');

module.exports = new Manager.GlobalCommand({
  name: 'ping',
  description: 'pings bot to get latency',
  permissions: ["SEND_MESSAGES"],
  async execute(interaction) {
    //send latency to channel
    interaction.sendMessage(`Bot ping is: ${Math.round(interaction.client.ws.ping)}ms`);
  }
});
```


## E. Registering commands

1. Listen to `ready`
```js
//Triggers on ready
client.on('ready', async() => {
  //code here
});
```

2. Sync commands
```js
client.msdm.syncCommands(client);
```


## F. Handling commands

1. Listen to `INTERACTION_CREATE`
```js
//Triggered on Slash Commands
client.ws.on('INTERACTION_CREATE', async request => {
  //code here
})
```

2. Create an instance of Manager Interaction
```js
const interaction = new Manager.Interaction(client, request);
```

**3. Execute requested command**
```js
client.msdm.matchCommand(interaction);
```


## G. Accessing Manager through interaction

1. Access Discord Client instance through the client property of interaction
```js
const client = interaction.client;
```

2. Access manager through the property which you have attached it to(refer to C.2)
```js
const manager = client.msdm;
```


## III. Contributing
## A. Issues
This project uses GitHub Issues to track bugs and feature requests. Please search the existing issues before filing new issues to avoid duplicates. For new issues, file your bug or feature request as a new issue.

For help and questions about using this project, please open a GitHub issue.

## B. Pull requests

1. Fork the project.

2. Create a topic branch from master.

3. Make some commits to improve the project.

4. Push this branch to your GitHub project.

5. Open a Pull Request on GitHub.

6. Discuss, and optionally continue committing.


## IV. License
MIT © 明suhi
