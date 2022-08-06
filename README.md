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
A discord.js extension for easily building and receiving your Discord Slash Commands. For an in-depth documentation visit the <a href="https://ming-suhi.github.io/djs-commando/" target="_blank">documentation website</a>. Or join the <a href="https://discord.com/invite/P3UMxQCEaY" target="_blank">support server</a> to talk with the developer. Please note that this package is not affiliated with discord.js.

## II. Quick Start

## A. Installing

##### Run npm install on the command line or terminal.
```
npm install @ming-suhi/djs-commando
```

## B. Creating a Command
To create a command, start by making a file inside a designated folder. Require/import the needed command class from `@ming-suhi/djs-commando`. Top level command classes include `SlashCommand`, `MessageCommand`, and `UserCommand`. To create a command, extend the chosen class and set its name and description in the constructor(`MessageCommand` and `UserCommand` doesn't have a description). Add an execute method with one parameter of Interaction type. This method will run if the command is called by a user from Discord. Finally, for command to be handled by the package, export it with `module.exports`.
```js
const { SlashCommand } = require('@ming-suhi/djs-commando');

const command = new class extends SlashCommand {
  constructor() {
    super();
    this.name = "ping";
    this.description = "get ponged";
  }

  async execute(interaction) {
    await interaction.reply("pong");
  }
}

module.exports = command;
```

## C. Adding Command Options
A SlashCommand can take on options which includes subcommands, subcommand groups and fields.  To create a subcommand, import `Subcommand` from `@ming-suhi/djs-commando`, and create a new class extending `Subcommand` and set its name and description in the constructor. To attach the subcommand to a SlashCommand or subcommand group pass it inside super. Creating a subcommand group is similar to creating a subcommand. Available fields are `StringField`, `IntegerField`, `BooleanField`, `UserField`, `ChannelField`, `RoleField`, `MentionableField`, `NumberField`, and `AttachmentField`. To create a field, create a new instance of the chosen field class which takes on 3 arguments: a name and description and a boolean that states if the field is required. Attach it to a Slashcommand or Subcommand inside super.

```js
const { SlashCommand, Subcommand, StringField } = require('@ming-suhi/djs-commando');

const message = new StringField('message', 'message to echo', true);

const subcommand = new class extends Subcommand {
  constructor() {
    super([message]);
    this.name = "message";
    this.description = "echos a message";
  }

  async execute(interaction) {
    const messageArg = interaction.options.getString("message");
    await interaction.reply(messageArg);
  }
}

const command = new class extends SlashCommand {
  constructor() {
    super([subcommand]);
    this.name = "echo";
    this.description = "echo commands";
  }
}

module.exports = command; // Only export top command
```

## D. Registering Commands
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