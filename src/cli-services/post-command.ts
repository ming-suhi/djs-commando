import chalk from "chalk";
import CommandsAPIService from "../services/commands-api";
import { InteractionsHandler } from "../structures/interactions-handler";
import { checkEnv } from "./utils";

const commandNameNotProvided = () => console.log(chalk.red(`Command name not provided \n`));
const commandNotFound = (commandName: string) => console.log(chalk.red(`No command found with the name: ${commandName} \n`));

export async function postCommand() {
  // check if env variables are defined
  if(!checkEnv()) return;

  // check if command name was provided
  const commandName = process.argv[3];
  if(!commandName) return commandNameNotProvided();

  // get local commands
  const handler = new InteractionsHandler();
  const localCommand = handler.commands.get(commandName);
  if(!localCommand) return commandNotFound(commandName);

  // post command
  await CommandsAPIService.postCommand(process.env.APP_ID!, process.env.BOT_TOKEN!, localCommand.rawData);
  console.log(chalk.green(`Posted command with the name: ${commandName} \n`));
}