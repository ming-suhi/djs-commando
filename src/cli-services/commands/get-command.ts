import { red } from "chalk";

import CommandsAPIService from "../../services/commands-api";
import MakeCommandService from "../../services/make-command";

import CLICommand from "../structures/cli-command";

module.exports = class extends CLICommand {
  name = "getCommand";
  aliases = ["gc"];
  description = "Get and print all bot commands from Discord. Add command name as argument to get a specific command.";
  usage = "npx djsc gc <commandName>";
  
  async execute(args?: string[]) {
    const commandName = args?.[0];
    const commandDatas = await CommandsAPIService.getCommands(this.client.appID, this.client.botToken);
    const commandsMap = await MakeCommandService.makeApplicationCommands(commandDatas);

    if(commandName) {
      const command = commandsMap.getCommand([args?.[0] || "", args?.[1] || "", args?.[2] || ""]);
      if(!command) console.log(red(`No command found with the name: ${commandName}\n`));
      console.log(command.rawData);
    } else {
      console.log(commandsMap.rawData);
    }

    console.log("\n");
  }
}