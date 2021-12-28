<p align="center">
  <img src="https://raw.githubusercontent.com/ming-suhi/ming-suhi/master/djs-commando.svg" width="100" align="center" />
</p>

<p align="center">
  <a href="https://github.com/ming-suhi/djs-commando" target="_blank">
    <strong>@ming-suhi/djs-commando</strong>
  </a>
</p>

<p align="center">
  <a href="https://discord.com/invite/P3UMxQCEaY" target="_blank">
    <img src="https://discordapp.com/api/guilds/753818535440023593/widget.png?style=shield" alt="Discord Server">
  </a>
</p>


## I. About
A discord.js extension for easily creating and managing your Discord Slash Commands. For an in-depth documentation visit the <a href="https://ming-suhi.github.io/djs-commando/" target="_blank">documentation website</a>. Or join the <a href="https://discord.com/invite/P3UMxQCEaY" target="_blank">support server</a> to meet the developer. Please note that this package is not associated with discord.js.


## II. Quick Start

## A. Installing

##### Run npm install on the command line or terminal.
```
npm install @ming-suhi/djs-commando
```

## B. Setting Environment

Create a `.env` file in the project root directory. Create a folder to hold command files. Store the folder path from project root as `COMMANDS_FOLDER`. Store discord application id as `APP_ID`, and bot token as `BOT_TOKEN`. 

```
APP_ID = "application id here" 
BOT_TOKEN = "bot token here"
COMMANDS_FOLDER = "path/to/commands-folder"
```

## C. Creating a Command

Start creating a command by making a file inside the designated folder. File name doesn't need to be command
name. Require/import the needed command class from `@ming-suhi/djs-commando`. Command classes include 
`Command`, `Subcommand`, `SubcommandGroup`, `UserCommand` and `MessageCommand`. To create a command class make 
a new instance of the chosen class and set its properties. Finally for command to be handled by the package, 
export it with `module.exports`. Only export top commands(Command, UserCommand, MessageCommand). Do not export 
command options such as Subcommand and SubcommandGroup(command options will be discussed below).

```js
const { Command } = require('@ming-suhi/djs-commando');

// 1st option for making command
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

// 2nd option for making command
const command = new Command();
command.name = "ping";
command.description = "get ponged";
command.execute = async(interaction) => {
  interaction.reply("pong");
}

module.exports = command;
```

## D. Adding Command Options

Require/import the needed command class from `@ming-suhi/djs-commando`. Command options include Subcommand,
SubcommandGroup, StringField, IntegerField, BooleanField, UserField, ChannelField, RoleField,
MentionableField, and NumberField. Create a new instance of the chosen class and pass it inside an array as an argument to it's parent's constructor.

```js
const { StringField } = require('@ming-suhi/djs-commando');

// Creation of field differs from subcommand and subcommand group
// Subcommand and subcommand group are created like Command, UserCommand and MessageCommand
const message = new StringField('message', 'message to echo', true);

// 1st option
const command = new class extends Command {
  constructor() {
    super([message]); // pass all options inside an array
    this.name = "ping";
    this.description = "get ponged";
  }

  async execute(interaction) {
    interaction.reply("pong");
  }
}

// 2nd option
const command = new Command([message]); // pass all options inside an array
command.name = "ping";
command.description = "get ponged";
command.execute = async(interaction) => {
  interaction.reply("pong");
}

module.exports = command; // only export top command
```

## E. Posting Commands
For slash command to be executed by users from Discord, the data of the command needs to be posted first.
The package includes a CLI tool for posting from the command line. To access the main menu of the cli tool, open a terminal inside the project directory and run `npx djsc` or `npx djsc help`.
```
npx djsc
```
The command line tool offers a command to automatically sync commands; this will post local commands not 
posted to discord, and delete from discord commands that doesn't exist locally. To sync commands, run `npx djsc sc`.
```
npx djsc sc
```
The command line tool however also offers manual `post` and `delete` of command/s. To make manual
operations more easier, the command line tool also offers a `compare` command that compares the status
of commands locally and on Discord. Open CLI tool main menu for list of commands.

## F. Receiving Commands
Now that the commands are posted, users can now use the posted commands. Note that it may take up to one hour for commands to be available after posting. To receive commands, first require/import `InteractionsHandler` from `@ming-suhi/djs-commando`. Create new instance of `InteractionsHandler` and call `handleInteraction` method on `interactionCreate` event. Interactions handler 
will manage getting the matching command and executing it when interaction is received.
```js
const { InteractionsHandler } = require('@ming-suhi/djs-commando');

const handler = new InteractionsHandler();

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


## V. License
MIT © 明suhi