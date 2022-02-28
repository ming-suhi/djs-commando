import { green, red } from "chalk";

import CommandsAPIService from "../../services/commands-api";

import CLICommand from "../structures/cli-command";

module.exports = class extends CLICommand {
  name = "deleteCommand";
  aliases = ["dc"];
  description = "Delete a specific command from Discord by name";
  usage = "npx djsc dc <commandName>";

  async execute(args?: string[]) {
    // check if command name is given
    const commandName = args?.[0];
    if(!commandName) return console.log(red("Name of command to delete not given. Please use `npx djsc help` for help. \n"));

    // get command
    const commandDatas = await CommandsAPIService.getCommands(this.client.appID, this.client.botToken);
    const command = commandDatas.find(data => data.name == commandName);
    if(!command) return console.log(red(`No command found with the name: ${commandName} \n`));

    // delete command
    await CommandsAPIService.deleteCommand(this.client.appID, this.client.botToken, command.id);
    console.log(green(`Deleted command with name: ${commandName}\n`));
  }
}