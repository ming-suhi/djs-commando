import { red, green } from "chalk";

import CommandsAPIService from "../../services/commands-api";
import { InteractionsHandler } from "../../structures/interactions-handler";

import CLICommand from "../structures/cli-command";

module.exports = class extends CLICommand {
  name = "postCommand";
  aliases = ["pc"];
  description = "Post a specific command from your commands folder to Discord by name.";
  usage = "npcx djsc pc <commandName>";

  async execute(args?: string[]) {
    // check if command name was provided
    const commandName = args?.[0];
    if(!commandName) return console.log(red(`Command name not provided \n`));

    // get local commands
    const handler = new InteractionsHandler();
    const localCommand = handler.commands.get(commandName);
    if(!localCommand) return console.log(red(`No command found with the name: ${commandName} \n`));

    // post command
    await CommandsAPIService.postCommand(this.client.appID, this.client.botToken, localCommand.rawData);
    console.log(green(`Posted command with the name: ${commandName} \n`));
  }
}