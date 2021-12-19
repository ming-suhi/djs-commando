#!node

import dotenv from "dotenv";
import help from "./help";
import getCommand from "./get-command";
import chalk from "chalk";
import deleteCommand from "./delete-command";
import compareCommand from "./compare-command";
import { postCommand } from "./post-command";

dotenv.config();

async function main() {
  const commandName = process.argv?.[2]?.toString()?.toLowerCase();
  switch(commandName) {
    case "help":
      help();
      break;

    case "gc":
      await getCommand();
      break;

    case "dc":
      await deleteCommand();
      break;

    case "cc":
      await compareCommand();
      break;

    case "pc":
      await postCommand();
      break;
    
    default:
      help();
      if(commandName) console.log(chalk.red(`Command "${commandName}" Not Identified. Please refer to help above. \n`))
  }
}

main();