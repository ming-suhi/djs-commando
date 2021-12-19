import chalk from "chalk";
import CommandsAPIService from "../services/commands-api";
import { checkEnv } from "./utils";

const commandNameNotProvided = () => console.log(chalk.red("Name of command to delete not given. Please use `npx djsc help` for help. \n"));
const commandNotFound = (commandName: string) => console.log(chalk.red(`No command found with the name: ${commandName} \n`));

export default async function deleteCommand() {
  // check if env variables are defined
  if(!checkEnv()) return;

  // check if command name is given
  const commandName = process.argv[3];
  if(!commandName) return commandNameNotProvided();

  // get command
  const commandDatas = await CommandsAPIService.getCommands(process.env.APP_ID!, process.env.BOT_TOKEN!);
  const command = commandDatas.find(data => data.name == commandName);
  if(!command) return commandNotFound(commandName);

  // delete command
  await CommandsAPIService.deleteCommand(process.env.APP_ID!, process.env.BOT_TOKEN!, command.id);
  console.log(chalk.green(`Deleted command with name: ${commandName}`));
  console.log("\n");
}