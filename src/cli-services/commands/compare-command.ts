import { green, red, yellow } from "chalk";

import CommandsAPIService from "../../services/commands-api";
import MakeCommandService from "../../services/make-command";
import CommandsMap from "../../structures/commands-map";
import { InteractionsHandler } from "../../structures/interactions-handler";

import CLICommand from "../structures/cli-command";

/**
 * Compare the local branch and the database branch. 
 * @param local Map of local commands
 * @param database Map of database commands
 */
function compareCommands(local: CommandsMap, database: CommandsMap) {
  const localOnly = local.rawData.map(command => command.name).filter(name => !database.get(name));
  const databaseOnly = database.rawData.map(command => command.name).filter(name => !local.get(name));
  const modified = local.rawData.filter(command => database.get(command.name)).filter(command => JSON.stringify(command) != JSON.stringify(database.get(command.name)!.rawData)).map(command => command.name);
  return {localOnly, databaseOnly, modified};
}

module.exports = class extends CLICommand {
  name = "compareCommand";
  aliases = ["cc"];
  description = "Compare local commands with Discord commands.";
  usage = "npx djsc cc";
  
  async execute(args?: string[]) {
    // get commands
    const commandDatas = await CommandsAPIService.getCommands(this.client.appID, this.client.botToken);
    const databaseCommands = await MakeCommandService.makeApplicationCommands(commandDatas);
    const localCommands = new InteractionsHandler();

    // compare commands
    const { localOnly, databaseOnly, modified } = compareCommands(localCommands.commands, databaseCommands);
    if(localOnly.length === 0 && databaseOnly.length === 0 && modified.length === 0) return console.log(green("Commands in sync."));
    console.log("Commands not in sync. Please sync using sync command or manually post and delete.");
    console.log(green(`+ Exists locally but not on Discord`));
    console.log(red("- Exists on Discord but not locally"));
    console.log(yellow("! Exists on both but of different properties\n"));
    for(let command of localOnly) console.log(green(`+ ${command}`));
    for(let command of databaseOnly) console.log(red(`- ${command}`));
    for(let command of modified) console.log(yellow(`! ${command}`));
    console.log("\n");
  }
}