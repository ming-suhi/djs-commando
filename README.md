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
A package for easily creating and managing your Discord Slash Commands. For an in-depth documentation visit the <a href="https://ming-suhi.github.io/djs-local-manager/" target="_blank">documentation website</a>. 


## II. Quick Start

## A. Installing

##### Run npm install on the command line or terminal.
```
npm install @ming-suhi/djs-local-manager
```

## B. Setting Environment

1. Create a `.env` file in the root directory

    ```
    COMMANDS_FOLDER =
    ```

2. Create a folder to hold command files. Store the folder path from the root as `COMMANDS_FOLDER`.

## C. Setting Handler

1. Require `InteractionsHandler` from `@ming-suhi/djs-local-manager`.
    ```js
    const { InteractionsHandler } = require('@ming-suhi/djs-local-manager');
    ```

2. Create an instance of `InteractionsHandler`
    ```js
    const handler = new InteractionsHandler();
    ```

## D. Creating Commands

1. Create a file inside the commands folder. File name must be the same as command name.

2. Require/import `Command`.
    ```js
    const { Command } = require('@ming-suhi/djs-local-manager');
    ```

3. Create a new class extending `Command`.
    ```js
    const ping = new class extends Command {
      constructor() {
        super();
        // Properties here
      }
    }
    ```

4. Define class properties inside constructor. Refer to Discord Developer Portal for valid property values.
    ```js
    this.name = "ping";
    this.description = "short description"; 
    ```

5. Create execute method which accepts one parameter. The parameter is an instance of `Interaction` class of `discord.js`, which is received during interactionCreate event of `discord.js`. 
    ```js
    async execute(interaction) {
      await interaction.reply("Pong");
    }
    ```

6. Export created class.
    ```js
    module.exports = ping;
    ``` 

## E. Synching Commands
It is suggested to sync commands on `ready`. Synching commands posts and updates commands, as well as deletes commands unexisting in the commands folder. Synching commands bulk updates commands and it is important to note that the recently posted commands cannot be immediately used/seen.
```js
client.on('ready', async() => {
  handler.syncCommands(client);
});
```

## F. Receiving Commands
This will find the matching command and execute it.
```js
client.on('interactionCreate', async interaction => {
  await handler.handleInteraction(interaction);
});
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