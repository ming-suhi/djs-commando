#!node

import CommandsAPIService from "../services/commands-api";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const commandName = process.argv[2];
  const command = await CommandsAPIService.getCommand(process.env.APP_ID!, process.env.BOT_TOKEN!, commandName);
  console.log(JSON.stringify(command, null, 2) || `No command found with the name: ${commandName}`);
}

main();