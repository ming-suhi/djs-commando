#!node

import CommandsAPIService from "../services/commands-api";
import { InteractionsHandler } from "../structures/interactions-handler";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const commandName = process.argv[2];
  const handler = new InteractionsHandler();
  const command = handler.commands.get(commandName);
  if(command) await CommandsAPIService.postCommand(process.env.APP_ID!, process.env.BOT_TOKEN!, command.rawData);
}

main();