<p align="center">
  <img src="https://raw.githubusercontent.com/ming-suhi/djs-local-manager/master/assets/logo.svg" width="250" align="center" />
</p>

<p align="center">
  <strong>@ming-suhi/djs-local-manager</strong>
</p>

<p align="center">Powered by Discord.js</p>


## A. Install

##### Run npm install on the command line or terminal.
```
npm install @ming-suhi/djs-local-manager
```

##### Run npm ci to install dependencies.
```
npm ci
```


## B. Set Up Environment

**1. Create a `.env` file in the root directory**

```env
BOT_TOKEN = 

COMMANDS_FOLDER =
```

**2. Get the Discord bot's token and store it as `BOT_TOKEN`.**

**3. Create a folder to hold command files. Store the folder path from the root as `COMMANDS_FOLDER`.**


## C. Set Up Bot

**1. Create an instance of Discord Client**
```js
const Discord = require('discord.js');
const client = new Discord.Client();
```

**2. Attach an instance of Manager Client**
```js
const Manager = require('@ming-suhi/djs-local-manager');
client.msdm = new Manager.LocalClient();
```

**3. Login bot**
```js
client.login(client.msdm.token);
```


## D. Create Slash Commands

**1. Create a file inside the commands folder**

**2. Require/import `@ming-suhi/djs-local-manager`**
```js
const Manager = require('@ming-suhi/djs-local-manager');
```

**3. Create and export instance of GlobalCommand**
```js
module.exports = new Manager.GlobalCommand(commandData);
```

**Example**
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


## E. Set Up Slash Commands Handler

**1. Listen to `INTERACTION_CREATE`**
```js
//Triggered on Slash Commands
client.ws.on('INTERACTION_CREATE', async request => {
  //code here
})
```

**2. Create an instance of Manager Interaction**
```js
const interaction = new Manager.Interaction(client, request);
```

**3. Execute requested command**
```js
client.msdm.matchCommand(interaction);
```


## F. Access Manager inside execute

**1. Access Discord Client instance through the client property of interaction**
```js
const client = interaction.client;
```

**2. Access manager through the property which you have attached it to(refer to C.2)**
```js
const manager = client.msdm;
```
