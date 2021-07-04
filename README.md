<p align="center">
  <img src="https://raw.githubusercontent.com/ming-suhi/ming-suhi/master/djs-local-manager.svg" width="100" align="center" />
</p>

<p align="center">
  <a href="https://github.com/ming-suhi/djs-local-manager" target="_blank">
    <strong>@ming-suhi/djs-local-manager</strong>
  </a>
</p>

<p align="center">Powered by Discord.js</p>


## I. About
A package for managing Discord Interaction; Slash Commands, Button, and Select Menus. For an in-depth documentation visit the <a href="https://ming-suhi.github.io/djs-local-manager/" target="_blank">official website</a>. For users who want to opt for a similar package with a database manager, check out <a href="https://github.com/ming-suhi/djs-manager" target="_blank">@ming-suhi/djs-manager</a> from the same developer. 


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

1. Create a file inside the commands folder, file name must be the same as command name

2. Require/import `Command`
    ```js
    const {Command} = require('@ming-suhi/djs-local-manager');
    ```

3. Extend `Command`
    ```js
    class MyCommand extends Command {
      constructor() {
        super();
        // Properties here
      }
    }
    ```

4. Set class properties
    ```js
    this.name = "mycommand";
    this.description = 'my custom command';
    ```

5. Create `execute` method
    ```js
    async execute(service) {
      await service.sendMessage('Your command has been heard');
    }
    ```

6. Export created class
    ```js
    module.exports = MyCommand;
    ```

    Example
    ```js
    const {Command} = require('@ming-suhi/djs-local-manager');

    class Ping extends Command {
      constructor() {
        super();
        this.name = "ping";
        this.description = 'pings bot to get latency';
      }

      async execute(service) {
        await service.sendMessage('Pong');
      }
    }

    module.exports = Ping;
    ```


## E. Synching commands

It is suggested to sync commands on client ready. To sync commands just simply call on `syncCommands` method.

```js
client.on('ready', async() => {
  client.msdm.syncCommands(client);
});
```


## F. Setting interaction handler

This step setups an interaction handler that finds the corresponding file for the requested command. Upon receiving a slash command it calls on the executes method of that command. Upon receiving a button interaction it executes the onPress method, while receiving a select menu interaction executes the onSelect method.

```js
client.ws.on('INTERACTION_CREATE', async interaction => {
  client.msdm.handleInteraction(client, interaction);
})
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
