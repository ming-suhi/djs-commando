import chalk from "chalk";
import CommandsAPIService from "../services/commands-api";
import MakeCommandService from "../services/make-command";
import CommandsMap from "../structures/commands-map";
import { InteractionsHandler } from "../structures/interactions-handler";
import { checkEnv } from "./utils";

/**
 * Compare the local branch and the database branch. 
 * @param local Map of local commands
 * @param database Map of database commands
 */
export function compareCommands(local: CommandsMap, database: CommandsMap) {
  const localOnly = local.rawData.map(command => command.name).filter(name => !database.get(name));
  const databaseOnly = database.rawData.map(command => command.name).filter(name => !local.get(name));
  const modified = local.rawData.filter(command => database.get(command.name)).filter(command => JSON.stringify(command) != JSON.stringify(database.get(command.name)!.rawData)).map(command => command.name);
  return {localOnly, databaseOnly, modified};
}

export default async function compareCommand() {
  // check if env variables are defined
  if(!checkEnv()) return;

  // get commands
  const commandDatas = await CommandsAPIService.getCommands(process.env.APP_ID!, process.env.BOT_TOKEN!);
  const databaseCommands = await MakeCommandService.makeApplicationCommands(commandDatas);
  const localCommands = new InteractionsHandler();

  // compare commands
  const { localOnly, databaseOnly, modified } = compareCommands(localCommands.commands, databaseCommands);
  if(localCommands.commands.rawData == databaseCommands.rawData) return console.log(chalk.green("Commands in sync."));
  console.log("Commands not in sync. Please sync using sync command or manually post and delete.");
  console.log(chalk.green(`+ Exists locally but not on Discord`));
  console.log(chalk.red("- Exists on Discord but not locally"));
  console.log(chalk.yellow("! Exists on both but of different properties"));
  console.log("\n");
  for(let command of localOnly) console.log(chalk.green(`+ ${command}`));
  for(let command of databaseOnly) console.log(chalk.red(`- ${command}`));
  for(let command of modified) console.log(chalk.yellow(`! ${command}`));
  console.log("\n");
}