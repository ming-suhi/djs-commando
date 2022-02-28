import { green } from "chalk";

import CommandsAPIService from "../../services/commands-api";
import MakeCommandService from "../../services/make-command";
import { InteractionsHandler } from "../../structures/interactions-handler";

import CLICommand from "../structures/cli-command";

import { compareCommands } from "./compare-command";

module.exports = class extends CLICommand {
  name = "syncCommand";
  aliases = ["sc"];
  description = `Sync Discord with local. Deletes from Discord unexisting files in the local commands folder. Posts existing local files that is not posted on Discord.`;
  usage = "npx djsc sc";

  async execute(args?: string[]) {
    // get local commands
    const commandDatas = await CommandsAPIService.getCommands(this.client.appID, this.client.botToken);
    const databaseCommands = await MakeCommandService.makeApplicationCommands(commandDatas);
    const localCommands = new InteractionsHandler();
    const { localOnly, databaseOnly, modified } = compareCommands(localCommands.commands, databaseCommands);

    // post local only
    for(let commandName of localOnly) {
      const command = localCommands.commands.get(commandName)!;
      await CommandsAPIService.postCommand(this.client.appID, this.client.botToken, command.rawData);
    }

    // edit modified
    for(let commandName of modified) {
      const command = localCommands.commands.get(commandName)!;
      await CommandsAPIService.postCommand(this.client.appID, this.client.botToken, command.rawData);
    }

    // delete database only
    for(let commandName of databaseOnly) {
      const command = commandDatas.find(data => data.name == commandName);
      await CommandsAPIService.deleteCommand(this.client.appID, this.client.botToken, command.id)
    }

    console.log(green(`Successfully synched commands. \n`));
  }
}