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

## D. Setting interaction handler

This step setups an interaction handler that finds the corresponding file for the requested command. Upon receiving a slash command it calls on the executes method of that command. Upon receiving a button interaction it executes the onPress method, while receiving a select menu interaction executes the onSelect method.

```js
client.ws.on('INTERACTION_CREATE', async interaction => {
  client.msdm.handleInteraction(client, interaction);
})
```