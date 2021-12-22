import chalk from "chalk";
import CommandsAPIService from "../services/commands-api";
import MakeCommandService from "../services/make-command";
import { InteractionsHandler } from "../structures/interactions-handler";
import { compareCommands } from "./compare-command";
import { checkEnv } from "./utils";

export async function syncCommands() {
  // check if env variables are defined
  if(!checkEnv()) return;

  // get local commands
  const commandDatas = await CommandsAPIService.getCommands(process.env.APP_ID!, process.env.BOT_TOKEN!);
  const databaseCommands = await MakeCommandService.makeApplicationCommands(commandDatas);
  const localCommands = new InteractionsHandler();
  const { localOnly, databaseOnly, modified } = compareCommands(localCommands.commands, databaseCommands);

  // post local only
  for(let commandName of localOnly) {
    const command = localCommands.commands.get(commandName)!;
    await CommandsAPIService.postCommand(process.env.APP_ID!, process.env.BOT_TOKEN!, command.rawData);
  }

  // edit modified
  for(let commandName of modified) {
    const command = localCommands.commands.get(commandName)!;
    await CommandsAPIService.postCommand(process.env.APP_ID!, process.env.BOT_TOKEN!, command.rawData);
  }

  // delete database only
  for(let commandName of databaseOnly) {
    const command = commandDatas.find(data => data.name == commandName);
    await CommandsAPIService.deleteCommand(process.env.APP_ID!, process.env.BOT_TOKEN!, command.id)
  }

  console.log(chalk.green(`Successfully synched commands. \n`));
}