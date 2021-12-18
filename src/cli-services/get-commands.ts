#!node

import CommandsAPIService from "../services/commands-api";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const commands = await CommandsAPIService.getCommands(process.env.APP_ID!, process.env.BOT_TOKEN!);
  console.log(commands);
}

main();