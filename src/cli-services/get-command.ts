import chalk from "chalk";
import CommandsAPIService from "../services/commands-api";
import { checkEnv } from "./utils";
import MakeCommandService from "../services/make-command";

const commandNotFound = (commandName: string) => console.log(chalk.red(`No command found with the name: ${commandName} \n`));

export default async function getCommand() {
  // check if env variables are defined
  if(!checkEnv()) return;

  // get commands
  const commandName = process.argv[3];
  const commandDatas = await CommandsAPIService.getCommands(process.env.APP_ID!, process.env.BOT_TOKEN!);
  const commandsMap = await MakeCommandService.makeApplicationCommands(commandDatas);

  // print data
  if(commandName) {
    const command = commandsMap.getCommand([process.argv[3], process.argv[4], process.argv[5]]);
    if(!command) commandNotFound(commandName);
    console.log(command.rawData);
    console.log("\n");
  } else {
    console.log(commandsMap.rawData);
    console.log("\n");
  }
}