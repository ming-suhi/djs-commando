<p align="right">
  <a href="https://discord.com/invite/P3UMxQCEaY" target="_blank">
    <img src="https://discordapp.com/api/guilds/753818535440023593/widget.png?style=shield" alt="Discord Server">
  </a>
</p>
<p align="right">
  <a href="https://discord.com/invite/P3UMxQCEaY" target="_blank">
    <text>Join Support Server | Meet Developer</text>
  </a>
</p>

# **[@ming-suhi/djs-commando](https://github.com/ming-suhi/djs-commando)**


## I. About
A discord.js extension for easily structuring and managing your Discord Slash Commands. For an in-depth documentation visit the <a href="https://ming-suhi.github.io/djs-commando/" target="_blank">documentation website</a>. Or join the <a href="https://discord.com/invite/P3UMxQCEaY" target="_blank">support server</a> to talk with the developer. Please note that this package is not affiliated with discord.js.

## II. Quick Start

## A. Installing

##### Run npm install on the command line or terminal.
```
npm install @ming-suhi/djs-commando
```

## B. Creating a Command
Start creating a command by making a file inside a designated folder. File name doesn't need to be command name. Require the needed command class from `@ming-suhi/djs-commando`. Command classes include 
`Command`, `Subcommand`, `SubcommandGroup`, `UserCommand` and `MessageCommand`. To create a command class make a new instance of the chosen class and set its properties. Finally for command to be handled by the package, export it with `module.exports`. Files directly under the chosen folder should only export top commands(Command, UserCommand, MessageCommand) Do not export command options such as Subcommand and SubcommandGroup(command options will be discussed below).

```js
const { Command } = require('@ming-suhi/djs-commando');

const command = new class extends Command {
  constructor() {
    super();
    this.name = "ping";
    this.description = "get ponged";
  }

  async execute(interaction) {
    interaction.reply("pong");
  }
}

module.exports = command;
```

## C. Adding Command Options

Require the needed command class from `@ming-suhi/djs-commando`. Command options include `Subcommand`,
`SubcommandGroup`, `StringField`, `IntegerField`, `BooleanField`, `UserField`, `ChannelField`, `RoleField`,
`MentionableField`, and `NumberField`. Create a new instance of the chosen class and pass it inside an array as an argument to it's parent's constructor.

```js
const { StringField } = require('@ming-suhi/djs-commando');

// Creation of field differs from subcommand and subcommand group
// Subcommand and subcommand group are created like Command, UserCommand and MessageCommand
const message = new StringField('message', 'message to echo', true);

const command = new class extends Command {
  constructor() {
    super([message]); // pass all options inside an array
    this.name = "echo";
    this.description = "echo a message";
  }

  async execute(interaction) {
    interaction.reply("pong");
  }
}

module.exports = command; // only export top command
```

## D. Register Commands
Before receiving commands, load all commands. First, require `InteractionsHandler` from `@ming-suhi/djs-commando`. Create new instance of `InteractionsHandler` and call `loadCommands` method. The method requires one argument which is the path to the commands folder.
```js
const { InteractionsHandler } = require('@ming-suhi/djs-commando');

const handler = new InteractionsHandler();
handler.loadCommands("ABSOLUTE/PATH/TO/COMMANDS/FOLDER");

```

## E. Receiving Commands
To receive commands, call `handleInteraction` method on `interactionCreate` event. Interactions handler 
will manage getting the matching command and executing it when interaction is received.
```js
client.on('interactionCreate', async interaction => {
  await handler.handleInteraction(interaction);
});
```

## F. Posting Commands
Optionally, you can install `@ming-suhi/djsc-cli` to easily manage(post, delete, update) your commands from the command line. 
```
npm install @ming-suhi/djsc-cli
```
```js
//djsc.config.js
const { mapCommands } = require("@ming-suhi/djs-commando");

module.exports = {
  appId: "DISCORD_APP_ID",
  botToken: "DISCORD_BOT_TOKEN",
  mapCommands: () => mapCommands("ABSOLUTE/PATH/TO/COMMANDS/FOLDER")
}
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


## V. License
MIT © 明suhi